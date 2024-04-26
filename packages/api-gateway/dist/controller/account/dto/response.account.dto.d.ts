import { Account, WithId, currencyTypesEnum } from 'common-model';
export declare class ResponseAccountDto implements Account, WithId {
    id: string;
    amount: number;
    bankId: string;
    clientId: string;
    currency: currencyTypesEnum;
}
