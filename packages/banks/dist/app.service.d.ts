import { Bank, WithId } from 'common-model';
import { Bank as BankEntity } from './entities/bank.entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly bankRepository;
    constructor(bankRepository: Repository<BankEntity>);
    getById(_id: string): Promise<(Bank & WithId) | null>;
    find(_filter: any): Promise<(Bank & WithId)[]>;
    delete(_id: string): Promise<number | null>;
}
