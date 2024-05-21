import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { accountRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountModule,
    accountRpcOptions(),
  );

  await app.listen();
}
bootstrap();
