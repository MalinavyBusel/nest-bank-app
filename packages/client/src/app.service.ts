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

  async getById(id: string): Promise<Omit<Client, 'password'> | null> {
    return this.clientRepository.findOneBy({ id });
  }

  async find(_filter: any): Promise<Omit<Client, 'password'>[]> {
    return this.clientRepository.find();
  }

  async create(data: Omit<Client, 'id'>): Promise<string> {
    const instance = this.clientRepository.create(data);
    const record = await this.clientRepository.save(instance);
    return record.id;
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.clientRepository.delete({ id });
    return deleteResult.affected ?? 0;
  }
}
