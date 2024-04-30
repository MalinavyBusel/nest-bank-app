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

  async create(data: Omit<Transaction, 'id'>): Promise<string> {
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

    const amountWithComission = this.calculateAmountWithComission(
      fromBank,
      toAcc.bankId,
      fromClient,
      data.amount,
    );
    if (amountWithComission > fromAcc.amount) {
      return 'not enough money';
    }
    fromAcc.amount -= amountWithComission;
    const converted = await convertCurrency(
      fromAcc.currency,
      toAcc.currency,
      data.amount,
    );
    toAcc.amount += converted;
    return this.runDatabaseTransaction(fromAcc, toAcc, data);
  }

  private calculateAmountWithComission(
    bank: BankEntity,
    targetBankId: string,
    client: ClientEntity,
    amount: number,
  ) {
    if (bank.id == targetBankId) {
      return amount;
    }

    let comission = 0;
    if (client.type === clientTypesEnum.INDIVIDUAL) {
      comission = bank.individualComission;
    } else {
      comission = bank.entityComission;
    }
    return amount * ((100 + comission) / 100);
  }

  private async runDatabaseTransaction(
    fromAcc: AccountEntity,
    toAcc: AccountEntity,
    data: Omit<Transaction, 'id'>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(fromAcc);
      await queryRunner.manager.save(toAcc);
      const transaction = queryRunner.manager.create(TransactionEntity, data);
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
