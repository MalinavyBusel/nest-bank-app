import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('banks')
export class BanksController {
  @MessagePattern({ cmd: 'get' })
  handleUserGet() {
    console.log('you ask for user');
    return 'user';
  }
}
