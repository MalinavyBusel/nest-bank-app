import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { clientRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    clientRpcOptions(),
  );

  await app.listen();
}
bootstrap();
