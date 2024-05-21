import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { clientRpcOptions } from 'common-rpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ClientModule,
    clientRpcOptions(),
  );

  await app.listen();
}
bootstrap();
