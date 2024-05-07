import { BaseRpcService } from '../base';
import { Observable } from 'rxjs';

export interface AuthRpcService extends BaseRpcService {
  login(loginRequest: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string }>;
}
