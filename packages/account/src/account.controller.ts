import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from 'common-model';
import { ACCOUNT_RPC_SERVICE_NAME, AccountRpcService } from 'common-rpc';

@Controller()
export class AccountController implements AccountRpcService {
  constructor(private readonly accountService: AccountService) {}

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'get')
  async get(getRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ account: Account | null }> {
    return { account: await this.accountService.getById(getRequest) };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'create')
  async create(createRequest: {
    payload: { clientId: string };
    data: Omit<Account, 'id' | 'clientId'>;
  }): Promise<{ id: string }> {
    const id = await this.accountService.create(createRequest);

    return { id };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'update')
  async update(data: {
    id: string;
    amount: number;
  }): Promise<{ affected: number }> {
    const affected = await this.accountService.update(data);

    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'delete')
  async delete(deleteRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ affected: number }> {
    const affected = await this.accountService.delete(deleteRequest);

    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'getClientAccounts')
  async getClientAccounts(payload: {
    clientId: string;
  }): Promise<{ accounts: Account[] }> {
    const accounts = await this.accountService.getClientAccounts(payload);

    return { accounts };
  }
}
