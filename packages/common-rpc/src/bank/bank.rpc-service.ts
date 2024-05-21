import { Bank } from 'common-model';
import { BaseRpcService } from '../base';

export interface BankRpcService extends BaseRpcService {
  get(bankId: { id: string }): Promise<{ bank: Bank | null }>;
  create(data: Omit<Bank, 'id'>): Promise<{ id: string }>;
  update(data: Bank): Promise<{ affected: number }>;
  delete(bankId: { id: string }): Promise<{ affected: number }>;
}
