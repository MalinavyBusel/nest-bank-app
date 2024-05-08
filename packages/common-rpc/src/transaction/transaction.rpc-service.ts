import { BaseRpcService } from '../base';
import { Transaction } from 'common-model';

export interface TransactionRpcService extends BaseRpcService {
  get(transactionId: { id: string }): Promise<{ transaction: Transaction }>;
  create(
    transaction: Omit<Transaction, 'id' | 'datetime'>,
  ): Promise<{ id: string }>;
  getClientTransactions(data: {
    clientId: string;
    startDate: string;
    endDate: string;
  }): Promise<{ transactions: Transaction[] }>;
}
