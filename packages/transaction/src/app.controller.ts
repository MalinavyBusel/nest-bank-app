import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Transaction } from 'common-model';
import {
  TransactionRpcService,
  TRANSACTION_RPC_SERVICE_NAME,
} from 'common-rpc';

@Controller()
export class AppController implements TransactionRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'get')
  async get(data: { id: string }): Promise<{ transaction: Transaction }> {
    const transaction = await this.appService.getById(data.id);
    return { transaction };
  }

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'create')
  async create(
    data: Omit<Transaction, 'id' | 'datetime'>,
  ): Promise<{ id: string }> {
    const id = await this.appService.create(data);
    return { id };
  }

  @GrpcMethod(TRANSACTION_RPC_SERVICE_NAME, 'getClientTransactions')
  async getClientTransactions(data: {
    clientId: string;
    startDate: string;
    endDate: string;
  }): Promise<{ transactions: Transaction[] }> {
    const transactions = await this.appService.getClientTransactions(data);
    return { transactions };
  }
}
