import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  controllers: [
    BankController,
    ClientController,
    AccountController,
    TransactionController,
  ],
})
export class ControllerModule {}
