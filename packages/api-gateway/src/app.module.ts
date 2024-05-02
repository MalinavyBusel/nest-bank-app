import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [ControllerModule],
  controllers: [AuthController],
  providers: [],
})
export class ApiGatewayModule {}
