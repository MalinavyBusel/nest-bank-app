import { Account } from 'common-model';
import { BaseRpcService, RpcEmpty } from '../base';

export interface AccountRpcService extends BaseRpcService {
  get(getRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ account: Account | null }>;
  create(createRequest: {
    payload: { clientId: string };
    data: Omit<Account, 'id' | 'clientId'>;
  }): Promise<{ id: string }>;
  find(filter: RpcEmpty): Promise<{ accounts: Account[] }>;
  update(updateRequest: {
    id: string;
    amount: number;
  }): Promise<{ affected: number }>;
  delete(deleteRequest: {
    payload: { clientId: string };
    data: { id: string };
  }): Promise<{ affected: number }>;
  getClientAccounts(payload: {
    clientId: string;
  }): Promise<{ accounts: Account[] }>;
}
