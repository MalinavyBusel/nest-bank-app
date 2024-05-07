import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_RPC_SERVICE_NAME, AuthRpcService } from 'common-rpc';

@Controller()
export class AppController implements AuthRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'login')
  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    return this.appService.login(loginDto);
  }
}
