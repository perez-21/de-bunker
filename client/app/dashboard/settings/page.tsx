"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Wallet, 
  Shield, 
  Bell, 
  Network, 
  Key, 
  Cpu, 
  Zap, 
  Eye,
  Download,
  Trash2,
  LogOut,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Scan,
  Edit,
  Users,
  Globe,
  HardDrive,
  UserPlus,
  QrCode,
  Clock,
  CheckCircle,
  X,
  Share2,
  EyeOff,
  Mail,
  Phone,
  UserCheck,
  CreditCard,
  StickyNote,
  FileKey,
  Hash
} from 'lucide-react'
import React from 'react' // Added missing React import

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('wallet')
  const [connectedWallets, setConnectedWallets] = useState([
    { id: '1', name: 'MetaMask', address: '0x742d35Cc6634C0532925a3b8D...', network: 'Ethereum Mainnet', connected: true },
    { id: '2', name: 'WalletConnect', address: '0x8932d4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7', network: 'Polygon', connected: true }
  ])

  const [sharedAccess, setSharedAccess] = useState([
    {
      id: '1',
      person: {
        name: 'Sarah Wilson',
        email: 'sarah@company.com',
        avatar: 'SW',
        role: 'Co-Founder'
      },
      accessType: 'wallet',
      permissions: ['view', 'transact'],
      expiration: '2024-12-31',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      person: {
        name: 'Mike Johnson',
        email: 'mike@dev.com',
        avatar: 'MJ',
        role: 'Developer'
      },
      accessType: 'login',
      permissions: ['view'],
      expiration: '2024-06-30',
      status: 'active',
      lastActive: '1 day ago'
    }
  ])

  const [accessKeys, setAccessKeys] = useState([
    {
      id: '1',
      type: 'wallet',
      name: 'Main Wallet Access',
      key: 'wk_7x8y9z0a1b2c3d4e5f6g7h8i9j0k',
      created: '2024-01-15',
      expires: '2024-12-31',
      uses: 12,
      status: 'active'
    },
    {
      id: '2',
      type: 'login',
      name: 'Team Login Access',
      key: 'lk_a1b2c3d4e5f6g7h8i9j0k7x8y9z0',
      created: '2024-01-10',
      expires: '2024-06-30',
      uses: 45,
      status: 'active'
    }
  ])

  const [showAddPerson, setShowAddPerson] = useState(false)
  const [generatingKey, setGeneratingKey] = useState(false)
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    role: '',
    accessType: 'wallet',
    permissions: ['view'],
    duration: '30' // days
  })

  const tabs = [
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'access', label: 'Shared Access', icon: Users },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'advanced', label: 'Advanced', icon: Cpu }
  ]

  const accessTypes = [
    { id: 'wallet', label: 'Wallet Address', icon: Wallet, color: 'text-blue-400' },
    { id: 'login', label: 'Login Credentials', icon: Key, color: 'text-green-400' },
    { id: 'creditcard', label: 'Payment Cards', icon: CreditCard, color: 'text-purple-400' },
    { id: 'securenote', label: 'Secure Notes', icon: StickyNote, color: 'text-yellow-400' }
  ]

  const permissions = [
    { id: 'view', label: 'View Only' },
    { id: 'transact', label: 'Send Transactions' },
    { id: 'manage', label: 'Manage Assets' },
    { id: 'admin', label: 'Full Access' }
  ]

  const generateAccessKey = async () => {
    setGeneratingKey(true)
    // Simulate API call to generate secure key
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratingKey(false)
    
    const newKey = {
      id: Date.now().toString(),
      type: newPerson.accessType,
      name: `${newPerson.name} - ${newPerson.accessType} Access`,
      key: `key_${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split('T')[0],
      expires: new Date(Date.now() + parseInt(newPerson.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      uses: 0,
      status: 'active'
    }
    
    setAccessKeys(prev => [newKey, ...prev])
    
    // Add to shared access
    const newAccess = {
      id: Date.now().toString(),
      person: {
        name: newPerson.name,
        email: newPerson.email,
        avatar: newPerson.name.split(' ').map(n => n[0]).join(''),
        role: newPerson.role
      },
      accessType: newPerson.accessType,
      permissions: newPerson.permissions,
      expiration: new Date(Date.now() + parseInt(newPerson.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      lastActive: 'Never'
    }
    
    setSharedAccess(prev => [newAccess, ...prev])
    setShowAddPerson(false)
    setNewPerson({
      name: '',
      email: '',
      role: '',
      accessType: 'wallet',
      permissions: ['view'],
      duration: '30'
    })
  }

  const revokeAccess = (accessId: string) => {
    setSharedAccess(prev => prev.map(access => 
      access.id === accessId ? { ...access, status: 'revoked' } : access
    ))
    setAccessKeys(prev => prev.map(key => 
      key.id === accessId ? { ...key, status: 'revoked' } : key
    ))
  }

  const disconnectWallet = (walletId: string) => {
    setConnectedWallets(prev => prev.map(wallet => 
      wallet.id === walletId ? { ...wallet, connected: false } : wallet
    ))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getAccessTypeIcon = (type: string) => {
    const found = accessTypes.find(t => t.id === type)
    return found ? found.icon : Wallet
  }

  const getAccessTypeColor = (type: string) => {
    const found = accessTypes.find(t => t.id === type)
    return found ? found.color : 'text-gray-400'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'revoked': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your Web3 wallet and shared access permissions</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-64 flex-shrink-0"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 space-y-6"
        >
          {/* Shared Access Management */}
          {activeTab === 'access' && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Shared Access</h2>
                  <p className="text-gray-400">Manage people who have access to your wallets and data</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddPerson(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Person
                </motion.button>
              </div>

              {/* Access Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Shared', value: sharedAccess.length, color: 'text-blue-400', icon: Users },
                  { label: 'Active Keys', value: accessKeys.filter(k => k.status === 'active').length, color: 'text-green-400', icon: Key },
                  { label: 'Pending', value: sharedAccess.filter(a => a.status === 'pending').length, color: 'text-yellow-400', icon: Clock },
                  { label: 'Access Types', value: accessTypes.length, color: 'text-purple-400', icon: FileKey }
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

              {/* Active Shared Access */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Active Shared Access</h3>
                
                <div className="space-y-4">
                  {sharedAccess.map((access, index) => (
                    <motion.div
                      key={access.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-semibold">
                          {access.person.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-semibold">{access.person.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(access.status)} bg-gray-700/50`}>
                              {access.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{access.person.email}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              {React.createElement(getAccessTypeIcon(access.accessType), { 
                                className: `w-3 h-3 ${getAccessTypeColor(access.accessType)}` 
                              })}
                              <span className="text-gray-500 text-xs capitalize">{access.accessType}</span>
                            </div>
                            <span className="text-gray-500 text-xs">Expires: {access.expiration}</span>
                            <span className="text-gray-500 text-xs">Last active: {access.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => revokeAccess(access.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Access Keys */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Access Keys</h3>
                
                <div className="space-y-4">
                  {accessKeys.map((key, index) => (
                    <motion.div
                      key={key.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Key className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{key.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-400 text-sm font-mono">{key.key}</span>
                            <button
                              onClick={() => copyToClipboard(key.key)}
                              className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-500 text-xs">Created: {key.created}</span>
                            <span className="text-gray-500 text-xs">Expires: {key.expires}</span>
                            <span className="text-gray-500 text-xs">Uses: {key.uses}</span>
                            <span className={`text-xs font-medium ${getStatusColor(key.status)}`}>
                              {key.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add Person Modal */}
          <AnimatePresence>
            {showAddPerson && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowAddPerson(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl w-full max-w-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Grant Access</h3>
                    <button
                      onClick={() => setShowAddPerson(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Person Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
                        <input
                          type="text"
                          value={newPerson.name}
                          onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          value={newPerson.email}
                          onChange={(e) => setNewPerson({...newPerson, email: e.target.value})}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Role</label>
                        <input
                          type="text"
                          value={newPerson.role}
                          onChange={(e) => setNewPerson({...newPerson, role: e.target.value})}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g., Developer, Manager"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Access Duration</label>
                        <select
                          value={newPerson.duration}
                          onChange={(e) => setNewPerson({...newPerson, duration: e.target.value})}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="7">7 days</option>
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="365">1 year</option>
                          <option value="0">Never expires</option>
                        </select>
                      </div>
                    </div>

                    {/* Access Type */}
                    <div>
                      <label className="text-white text-sm font-medium mb-3 block">Access Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {accessTypes.map(type => (
                          <button
                            key={type.id}
                            onClick={() => setNewPerson({...newPerson, accessType: type.id})}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                              newPerson.accessType === type.id
                                ? 'bg-cyan-500/20 border-cyan-500/50'
                                : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <type.icon className={`w-5 h-5 ${type.color}`} />
                            <span className="text-white text-sm text-center">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Permissions */}
                    <div>
                      <label className="text-white text-sm font-medium mb-3 block">Permissions</label>
                      <div className="space-y-2">
                        {permissions.map(permission => (
                          <label key={permission.id} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                            <input
                              type="checkbox"
                              checked={newPerson.permissions.includes(permission.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewPerson({
                                    ...newPerson,
                                    permissions: [...newPerson.permissions, permission.id]
                                  })
                                } else {
                                  setNewPerson({
                                    ...newPerson,
                                    permissions: newPerson.permissions.filter(p => p !== permission.id)
                                  })
                                }
                              }}
                              className="rounded bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-500"
                            />
                            <span className="text-white text-sm">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 border-t border-gray-700">
                    <button
                      onClick={() => setShowAddPerson(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: generatingKey ? 1 : 1.05 }}
                      whileTap={{ scale: generatingKey ? 1 : 0.95 }}
                      onClick={generateAccessKey}
                      disabled={generatingKey || !newPerson.name || !newPerson.email}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-all duration-300"
                    >
                      {generatingKey ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Generating Key...
                        </>
                      ) : (
                        <>
                          <Key className="w-5 h-5" />
                          Generate Access Key
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wallet Settings */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              {/* Connected Wallets */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Connected Wallets</h3>
                
                <div className="space-y-4">
                  {connectedWallets.map(wallet => (
                    <div key={wallet.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{wallet.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-400 text-sm font-mono">{wallet.address}</span>
                            <button
                              onClick={() => copyToClipboard(wallet.address)}
                              className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{wallet.network}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {wallet.connected ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Connected</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Disconnected</span>
                        )}
                        <button
                          onClick={() => disconnectWallet(wallet.id)}
                          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg transition-all duration-300 border border-red-500/30"
                        >
                          <LogOut className="w-4 h-4" />
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-gray-700">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
                    <Wallet className="w-4 h-4" />
                    Connect New Wallet
                  </button>
                </div>
              </div>

              {/* Wallet Preferences */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Wallet Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Default Wallet</label>
                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      <option>MetaMask</option>
                      <option>WalletConnect</option>
                      <option>Coinbase Wallet</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Currency Display</label>
                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>ETH (Ξ)</option>
                      <option>BTC (₿)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Transaction Speed</label>
                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      <option>Slow (Cheaper)</option>
                      <option>Standard</option>
                      <option>Fast (Recommended)</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Address Format</label>
                    <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      <option>Full Address</option>
                      <option>Shortened (0x742...8D)</option>
                      <option>ENS (if available)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'auto-lock', label: 'Auto Lock', description: 'Automatically lock wallet after 5 minutes', enabled: true },
                    { id: 'biometric', label: 'Biometric Auth', description: 'Use fingerprint or face recognition', enabled: true },
                    { id: 'transaction-scan', label: 'Transaction Scanning', description: 'Scan transactions for malicious activity', enabled: true },
                    { id: 'phishing-protection', label: 'Phishing Protection', description: 'Block known phishing websites', enabled: true },
                    { id: 'rpc-protection', label: 'RPC Protection', description: 'Validate RPC endpoints', enabled: false }
                  ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{setting.label}</h4>
                        <p className="text-gray-400 text-xs">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          className="sr-only peer"
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Management */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Session Management</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Active Sessions</h4>
                      <p className="text-gray-400 text-xs">2 devices currently connected</p>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Private Key</h4>
                      <p className="text-gray-400 text-xs">Export your encrypted private key</p>
                    </div>
                    <button className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 px-3 py-2 rounded-lg transition-all duration-300 border border-amber-500/30">
                      <Key className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Network Settings */}
          {activeTab === 'network' && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Network Configuration</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'ethereum', name: 'Ethereum Mainnet', rpc: 'https://mainnet.infura.io/v3/', chainId: 1, enabled: true },
                    { id: 'polygon', name: 'Polygon', rpc: 'https://polygon-rpc.com/', chainId: 137, enabled: true },
                    { id: 'arbitrum', name: 'Arbitrum', rpc: 'https://arb1.arbitrum.io/rpc', chainId: 42161, enabled: false },
                    { id: 'optimism', name: 'Optimism', rpc: 'https://mainnet.optimism.io', chainId: 10, enabled: false },
                    { id: 'bsc', name: 'Binance Smart Chain', rpc: 'https://bsc-dataseed.binance.org/', chainId: 56, enabled: true }
                  ].map(network => (
                    <div key={network.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${network.enabled ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">{network.name}</h4>
                          <p className="text-gray-400 text-xs font-mono">{network.rpc}</p>
                          <p className="text-gray-500 text-xs">Chain ID: {network.chainId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={network.enabled}
                            className="sr-only peer"
                            onChange={() => {}}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-gray-700">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
                    <Network className="w-4 h-4" />
                    Add Custom Network
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Advanced Settings</h3>
                
                <div className="space-y-6">
                  {[
                    { id: 'gas-limit', label: 'Custom Gas Limit', value: '300000', description: 'Maximum gas for transactions' },
                    { id: 'slippage', label: 'Slippage Tolerance', value: '0.5%', description: 'Maximum price slippage' },
                    { id: 'tx-timeout', label: 'Transaction Timeout', value: '120s', description: 'Transaction confirmation timeout' },
                    { id: 'auto-nonce', label: 'Auto Nonce Management', value: 'Enabled', description: 'Automatically manage transaction nonces' }
                  ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{setting.label}</h4>
                        <p className="text-gray-400 text-xs">{setting.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-cyan-400 text-sm font-medium">{setting.value}</span>
                        <button className="block text-gray-400 hover:text-cyan-400 text-xs mt-1 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer Settings */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Developer Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Developer Mode</h4>
                      <p className="text-gray-400 text-xs">Enable advanced developer features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Transaction Debugging</h4>
                      <p className="text-gray-400 text-xs">Show detailed transaction logs</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Danger Zone</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Clear All Data</h4>
                      <p className="text-red-400 text-xs">Remove all wallet data and reset application</p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                      Clear Data
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                    <div>
                      <h4 className="text-white font-semibold text-sm">Reset Wallet</h4>
                      <p className="text-red-400 text-xs">Permanently delete all wallet connections</p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
                      <LogOut className="w-4 h-4" />
                      Reset Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'tx-alerts', label: 'Transaction Alerts', description: 'Get notified when transactions complete', enabled: true },
                  { id: 'price-alerts', label: 'Price Alerts', description: 'Receive price movement notifications', enabled: true },
                  { id: 'security-alerts', label: 'Security Alerts', description: 'Important security updates', enabled: true },
                  { id: 'gas-alerts', label: 'Gas Price Alerts', description: 'Notify when gas prices are low', enabled: false },
                  { id: 'nft-alerts', label: 'NFT Alerts', description: 'Get notified about NFT activities', enabled: true }
                ].map(setting => (
                  <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                    <div>
                      <h4 className="text-white font-semibold text-sm">{setting.label}</h4>
                      <p className="text-gray-400 text-xs">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.enabled}
                        className="sr-only peer"
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              {/* Privacy Settings */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Privacy Settings</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'enhanced-privacy', label: 'Enhanced Privacy Mode', description: 'Hide balances and transactions', enabled: false },
                    { id: 'ip-masking', label: 'IP Address Masking', description: 'Mask your IP address for RPC calls', enabled: true },
                    { id: 'tracking-protection', label: 'Tracking Protection', description: 'Block wallet fingerprinting', enabled: true },
                    { id: 'ad-tracking', label: 'Ad Tracking Prevention', description: 'Prevent targeted advertising', enabled: true }
                  ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <div>
                        <h4 className="text-white font-semibold text-sm">{setting.label}</h4>
                        <p className="text-gray-400 text-xs">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          className="sr-only peer"
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Data Management</h3>
                <p className="text-gray-400 mb-4">Download a copy of your blockchain data and transaction history</p>
                <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export Blockchain Data
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}