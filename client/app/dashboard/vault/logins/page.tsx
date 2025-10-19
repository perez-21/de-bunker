"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  Key, 
  Globe, 
  User,
  Shield,
  MoreVertical,
  Lock
} from 'lucide-react'
import Link from 'next/link'

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
}

export default function LoginsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLogin, setSelectedLogin] = useState<LoginItem | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const logins: LoginItem[] = [
    {
      id: '1',
      website: 'Google',
      username: 'john.doe@gmail.com',
      password: '••••••••',
      url: 'https://google.com',
      category: 'Social',
      lastUsed: '2 hours ago',
      strength: 'strong'
    },
    {
      id: '2',
      website: 'GitHub',
      username: 'johndoe',
      password: '••••••••',
      url: 'https://github.com',
      category: 'Development',
      lastUsed: '1 day ago',
      strength: 'strong'
    },
    {
      id: '3',
      website: 'Netflix',
      username: 'family@stream.com',
      password: '••••••••',
      url: 'https://netflix.com',
      category: 'Entertainment',
      lastUsed: '3 days ago',
      strength: 'medium'
    },
    {
      id: '4',
      website: 'Bank of America',
      username: 'john.doe',
      password: '••••••••',
      url: 'https://bankofamerica.com',
      category: 'Finance',
      lastUsed: '1 week ago',
      strength: 'strong'
    }
  ]

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show toast notification
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
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
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Login
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Logins', value: '24', color: 'text-blue-400' },
          { label: 'Strong Passwords', value: '18', color: 'text-green-400' },
          { label: 'Weak Passwords', value: '2', color: 'text-red-400' },
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
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
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
                    onClick={() => copyToClipboard(login.username)}
                    className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Password</label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white font-mono text-sm">
                    {showPassword ? 'password123' : login.password}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => copyToClipboard('password123')}
                      className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="text-gray-400 text-xs">
                Used {login.lastUsed}
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
    </div>
  )
}