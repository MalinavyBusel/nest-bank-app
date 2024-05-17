import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from 'common-model';
import { GrpcMethod } from '@nestjs/microservices';
import { CLIENT_RPC_SERVICE_NAME, ClientRpcService } from 'common-rpc';

@Controller()
export class AppController implements ClientRpcService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'get')
  async getById(clientId: {
    id: string;
  }): Promise<{ client: Omit<Client, 'password'> }> {
    const client = await this.appService.getById(clientId.id);
    return { client };
  }

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'find')
  async find(
    filter: Record<string, never>,
  ): Promise<{ clients: Omit<Client, 'password'>[] }> {
    const clients = await this.appService.find(filter);
    return { clients };
  }

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'create')
  async create(data: Omit<Client, 'id'>): Promise<{ id: string }> {
    const id = await this.appService.create(data);
    return { id };
  }

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'delete')
  async delete(clientId: { id: string }): Promise<{ affected: number }> {
    const affected = await this.appService.delete(clientId.id);
    return { affected };
  }
}
