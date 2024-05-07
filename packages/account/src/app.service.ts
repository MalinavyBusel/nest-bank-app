import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, Account } from 'common-model';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async getById(id: string): Promise<Account | null> {
    return this.accountRepository.findOneBy({ id });
  }

  async create(data: Omit<Account, 'id'>): Promise<string> {
    const insertResult = await this.accountRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .returning('id')
      .execute();
    return insertResult.raw[0]['id'];
  }

  async find(_filter: any): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async update(data: { id: string; amount: number }): Promise<number> {
    const { id, amount } = data;
    // TODO
    // do smth with update logic
    const updateResult = await this.accountRepository.update(
      { id },
      { amount },
    );
    return updateResult.affected;
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.accountRepository.delete({ id });
    return deleteResult.affected ?? 0;
  }

  getClientAccounts(id: string) {
    return this.accountRepository.findBy({ clientId: id });
  }
}
