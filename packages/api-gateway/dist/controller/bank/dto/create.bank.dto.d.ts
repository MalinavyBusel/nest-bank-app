import { Bank } from 'common-model';
export declare class CreateBankDto implements Bank {
    entityComission: number;
    individualComission: number;
    name: string;
}