'use client'
import {
  Search, Plus, LogOut, LayoutGrid
} from 'lucide-react';
import { useState } from 'react';
import { CredentialDetailModal } from '@/app/components';
import { VaultEntryCard } from '@/app/components';


export default function VaultScreen({ entries, onLogout, onUpdateEntry }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  // Function to handle saving details (passed to modal)
  const handleSaveDetails = (updatedEntry) => {
    onUpdateEntry(updatedEntry);
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-8">
      {/* Vault Header & Controls */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-extrabold text-gray-100 flex items-center">
          <LayoutGrid className="mr-3 text-purple-400" size={32} />
          Secure Vault
        </h1>

        <div className="flex space-x-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search names or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Add Entry Button (Opens Modal for New Login Entry by Default) */}
          <button
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl transition duration-200 shadow-md flex items-center whitespace-nowrap"
            onClick={() => handleOpenModal(getNewCredentialTemplate('Login'))}
          >
            <Plus size={20} className="mr-2" />
            Add New
          </button>
        </div>
      </header>

      {/* Vault Grid */}
      <main className="flex-grow overflow-y-auto">
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEntries.map(entry => (
              <VaultEntryCard key={entry.id} entry={entry} onSelect={handleOpenModal} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-gray-800 rounded-xl mt-10">
            <p className="text-gray-400 text-lg">
              No entries found for "{searchTerm}".
            </p>
          </div>
        )}
      </main>

      {/* Footer/Logout (Optional but helpful for testing state) */}
      <footer className="mt-8 pt-4 border-t border-gray-700 flex justify-end">
        <button
          onClick={onLogout}
          className="text-red-400 hover:text-red-500 transition duration-200 flex items-center text-sm"
        >
          <LogOut size={16} className="mr-1" />
          Lock Vault
        </button>
      </footer>

      {/* Detail Modal */}
      {isModalOpen && selectedEntry && (
        <CredentialDetailModal
          entry={selectedEntry}
          onClose={handleCloseModal}
          onSave={handleSaveDetails}
        />
      )}
    </div>
  );
};