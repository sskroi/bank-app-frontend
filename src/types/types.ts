export interface IAccount {
  number: string;
  balance: string;
  currency: string;
  isClose: boolean;
}

export interface IUser {
  mail: string;
  isInactive: boolean;
  name: string;
  passport: string;
  patronymic?: string;
  publicId: string;
  surname: string;
}

export interface ITransaction {
  publicId: string;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  sent: string;
  received: string;
  sentCurrency: string;
  receivedCurrency: string;
  isConversion: boolean;
  direction: number;
  conversionRate: string;
  timestamp: string;
}
