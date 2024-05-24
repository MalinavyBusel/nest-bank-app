import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_RPC_SERVICE_NAME,
  AuthRpcService,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
} from 'common-rpc';
import { ClientId } from 'common-model';

@Controller()
export class AuthController implements AuthRpcService {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'login')
  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'logout')
  logout(data: ClientId): Promise<void> {
    return this.authService.logout(data);
  }

  @GrpcMethod(AUTH_RPC_SERVICE_NAME, 'refresh')
  refresh(data: RefreshRequest): Promise<LoginResponse> {
    return this.authService.refresh(data);
  }
}
