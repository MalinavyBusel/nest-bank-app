import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Bank } from 'common-model';
import { GrpcMethod } from '@nestjs/microservices';
import { BANK_RPC_SERVICE_NAME, BankRpcService } from 'common-rpc';

@Controller()
export class AppController implements BankRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'get')
  async get(bankId: { id: string }): Promise<{ bank: Bank | null }> {
    const bank = await this.appService.getById(bankId.id);

    return { bank };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'create')
  async create(data: Omit<Bank, 'id'>): Promise<{ id: string }> {
    const id = await this.appService.create(data);

    return { id };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'update')
  async update(data: Bank): Promise<{ affected: number }> {
    const affected = await this.appService.update(data);

    return { affected };
  }

  @GrpcMethod(BANK_RPC_SERVICE_NAME, 'delete')
  async delete(bankId: { id: string }): Promise<{ affected: number }> {
    const affected = await this.appService.delete(bankId.id);

    return { affected };
  }
}
