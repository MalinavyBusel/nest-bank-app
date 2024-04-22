import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BanksController } from './banks.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [BanksController],
})
export class BanksModule {}
