'use client'
import { useState } from "react";

export default function CredentialDetailModal({ entry, onClose, onSave }) {
  // Use the ID in the state to ensure we render based on the current entry template
  const [formData, setFormData] = useState(entry);
  const [showPassword, setShowPassword] = useState(false);
  
  const currentSchema = credentialSchemas[formData.type];
  const Icon = getTypeIcon(formData.type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle type change: reset form data to the new type's template
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const newTemplate = getNewCredentialTemplate(newType);
    
    // Preserve Name if it wasn't the default 'New [Type]'
    if (!formData.name.startsWith('New')) {
      newTemplate.name = formData.name;
    }

    setFormData(newTemplate);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  
  const renderDynamicFields = () => {
    if (!currentSchema) return <p className="text-red-400">Invalid credential type selected.</p>;

    return currentSchema.fields.map(field => {
      const isPassword = field.type === 'password';
      const isTextArea = field.type === 'textarea';
      
      const InputIcon = field.icon || Tag;

      return (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
            {field.icon ? <InputIcon size={16} className="mr-2" /> : null}
            {field.label} {field.optional && <span className="text-gray-500 ml-1">(Optional)</span>}
          </label>
          <div className="relative">
            {isTextArea ? (
              <textarea
                name={field.key}
                value={formData[field.key] || ''}
                onChange={handleChange}
                required={!field.optional}
                rows={4}
                className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              />
            ) : (
              <input
                type={isPassword && !showPassword ? 'password' : 'text'}
                name={field.key}
                value={formData[field.key] || ''}
                onChange={handleChange}
                required={!field.optional}
                className={`w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500`}
              />
            )}
            
            {/* Show/Hide button for passwords/masked fields */}
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

            {/* Copy button */}
            {formData[field.key] && (
               <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(formData[field.key]); }}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 hidden md:block" // Hidden on small screens to avoid crowding
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
          
          {/* Credential Type Select (Drives the form structure) */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
              <List size={16} className="mr-2" />Credential Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange} // Use the specific handler for type change
              className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-purple-500 focus:border-purple-500"
            >
              {credentialTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Name Field (Always present) */}
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

          {/* Dynamic Fields */}
          {renderDynamicFields()}

          {/* Action Buttons */}
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
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out forwards;
        }
        /* Style for blurring sensitive content */
        .blur-sm {
            filter: blur(4px);
            user-select: none;
        }
      `}</style>
    </div>
  );
};