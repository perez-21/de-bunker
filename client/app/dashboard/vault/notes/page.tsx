"use client"

import { motion, AnimatePresence } from 'framer-motion'
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
  Tag,
  Eye,
  EyeOff,
  Download,
  Share2,
  Archive,
  Filter,
  SortAsc,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface NoteItem {
  id: string
  title: string
  content: string
  category: string
  lastEdited: string
  createdAt: string
  encrypted: boolean
  tags: string[]
  favorite: boolean
  wordCount: number
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null)
  const [isDetailView, setIsDetailView] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'updated'>('updated')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showEncryptedContent, setShowEncryptedContent] = useState<{[key: string]: boolean}>({})

  const notes: NoteItem[] = [
    {
      id: '1',
      title: 'Project Ideas & Roadmap',
      content: 'Blockchain-based secure messaging app with E2E encryption and decentralized storage. Features to include: encrypted group chats, file sharing, and cross-platform sync. Consider using IPFS for decentralized storage and Signal Protocol for encryption.',
      category: 'Development',
      lastEdited: '2 hours ago',
      createdAt: '2024-01-10',
      encrypted: true,
      tags: ['ideas', 'blockchain', 'roadmap'],
      favorite: true,
      wordCount: 45
    },
    {
      id: '2',
      title: 'Wallet Recovery Phrases',
      content: 'Important: Never store recovery phrases in plain text. Use this encrypted note as temporary storage only.\n\nMetaMask: apple banana cherry...\nLedger: dog elephant fox...\nTrezor: grape honey iguana...',
      category: 'Security',
      lastEdited: '1 day ago',
      createdAt: '2024-01-09',
      encrypted: true,
      tags: ['recovery', 'wallet', 'backup'],
      favorite: true,
      wordCount: 28
    },
    {
      id: '3',
      title: 'Q1 Team Meeting Notes',
      content: 'Discussed new features for the secure vault application:\n- Multi-chain wallet support\n- Enhanced encryption protocols\n- Mobile app development timeline\n- Security audit schedule\n\nAction items: Complete prototype by Feb 15th.',
      category: 'Work',
      lastEdited: '3 days ago',
      createdAt: '2024-01-07',
      encrypted: false,
      tags: ['meeting', 'work', 'q1'],
      favorite: false,
      wordCount: 52
    },
    {
      id: '4',
      title: 'Personal Goals 2024',
      content: 'Professional:\n- Launch De-Bunker v2.0\n- Learn advanced cryptography\n- Attend 2 blockchain conferences\n\nPersonal:\n- Read 24 books\n- Exercise 4x weekly\n- Travel to 3 new countries',
      category: 'Personal',
      lastEdited: '1 week ago',
      createdAt: '2024-01-01',
      encrypted: false,
      tags: ['goals', '2024', 'personal'],
      favorite: true,
      wordCount: 38
    },
    {
      id: '5',
      title: 'Investment Research',
      content: 'Research notes on upcoming blockchain projects:\n\nProject A: Layer 2 scaling solution\n- Strong team with Google alumni\n- Testnet launching Q2 2024\n- Tokenomics: 1B total supply\n\nProject B: DeFi protocol\n- Unique yield farming mechanism\n- Audit completed by CertiK\n- TVL growing steadily',
      category: 'Finance',
      lastEdited: '2 weeks ago',
      createdAt: '2023-12-28',
      encrypted: true,
      tags: ['research', 'crypto', 'investment'],
      favorite: false,
      wordCount: 67
    },
    {
      id: '6',
      title: 'Smart Contract Addresses',
      content: 'Important contract addresses for development:\n\nUNI V3 Router: 0xE592427A0AEce92De3Edee1F18E0157C05861564\nWETH: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2\nUSDC: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\n\nTestnet:\nGoerli USDC: 0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      category: 'Development',
      lastEdited: '3 weeks ago',
      createdAt: '2023-12-20',
      encrypted: false,
      tags: ['contracts', 'addresses', 'development'],
      favorite: true,
      wordCount: 41
    }
  ]

  const categories = ['all', 'Development', 'Security', 'Work', 'Personal', 'Finance', 'Ideas']
  const tags = ['all', 'ideas', 'blockchain', 'recovery', 'work', 'personal', 'crypto', 'development']

  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(note => 
      selectedCategory === 'all' || note.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'updated':
        default:
          return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
      }
    })

  const toggleEncryptedContent = (noteId: string) => {
    setShowEncryptedContent(prev => ({
      ...prev,
      [noteId]: !prev[noteId]
    }))
  }

  const getDisplayContent = (note: NoteItem) => {
    if (note.encrypted && !showEncryptedContent[note.id]) {
      return '🔒 This content is encrypted. Click the eye icon to view.'
    }
    return note.content
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show toast notification
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const exportNote = (note: NoteItem) => {
    const content = `Title: ${note.title}\nCategory: ${note.category}\nCreated: ${note.createdAt}\nLast Edited: ${note.lastEdited}\nTags: ${note.tags.join(', ')}\n\n${note.content}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${note.title.replace(/\s+/g, '_')}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const NoteCard = ({ note, index }: { note: NoteItem, index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            note.favorite ? 'bg-yellow-500/20' : 'bg-gray-700/50'
          }`}>
            <StickyNote className={`w-5 h-5 ${note.favorite ? 'text-yellow-400' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              {note.title}
              {note.favorite && <span className="text-yellow-400">★</span>}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 text-sm">{note.category}</span>
              {note.encrypted && <Lock className="w-3 h-3 text-green-400" />}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm line-clamp-3 whitespace-pre-line">
          {getDisplayContent(note)}
        </p>
        {note.encrypted && (
          <button
            onClick={() => toggleEncryptedContent(note.id)}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs mt-2 transition-colors"
          >
            {showEncryptedContent[note.id] ? (
              <><EyeOff className="w-3 h-3" /> Hide</>
            ) : (
              <><Eye className="w-3 h-3" /> View Encrypted Content</>
            )}
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {note.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full capitalize"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {note.lastEdited}
          </div>
          <div>{note.wordCount} words</div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => exportNote(note)}
            className="p-2 text-gray-400 hover:text-green-400 transition-colors"
            title="Export"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => copyToClipboard(note.content)}
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            title="Copy Content"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )

  const NoteListItem = ({ note, index }: { note: NoteItem, index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        note.favorite ? 'bg-yellow-500/20' : 'bg-gray-700/50'
      }`}>
        <StickyNote className={`w-4 h-4 ${note.favorite ? 'text-yellow-400' : 'text-gray-400'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              {note.title}
              {note.favorite && <span className="text-yellow-400 text-sm">★</span>}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 text-sm">{note.category}</span>
              {note.encrypted && <Lock className="w-3 h-3 text-green-400" />}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 whitespace-pre-line mb-2">
          {getDisplayContent(note)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {note.lastEdited}
            </div>
            <div>{note.wordCount} words</div>
            <div className="flex flex-wrap gap-1">
              {note.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-gray-700/50 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {note.tags.length > 2 && (
                <span className="text-gray-500 text-xs">+{note.tags.length - 2}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {note.encrypted && (
              <button
                onClick={() => toggleEncryptedContent(note.id)}
                className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {showEncryptedContent[note.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            )}
            <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
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
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-4 h-4 flex flex-col gap-0.5">
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
                <div className="bg-current h-1 rounded-sm"></div>
              </div>
            </button>
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Notes', value: notes.length.toString(), color: 'text-blue-400', icon: StickyNote },
          { label: 'Encrypted', value: notes.filter(n => n.encrypted).length.toString(), color: 'text-green-400', icon: Lock },
          { label: 'Favorites', value: notes.filter(n => n.favorite).length.toString(), color: 'text-yellow-400', icon: CheckCircle },
          { label: 'Categories', value: categories.length.toString(), color: 'text-purple-400', icon: Tag }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-700/50`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Category:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg transition-colors capitalize text-sm ${
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

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-cyan-400 text-sm"
            >
              <option value="updated">Last Updated</option>
              <option value="date">Creation Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note, index) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note, index) => (
                <NoteListItem key={note.id} note={note} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

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

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
      >
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="text-green-400 font-semibold mb-2">End-to-End Encryption</h4>
            <p className="text-green-300 text-sm">
              All your notes are encrypted with military-grade AES-256 encryption. Only you can access your notes with your master password. 
              Even we cannot read your encrypted content.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}