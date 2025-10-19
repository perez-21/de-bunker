"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Upload, Shield, Lock, Users, FileText, X, Clock, Eye } from 'lucide-react'

export default function SendPage() {
  const [files, setFiles] = useState<File[]>([])
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [encryptionLevel, setEncryptionLevel] = useState<'standard' | 'military'>('military')
  const [expiry, setExpiry] = useState('24h')

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const contacts = [
    { id: '1', name: 'John Smith', email: 'john@company.com', avatar: 'JS' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@partner.com', avatar: 'SW' },
    { id: '3', name: 'Mike Johnson', email: 'mike@client.com', avatar: 'MJ' },
    { id: '4', name: 'Emily Davis', email: 'emily@tech.com', avatar: 'ED' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Send Secure Files</h1>
        <p className="text-gray-400">Encrypt and transfer files with military-grade security</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Select Files</h3>
            
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-cyan-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Drag and drop files here or click to browse</p>
              <p className="text-gray-500 text-sm mb-4">Maximum file size: 2GB</p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Browse Files
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-white font-semibold mb-3">Selected Files</h4>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-white text-sm">{file.name}</p>
                        <p className="text-gray-400 text-xs">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recipients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Recipients</h3>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedContacts.map(contactId => {
                  const contact = contacts.find(c => c.id === contactId)
                  return contact ? (
                    <div
                      key={contact.id}
                      className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1"
                    >
                      <span className="text-cyan-400 text-sm">{contact.name}</span>
                      <button
                        onClick={() => setSelectedContacts(prev => prev.filter(id => id !== contact.id))}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      if (selectedContacts.includes(contact.id)) {
                        setSelectedContacts(prev => prev.filter(id => id !== contact.id))
                      } else {
                        setSelectedContacts(prev => [...prev, contact.id])
                      }
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedContacts.includes(contact.id)
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {contact.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{contact.name}</p>
                      <p className="text-gray-400 text-xs">{contact.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              {/* Encryption Level */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Encryption Level
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'military', label: 'Military Grade', icon: Shield, description: 'AES-256-GCM' },
                    { id: 'standard', label: 'Standard', icon: Lock, description: 'AES-128' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setEncryptionLevel(option.id as any)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        encryptionLevel === option.id
                          ? 'bg-green-500/20 border-green-500/50'
                          : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <option.icon className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <p className="text-white text-sm font-medium">{option.label}</p>
                        <p className="text-gray-400 text-xs">{option.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Expiry */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Link Expiry
                </label>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              {/* Password Protection */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Password Protection
                </label>
                <input
                  type="password"
                  placeholder="Optional password"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Send Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={files.length === 0 || selectedContacts.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Shield className="w-5 h-5" />
            Encrypt & Send Files
            <Lock className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}