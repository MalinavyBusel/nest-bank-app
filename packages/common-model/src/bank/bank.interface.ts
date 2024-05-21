export interface Bank {
  id: string;
  name: string;
  entityCommission: number;
  individualCommission: number;
}

export interface BankId {
  id: string;
}

export interface BankOrNull {
  bank: Bank | null;
}
