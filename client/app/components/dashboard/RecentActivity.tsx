"use client"

import { motion } from 'framer-motion'
import { Upload, Download, Shield, Eye } from 'lucide-react'

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'upload',
      icon: Upload,
      action: 'File Sent',
      file: 'financial_report.pdf',
      to: 'john@company.com',
      time: '2 minutes ago',
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'download',
      icon: Download,
      action: 'File Received',
      file: 'contract_agreement.docx',
      from: 'sarah@partner.com',
      time: '1 hour ago',
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'security',
      icon: Shield,
      action: 'Security Update',
      file: '2FA Enabled',
      from: 'System',
      time: '2 hours ago',
      color: 'text-cyan-400'
    },
    {
      id: 4,
      type: 'upload',
      icon: Upload,
      action: 'File Sent',
      file: 'presentation_deck.pptx',
      to: 'team@project.com',
      time: '5 hours ago',
      color: 'text-green-400'
    }
  ]

  return (
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
            className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
          >
            <div className={`p-2 rounded-lg bg-gray-600/50`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium text-sm">{activity.action}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
              <p className="text-gray-400 text-sm mt-1">{activity.file}</p>
              <p className="text-gray-500 text-xs mt-1">
                {activity.to ? `To: ${activity.to}` : `From: ${activity.from}`}
              </p>
            </div>

            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity