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

  async getById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findOneBy({ id });
  }

  async getClientTransactions(data: {
    clientId: string;
    startDate: string;
    endDate: string;
  }): Promise<Transaction[]> {
    let { startDate, endDate } = data;
    const { clientId } = data;
    if (startDate === undefined) {
      startDate = new Date(0).toISOString();
    }
    if (endDate === undefined) {
      endDate = new Date().toISOString();
    }

    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.from', 'account')
      .where('account.clientId = :clientId', { clientId })
      .andWhere('datetime between :startDate and :endDate', {
        startDate,
        endDate,
      })
      .getMany();
  }

  async create(data: Omit<Transaction, 'id' | 'datetime'>): Promise<string> {
    const fromAcc = await this.accountRepository.findOneByOrFail({
      id: data.fromId,
    });
    const toAcc = await this.accountRepository.findOneByOrFail({
      id: data.toId,
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
      data.amount,
    );
    if (amountWithCommission > fromAcc.amount) {
      return 'not enough money';
    }
    fromAcc.amount -= amountWithCommission;
    const converted = await convertCurrency(
      fromAcc.currency,
      toAcc.currency,
      data.amount,
    );
    toAcc.amount += converted;
    return this.runDatabaseTransaction(fromAcc, toAcc, data);
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
