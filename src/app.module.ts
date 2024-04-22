import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [ApiGatewayModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
