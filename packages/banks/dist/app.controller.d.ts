import { AppService } from './app.service';
import { Bank, WithId } from 'common-model';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getById(id: string): Promise<Bank & WithId>;
    find(filter: any): Promise<(Bank & WithId)[]>;
    delete(id: string): Promise<number>;
}
