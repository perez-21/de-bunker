import {
  Lock, User, Link, CreditCard, BookOpen, Key, DollarSign, List, HardHat
} from 'lucide-react';

export const credentialSchemas = {
  'Login': {
    name: "Login",
    icon: HardHat,
    fields: [
      { key: 'username', label: 'Username', type: 'text', icon: User },
      { key: 'password', label: 'Password', type: 'password', icon: Lock },
      { key: 'url', label: 'Website URL', type: 'url', icon: Link, optional: true },
    ]
  },
  'Credit Card': {
    name: "Credit Card",
    icon: CreditCard,
    fields: [
      { key: 'number', label: 'Card Number', type: 'text', mask: true },
      { key: 'nameOnCard', label: 'Name on Card', type: 'text' },
      { key: 'expiration', label: 'Expiration (MM/YY)', type: 'text' },
      { key: 'cvv', label: 'CVV/CVC', type: 'password', mask: true },
    ]
  },
  'Secure Note': {
    name: "Secure Note",
    icon: BookOpen,
    fields: [
      { key: 'content', label: 'Note Content', type: 'textarea' },
    ]
  },
  'Wallet Address': {
    name: "Wallet Address",
    icon: DollarSign,
    fields: [
      { key: 'address', label: 'Address', type: 'text', mask: true },
      { key: 'network', label: 'Network/Chain', type: 'text', optional: true },
    ]
  },
  'Keys': {
    name: "Key/License",
    icon: Key,
    fields: [
      { key: 'key', label: 'Product/License Key', type: 'text', mask: true },
      { key: 'software', label: 'Software/Product Name', type: 'text', optional: true },
    ]
  },
  'Seed Phrase': {
    name: "Seed Phrase",
    icon: List,
    fields: [
      { key: 'phrase', label: 'Recovery Phrase (12/24 words)', type: 'textarea', mask: true },
    ]
  },
};

export enum CredentialTypes {
  Login = 'Login',
  CreditCard = 'Credit Card',
  SecureNote = 'Secure Note',
  WalletAddress = 'Wallet Address',
  Keys = 'Keys',
  SeedPhrase = 'Seed Phrase',
}

// export const credentialTypes = Object.keys(credentialSchemas);

// Helper to get a clean, new template based on type
type CredentialTemplate = {
  id: number;
  name: string;
  type: CredentialTypes;
  [index: string]: any;
}

export const getNewCredentialTemplate = (type: CredentialTypes): CredentialTemplate => {
  const template: CredentialTemplate  = { id: Date.now(), name: `New ${type}`, type: type };
  
  credentialSchemas[type].fields.forEach((field: {key: string; label: string; type: string; optional?: boolean; mask?: boolean; }) => {
    template[field.key] = '';
  });
  return template;
};
