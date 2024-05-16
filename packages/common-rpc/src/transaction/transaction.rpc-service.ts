import { BaseRpcService } from '../base';
import { Transaction } from 'common-model';

export interface TransactionRpcService extends BaseRpcService {
  create(createRequest: {
    data: Omit<Transaction, 'id' | 'datetime'>;
    payload: { clientId: string };
  }): Promise<{ id: string }>;
  getClientTransactions(getClientTransactionsRequest: {
    data: {
      startDate?: string;
      endDate?: string;
      skip?: number;
      take?: number;
    };
    payload: { clientId: string };
  }): Promise<{ transactions: Transaction[] }>;
}
