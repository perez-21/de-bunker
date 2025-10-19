"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { UserPlus, Search, Mail, Phone, MoreVertical, Shield, UserX } from 'lucide-react'

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'frequent'>('all')

  const contacts = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Corp Inc.',
      lastContact: '2024-01-15T10:30:00Z',
      trustLevel: 'high',
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@partner.com',
      phone: '+1 (555) 987-6543',
      company: 'Digital Solutions LLC',
      lastContact: '2024-01-14T14:20:00Z',
      trustLevel: 'high',
      avatar: 'SW'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@client.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Enterprises',
      lastContact: '2024-01-13T09:15:00Z',
      trustLevel: 'medium',
      avatar: 'MJ'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@tech.com',
      phone: '+1 (555) 234-5678',
      company: 'Innovation Labs',
      lastContact: '2024-01-12T16:45:00Z',
      trustLevel: 'high',
      avatar: 'ED'
    }
  ]

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTrustLevelColor = (level: string) => {
    const colors = {
      high: 'text-green-400 bg-green-500/20',
      medium: 'text-amber-400 bg-amber-500/20',
      low: 'text-red-400 bg-red-500/20'
    }
    return colors[level as keyof typeof colors] || colors.medium
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
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
          <h1 className="text-3xl font-bold text-white mb-2">Contacts</h1>
          <p className="text-gray-400">Manage your trusted contacts</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
          <UserPlus className="w-4 h-4" />
          Add Contact
        </button>
      </motion.div>

      {/* Search and Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {[
            { id: 'all', label: 'All Contacts' },
            { id: 'frequent', label: 'Frequently Used' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700/50 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors w-64"
          />
        </div>
      </motion.div>

      {/* Contacts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            {/* Contact Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.avatar}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{contact.name}</h3>
                  <p className="text-gray-400 text-sm">{contact.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrustLevelColor(contact.trustLevel)}`}>
                  {contact.trustLevel === 'high' ? 'Trusted' : 'Verified'}
                </span>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{contact.phone}</span>
              </div>
            </div>

            {/* Last Contact */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>Last contact</span>
              <span>{formatDate(contact.lastContact)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 rounded-lg transition-all duration-300 text-sm">
                <Mail className="w-4 h-4" />
                Send File
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300">
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <UserX className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No contacts found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Add contacts to get started'}
          </p>
        </motion.div>
      )}
    </div>
  )
}