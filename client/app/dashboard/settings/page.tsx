"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Mail, Bell, Globe, CreditCard, Shield, Download, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    company: 'Tech Corp Inc.',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'America/New_York'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ]

  const notificationSettings = [
    { id: 'email', label: 'Email Notifications', description: 'Receive updates via email', enabled: true },
    { id: 'push', label: 'Push Notifications', description: 'Get real-time alerts', enabled: true },
    { id: 'security', label: 'Security Alerts', description: 'Important security updates', enabled: true },
    { id: 'marketing', label: 'Marketing Emails', description: 'Product updates and news', enabled: false }
  ]

  const billingPlans = [
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$29',
      period: 'month',
      features: ['500GB Storage', 'Unlimited Transfers', 'Priority Support', 'Advanced Security'],
      current: true
    },
    {
      id: 'business',
      name: 'Business Plan',
      price: '$79',
      period: 'month',
      features: ['2TB Storage', 'Team Management', 'SLA Guarantee', 'Custom Branding'],
      current: false
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
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and settings</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-64 flex-shrink-0"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
              
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    JD
                  </div>
                  <div>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                      Change Avatar
                    </button>
                    <p className="text-gray-400 text-xs mt-2">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Company</label>
                    <input
                      type="text"
                      value={userData.company}
                      onChange={(e) => setUserData({...userData, company: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Language</label>
                    <select
                      value={userData.language}
                      onChange={(e) => setUserData({...userData, language: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Timezone</label>
                    <select
                      value={userData.timezone}
                      onChange={(e) => setUserData({...userData, timezone: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-700">
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
                    Save Changes
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                {notificationSettings.map(setting => (
                  <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                    <div>
                      <h4 className="text-white font-semibold text-sm">{setting.label}</h4>
                      <p className="text-gray-400 text-xs">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.enabled}
                        className="sr-only peer"
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 mt-6 border-t border-gray-700">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Current Plan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {billingPlans.map(plan => (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-xl border ${
                        plan.current
                          ? 'bg-cyan-500/10 border-cyan-500/30'
                          : 'bg-gray-700/30 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold">{plan.name}</h4>
                        {plan.current && (
                          <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400">/{plan.period}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {plan.features.map(feature => (
                          <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        className={`w-full py-2 rounded-lg transition-all ${
                          plan.current
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                        }`}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : 'Upgrade Plan'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Billing History</h3>
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No billing history available</p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              {/* Data Export */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Data Export</h3>
                <p className="text-gray-400 mb-4">Download a copy of your personal data</p>
                <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              {/* Account Deletion */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Delete Account</h3>
                <p className="text-gray-400 mb-4">Permanently delete your account and all associated data</p>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}