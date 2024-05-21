import { NestFactory } from '@nestjs/core';
import { BankModule } from './bank.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { bankRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BankModule,
    bankRpcOptions(),
  );

  await app.listen();
}
bootstrap();
