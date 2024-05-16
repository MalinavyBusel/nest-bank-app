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

@Injectable()
export class AppService {
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
    data: {
      startDate?: string;
      endDate?: string;
      skip?: number;
      take?: number;
    };
    payload: { clientId: string };
  }): Promise<Transaction[]> {
    const { startDate, endDate, skip, take } = dto.data;
    const { clientId } = dto.payload;

    const res = this.transactionRepository
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
    return res;
  }

  async create(createRequest: {
    data: Omit<Transaction, 'id' | 'datetime'>;
    payload: { clientId: string };
  }): Promise<string> {
    const fromAcc = await this.accountRepository.findOneByOrFail({
      id: createRequest.data.fromId,
    });
    const toAcc = await this.accountRepository.findOneByOrFail({
      id: createRequest.data.toId,
    });
    const fromBank = await this.bankRepository.findOneByOrFail({
      id: fromAcc.bankId,
    });
    const fromClient = await this.clientRepository.findOneByOrFail({
      id: fromAcc.clientId,
    });

    const amountWithCommission = this.calculateAmountWithCommission(
      fromBank,
      toAcc.bankId,
      fromClient,
      createRequest.data.amount,
    );
    if (amountWithCommission > fromAcc.amount) {
      return 'not enough money';
    }
    fromAcc.amount -= amountWithCommission;
    const converted = await convertCurrency(
      fromAcc.currency,
      toAcc.currency,
      createRequest.data.amount,
    );
    toAcc.amount += converted;
    return this.runDatabaseTransaction(fromAcc, toAcc, createRequest.data);
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

    let commission = 0;
    if (client.type === clientTypesEnum.INDIVIDUAL) {
      commission = bank.individualCommission;
    } else {
      commission = bank.entityCommission;
    }
    return amount * ((100 + commission) / 100);
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
      console.log(err);
      await queryRunner.rollbackTransaction();
      return `transaction failed: ${err.message}`;
    } finally {
      await queryRunner.release();
    }
  }
}
