import { BaseRpcService, RpcEmpty } from '../base';
import { Client } from 'common-model';

export interface ClientRpcService extends BaseRpcService {
  get(clientId: {
    id: string;
  }): Promise<{ client: Omit<Client, 'password'> | null }>;
  create(data: Omit<Client, 'id'>): Promise<{ id: string }>;
  find(filter: RpcEmpty): Promise<{ clients: Omit<Client, 'password'>[] }>;
  delete(clientId: { id: string }): Promise<{ affected: number }>;
}
