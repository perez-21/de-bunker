"use client"

import { motion } from 'framer-motion'
import { Upload, UserPlus, Settings, Shield, FileText, Download } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      icon: Upload,
      label: 'Send File',
      description: 'Encrypt and send files',
      color: 'from-blue-500 to-cyan-500',
      href: '/dashboard/send'
    },
    {
      icon: Download,
      label: 'Receive',
      description: 'Access received files',
      color: 'from-green-500 to-emerald-500',
      href: '/dashboard/received'
    },
    {
      icon: UserPlus,
      label: 'Add Contact',
      description: 'Manage trusted contacts',
      color: 'from-purple-500 to-pink-500',
      href: '/dashboard/contacts'
    },
    {
      icon: Shield,
      label: 'Security',
      description: 'Security settings',
      color: 'from-orange-500 to-red-500',
      href: '/dashboard/security'
    }
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
      
      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-white font-medium text-sm">{action.label}</p>
              <p className="text-gray-400 text-xs">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions