import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Account } from 'common-model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-account' })
  async getById(id: string): Promise<Account> {
    return this.appService.getById(id);
  }

  @MessagePattern({ cmd: 'create-account' })
  async create(data: Account): Promise<string> {
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'find-accounts' })
  async find(filter: any): Promise<Account[]> {
    return await this.appService.find(filter);
  }

  @MessagePattern({ cmd: 'update-account' })
  async update(data: [string, Partial<Omit<Account, 'id'>>]): Promise<number> {
    return await this.appService.update(data);
  }

  @MessagePattern({ cmd: 'delete-account' })
  async delete(id: string): Promise<number> {
    return await this.appService.delete(id);
  }
}
