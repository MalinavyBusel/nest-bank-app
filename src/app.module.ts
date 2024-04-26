import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGatewayModule } from '../packages/api-gateway/src/app.module';

@Module({
  imports: [ApiGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
