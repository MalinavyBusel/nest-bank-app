import { BaseRpcService } from '../base';

export interface AuthRpcService extends BaseRpcService {
  login(loginRequest: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }>;
}
