import { Bank } from 'common-model';
import { BaseRpcService, RpcEmpty } from '../base';
import { Observable } from 'rxjs';

export interface BankRpcService extends BaseRpcService {
  get(bankId: { id: string }): Observable<{ bank: Bank | null }>;
  create(data: Omit<Bank, 'id'>): Observable<{ id: string }>;
  find(filter: RpcEmpty): Observable<{ banks: Bank[] }>;
  update(data: Bank): Observable<{ affected: number }>;
  delete(bankId: { id: string }): Observable<{ affected: number }>;
}
