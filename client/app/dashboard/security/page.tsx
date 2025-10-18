"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Shield, Lock, Key, Eye, Bell, Cpu, CheckCircle, XCircle, Settings2 } from 'lucide-react'

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [encryptionLevel, setEncryptionLevel] = useState('military')

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: twoFactorEnabled ? 'enabled' : 'disabled',
      action: () => setTwoFactorEnabled(!twoFactorEnabled)
    },
    {
      icon: Lock,
      title: 'Military-Grade Encryption',
      description: 'AES-256-GCM encryption for all your data',
      status: 'enabled',
      action: null
    },
    {
      icon: Key,
      title: 'Password Manager',
      description: 'Secure password storage and generation',
      status: 'enabled',
      action: null
    },
    {
      icon: Eye,
      title: 'Privacy Mode',
      description: 'Hide sensitive information from screenshots',
      status: 'disabled',
      action: null
    },
    {
      icon: Bell,
      title: 'Security Alerts',
      description: 'Get notified of suspicious activity',
      status: 'enabled',
      action: null
    },
    {
      icon: Cpu,
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition',
      status: 'disabled',
      action: null
    }
  ]

  const recentActivity = [
    {
      action: 'Login',
      device: 'Chrome on Windows',
      location: 'New York, US',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      action: 'File Download',
      device: 'Safari on macOS',
      location: 'San Francisco, US',
      time: '1 hour ago',
      status: 'success'
    },
    {
      action: 'Failed Login',
      device: 'Firefox on Linux',
      location: 'London, UK',
      time: '3 hours ago',
      status: 'failed'
    }
  ]

  const getStatusIcon = (status: string) => {
    return status === 'enabled' || status === 'success' 
      ? <CheckCircle className="w-5 h-5 text-green-400" />
      : <XCircle className="w-5 h-5 text-red-400" />
  }

  const getStatusColor = (status: string) => {
    return status === 'enabled' || status === 'success' 
      ? 'text-green-400' 
      : 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Security Settings</h1>
        <p className="text-gray-400">Manage your account security and privacy settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Features */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Security Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <feature.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                    {getStatusIcon(feature.status)}
                    {feature.action && (
                      <button
                        onClick={feature.action}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Settings2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(activity.status)}
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">
                        {activity.device} • {activity.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                    <p className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status === 'success' ? 'Secure' : 'Blocked'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Security Settings */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Security Preferences</h3>
            
            <div className="space-y-6">
              {/* Session Timeout */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Session Timeout
                </label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Encryption Level */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Default Encryption
                </label>
                <select
                  value={encryptionLevel}
                  onChange={(e) => setEncryptionLevel(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="standard">Standard (AES-128)</option>
                  <option value="military">Military Grade (AES-256-GCM)</option>
                </select>
              </div>

              {/* Download Restrictions */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Download Restrictions
                </label>
                <div className="space-y-2">
                  {['Require password for downloads', 'Limit downloads per day', 'Block unknown devices'].map(option => (
                    <label key={option} className="flex items-center gap-3 text-gray-300 text-sm">
                      <input type="checkbox" className="rounded bg-gray-600 border-gray-500" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Score */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Excellent</h3>
            <p className="text-gray-300 text-sm">Your security settings are optimized</p>
            <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full w-4/5"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
