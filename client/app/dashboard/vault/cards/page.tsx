"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  StickyNote, 
  Lock,
  MoreVertical,
  Calendar,
  Tag
} from 'lucide-react'
import Link from 'next/link'

interface NoteItem {
  id: string
  title: string
  content: string
  category: string
  lastEdited: string
  encrypted: boolean
  tags: string[]
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null)

  const notes: NoteItem[] = [
    {
      id: '1',
      title: 'Project Ideas',
      content: 'Blockchain-based secure messaging app with E2E encryption and decentralized storage...',
      category: 'Personal',
      lastEdited: '2 hours ago',
      encrypted: true,
      tags: ['ideas', 'blockchain']
    },
    {
      id: '2',
      title: 'Recovery Phrases',
      content: 'Wallet recovery phrases and important seed words for various blockchain accounts...',
      category: 'Security',
      lastEdited: '1 day ago',
      encrypted: true,
      tags: ['recovery', 'wallet']
    },
    {
      id: '3',
      title: 'Meeting Notes',
      content: 'Discussed new features for the secure vault application and timeline for implementation...',
      category: 'Work',
      lastEdited: '3 days ago',
      encrypted: false,
      tags: ['meeting', 'work']
    }
  ]

  const categories = ['all', 'Personal', 'Work', 'Security', 'Finance', 'Ideas']

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(note => 
    selectedCategory === 'all' || note.category === selectedCategory
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dashboard/vault"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <StickyNote className="w-5 h-5" />
              <span>Vault</span>
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-2xl font-bold text-white">Secure Notes</h1>
          </div>
          <p className="text-gray-400">Encrypted notes and important information</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          New Note
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Notes', value: '12', color: 'text-blue-400' },
          { label: 'Encrypted', value: '8', color: 'text-green-400' },
          { label: 'Categories', value: '5', color: 'text-purple-400' },
          { label: 'Last Updated', value: 'Today', color: 'text-cyan-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center"
          >
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <StickyNote className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{note.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-sm">{note.category}</span>
                    {note.encrypted && <Lock className="w-3 h-3 text-green-400" />}
                  </div>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Content Preview */}
            <div className="mb-4">
              <p className="text-gray-300 text-sm line-clamp-3">
                {note.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {note.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Calendar className="w-3 h-3" />
                Edited {note.lastEdited}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <StickyNote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No notes found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first secure note to get started'}
          </p>
        </motion.div>
      )}
    </div>
  )
}