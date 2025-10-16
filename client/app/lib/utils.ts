import {
  Eye, EyeOff, CreditCard, BookOpen, Key, DollarSign, List, HardHat
} from 'lucide-react';

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Credit Card': return CreditCard;
    case 'Secure Note': return BookOpen;
    case 'Wallet Address': return DollarSign;
    case 'Keys': return Key;
    case 'Seed Phrase': return List;
    default: return HardHat; // Default icon for Login/Other
  }
};

export const copyToClipboard = (text: string) => {
  if (document.execCommand) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log(`Copied: ${text.substring(0, 10)}...`);
  } else {
    // Fallback for environments where execCommand is restricted
    console.error("Clipboard copy failed: execCommand not available.");
  }
};
