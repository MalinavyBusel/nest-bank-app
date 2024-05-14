import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from 'common-model';
import { ACCOUNT_RPC_SERVICE_NAME, AccountRpcService } from 'common-rpc';

@Controller()
export class AppController implements AccountRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'get')
  async get(accountId: { id: string }): Promise<{ account: Account | null }> {
    return { account: await this.appService.getById(accountId.id) };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'create')
  async create(data: Omit<Account, 'id'>): Promise<{ id: string }> {
    const id = await this.appService.create(data);
    return { id };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'find')
  async find(filter: Record<string, never>): Promise<{ accounts: Account[] }> {
    const accounts = await this.appService.find(filter);
    return { accounts };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'update')
  async update(data: {
    id: string;
    amount: number;
  }): Promise<{ affected: number }> {
    const affected = await this.appService.update(data);
    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'delete')
  async delete(accountId: { id: string }): Promise<{ affected: number }> {
    const affected = await this.appService.delete(accountId.id);
    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'getClientAccounts')
  async getClientAccounts(clientId: {
    id: string;
  }): Promise<{ accounts: Account[] }> {
    const accounts = await this.appService.getClientAccounts(clientId.id);
    return { accounts };
  }
}
