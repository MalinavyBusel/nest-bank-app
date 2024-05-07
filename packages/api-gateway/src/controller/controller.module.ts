import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import {
  BANK_RPC_PACKAGE_NAME,
  bankRpcOptions,
  CLIENT_RPC_PACKAGE_NAME,
  clientRpcOptions,
  AUTH_RPC_PACKAGE_NAME,
  authRpcOptions,
} from 'common-rpc';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: '24h',
    },
  }),
  imports: [ConfigModule],
  inject: [ConfigService],
};

@Module({
  imports: [
    JwtModule.registerAsync(jwtFactory),
    ClientsModule.register([
      {
        name: 'ACCOUNT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
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
  providers: [
    // TODO
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
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
  ],
})
export class ControllerModule {}
