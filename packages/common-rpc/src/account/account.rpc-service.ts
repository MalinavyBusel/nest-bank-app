import { Account } from 'common-model';
import { BaseRpcService, RpcEmpty } from '../base';
import { Observable } from 'rxjs';

export interface AccountRpcService extends BaseRpcService {
  get(accountId: { id: string }): Observable<{ account: Account | null }>;
  create(data: Omit<Account, 'id'>): Observable<{ id: string }>;
  find(filter: RpcEmpty): Observable<{ accounts: Account[] }>;
  update(data: {
    id: string;
    amount: number;
  }): Observable<{ affected: number }>;
  delete(accountId: { id: string }): Observable<{ affected: number }>;
  getClientAccounts(clientId: {
    id: string;
  }): Observable<{ accounts: Account[] }>;
}
