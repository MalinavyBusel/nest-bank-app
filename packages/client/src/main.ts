import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });

  app.startAllMicroservices();
}
bootstrap();
