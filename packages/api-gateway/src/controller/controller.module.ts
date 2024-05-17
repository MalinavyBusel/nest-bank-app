import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../common/auth.guard';
import { IdExtractorService } from '../common/id-extractor/id-extractor.service';
import {
  BANK_RPC_PACKAGE_NAME,
  bankRpcOptions,
  CLIENT_RPC_PACKAGE_NAME,
  clientRpcOptions,
  AUTH_RPC_PACKAGE_NAME,
  authRpcOptions,
  ACCOUNT_RPC_PACKAGE_NAME,
  accountRpcOptions,
  TRANSACTION_RPC_PACKAGE_NAME,
  transactionRpcOptions,
} from 'common-rpc';
import * as process from 'node:process';
import { GrpcExceptionFilter } from '../common/exception.filter';

const jwtFactory = {
  imports: [ConfigModule.forRoot()],
  inject: [],
  useFactory: async () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '24h',
    },
  }),
};

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  controllers: [
    AuthController,
    BankController,
    ClientController,
    AccountController,
    TransactionController,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_FILTER',
      useClass: GrpcExceptionFilter,
    },
    {
      provide: BANK_RPC_PACKAGE_NAME,
      useFactory: () => {
        return ClientProxyFactory.create(bankRpcOptions());
      },
    },
    {
      provide: CLIENT_RPC_PACKAGE_NAME,
      useFactory: () => {
        return ClientProxyFactory.create(clientRpcOptions());
      },
    },
    {
      provide: AUTH_RPC_PACKAGE_NAME,
      useFactory: () => {
        return ClientProxyFactory.create(authRpcOptions());
      },
    },
    {
      provide: ACCOUNT_RPC_PACKAGE_NAME,
      useFactory: () => {
        return ClientProxyFactory.create(accountRpcOptions());
      },
    },
    {
      provide: TRANSACTION_RPC_PACKAGE_NAME,
      useFactory: () => {
        return ClientProxyFactory.create(transactionRpcOptions());
      },
    },
    IdExtractorService,
  ],
})
export class ControllerModule {}
