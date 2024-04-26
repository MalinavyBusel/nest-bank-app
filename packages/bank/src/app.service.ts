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

  async getById(_id: string): Promise<(Bank & WithId) | null> {
    return this.bankRepository.findOneBy({ id: _id });
  }

  async find(_filter: any): Promise<(Bank & WithId)[]> {
    return this.bankRepository.find();
  }

  // async create(_data: Bank): Promise<string> {}
  //
  // async update(_id: string, _data: Partial<Bank>): Promise<number> {}

  async delete(_id: string): Promise<number | null> {
    const deleteResult = await this.bankRepository.delete({ id: _id });
    return deleteResult.affected;
  }
}
