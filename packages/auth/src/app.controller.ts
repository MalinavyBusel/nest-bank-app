import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_RPC_SERVICE_NAME,
  AuthRpcService,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
} from 'common-rpc';

@Controller()
export class AppController implements AuthRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'login')
  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    return this.appService.login(loginDto);
  }

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'logout')
  logout(data: { id: string }): Promise<void> {
    return this.appService.logout(data);
  }

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'refresh')
  refresh(data: RefreshRequest): Promise<LoginResponse> {
    return this.appService.refresh(data);
  }
}
