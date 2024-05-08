import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { bankRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    bankRpcOptions(),
  );

  await app.listen();
}
bootstrap();
