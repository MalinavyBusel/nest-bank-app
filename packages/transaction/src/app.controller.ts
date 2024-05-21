import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Transaction } from 'common-model';
import {
  TransactionRpcService,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionFilter,
} from 'common-rpc';

@Controller()
export class AppController implements TransactionRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'create')
  async create(createRequest: {
    data: Omit<Transaction, 'id' | 'datetime'>;
    payload: { clientId: string };
  }): Promise<{ id: string }> {
    return this.appService.create(createRequest);
  }

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'getClientTransactions')
  async getClientTransactions(dto: {
    data: TransactionFilter;
    payload: { clientId: string };
  }): Promise<{ transactions: Transaction[] }> {
    const transactions = await this.appService.getClientTransactions(dto);

    return { transactions };
  }
}
