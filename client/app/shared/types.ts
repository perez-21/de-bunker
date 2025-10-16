interface BaseEntry {
  id: number,
  name: string,
  type: string,
}

export interface Login extends BaseEntry{
  username: string,
  password: string, 
  url: string,
}

export interface CreditCard extends BaseEntry {
  cardNumber: string,
  nameOnCard: string,
  expiration: string,
  cvv: string,
}

export interface SecureNote extends BaseEntry {
  content: string,
}

export interface WalletAddress extends BaseEntry {
  address: string,
  network: string,
}

export type VaultEntries = Array<Login | CreditCard | SecureNote | WalletAddress>;
export type VaultEntry = Login | CreditCard | SecureNote | WalletAddress;
