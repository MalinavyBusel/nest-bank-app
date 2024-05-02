import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BANK',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: 'CLIENT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
      {
        name: 'ACCOUNT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3005 },
      },
    ]),
  ],
  controllers: [
    AuthController,
    BankController,
    ClientController,
    AccountController,
    TransactionController,
  ],
})
export class ControllerModule {}
