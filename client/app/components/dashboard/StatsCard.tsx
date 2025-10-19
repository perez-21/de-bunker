"use client"

import { motion } from 'framer-motion'
import { LucideIcon, Shield, AlertTriangle, CheckCircle2, Eye, Lock } from 'lucide-react'
import { useState } from 'react'

interface StatsCardProps {
  stat: {
    icon: LucideIcon
    label: string
    value: string
    status: 'secure' | 'warning' | 'critical' | 'encrypted'
    trend?: 'improving' | 'deteriorating'
    color: string
    description?: string
    onClick?: () => void
    isInteractive?: boolean
    securityLevel?: 'low' | 'medium' | 'high'
    lastUpdated?: string
    itemsCount?: number
  }
  index: number
}

const StatsCard = ({ stat, index }: StatsCardProps) => {
  const { 
    icon: Icon, 
    label, 
    value, 
    status, 
    trend,
    color, 
    description,
    onClick,
    isInteractive = false,
    securityLevel,
    lastUpdated,
    itemsCount
  } = stat

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick()
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'secure':
        return <Shield className="w-4 h-4 text-green-400" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'encrypted':
        return <Lock className="w-4 h-4 text-blue-400" />
      default:
        return <Eye className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'secure':
        return 'Secure'
      case 'warning':
        return 'Needs Attention'
      case 'critical':
        return 'Critical'
      case 'encrypted':
        return 'Encrypted'
      default:
        return 'Unknown'
    }
  }

  const getSecurityLevelColor = () => {
    switch (securityLevel) {
      case 'high':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        scale: isInteractive ? 1.02 : 1.02,
        borderColor: isInteractive ? 'rgba(34, 211, 238, 0.3)' : 'rgba(75, 85, 99, 0.5)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 
        transition-all duration-300 relative overflow-hidden
        ${isInteractive ? 'cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10' : ''}
        ${status === 'critical' ? 'border-red-500/30 bg-red-500/5' : ''}
        ${status === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5' : ''}
        ${status === 'secure' ? 'border-green-500/30 bg-green-500/5' : ''}
      `}
    >
      {/* Background Glow Effect on Hover */}
      {isInteractive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 rounded-2xl`}
        />
      )}

      {/* Security Status Badge */}
      <motion.div 
        className={`flex items-center gap-2 absolute top-4 right-4 ${
          status === 'critical' ? 'text-red-400' :
          status === 'warning' ? 'text-yellow-400' :
          status === 'secure' ? 'text-green-400' :
          'text-blue-400'
        }`}
        whileHover={{ scale: 1.1 }}
      >
        {getStatusIcon()}
        <span className="text-xs font-medium">{getStatusText()}</span>
      </motion.div>

      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className={`p-3 rounded-xl bg-gradient-to-r ${color} relative overflow-hidden`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Icon Background Shine */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isHovered ? 40 : -20, opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white/20 skew-x-12"
          />
          <Icon className="w-6 h-6 text-white relative z-10" />
        </motion.div>
        
        {/* Trend Indicator */}
        {trend && (
          <motion.div 
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'improving' ? 'text-green-400' : 'text-red-400'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {trend === 'improving' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span className="text-xs">{trend === 'improving' ? 'Improving' : 'Deteriorating'}</span>
          </motion.div>
        )}
      </div>
      
      <motion.h3 
        className="text-2xl font-bold text-white mb-1"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {value}
      </motion.h3>
      
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      
      {/* Items Count */}
      {itemsCount !== undefined && (
        <motion.div 
          className="flex items-center gap-2 text-xs text-gray-500 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Eye className="w-3 h-3" />
          <span>{itemsCount} items secured</span>
        </motion.div>
      )}

      {/* Security Level Badge */}
      {securityLevel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 mt-2 border ${getSecurityLevelColor()}`}
        >
          <Shield className="w-3 h-3" />
          <span className="text-xs font-medium capitalize">{securityLevel} security</span>
        </motion.div>
      )}

      {/* Description */}
      {description && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-gray-500 text-xs mt-3"
        >
          {description}
        </motion.p>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-xs mt-2"
        >
          Updated {lastUpdated}
        </motion.div>
      )}

      {/* Security Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: index * 0.2 }}
        className="w-full bg-gray-700 rounded-full h-1.5 mt-3"
      >
        <motion.div 
          className={`h-1.5 rounded-full ${
            status === 'secure' ? 'bg-green-500' :
            status === 'warning' ? 'bg-yellow-500' :
            status === 'critical' ? 'bg-red-500' :
            'bg-blue-500'
          } ${trend === 'improving' ? 'animate-pulse' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: 
            status === 'secure' ? '90%' :
            status === 'warning' ? '60%' :
            status === 'critical' ? '30%' :
            '75%'
          }}
          transition={{ duration: 1, delay: index * 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default StatsCard