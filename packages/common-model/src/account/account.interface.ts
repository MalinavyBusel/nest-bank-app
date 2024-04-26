export interface Account {
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
