import { CreateClientDto } from './dto';
export declare class ClientController {
    getById(_id: string): void;
    getTransactions(_id: string): void;
    getAccounts(_id: string): void;
    find(): void;
    new(_createClientDto: CreateClientDto): void;
    delete(_id: string): void;
}
