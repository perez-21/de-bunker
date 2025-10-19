"use client"

import { motion } from 'framer-motion'
import { 
  Wallet, 
  TrendingUp, 
  Download, 
  Upload, 
  Shield, 
  Cpu,
  BarChart3,
  ArrowUpRight,
  Eye,
  Zap,
  Key,
  CreditCard,
  StickyNote,
  Network
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StatsCard from '../components/dashboard/StatsCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import QuickActions from '../components/dashboard/QuickActions'
import { useWeb3 } from '../hooks/useWeb3'

export default function DashboardPage() {
  const router = useRouter()
  const { isConnected, provider, getTransactionDetails } = useWeb3()
  const [walletBalance, setWalletBalance] = useState('0.00 ETH')
  const [usdValue, setUsdValue] = useState('$0.00')

  // Mock data - in real app, fetch from blockchain
  useEffect(() => {
    // Simulate fetching wallet data
    const fetchWalletData = async () => {
      // This would be actual blockchain calls in production
      setTimeout(() => {
        setWalletBalance('2.45 ETH')
        setUsdValue('$4,250.50')
      }, 1000)
    }

    fetchWalletData()
  }, [])

  // const stats = [
  //   {
  //     icon: Wallet,
  //     label: 'Total Balance',
  //     value: walletBalance,
  //     change: '+12%',
  //     trend: 'up' as const,
  //     color: 'from-blue-500 to-cyan-500',
  //     description: usdValue,
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/wallet'),
  //     additionalInfo: 'Multi-chain'
  //   },
  //   {
  //     icon: TrendingUp,
  //     label: '24h Volume',
  //     value: '$12.4K',
  //     change: '+8%',
  //     trend: 'up' as const,
  //     color: 'from-green-500 to-emerald-500',
  //     description: 'Across all networks',
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/analytics'),
  //     additionalInfo: 'All chains'
  //   },
  //   {
  //     icon: Download,
  //     label: 'Received (30d)',
  //     value: '15 TX',
  //     change: '+15%',
  //     trend: 'up' as const,
  //     color: 'from-purple-500 to-pink-500',
  //     description: '0.85 ETH total',
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/received'),
  //     additionalInfo: '↗ 0.85 ETH'
  //   },
  //   {
  //     icon: Upload,
  //     label: 'Sent (30d)',
  //     value: '8 TX',
  //     change: '+5%',
  //     trend: 'up' as const,
  //     color: 'from-orange-500 to-red-500',
  //     description: '0.42 ETH total',
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/send'),
  //     additionalInfo: '↘ 0.42 ETH'
  //   },
  //   {
  //     icon: Shield,
  //     label: 'Security Score',
  //     value: '98%',
  //     change: '+2%',
  //     trend: 'up' as const,
  //     color: 'from-cyan-500 to-blue-500',
  //     description: 'Wallet protection',
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/security'),
  //     additionalInfo: 'Optimal'
  //   },
  //   {
  //     icon: Cpu,
  //     label: 'Gas Saved',
  //     value: '0.12 ETH',
  //     change: '-15%',
  //     trend: 'down' as const,
  //     color: 'from-yellow-500 to-amber-500',
  //     description: 'This month',
  //     isInteractive: true,
  //     onClick: () => router.push('/dashboard/analytics'),
  //     additionalInfo: 'Cost efficient'
  //   }
  // ]
// Example usage with security data
const securityStats = [
  {
    icon: Key, // Login credentials
    label: "Login Credentials",
    value: "24 Secured",
    status: "secure" as const,
    trend: "improving" as const,
    color: "from-blue-500 to-cyan-500",
    description: "All passwords encrypted and secured",
    securityLevel: "high" as const,
    itemsCount: 24,
    lastUpdated: "2 hours ago"
  },
  {
    icon: CreditCard,
    label: "Payment Cards",
    value: "5 Protected",
    status: "warning" as const,
    trend: "deteriorating" as const,
    color: "from-green-500 to-emerald-500",
    description: "1 card needs re-encryption",
    securityLevel: "medium" as const,
    itemsCount: 5,
    lastUpdated: "1 day ago"
  },
  {
    icon: StickyNote,
    label: "Secure Notes",
    value: "12 Encrypted",
    status: "encrypted" as const,
    color: "from-yellow-500 to-amber-500",
    description: "All notes are end-to-end encrypted",
    securityLevel: "high" as const,
    itemsCount: 12,
    lastUpdated: "5 minutes ago"
  },
  {
    icon: Wallet,
    label: "Wallet Addresses",
    value: "8 Secured",
    status: "critical" as const,
    color: "from-purple-500 to-pink-500",
    description: "2 wallets need security review",
    securityLevel: "low" as const,
    itemsCount: 8,
    lastUpdated: "just now"
  }
]






  const networkStats = [
    { label: 'Ethereum', value: '1.85 ETH', color: 'text-blue-400' },
    { label: 'Polygon', value: '0.32 MATIC', color: 'text-purple-400' },
    { label: 'Arbitrum', value: '0.28 ETH', color: 'text-cyan-400' }
  ]

  const quickStats = [
    { label: 'Active Sessions', value: '2', color: 'text-green-400' },
    { label: 'Pending TX', value: '0', color: 'text-gray-400' },
    { label: 'NFTs', value: '12', color: 'text-purple-400' },
    { label: 'Tokens', value: '8', color: 'text-blue-400' }
  ]

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
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            {isConnected ? 'Welcome back! Your wallet is secure.' : 'Connect your wallet to get started'}
          </p>
        </div>
        
        {/* Network Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Ethereum Mainnet</span>
          </div>
          <div className="w-px h-4 bg-gray-600"></div>
          <div className="text-sm text-cyan-400 font-medium">
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </motion.div>
      </motion.div>

  {/* Stats Grid */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
>
  {securityStats.map((stat, index) => (
    <StatsCard key={index} stat={stat} index={index} />
  ))}
</motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Recent Activity - 2 columns on xl */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-2"
        >
          <RecentActivity />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="xl:col-span-1"
        >
          <QuickActions />
        </motion.div>

        {/* Network Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="xl:col-span-1"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Network Overview</h3>
              <Network className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="space-y-4">
              {networkStats.map((network, index) => (
                <motion.div
                  key={network.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-gray-300 text-sm">{network.label}</span>
                  <span className={`text-sm font-medium ${network.color}`}>
                    {network.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-center p-3 bg-gray-700/30 rounded-lg"
                  >
                    <p className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security & Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Security Status</h3>
            <button 
              onClick={() => router.push('/dashboard/security')}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">View Details</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                label: 'Wallet Encryption', 
                status: 'Active', 
                color: 'text-green-400',
                icon: Shield
              },
              { 
                label: '2FA Protection', 
                status: 'Enabled', 
                color: 'text-green-400',
                icon: Shield
              },
              { 
                label: 'Session Security', 
                status: 'Secure', 
                color: 'text-green-400',
                icon: Network
              },
              { 
                label: 'Phishing Protection', 
                status: 'Active', 
                color: 'text-green-400',
                icon: Shield
              }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                <p className={`font-semibold ${item.color}`}>{item.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Performance</h3>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Transaction Speed', value: 'Fast', progress: 85, color: 'bg-green-400' },
              { label: 'Gas Efficiency', value: 'Optimal', progress: 78, color: 'bg-blue-400' },
              { label: 'Network Health', value: 'Excellent', progress: 92, color: 'bg-cyan-400' },
              { label: 'Wallet Sync', value: 'Real-time', progress: 100, color: 'bg-purple-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{metric.label}</span>
                  <span className="text-white text-sm font-medium">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-2 rounded-full ${metric.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call to Action for disconnected wallets */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center"
        >
          <div className="max-w-md mx-auto">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-4">
              Connect your Web3 wallet to access all features and view your blockchain activity.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Connect Wallet
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}