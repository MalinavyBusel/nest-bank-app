import { Transaction } from 'common-model';
export declare class CreateTransactionDto implements Omit<Transaction, 'datetime'> {
    amount: number;
    from: string;
    to: string;
}
