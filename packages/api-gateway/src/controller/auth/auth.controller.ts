import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { Public } from '../auth.guard';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH') private readonly tcpAuthService: ClientProxy) {}

  @Public()
  @Post('login')
  @ApiOperation({
    description: 'Returns jwt token',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      return await firstValueFrom(
        this.tcpAuthService.send({ cmd: 'login' }, loginDto),
      );
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
