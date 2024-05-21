import { BaseRpcService } from '../base';

export interface AuthRpcService extends BaseRpcService {
  login(loginRequest: LoginRequest): Promise<LoginResponse>;
  refresh(data: RefreshRequest): Promise<LoginResponse>;
  logout(data: { id: string }): Promise<void>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface RefreshRequest {
  refreshToken: string;
}
