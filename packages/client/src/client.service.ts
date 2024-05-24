import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, ClientEntity } from 'common-model';
import { createHash } from 'crypto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async getById(
    id: string,
  ): Promise<Omit<Client, 'password' | 'refreshToken'> | null> {
    return this.clientRepository.findOneBy({ id });
  }

  async create(data: Omit<Client, 'id'>): Promise<string> {
    const hashedPassword = createHash('sha256')
      .update(data.password)
      .digest('base64');
    const instance = this.clientRepository.create({
      ...data,
      password: hashedPassword,
    });
    const record = await this.clientRepository.save(instance);

    return record.id;
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.clientRepository.delete({ id });

    return deleteResult.affected ?? 0;
  }
}
