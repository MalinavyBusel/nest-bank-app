import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class IdExtractorService {
  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization!.split(' ');
    return token;
  }

  public getClientIdFromAccessToken(request: Request): { clientId: string } {
    const token = this.extractTokenFromHeader(request);
    const decoded = jwtDecode<Payload>(token);

    return { clientId: decoded.sub };
  }
}

type Payload = {
  sub: string;
  type: string;
};
