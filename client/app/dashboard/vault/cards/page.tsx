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
  Check,
  ExternalLink,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import AuthorizationModal from '../../../components/modal/authorize'


interface NoteItem {
  id: string
  title: string
  content: string
  category: string
  lastEdited: string
  encrypted: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  encryptionLevel: 'standard' | 'military'
  sharedWith?: string[]
}

interface NoteDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  note: NoteItem | null
  onAuthorize: (privateKey: string) => Promise<boolean>
}

// Note Details Modal Component
function NoteDetailsModal({ isOpen, onClose, note, onAuthorize }: NoteDetailsModalProps) {
  const [showContent, setShowContent] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (!note) return null

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleViewContent = () => {
    if (note.encrypted) {
      setShowAuthModal(true)
    } else {
      setShowContent(true)
    }
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    const success = await onAuthorize(privateKey)
    if (success) {
      setShowContent(true)
      setShowAuthModal(false)
    }
    return success
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50 sticky top-0 bg-gray-900/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <StickyNote className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{note.title}</h2>
                    <p className="text-gray-400 text-sm">{note.category}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Security Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <Lock className={`w-5 h-5 ${note.encrypted ? 'text-green-400' : 'text-gray-400'}`} />
                    <div>
                      <p className="text-white text-sm font-medium">Encryption</p>
                      <p className="text-gray-400 text-sm">
                        {note.encrypted ? `${note.encryptionLevel === 'military' ? 'Military Grade' : 'Standard'} AES-256` : 'Not Encrypted'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Security Level</p>
                      <p className="text-gray-400 text-sm capitalize">
                        {note.encryptionLevel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Note Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Note Content</h3>
                    {!showContent && note.encrypted && (
                      <button
                        onClick={handleViewContent}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Decrypt Content
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 min-h-[200px]">
                    {showContent ? (
                      <div>
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                          {note.content}
                        </p>
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => copyToClipboard(note.content, 'content')}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                          >
                            {copiedField === 'content' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedField === 'content' ? 'Copied!' : 'Copy Content'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        {note.encrypted ? (
                          <div className="space-y-3">
                            <Lock className="w-8 h-8 text-gray-500 mx-auto" />
                            <p className="text-gray-400">Content is encrypted</p>
                            <p className="text-amber-400 text-sm">
                              Authorization required to decrypt and view content
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-400">Click to view content</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Note Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Created</span>
                      <p className="text-white">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Updated</span>
                      <p className="text-white">{new Date(note.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Category</span>
                      <p className="text-white capitalize">{note.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Edited</span>
                      <p className="text-white">{note.lastEdited}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full capitalize border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Shared With */}
                  {note.sharedWith && note.sharedWith.length > 0 && (
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Shared With</label>
                      <div className="flex flex-wrap gap-2">
                        {note.sharedWith.map((person, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-700/50">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                  Edit Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authorization Modal */}
      <AuthorizationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthorize={handleAuthorize}
        actionDescription={`Decrypt secure note: "${note.title}"`}
        requiredPermissions={["Decrypt encrypted content"]}
      />
    </>
  )
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [visibleContents, setVisibleContents] = useState<Set<string>>(new Set())
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const notes: NoteItem[] = [
    {
      id: '1',
      title: 'Project Ideas',
      content: `Blockchain-based secure messaging app with E2E encryption and decentralized storage.

Features:
• End-to-end encryption for all messages
• Decentralized storage using IPFS
• Multi-chain wallet integration
• Secure file sharing with expiration

Technical Stack:
- Frontend: Next.js, TypeScript, Tailwind
- Blockchain: Ethereum, Polygon, Solana
- Storage: IPFS, Arweave
- Encryption: AES-256, RSA

Next Steps:
1. Research existing solutions
2. Create technical specification
3. Build MVP prototype`,
      category: 'Personal',
      lastEdited: '2 hours ago',
      encrypted: true,
      tags: ['ideas', 'blockchain', 'web3', 'encryption'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      encryptionLevel: 'military'
    },
    {
      id: '2',
      title: 'Recovery Phrases',
      content: `Important wallet recovery phrases and seed words:

Ethereum Main Wallet:
twelve word seed phrase here for demonstration purposes only never use real seed words in examples

Bitcoin Cold Storage:
another twelve word example seed phrase for demonstration purposes only

Important: Never share these phrases and store them securely offline.`,
      category: 'Security',
      lastEdited: '1 day ago',
      encrypted: true,
      tags: ['recovery', 'wallet', 'crypto', 'backup'],
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-14T14:20:00Z',
      encryptionLevel: 'military'
    },
    {
      id: '3',
      title: 'Meeting Notes - Product Launch',
      content: `Team Meeting - January 13, 2024

Attendees:
• John Smith (Product)
• Sarah Wilson (Engineering)
• Mike Johnson (Design)

Discussion Points:
1. Finalizing Q1 product roadmap
2. Security audit schedule
3. User testing feedback
4. Marketing launch plan

Action Items:
- [ ] Complete security review by Jan 20
- [ ] Finalize UI/UX designs
- [ ] Prepare launch documentation
- [ ] Schedule beta testing

Next Meeting: January 20, 2024 - 10:00 AM`,
      category: 'Work',
      lastEdited: '3 days ago',
      encrypted: false,
      tags: ['meeting', 'work', 'product', 'launch'],
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z',
      encryptionLevel: 'standard',
      sharedWith: ['Sarah Wilson', 'Mike Johnson']
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

  const toggleContentVisibility = (noteId: string) => {
    setVisibleContents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(noteId)) {
        newSet.delete(noteId)
      } else {
        newSet.add(noteId)
      }
      return newSet
    })
  }

  const copyToClipboard = async (text: string, field: string, noteId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(`${noteId}-${field}`))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(`${noteId}-${field}`)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleViewDetails = (note: NoteItem) => {
    setSelectedNote(note)
    setShowDetailsModal(true)
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    // Simulate authorization - replace with actual logic
    console.log('Authorizing note access with:', privateKey)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  }

  const isContentVisible = (noteId: string) => visibleContents.has(noteId)
  const isCopied = (noteId: string, field: string) => copiedItems.has(`${noteId}-${field}`)

  const getEncryptionBadge = (encryptionLevel: string) => {
    if (encryptionLevel === 'military') {
      return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Military</span>
    }
    return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">Standard</span>
  }

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
          { label: 'Total Notes', value: notes.length.toString(), color: 'text-blue-400' },
          { label: 'Encrypted', value: notes.filter(n => n.encrypted).length.toString(), color: 'text-green-400' },
          { label: 'Categories', value: new Set(notes.map(n => n.category)).size.toString(), color: 'text-purple-400' },
          { label: 'Military Grade', value: notes.filter(n => n.encryptionLevel === 'military').length.toString(), color: 'text-cyan-400' }
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
                    {note.encrypted && (
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-green-400" />
                        {getEncryptionBadge(note.encryptionLevel)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleViewDetails(note)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Content Preview */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-400 text-sm">Content</label>
                <button
                  onClick={() => toggleContentVisibility(note.id)}
                  className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {isContentVisible(note.id) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3 min-h-[80px]">
                <p className="text-gray-300 text-sm line-clamp-4">
                  {isContentVisible(note.id) ? note.content : '••••••••••••••••••••••••••••••••'}
                </p>
                {isContentVisible(note.id) && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => copyToClipboard(note.content, 'content', note.id)}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                    >
                      {isCopied(note.id, 'content') ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {isCopied(note.id, 'content') ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
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
                <button 
                  onClick={() => handleViewDetails(note)}
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Eye className="w-4 h-4" />
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

      {/* Note Details Modal */}
      <NoteDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        note={selectedNote}
        onAuthorize={handleAuthorize}
      />
    </div>
  )
}