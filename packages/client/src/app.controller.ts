import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Account, Client, Transaction } from 'common-model';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-client' })
  async getById(id: string): Promise<Client> {
    return this.appService.getById(id);
  }

  @MessagePattern({ cmd: 'find-clients' })
  async find(filter: any): Promise<Client[]> {
    return this.appService.find(filter);
  }

  @MessagePattern({ cmd: 'create-client' })
  async create(data: Omit<Client, 'id'>): Promise<string> {
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'delete-client' })
  async delete(id: string): Promise<number> {
    return this.appService.delete(id);
  }
}