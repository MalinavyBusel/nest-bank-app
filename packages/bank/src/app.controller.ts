import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Bank, WithId } from 'common-model';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-bank' })
  async getById(id: string): Promise<Bank & WithId> {
    return await this.appService.getById(id);
  }

  @MessagePattern({ cmd: 'create-bank' })
  async create(data: Bank): Promise<string> {
    return await this.appService.create(data);
  }

  @MessagePattern({ cmd: 'find-banks' })
  async find(filter: any): Promise<(Bank & WithId)[]> {
    return await this.appService.find(filter);
  }

  @MessagePattern({ cmd: 'update-bank' })
  async update(data: [string, Partial<Bank>]): Promise<number> {
    return await this.appService.update(data);
  }

  @MessagePattern({ cmd: 'delete-bank' })
  async delete(id: string): Promise<number> {
    return await this.appService.delete(id);
  }
}
