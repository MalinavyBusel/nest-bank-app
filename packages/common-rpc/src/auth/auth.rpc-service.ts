import { BaseRpcService } from '../base';

export interface AuthRpcService extends BaseRpcService {
  login(loginRequest: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }>;
  refresh(data: {
    refreshToken: string;
  }): Promise<{ accessToken: string; refreshToken: string }>;
  logout(data: { id: string }): Promise<void>;
}
