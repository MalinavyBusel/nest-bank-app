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

  async getById(getRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<Account | null> {
    return this.accountRepository.findOneBy({
      id: getRequest.data.id,
      clientId: getRequest.payload.clientId,
    });
  }

  async create(createRequest: {
    payload: { clientId: string };
    data: Omit<Account, 'id' | 'clientId'>;
  }): Promise<string> {
    const insertResult = await this.accountRepository
      .createQueryBuilder()
      .insert()
      .values({
        clientId: createRequest.payload.clientId,
        ...createRequest.data,
      })
      .returning('id')
      .execute();
    return insertResult.raw[0]['id'];
  }

  async find(_filter: any): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async update(data: { id: string; amount: number }): Promise<number> {
    const { id, amount } = data;
    const updateResult = await this.accountRepository.update(
      { id },
      { amount },
    );
    return updateResult.affected;
  }

  async delete(deleteRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<number> {
    const deleteResult = await this.accountRepository.delete({
      id: deleteRequest.data.id,
      clientId: deleteRequest.payload.clientId,
    });
    return deleteResult.affected ?? 0;
  }

  getClientAccounts(payload: { clientId: string }) {
    return this.accountRepository.findBy({ clientId: payload.clientId });
  }
}
