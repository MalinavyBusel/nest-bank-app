import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, ClientEntity } from 'common-model';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async getById(id: string): Promise<Client | null> {
    return this.clientRepository.findOneBy({ id });
  }

  async find(_filter: any): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async create(data: Omit<Client, 'id'>): Promise<string> {
    const insertResult = await this.clientRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .returning('id')
      .execute();
    return insertResult.raw[0]['id'];
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.clientRepository.delete({ id });
    return deleteResult.affected ?? 0;
  }
}
