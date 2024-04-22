import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiGatewayController {
  constructor(@Inject('CLIENT_SERVICE') private clientClient: ClientProxy) {}

  @Get()
  getById() {
    return this.clientClient.send<string>({ cmd: 'get' }, '');
  }
}
