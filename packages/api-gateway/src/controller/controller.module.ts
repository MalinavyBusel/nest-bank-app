import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BANK',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CLIENT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
  ],
  controllers: [
    BankController,
    ClientController,
    AccountController,
    TransactionController,
  ],
})
export class ControllerModule {}
