import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  AccountEntity,
  BankEntity,
  ClientEntity,
  clientTypesEnum,
  Transaction,
  TransactionEntity,
} from 'common-model';
import { DataSource, Repository } from 'typeorm';
import { convertCurrency } from './helpers/currency.converter';
import { RpcException } from '@nestjs/microservices';
import { status } from 'grpc';
import { TransactionFilter } from 'common-rpc';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getClientTransactions(dto: {
    data: TransactionFilter;
    payload: { clientId: string };
  }): Promise<Transaction[]> {
    const { startDate, endDate, skip, take } = dto.data;
    const { clientId } = dto.payload;

    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .where((qb) => {
        const subq = qb
          .subQuery()
          .select('id')
          .from(AccountEntity, 'acc')
          .where('acc.clientId = :clientId', { clientId })
          .getQuery();
        return 'transaction.fromId IN ' + subq;
      })
      .andWhere(
        '(cast(:startDate as date) is null OR :startDate <= transaction.datetime)',
        { startDate },
      )
      .andWhere(
        '(cast(:endDate as date) is null OR :endDate >= transaction.datetime)',
        { endDate },
      )
      .skip(skip)
      .take(take)
      .getMany();

    return query;
  }

  async create(createRequest: {
    data: Omit<Transaction, 'id' | 'datetime'>;
    payload: { clientId: string };
  }): Promise<{ id: string }> {
    const [fromAcc, toAcc]: [AccountEntity, AccountEntity] = await Promise.all([
      this.accountRepository.findOneByOrFail({
        id: createRequest.data.fromId,
      }),
      this.accountRepository.findOneByOrFail({
        id: createRequest.data.toId,
      }),
    ]);
    const [fromBank, fromClient]: [BankEntity, ClientEntity] =
      await Promise.all([
        this.bankRepository.findOneByOrFail({
          id: fromAcc.bankId,
        }),
        this.clientRepository.findOneByOrFail({
          id: fromAcc.clientId,
        }),
      ]);

    const amountWithCommission = this.calculateAmountWithCommission(
      fromBank,
      toAcc.bankId,
      fromClient,
      createRequest.data.amount,
    );
    if (amountWithCommission > fromAcc.amount) {
      throw new RpcException({
        code: status.FAILED_PRECONDITION,
        message: 'Not enough money',
      });
    }
    if (fromAcc.clientId !== createRequest.payload.clientId) {
      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message:
          'Only the owner of account can transact money from this account',
      });
    }

    const fromAccUpdated = structuredClone(fromAcc);
    const toAccUpdated = structuredClone(toAcc);
    fromAccUpdated.amount -= amountWithCommission;
    const converted = await convertCurrency(
      fromAccUpdated.currency,
      toAccUpdated.currency,
      createRequest.data.amount,
    );
    toAccUpdated.amount += converted;
    const id = await this.runDatabaseTransaction(
      fromAccUpdated,
      toAccUpdated,
      createRequest.data,
    );

    return { id };
  }

  private calculateAmountWithCommission(
    bank: BankEntity,
    targetBankId: string,
    client: ClientEntity,
    amount: number,
  ) {
    if (bank.id == targetBankId) {
      return amount;
    }

    if (client.type === clientTypesEnum.INDIVIDUAL) {
      return amount * ((100 + bank.individualCommission) / 100);
    } else {
      return amount * ((100 + bank.entityCommission) / 100);
    }
  }

  private async runDatabaseTransaction(
    fromAcc: AccountEntity,
    toAcc: AccountEntity,
    data: Omit<Transaction, 'id' | 'datetime'>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(fromAcc);
      await queryRunner.manager.save(toAcc);
      const transaction = queryRunner.manager.create<
        TransactionEntity,
        Omit<Transaction, 'id' | 'datetime'>
      >(TransactionEntity, data);
      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();
      return transaction.id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return `transaction failed: ${err.message}`;
    } finally {
      await queryRunner.release();
    }
  }
}
