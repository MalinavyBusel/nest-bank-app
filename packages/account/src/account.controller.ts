import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  Account,
  AccountId,
  AccountOrNull,
  ClientIdFromToken,
  RecordsAffected,
} from 'common-model';
import { ACCOUNT_RPC_SERVICE_NAME, AccountRpcService } from 'common-rpc';

@Controller()
export class AccountController implements AccountRpcService {
  constructor(private readonly accountService: AccountService) {}

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'get')
  async get(getRequest: {
    payload: ClientIdFromToken;
    data: AccountId;
  }): Promise<AccountOrNull> {
    return { account: await this.accountService.getById(getRequest) };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'create')
  async create(createRequest: {
    payload: ClientIdFromToken;
    data: Omit<Account, 'id' | 'clientId'>;
  }): Promise<AccountId> {
    const id = await this.accountService.create(createRequest);

    return { id };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'update')
  async update(data: { id: string; amount: number }): Promise<RecordsAffected> {
    const affected = await this.accountService.update(data);

    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'delete')
  async delete(deleteRequest: {
    payload: ClientIdFromToken;
    data: AccountId;
  }): Promise<RecordsAffected> {
    const affected = await this.accountService.delete(deleteRequest);

    return { affected };
  }

  @GrpcMethod(ACCOUNT_RPC_SERVICE_NAME, 'getClientAccounts')
  async getClientAccounts(
    payload: ClientIdFromToken,
  ): Promise<{ accounts: Account[] }> {
    const accounts = await this.accountService.getClientAccounts(payload);

    return { accounts };
  }
}
