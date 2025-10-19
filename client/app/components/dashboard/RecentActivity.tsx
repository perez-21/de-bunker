"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Upload, Download, Shield, Eye, Edit, ExternalLink, Copy, CheckCircle } from 'lucide-react'
import ActivityModal from './ActivityModal'
import { useWeb3 } from '../../hooks/useWeb3'

interface Activity {
  id: string
  type: 'upload' | 'download' | 'security' | 'transaction'
  icon: any
  action: string
  file: string
  to?: string
  from?: string
  time: string
  color: string
  txHash?: string
  amount?: string
  status?: 'pending' | 'confirmed' | 'failed'
  timestamp?: number
}

const RecentActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getTransactionDetails, isConnected } = useWeb3()

  const activities: Activity[] = [
    {
      id: '1',
      type: 'transaction',
      icon: Download,
      action: 'ETH Received',
      file: '0.5 ETH Transfer',
      from: '0x742d35Cc6634C0532925a3b8D...',
      time: '2 minutes ago',
      color: 'text-green-400',
      txHash: '0x89d2c4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6',
      amount: '0.5 ETH',
      status: 'confirmed',
      timestamp: Date.now() - 120000
    },
    {
      id: '2',
      type: 'transaction',
      icon: Upload,
      action: 'ETH Sent',
      file: '0.1 ETH Transfer',
      to: '0x8932d4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7',
      time: '1 hour ago',
      color: 'text-red-400',
      txHash: '0x78c2b4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f5',
      amount: '0.1 ETH',
      status: 'confirmed',
      timestamp: Date.now() - 3600000
    },
    {
      id: '3',
      type: 'security',
      icon: Shield,
      action: 'Contract Interaction',
      file: 'Smart Contract Call',
      to: 'Uniswap V3 Router',
      time: '2 hours ago',
      color: 'text-cyan-400',
      txHash: '0x67a2c4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f4',
      amount: '0.05 ETH',
      status: 'confirmed',
      timestamp: Date.now() - 7200000
    },
    {
      id: '4',
      type: 'transaction',
      icon: Download,
      action: 'USDC Received',
      file: '500 USDC Transfer',
      from: '0x9562d4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7',
      time: '5 hours ago',
      color: 'text-blue-400',
      txHash: '0x56b2c4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f3',
      amount: '500 USDC',
      status: 'confirmed',
      timestamp: Date.now() - 18000000
    }
  ]

  const handleActivityClick = async (activity: Activity) => {
    setSelectedActivity(activity)
    
    // If it's a blockchain transaction and we're connected, fetch details
    if (activity.txHash && isConnected) {
      try {
        const txDetails = await getTransactionDetails(activity.txHash)
        // You can merge these details with the activity or use them in the modal
        console.log('Transaction details:', txDetails)
      } catch (error) {
        console.error('Failed to fetch transaction details:', error)
      }
    }
    
    setIsModalOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3 h-3 text-green-400" />
      case 'pending':
        return <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
      case 'failed':
        return <div className="w-3 h-3 bg-red-400 rounded-full" />
      default:
        return null
    }
  }

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleActivityClick(activity)}
              className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
            >
              <div className={`p-2 rounded-lg bg-gray-600/50 group-hover:scale-110 transition-transform`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{activity.action}</p>
                    {activity.status && getStatusIcon(activity.status)}
                  </div>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
                <p className="text-gray-400 text-sm mt-1">{activity.file}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-500 text-xs">
                    {activity.to ? `To: ${shortenHash(activity.to)}` : `From: ${shortenHash(activity.from || '')}`}
                  </p>
                  {activity.amount && (
                    <span className={`text-xs font-medium ${
                      activity.type === 'upload' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              </div>

              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
      />
    </>
  )
}

export default RecentActivity