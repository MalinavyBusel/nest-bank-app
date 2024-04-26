import { Transaction, WithId } from 'common-model';
export declare class ResponseTransactionDto implements Transaction, WithId {
    id: string;
    amount: number;
    datetime: Date;
    from: string;
    to: string;
}
