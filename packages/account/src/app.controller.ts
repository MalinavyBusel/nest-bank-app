import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from 'common-model';
import { ACCOUNT_RPC_SERVICE_NAME, AccountRpcService } from 'common-rpc';

@Controller()
export class AppController implements AccountRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'get')
  async get(getRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ account: Account | null }> {
    return { account: await this.appService.getById(getRequest) };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'create')
  async create(createRequest: {
    payload: { clientId: string };
    data: Omit<Account, 'id' | 'clientId'>;
  }): Promise<{ id: string }> {
    const id = await this.appService.create(createRequest);

    return { id };
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
  async delete(deleteRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ affected: number }> {
    const affected = await this.appService.delete(deleteRequest);

    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'getClientAccounts')
  async getClientAccounts(payload: {
    clientId: string;
  }): Promise<{ accounts: Account[] }> {
    const accounts = await this.appService.getClientAccounts(payload);

    return { accounts };
  }
}
