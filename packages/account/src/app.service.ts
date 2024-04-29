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

  async update(data: [string, Partial<Omit<Account, 'id'>>]): Promise<number> {
    const [id, updateDto] = data;
    const updateResult = await this.accountRepository.update({ id }, updateDto);
    return updateResult.affected;
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.accountRepository.delete({ id });
    return deleteResult.affected ?? 0;
  }
}
