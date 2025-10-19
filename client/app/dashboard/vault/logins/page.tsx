"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Eye, 
  EyeOff,
  Edit, 
  Trash2, 
  Copy, 
  Key, 
  Globe, 
  Shield,
  MoreVertical,
  Lock,
  Calendar,
  Link as LinkIcon,
  FileText,
  Check,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import AddLoginModal from "../../../components/modal/AddLoginModal"
import AuthorizationModal from '../../../components/modal/authorize'

interface LoginItem {
  id: string
  website: string
  username: string
  password: string
  url: string
  category: string
  lastUsed: string
  strength: 'strong' | 'medium' | 'weak'
  notes?: string
  createdAt: string
  updatedAt: string
  twoFactorEnabled: boolean
  securityQuestions?: string[]
}

interface LoginDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  login: LoginItem | null
  onAuthorize: (privateKey: string) => Promise<boolean>
}

// Login Details Modal Component
function LoginDetailsModal({ isOpen, onClose, login, onAuthorize }: LoginDetailsModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)



  if (!login) return null

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleViewPassword = () => {
    setShowAuthModal(true)
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    const success = await onAuthorize(privateKey)
    if (success) {
      setShowPassword(true)
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
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{login.website}</h2>
                    <p className="text-gray-400 text-sm">{login.category}</p>
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
                    <Shield className={`w-5 h-5 ${
                      login.strength === 'strong' ? 'text-green-400' :
                      login.strength === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                    <div>
                      <p className="text-white text-sm font-medium">Password Strength</p>
                      <p className="text-gray-400 text-sm capitalize">{login.strength}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <Lock className={`w-5 h-5 ${login.twoFactorEnabled ? 'text-green-400' : 'text-gray-400'}`} />
                    <div>
                      <p className="text-white text-sm font-medium">2FA</p>
                      <p className="text-gray-400 text-sm">
                        {login.twoFactorEnabled ? 'Enabled' : 'Not Enabled'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Login Details */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Login Details</h3>
                  
                  {/* Website URL */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Website URL</label>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <a 
                        href={login.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2"
                      >
                        <LinkIcon className="w-4 h-4" />

                        {login.url}
                      </a>
                      <button
                        onClick={() => copyToClipboard(login.url, 'url')}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        {copiedField === 'url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Username/Email</label>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <span className="text-white font-mono text-sm">{login.username}</span>
                      <button
                        onClick={() => copyToClipboard(login.username, 'username')}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        {copiedField === 'username' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Password</label>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <span className="text-white font-mono text-sm">
                        {showPassword ? 'actualPassword123' : '••••••••'}
                      </span>
                      <div className="flex items-center gap-1">
                        {!showPassword ? (
                          <button
                            onClick={handleViewPassword}
                            className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowPassword(false)}
                            className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        )}
                        {showPassword && (
                          <button
                            onClick={() => copyToClipboard('actualPassword123', 'password')}
                            className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            {copiedField === 'password' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>
                    {!showPassword && (
                      <p className="text-amber-400 text-xs mt-2 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Authorization required to view password
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Additional Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Created</span>
                      <p className="text-white">{new Date(login.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Updated</span>
                      <p className="text-white">{new Date(login.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Used</span>
                      <p className="text-white">{login.lastUsed}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Category</span>
                      <p className="text-white capitalize">{login.category}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {login.notes && (
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Notes</label>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <p className="text-white text-sm">{login.notes}</p>
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
                  Edit Login
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
        actionDescription={`View password for ${login.website}`}
        requiredPermissions={["View encrypted password"]}
      />
    </>
  )
}

export default function LoginsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLogin, setSelectedLogin] = useState<LoginItem | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
const [showAddModal, setShowAddModal] = useState(false) // ✅ add this

 const [logins, setLogins] = useState<LoginItem[]>([
  
    {
      id: '1',
      website: 'Google',
      username: 'john.doe@gmail.com',
      password: 'actualPassword123',
      url: 'https://google.com',
      category: 'Social',
      lastUsed: '2 hours ago',
      strength: 'strong',
      notes: 'Personal account with 2FA enabled',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      twoFactorEnabled: true
    },
    {
      id: '2',
      website: 'GitHub',
      username: 'johndoe',
      password: 'githubSecure456',
      url: 'https://github.com',
      category: 'Development',
      lastUsed: '1 day ago',
      strength: 'strong',
      notes: 'Work account with SSH keys',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-14T14:20:00Z',
      twoFactorEnabled: true
    },
    {
      id: '3',
      website: 'Netflix',
      username: 'family@stream.com',
      password: 'netflix789',
      url: 'https://netflix.com',
      category: 'Entertainment',
      lastUsed: '3 days ago',
      strength: 'medium',
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z',
      twoFactorEnabled: false
    },
    {
      id: '4',
      website: 'Bank of America',
      username: 'john.doe',
      password: 'bankSecure!123',
      url: 'https://bankofamerica.com',
      category: 'Finance',
      lastUsed: '1 week ago',
      strength: 'strong',
      notes: 'Primary banking account',
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      twoFactorEnabled: true
    }
  ])

  const categories = ['all', 'Social', 'Finance', 'Development', 'Entertainment', 'Work']

  const filteredLogins = logins.filter(login => 
    login.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    login.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    login.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(login => 
    selectedCategory === 'all' || login.category === selectedCategory
  )

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'weak': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case 'strong': return <Shield className="w-4 h-4 text-green-400" />
      case 'medium': return <Shield className="w-4 h-4 text-yellow-400" />
      case 'weak': return <Shield className="w-4 h-4 text-red-400" />
      default: return <Shield className="w-4 h-4 text-gray-400" />
    }
  }

  const togglePasswordVisibility = (loginId: string) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(loginId)) {
        newSet.delete(loginId)
      } else {
        newSet.add(loginId)
      }
      return newSet
    })
  }

  const copyToClipboard = async (text: string, field: string, loginId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(`${loginId}-${field}`))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(`${loginId}-${field}`)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleViewDetails = (login: LoginItem) => {
    setSelectedLogin(login)
    setShowDetailsModal(true)
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    // Simulate authorization - replace with actual logic
    console.log('Authorizing with:', privateKey)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  }

  const isPasswordVisible = (loginId: string) => visiblePasswords.has(loginId)
  const isCopied = (loginId: string, field: string) => copiedItems.has(`${loginId}-${field}`)

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
              <Key className="w-5 h-5" />
              <span>Vault</span>
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-2xl font-bold text-white">Logins</h1>
          </div>
          <p className="text-gray-400">Manage your saved website credentials</p>
        </div>
       <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
 onClick={() => setShowAddModal(true)}
  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
>
  <Plus className="w-4 h-4" />
  Add Login
</motion.button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Logins', value: logins.length.toString(), color: 'text-blue-400' },
          { label: 'Strong Passwords', value: logins.filter(l => l.strength === 'strong').length.toString(), color: 'text-green-400' },
          { label: 'Weak Passwords', value: logins.filter(l => l.strength === 'weak').length.toString(), color: 'text-red-400' },
          { label: '2FA Enabled', value: logins.filter(l => l.twoFactorEnabled).length.toString(), color: 'text-cyan-400' }
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
              placeholder="Search logins..."
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

      {/* Logins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLogins.map((login, index) => (
          <motion.div
            key={login.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{login.website}</h3>
                  <p className="text-gray-400 text-sm">{login.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getStrengthIcon(login.strength)}
                <button 
                  onClick={() => handleViewDetails(login)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Login Details */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-gray-400 text-sm">Username</label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white font-mono text-sm">{login.username}</span>
                  <button
                    onClick={() => copyToClipboard(login.username, 'username', login.id)}
                    className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {isCopied(login.id, 'username') ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Password</label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white font-mono text-sm">
                    {isPasswordVisible(login.id) ? login.password : '••••••••'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePasswordVisibility(login.id)}
                      className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {isPasswordVisible(login.id) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    {isPasswordVisible(login.id) && (
                      <button
                        onClick={() => copyToClipboard(login.password, 'password', login.id)}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        {isCopied(login.id, 'password') ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="text-gray-400 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Used {login.lastUsed}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleViewDetails(login)}
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
      {filteredLogins.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No logins found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first login to get started'}
          </p>
        </motion.div>
      )}

      {/* Login Details Modal */}
      <LoginDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        login={selectedLogin}
        onAuthorize={handleAuthorize}
      />


      <AddLoginModal
  isOpen={showAddModal}
  onClose={() => setShowAddModal(false)}
  onSave={(newLogin) => {
    const newItem = {
      ...newLogin,
      id: String(Date.now()), // generate unique id
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: 'Just added',
    }
    setLogins(prev => [...prev, newItem])
    setShowAddModal(false)
  }}
/>


    </div>
  )
}