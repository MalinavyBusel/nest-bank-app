import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Transaction } from 'common-model';
import {
  TransactionRpcService,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionFilter,
} from 'common-rpc';

@Controller()
export class TransactionController implements TransactionRpcService {
  constructor(private readonly transactionService: TransactionService) {}

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'create')
  async create(createRequest: {
    data: Omit<Transaction, 'id' | 'datetime'>;
    payload: { clientId: string };
  }): Promise<{ id: string }> {
    return this.transactionService.create(createRequest);
  }

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'getClientTransactions')
  async getClientTransactions(dto: {
    data: TransactionFilter;
    payload: { clientId: string };
  }): Promise<{ transactions: Transaction[] }> {
    const transactions =
      await this.transactionService.getClientTransactions(dto);

    return { transactions };
  }
}
