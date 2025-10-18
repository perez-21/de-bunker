"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Folder, FileText, Shield, Download, Eye, MoreVertical, Search, Plus, Lock } from 'lucide-react'

export default function VaultPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const folders = [
    {
      id: '1',
      name: 'Financial Documents',
      fileCount: 12,
      size: '45.2 MB',
      lastModified: '2024-01-15T10:30:00Z',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      name: 'Contracts',
      fileCount: 8,
      size: '23.7 MB',
      lastModified: '2024-01-14T14:20:00Z',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      name: 'Personal',
      fileCount: 5,
      size: '15.8 MB',
      lastModified: '2024-01-13T09:15:00Z',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '4',
      name: 'Work Projects',
      fileCount: 21,
      size: '156.3 MB',
      lastModified: '2024-01-12T16:45:00Z',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const files = [
    {
      id: '1',
      name: 'Tax_Return_2023.pdf',
      size: '2.4 MB',
      type: 'pdf',
      lastModified: '2024-01-15T10:30:00Z',
      folder: 'Financial Documents',
      protected: true
    },
    {
      id: '2',
      name: 'Employment_Contract.docx',
      size: '1.8 MB',
      type: 'docx',
      lastModified: '2024-01-14T14:20:00Z',
      folder: 'Contracts',
      protected: true
    },
    {
      id: '3',
      name: 'Project_Proposal.pptx',
      size: '15.2 MB',
      type: 'pptx',
      lastModified: '2024-01-13T09:15:00Z',
      folder: 'Work Projects',
      protected: false
    },
    {
      id: '4',
      name: 'Passport_Scan.jpg',
      size: '3.7 MB',
      type: 'jpg',
      lastModified: '2024-01-12T16:45:00Z',
      folder: 'Personal',
      protected: true
    }
  ]

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!currentFolder || file.folder === currentFolder)
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getFileIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      pdf: '📄',
      docx: '📝',
      pptx: '📊',
      jpg: '🖼️',
      png: '🖼️'
    }
    return icons[type] || '📁'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Secure Vault</h1>
          <p className="text-gray-400">Your encrypted file storage</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          Upload Files
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentFolder(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !currentFolder
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700/50 text-gray-400 hover:text-white'
            }`}
          >
            All Files
          </button>
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.name)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentFolder === folder.name
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700/50 text-gray-400 hover:text-white'
              }`}
            >
              {folder.name}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors w-64"
          />
        </div>
      </motion.div>

      {/* Folders Grid */}
      {!currentFolder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Folders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setCurrentFolder(folder.name)}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${folder.color} flex items-center justify-center mb-4`}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">{folder.name}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">{folder.fileCount} files</p>
                  <p className="text-gray-400">{folder.size}</p>
                  <p className="text-gray-500 text-xs">
                    Modified {formatDate(folder.lastModified)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Files List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">
            {currentFolder ? currentFolder : 'All Files'}
          </h3>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">{getFileIcon(file.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium">{file.name}</h4>
                    {file.protected && <Lock className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{file.size}</span>
                    <span>{file.folder}</span>
                    <span>Modified {formatDate(file.lastModified)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No files found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Upload files to get started'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}