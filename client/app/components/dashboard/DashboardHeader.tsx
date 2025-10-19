"use client"

import { motion } from 'framer-motion'
import { Menu, Bell, Search, Wallet, Shield, LogOut, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface DashboardHeaderProps {
  onMenuClick: () => void
  walletAddress?: string
  balance?: string
  network?: string
}

const DashboardHeader = ({ 
  onMenuClick, 
  walletAddress = "0x742d35Cc6634C0532925a3b8D...",
  balance = "2.45 ETH",
  network = "Ethereum Mainnet"
}: DashboardHeaderProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 p-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions, contracts, or addresses..."
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors w-80"
            />
          </div>
        </div>

        {/* Right Section - Wallet Info */}
        <div className="flex items-center gap-4">
          {/* Network Status */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-400 font-medium">{network}</span>
          </motion.div>

          {/* Balance */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2"
          >
            <Wallet className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">{balance}</span>
          </motion.div>

          {/* Wallet Address */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 group relative"
          >
            <Wallet className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300 font-mono">
              {shortenAddress(walletAddress)}
            </span>
            
            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyToClipboard}
              className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
              title="Copy address"
            >
              <Copy className="w-3 h-3" />
            </motion.button>

            {/* View on Explorer */}
            <motion.a
              href={`https://etherscan.io/address/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
              title="View on Explorer"
            >
              <ExternalLink className="w-3 h-3" />
            </motion.a>

            {/* Copied Tooltip */}
            {isCopied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
              >
                Copied!
              </motion.div>
            )}
          </motion.div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Security Status */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2"
          >
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Secure</span>
          </motion.div>

          {/* Disconnect Wallet */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Disconnect Wallet"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader