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
  Wallet, 
  ExternalLink,
  MoreVertical,
  Key,
  Shield,
  TrendingUp,
  Check,
  Download,
  QrCode,
  Send,
  Receive
} from 'lucide-react'
import Link from 'next/link'
import AuthorizationModal from '../../../components/modal/authorize'


interface WalletItem {
  id: string
  name: string
  address: string
  type: 'ethereum' | 'bitcoin' | 'solana' | 'multi'
  balance: string
  usdValue: string
  network: string
  lastActivity: string
  encrypted: boolean
  privateKey?: string
  publicKey?: string
  derivationPath?: string
  createdAt: string
  securityLevel: 'high' | 'medium' | 'low'
}

interface WalletDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  wallet: WalletItem | null
  onAuthorize: (privateKey: string) => Promise<boolean>
}

// Wallet Details Modal Component
function WalletDetailsModal({ isOpen, onClose, wallet, onAuthorize }: WalletDetailsModalProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (!wallet) return null

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleViewPrivateKey = () => {
    setShowAuthModal(true)
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    const success = await onAuthorize(privateKey)
    if (success) {
      setShowPrivateKey(true)
      setShowAuthModal(false)
    }
    return success
  }

  const getExplorerUrl = () => {
    switch (wallet.type) {
      case 'ethereum':
        return `https://etherscan.io/address/${wallet.address}`
      case 'bitcoin':
        return `https://blockstream.info/address/${wallet.address}`
      case 'solana':
        return `https://explorer.solana.com/address/${wallet.address}`
      default:
        return '#'
    }
  }

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case 'high': return <Shield className="w-5 h-5 text-green-400" />
      case 'medium': return <Shield className="w-5 h-5 text-yellow-400" />
      case 'low': return <Shield className="w-5 h-5 text-red-400" />
      default: return <Shield className="w-5 h-5 text-gray-400" />
    }
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
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getWalletColor(wallet.type)}`}>
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{wallet.name}</h2>
                    <p className="text-gray-400 text-sm capitalize">{wallet.type} • {wallet.network}</p>
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
                {/* Balance Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Balance</p>
                    <p className="text-white text-xl font-bold">{wallet.balance}</p>
                    <p className="text-gray-300 text-sm">{wallet.usdValue}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Security Level</p>
                    <div className="flex items-center gap-2">
                      {getSecurityIcon(wallet.securityLevel)}
                      <span className={`text-sm font-medium ${getSecurityColor(wallet.securityLevel)} capitalize`}>
                        {wallet.securityLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wallet Address */}
                <div>
                  <label className="text-white font-semibold text-sm mb-3 block">Wallet Address</label>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono text-sm break-all">
                        {wallet.address}
                      </span>
                      <button
                        onClick={() => copyToClipboard(wallet.address, 'address')}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors flex-shrink-0 ml-2"
                      >
                        {copiedField === 'address' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <a
                      href={getExplorerUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Explorer
                    </a>
                  </div>
                </div>

                {/* Private Key */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-semibold text-sm">Private Key</label>
                    {!showPrivateKey && (
                      <button
                        onClick={handleViewPrivateKey}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Reveal Private Key
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    {showPrivateKey ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-mono text-sm break-all">
                            {wallet.privateKey || 'c875...a5c7'}
                          </span>
                          <button
                            onClick={() => copyToClipboard(wallet.privateKey || 'c875...a5c7', 'privateKey')}
                            className="p-1 text-gray-400 hover:text-cyan-400 transition-colors flex-shrink-0 ml-2"
                          >
                            {copiedField === 'privateKey' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400 text-xs mt-2">
                          <Shield className="w-3 h-3" />
                          Never share your private key with anyone
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Key className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400">Private key is encrypted</p>
                        <p className="text-amber-400 text-sm">
                          Authorization required to view private key
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Wallet Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Network</span>
                      <p className="text-white">{wallet.network}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Type</span>
                      <p className="text-white capitalize">{wallet.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Created</span>
                      <p className="text-white">{new Date(wallet.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Activity</span>
                      <p className="text-white">{wallet.lastActivity}</p>
                    </div>
                  </div>

                  {/* Derivation Path */}
                  {wallet.derivationPath && (
                    <div>
                      <span className="text-gray-400 text-sm mb-2 block">Derivation Path</span>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <span className="text-white font-mono text-sm">{wallet.derivationPath}</span>
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
                  Export Wallet
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
        actionDescription={`Reveal private key for ${wallet.name}`}
        requiredPermissions={["View wallet private key"]}
      />
    </>
  )
}

export default function WalletsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedWallet, setSelectedWallet] = useState<WalletItem | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<Set<string>>(new Set())

  const wallets: WalletItem[] = [
    {
      id: '1',
      name: 'Main Ethereum Wallet',
      address: '0x742d35Cc6634C0532925a3b8Df0C9d5d9E8bF899',
      type: 'ethereum',
      balance: '2.45 ETH',
      usdValue: '$4,250.50',
      network: 'Ethereum Mainnet',
      lastActivity: '2 hours ago',
      encrypted: true,
      privateKey: 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
      publicKey: '0x047db227d7094ce215c3a0f57e1bcc732551fe351f94249471934567e0f5dc1bf795962b8cccb87a2eb56b29fbe37d614e2f4c3c8b4c4f4f4c4f4c4f4c4f4c4f4',
      derivationPath: "m/44'/60'/0'/0/0",
      createdAt: '2024-01-15T10:30:00Z',
      securityLevel: 'high'
    },
    {
      id: '2',
      name: 'Bitcoin Savings',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      type: 'bitcoin',
      balance: '0.15 BTC',
      usdValue: '$6,750.00',
      network: 'Bitcoin Mainnet',
      lastActivity: '1 day ago',
      encrypted: true,
      privateKey: 'L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1',
      derivationPath: "m/44'/0'/0'/0/0",
      createdAt: '2024-01-14T14:20:00Z',
      securityLevel: 'high'
    },
    {
      id: '3',
      name: 'Solana DeFi',
      address: '5v3r5XJ8y9hKj2mN8bV6cF7dG3hJ4kL9mN8bV6cF7dG3hJ4kL9mN8bV6',
      type: 'solana',
      balance: '125.8 SOL',
      usdValue: '$12,580.00',
      network: 'Solana Mainnet',
      lastActivity: '3 days ago',
      encrypted: true,
      privateKey: '5v3r5XJ8y9hKj2mN8bV6cF7dG3hJ4kL9mN8bV6cF7dG3hJ4kL9mN8bV6cF7dG3hJ4kL9mN8bV6',
      createdAt: '2024-01-13T09:15:00Z',
      securityLevel: 'medium'
    },
    {
      id: '4',
      name: 'Multi-chain Wallet',
      address: '0x8932d4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7',
      type: 'multi',
      balance: 'Various',
      usdValue: '$23,450.00',
      network: 'Multiple Networks',
      lastActivity: '1 week ago',
      encrypted: true,
      createdAt: '2024-01-12T16:45:00Z',
      securityLevel: 'high'
    }
  ]

  const types = ['all', 'ethereum', 'bitcoin', 'solana', 'multi']

  const filteredWallets = wallets.filter(wallet => 
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.network.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(wallet => 
    selectedType === 'all' || wallet.type === selectedType
  )

  const getWalletColor = (type: string) => {
    switch (type) {
      case 'ethereum': return 'from-purple-500 to-blue-500'
      case 'bitcoin': return 'from-orange-500 to-yellow-500'
      case 'solana': return 'from-green-500 to-purple-500'
      case 'multi': return 'from-cyan-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getWalletIcon = (type: string) => {
    return <Wallet className="w-6 h-6 text-white" />
  }

  const copyToClipboard = async (text: string, field: string, walletId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(`${walletId}-${field}`))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(`${walletId}-${field}`)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const togglePrivateKeyVisibility = (walletId: string) => {
    setVisiblePrivateKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(walletId)) {
        newSet.delete(walletId)
      } else {
        newSet.add(walletId)
      }
      return newSet
    })
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getExplorerUrl = (wallet: WalletItem) => {
    switch (wallet.type) {
      case 'ethereum':
        return `https://etherscan.io/address/${wallet.address}`
      case 'bitcoin':
        return `https://blockstream.info/address/${wallet.address}`
      case 'solana':
        return `https://explorer.solana.com/address/${wallet.address}`
      default:
        return '#'
    }
  }

  const handleViewDetails = (wallet: WalletItem) => {
    setSelectedWallet(wallet)
    setShowDetailsModal(true)
  }

  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    // Simulate authorization - replace with actual logic
    console.log('Authorizing wallet access with:', privateKey)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  }

  const isPrivateKeyVisible = (walletId: string) => visiblePrivateKeys.has(walletId)
  const isCopied = (walletId: string, field: string) => copiedItems.has(`${walletId}-${field}`)

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case 'high': return <Shield className="w-4 h-4 text-green-400" />
      case 'medium': return <Shield className="w-4 h-4 text-yellow-400" />
      case 'low': return <Shield className="w-4 h-4 text-red-400" />
      default: return <Shield className="w-4 h-4 text-gray-400" />
    }
  }

  const totalPortfolioValue = wallets.reduce((total, wallet) => {
    const value = parseFloat(wallet.usdValue.replace(/[^0-9.]/g, ''))
    return total + value
  }, 0)

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
              <Wallet className="w-5 h-5" />
              <span>Vault</span>
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-2xl font-bold text-white">Crypto Wallets</h1>
          </div>
          <p className="text-gray-400">Manage your cryptocurrency wallet addresses and keys</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Wallet
        </motion.button>
      </div>

      {/* Total Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold mb-2">Total Portfolio Value</h3>
            <div className="text-3xl font-bold text-white mb-1">${totalPortfolioValue.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% this month</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-2">Across {wallets.length} wallets</div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Shield className="w-4 h-4" />
              Secure & Encrypted
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search wallets by name, address, or network..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-2 rounded-lg transition-colors capitalize ${
                  selectedType === type
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWallets.map((wallet, index) => (
          <motion.div
            key={wallet.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getWalletColor(wallet.type)} rounded-2xl`} />
            
            {/* Wallet Card */}
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${getWalletColor(wallet.type)}`}>
                    {getWalletIcon(wallet.type)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{wallet.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-300 text-sm capitalize">{wallet.type}</span>
                      {getSecurityIcon(wallet.securityLevel)}
                      <span className={`text-xs ${getSecurityColor(wallet.securityLevel)}`}>
                        {wallet.securityLevel}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleViewDetails(wallet)}
                    className="p-1 text-white/80 hover:text-white transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div className="mb-4">
                <div className="text-2xl font-bold text-white mb-1">{wallet.balance}</div>
                <div className="text-gray-300 text-sm">{wallet.usdValue}</div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="text-gray-300 text-sm mb-2 block">Wallet Address</label>
                <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                  <span className="text-white font-mono text-sm">
                    {shortenAddress(wallet.address)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(wallet.address, 'address', wallet.id)}
                      className="p-1 text-white/80 hover:text-cyan-300 transition-colors"
                    >
                      {isCopied(wallet.id, 'address') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={getExplorerUrl(wallet)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-white/80 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Private Key (Conditional) */}
              {isPrivateKeyVisible(wallet.id) && (
                <div className="mb-4">
                  <label className="text-gray-300 text-sm mb-2 block">Private Key</label>
                  <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                    <span className="text-white font-mono text-sm">
                      {shortenAddress(wallet.privateKey || 'c875...a5c7')}
                    </span>
                    <button
                      onClick={() => copyToClipboard(wallet.privateKey || 'c875...a5c7', 'privateKey', wallet.id)}
                      className="p-1 text-white/80 hover:text-cyan-300 transition-colors"
                    >
                      {isCopied(wallet.id, 'privateKey') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="text-gray-300 text-xs">
                  Active {wallet.lastActivity}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePrivateKeyVisibility(wallet.id)}
                    className="p-2 text-white/80 hover:text-yellow-300 transition-colors"
                    title={isPrivateKeyVisible(wallet.id) ? "Hide Private Key" : "Show Private Key"}
                  >
                    {isPrivateKeyVisible(wallet.id) ? <EyeOff className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => handleViewDetails(wallet)}
                    className="p-2 text-white/80 hover:text-blue-300 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/80 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWallets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No wallets found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first crypto wallet to get started'}
          </p>
        </motion.div>
      )}

      {/* Wallet Details Modal */}
      <WalletDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        wallet={selectedWallet}
        onAuthorize={handleAuthorize}
      />

      {/* Security Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h4 className="text-yellow-400 font-semibold mb-2">Security Notice</h4>
            <p className="text-yellow-300 text-sm">
              Your wallet private keys are encrypted with military-grade AES-256 encryption. Never share your private keys with anyone. 
              Consider using a hardware wallet for large amounts. Always keep backups in secure locations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}