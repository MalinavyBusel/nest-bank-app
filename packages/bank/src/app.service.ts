import { Injectable } from '@nestjs/common';
import { Bank, BankEntity } from 'common-model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
  ) {}

  async getById(id: string): Promise<Bank | null> {
    return this.bankRepository.findOneBy({ id });
  }

  async find(_filter: any): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  async create(data: Omit<Bank, 'id'>): Promise<string> {
    const insertResult = await this.bankRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .returning('id')
      .execute();
    return insertResult.raw[0]['id'];
  }

  async update(data: Bank): Promise<number> {
    const updateResult = await this.bankRepository.update(
      { id: data.id },
      data,
    );
    return updateResult.affected;
  }

  async delete(id: string): Promise<number> {
    const deleteResult = await this.bankRepository.delete({ id });
    return deleteResult.affected ?? 0;
  }
}
