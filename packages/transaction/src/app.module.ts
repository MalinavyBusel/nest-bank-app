import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, BankEntity, ClientEntity } from 'common-model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionEntity } from 'common-model/dist/transaction/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [ClientEntity, AccountEntity, BankEntity, TransactionEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
