import { BaseRpcService, RpcEmpty } from '../base';
import { Client } from 'common-model';
import { Observable } from 'rxjs';

export interface ClientRpcService extends BaseRpcService {
  get(clientId: {
    id: string;
  }): Observable<{ client: Omit<Client, 'password'> | null }>;
  create(data: Omit<Client, 'id'>): Observable<{ id: string }>;
  find(filter: RpcEmpty): Observable<{ clients: Omit<Client, 'password'>[] }>;
  delete(clientId: { id: string }): Observable<{ affected: number }>;
}
