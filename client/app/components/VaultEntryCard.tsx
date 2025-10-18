'use client'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { getTypeIcon } from '../lib/utils';

//  Define the VaultEntry type
export interface VaultEntry {
  id: string;
  name: string;
  type: string;
  number?: string;
  nameOnCard?: string;
  content?: string;
  address?: string;
  phrase?: string;
  username?: string;
  software?: string;
  [key: string]: any;
}

//  Props for the component
interface VaultEntryCardProps {
  entry: VaultEntry;
  onSelect: (entry: VaultEntry) => void;
}

export default function VaultEntryCard({ entry, onSelect }: VaultEntryCardProps) {
  const [showSensitive, setShowSensitive] = useState(false);
  const Icon = getTypeIcon(entry.type);

  // Function to determine the main descriptive content for the card
  const getCardDisplayValue = (): string => {
    switch (entry.type) {
      case 'Credit Card': {
        const lastFour = entry.number ? entry.number.slice(-4) : '****';
        return `Card ending in ${lastFour} (${entry.nameOnCard || 'N/A'})`;
      }
      case 'Secure Note':
        return entry.content
          ? entry.content.substring(0, 50) + (entry.content.length > 50 ? '...' : '')
          : 'Empty Note';
      case 'Wallet Address':
        return entry.address
          ? `${entry.address.substring(0, 10)}...${entry.address.slice(-5)}`
          : 'No Address';
      case 'Seed Phrase':
        return showSensitive ? entry.phrase || '' : '•••••••••••••••• (Click to view details)';
      case 'Login':
        return entry.username || 'Unknown User';
      case 'Keys':
        return entry.software || 'Software Key';
      default:
        return 'View Details';
    }
  };

  const isSensitive = entry.type !== 'Secure Note';

   return (
    <div
      className="bg-gray-800 p-5 rounded-xl shadow-lg border border-purple-800 transition duration-300 transform hover:scale-[1.02] cursor-pointer"
      onClick={() => onSelect(entry)} // Added click handler to open details
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Icon size={20} className="text-purple-400 mr-2" />
          <h3 className="text-xl font-semibold text-purple-300 truncate">{entry.name}</h3>
        </div>
        <span className="text-xs px-2 py-0.5 bg-purple-900 text-purple-300 rounded-full ml-4 font-medium">
          {entry.type}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between p-2 bg-gray-700 rounded-lg min-h-[48px]">
          <span className={`text-gray-300 font-mono text-sm break-all ${isSensitive && !showSensitive && entry.type !== 'Secure Note' ? 'blur-sm' : ''}`}>
            {getCardDisplayValue()}
          </span>
          
          {isSensitive && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowSensitive(!showSensitive); }}
              className="p-1 text-gray-400 hover:text-white transition duration-150 ml-2"
              title={showSensitive ? 'Hide Content' : 'Show Content'}
            >
              {showSensitive ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};