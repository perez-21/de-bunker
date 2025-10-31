'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Copy, List, Tag } from 'lucide-react';
import type { VaultEntry } from './VaultScreen'; // import the interface we made earlier

// 🧩 Types for the schema used to render fields
interface CredentialField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'textarea';
  optional?: boolean;
  icon?: React.ElementType;
  mask?: boolean;
}

interface CredentialSchema {
  fields: CredentialField[];
}

//  Props for the Modal
interface CredentialDetailModalProps {
  entry: VaultEntry;
  onClose: () => void;
  onSave: (entry: VaultEntry) => void;
}

//  Placeholder variables/functions that should exist in utils or constants
// TODO: Import these from ../lib/utils if available
const credentialSchemas: Record<string, CredentialSchema> = {
  Login: {
    fields: [
      { key: 'username', label: 'Username', type: 'text' },
      { key: 'password', label: 'Password', type: 'password' },
    ],
  },
  Note: {
    fields: [
      { key: 'content', label: 'Note Content', type: 'textarea', optional: true },
    ],
  },
};

const credentialTypes = Object.keys(credentialSchemas);

const getTypeIcon = (type: string): React.ElementType => {
  switch (type) {
    case 'Login':
      return Tag;
    case 'Note':
      return List;
    default:
      return Tag;
  }
};

const getNewCredentialTemplate = (type: string): VaultEntry => ({
  id: Date.now().toString(),
  name: `New ${type}`,
  type,
});

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    console.error('Failed to copy text');
  }
};

const CredentialDetailModal: React.FC<CredentialDetailModalProps> = ({
  entry,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<VaultEntry>(entry);
  const [showPassword, setShowPassword] = useState(false);

  const currentSchema = credentialSchemas[formData.type];
  const Icon = getTypeIcon(formData.type);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    const newTemplate = getNewCredentialTemplate(newType);

    if (!formData.name.startsWith('New')) {
      newTemplate.name = formData.name;
    }

    setFormData(newTemplate);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderDynamicFields = () => {
    if (!currentSchema)
      return <p className="text-red-400">Invalid credential type selected.</p>;

    return currentSchema.fields.map((field) => {
      const isPassword = field.type === 'password';
      const isTextArea = field.type === 'textarea';
      const InputIcon = field.icon || Tag;

      return (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
            {field.icon ? <InputIcon size={16} className="mr-2" /> : null}
            {field.label}{' '}
            {field.optional && (
              <span className="text-gray-500 ml-1">(Optional)</span>
            )}
          </label>

          <div className="relative">
            {isTextArea ? (
              <textarea
                name={field.key}
                value={(formData as any)[field.key] || ''}
                onChange={handleChange}
                required={!field.optional}
                rows={4}
                className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              />
            ) : (
              <input
                type={isPassword && !showPassword ? 'password' : 'text'}
                name={field.key}
                value={(formData as any)[field.key] || ''}
                onChange={handleChange}
                required={!field.optional}
                className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              />
            )}

            {(isPassword || field.mask) && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                title={showPassword ? 'Hide' : 'Show'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}

            {formData[field.key as keyof VaultEntry] && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard((formData as any)[field.key]);
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 hidden md:block"
                title="Copy"
              >
                <Copy size={16} />
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl border border-purple-700 max-h-[90vh] overflow-y-auto animate-slide-in-up">
        <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-gray-700 pb-2 flex items-center">
          <Icon size={24} className="mr-2" />
          Edit Credential: {entry.name}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
              <List size={16} className="mr-2" />Credential Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
            >
              {credentialTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {renderDynamicFields()}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CredentialDetailModal;
