import { Account, currencyTypesEnum } from 'common-model';
export declare class CreateAccountDto implements Account {
    amount: number;
    bankId: string;
    clientId: string;
    currency: currencyTypesEnum;
}
