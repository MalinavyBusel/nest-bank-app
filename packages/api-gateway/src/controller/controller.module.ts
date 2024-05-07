import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { ClientController } from './client/client.controller';
import { AccountController } from './account/account.controller';
import { TransactionController } from './transaction/transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

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
      {
        name: 'TRANSACTION',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3004 },
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
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class ControllerModule {}
