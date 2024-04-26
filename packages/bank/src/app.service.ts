import { Injectable } from '@nestjs/common';
import { Bank, WithId } from 'common-model';
import { Bank as BankEntity } from './entities/bank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
  ) {}

  async getById(id: string): Promise<(Bank & WithId) | null> {
    return this.bankRepository.findOneBy({ id });
  }

  async find(_filter: any): Promise<(Bank & WithId)[]> {
    return this.bankRepository.find();
  }

  async create(data: Bank): Promise<string> {
    const insertResult = await this.bankRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .returning('id')
      .execute();
    return insertResult.raw[0]['id'];
  }

  async update(data: [string, Partial<Bank>]): Promise<number> {
    const [id, updateDto] = data;
    const updateResult = await this.bankRepository.update({ id }, updateDto);
    return updateResult.affected;
  }

  async delete(id: string): Promise<number | null> {
    const deleteResult = await this.bankRepository.delete({ id });
    return deleteResult.affected;
  }
}
