export interface Account {
  id: string;
  clientId: string;
  bankId: string;
  currency: currencyTypesEnum;
  amount: number;
}

export enum currencyTypesEnum {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export interface AccountId {
  id: string;
}

export interface AccountOrNull {
  account: Account | null;
}
