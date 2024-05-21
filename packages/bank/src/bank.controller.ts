import { Controller } from '@nestjs/common';
import { BankService } from './bank.service';
import { Bank } from 'common-model';
import { GrpcMethod } from '@nestjs/microservices';
import { BANK_RPC_SERVICE_NAME, BankRpcService } from 'common-rpc';

@Controller()
export class BankController implements BankRpcService {
  constructor(private readonly bankService: BankService) {}

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'get')
  async get(bankId: { id: string }): Promise<{ bank: Bank | null }> {
    const bank = await this.bankService.getById(bankId.id);

    return { bank };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'create')
  async create(data: Omit<Bank, 'id'>): Promise<{ id: string }> {
    const id = await this.bankService.create(data);

    return { id };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'update')
  async update(data: Bank): Promise<{ affected: number }> {
    const affected = await this.bankService.update(data);

    return { affected };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'delete')
  async delete(bankId: { id: string }): Promise<{ affected: number }> {
    const affected = await this.bankService.delete(bankId.id);

    return { affected };
  }
}
