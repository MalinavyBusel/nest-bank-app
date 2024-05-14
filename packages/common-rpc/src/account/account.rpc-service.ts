import { Account } from 'common-model';
import { BaseRpcService, RpcEmpty } from '../base';

export interface AccountRpcService extends BaseRpcService {
  get(accountId: { id: string }): Promise<{ account: Account | null }>;
  create(data: Omit<Account, 'id'>): Promise<{ id: string }>;
  find(filter: RpcEmpty): Promise<{ accounts: Account[] }>;
  update(data: { id: string; amount: number }): Promise<{ affected: number }>;
  delete(accountId: { id: string }): Promise<{ affected: number }>;
  getClientAccounts(clientId: { id: string }): Promise<{ accounts: Account[] }>;
}
