import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './transaction.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { transactionRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionModule,
    transactionRpcOptions(),
  );
  await app.listen();
}
bootstrap();
