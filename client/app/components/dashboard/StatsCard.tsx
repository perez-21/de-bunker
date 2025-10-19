"use client"

import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface StatsCardProps {
  stat: {
    icon: LucideIcon
    label: string
    value: string
    change: string
    trend: 'up' | 'down'
    color: string
    description?: string
    onClick?: () => void
    isInteractive?: boolean
    additionalInfo?: string
  }
  index: number
}

const StatsCard = ({ stat, index }: StatsCardProps) => {
  const { 
    icon: Icon, 
    label, 
    value, 
    change, 
    trend, 
    color, 
    description,
    onClick,
    isInteractive = false,
    additionalInfo 
  } = stat

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick()
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

      {/* Click Indicator Arrow */}
      {isInteractive && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          className="absolute top-4 right-4 text-cyan-400"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      )}

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
        
        <motion.div 
          className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </motion.div>
      </div>
      
      <motion.h3 
        className="text-2xl font-bold text-white mb-1"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {value}
      </motion.h3>
      
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      
      {/* Additional Information */}
      {description && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-gray-500 text-xs mt-2"
        >
          {description}
        </motion.p>
      )}

      {/* Additional Info Badge */}
      {additionalInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1 bg-gray-700/50 rounded-full px-2 py-1 mt-2"
        >
          <span className="text-cyan-400 text-xs">ⓘ</span>
          <span className="text-gray-400 text-xs">{additionalInfo}</span>
        </motion.div>
      )}

      {/* Progress Bar for certain metrics */}
      {(label.includes('Balance') || label.includes('Volume')) && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: index * 0.2 }}
          className="w-full bg-gray-700 rounded-full h-1 mt-3"
        >
          <div 
            className={`h-1 rounded-full bg-gradient-to-r ${color} ${
              trend === 'up' ? 'animate-pulse' : ''
            }`}
            style={{ 
              width: trend === 'up' ? '75%' : '40%' 
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

export default StatsCard