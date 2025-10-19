"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Copy, CheckCircle, Clock, AlertCircle, Download, Upload, Shield } from 'lucide-react'
import { useState } from 'react'
import { useWeb3 } from '../../hooks/useWeb3'

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activity: any
}

const ActivityModal = ({ isOpen, onClose, activity }: ActivityModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { getTransactionDetails, getGasDetails } = useWeb3()

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-6 h-6 text-red-400" />
      case 'download':
        return <Download className="w-6 h-6 text-green-400" />
      case 'security':
        return <Shield className="w-6 h-6 text-cyan-400" />
      default:
        return <Download className="w-6 h-6 text-blue-400" />
    }
  }

  if (!activity) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{activity.action}</h3>
                  <p className="text-gray-400 text-sm">{activity.file}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(activity.status)}
                  <span className="text-white font-medium capitalize">
                    {activity.status}
                  </span>
                </div>
              </div>

              {/* Amount */}
              {activity.amount && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-semibold">{activity.amount}</span>
                </div>
              )}

              {/* Transaction Hash */}
              {activity.txHash && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Transaction Hash</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(activity.txHash, 'txHash')}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                        title="Copy transaction hash"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://etherscan.io/tx/${activity.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="View on Etherscan"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-white font-mono text-sm break-all">
                      {activity.txHash}
                    </p>
                    {copiedField === 'txHash' && (
                      <p className="text-green-400 text-xs mt-1">Copied!</p>
                    )}
                  </div>
                </div>
              )}

              {/* From/To Address */}
              {(activity.from || activity.to) && (
                <div>
                  <span className="text-gray-400 block mb-2">
                    {activity.from ? 'From' : 'To'}
                  </span>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-mono text-sm">
                        {activity.from || activity.to}
                      </p>
                      <button
                        onClick={() => copyToClipboard(activity.from || activity.to, 'address')}
                        className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {copiedField === 'address' && (
                      <p className="text-green-400 text-xs mt-1">Copied!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time</span>
                <span className="text-white">{activity.time}</span>
              </div>

              {/* Network */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Network</span>
                <span className="text-cyan-400">Ethereum Mainnet</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ActivityModal