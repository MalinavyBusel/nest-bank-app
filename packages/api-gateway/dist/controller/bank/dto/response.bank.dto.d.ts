import { Bank, WithId } from 'common-model';
export declare class ResponseBankDto implements Bank, WithId {
    id: string;
    entityComission: number;
    individualComission: number;
    name: string;
}
