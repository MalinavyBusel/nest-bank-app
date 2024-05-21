export interface Transaction {
  id: string;
  fromId: string;
  toId: string;
  amount: number;
  datetime: string;
}

export interface TransactionId {
  id: string;
}
