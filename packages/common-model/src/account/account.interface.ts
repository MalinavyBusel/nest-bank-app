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
