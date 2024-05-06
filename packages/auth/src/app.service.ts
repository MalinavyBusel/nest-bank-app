import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'common-model';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async login(data: { email: string; password: string }) {
    const client = await this.clientRepository.findOne({
      where: { email: data.email },
      select: ['password', 'id', 'type'],
    });
    if (!client) throw new RpcException('Client does not exist');
    if (!compareSync(data.password, client.password))
      throw new RpcException('Passwords dont match');

    const payload = { sub: client.id, type: client.type };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
