import { CreateTransactionDto } from './dto';
export declare class TransactionController {
    getById(_id: string): void;
    find(): void;
    new(_createTransactionDto: CreateTransactionDto): void;
}
