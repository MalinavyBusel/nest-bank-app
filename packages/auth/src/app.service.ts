import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'common-model';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { status } from 'grpc';
import { createHash } from 'crypto';
import { LoginRequest, LoginResponse, RefreshRequest } from 'common-rpc';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async login(data: LoginRequest): Promise<LoginResponse> {
    const client = await this.clientRepository.findOne({
      where: { email: data.email },
      select: ['password', 'id', 'type'],
    });
    if (!client)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Client does not exist',
      });
    if (
      createHash('sha256').update(data.password).digest('base64') !==
      client.password
    ) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Passwords dont match',
      });
    }

    return this.generateTokens(client);
  }

  public async refresh(data: RefreshRequest): Promise<LoginResponse> {
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(data.refreshToken);
    } catch (error) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    const client = await this.clientRepository.findOne({
      where: { id: payload.sub },
      select: ['refreshToken', 'id', 'type'],
    });
    if (
      client == null ||
      createHash('sha256').update(data.refreshToken).digest('base64') !==
        client.refreshToken
    ) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    return this.generateTokens(client);
  }

  public async logout(data: { id: string }): Promise<void> {
    await this.clientRepository.update({ id: data.id }, { refreshToken: null });
  }

  private async generateTokens(client: ClientEntity) {
    const refreshToken = await this.jwtService.signAsync(
      { sub: client.id },
      { expiresIn: '60d' },
    );
    const hashedToken = createHash('sha256')
      .update(refreshToken)
      .digest('base64');
    await this.clientRepository.update(
      { id: client.id },
      { refreshToken: hashedToken },
    );
    const payload = { sub: client.id, type: client.type };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30m',
      }),
      refreshToken,
    };
  }
}
