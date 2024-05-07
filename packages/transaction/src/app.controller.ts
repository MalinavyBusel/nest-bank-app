import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Transaction } from 'common-model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-transaction' })
  getById(id: string): Promise<Transaction> {
    return this.appService.getById(id);
  }

  @MessagePattern({ cmd: 'create-transaction' })
  create(data: Omit<Transaction, 'id'>) {
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'get-client-transactions' })
  getClientTransactions(
    data: [string, { startDate?: string; endDate?: string }],
  ) {
    return this.appService.getClientTransactions(data);
  }
}
