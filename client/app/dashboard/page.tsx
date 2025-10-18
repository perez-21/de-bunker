"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Upload, 
  Download, 
  FileText, 
  BarChart3,
  ArrowUpRight,
  Eye
} from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import QuickActions from '../components/dashboard/QuickActions'

export default function DashboardPage() {
  const stats = [
    {
      icon: FileText,
      label: 'Total Files',
      value: '1,247',
      change: '+12%',
      trend: 'up' as const,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Upload,
      label: 'Sent',
      value: '892',
      change: '+8%',
      trend: 'up' as const,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      label: 'Received',
      value: '355',
      change: '+15%',
      trend: 'up' as const,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      label: 'Protected',
      value: '1,247',
      change: '100%',
      trend: 'up' as const,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your security overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard key={stat.label} stat={stat} index={index} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RecentActivity />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* Security Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Security Status</h3>
          <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Eye className="w-4 h-4" />
            <span className="text-sm">View Details</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Encryption', status: 'Active', color: 'text-green-400' },
            { label: '2FA', status: 'Enabled', color: 'text-green-400' },
            { label: 'Session', status: 'Secure', color: 'text-green-400' }
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-gray-700/30 rounded-xl">
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>
              <p className={`font-semibold ${item.color}`}>{item.status}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}