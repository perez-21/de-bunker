"use client"

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  stat: {
    icon: LucideIcon
    label: string
    value: string
    change: string
    trend: 'up' | 'down'
    color: string
  }
  index: number
}

const StatsCard = ({ stat, index }: StatsCardProps) => {
  const { icon: Icon, label, value, change, trend, color } = stat

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  )
}

export default StatsCard