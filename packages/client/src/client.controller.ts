import { Controller } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client, ClientId, ClientOrNull, RecordsAffected } from 'common-model';
import { GrpcMethod } from '@nestjs/microservices';
import { CLIENT_RPC_SERVICE_NAME, ClientRpcService } from 'common-rpc';

@Controller()
export class ClientController implements ClientRpcService {
  constructor(private readonly clientService: ClientService) {}

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'get')
  async get(clientId: ClientId): Promise<ClientOrNull> {
    const client = await this.clientService.getById(clientId.id);

    return { client };
  }

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'create')
  async create(data: Omit<Client, 'id'>): Promise<ClientId> {
    const id = await this.clientService.create(data);

    return { id };
  }

  @GrpcMethod(CLIENT_RPC_SERVICE_NAME, 'delete')
  async delete(clientId: ClientId): Promise<RecordsAffected> {
    const affected = await this.clientService.delete(clientId.id);

    return { affected };
  }
}
