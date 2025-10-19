"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Upload, 
  Shield,
  Key,
  CreditCard,
  FileText,
  Wallet,
  LogIn,
  Eye,
  EyeOff,
  Lock,
  Globe,
  User,
  Calendar,
  Cpu,
  Network
} from 'lucide-react'
import { useState } from 'react'
import { useWeb3 } from '../../hooks/useWeb3'

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activity: any
}

const ActivityModal = ({ isOpen, onClose, activity }: ActivityModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showSensitiveData, setShowSensitiveData] = useState(false)
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
      case 'login':
        return <LogIn className="w-6 h-6 text-green-400" />
      case 'creditcard':
        return <CreditCard className="w-6 h-6 text-blue-400" />
      case 'securenote':
        return <FileText className="w-6 h-6 text-yellow-400" />
      case 'walletaddress':
        return <Wallet className="w-6 h-6 text-cyan-400" />
      case 'security':
        return <Shield className="w-6 h-6 text-purple-400" />
      default:
        return <FileText className="w-6 h-6 text-gray-400" />
    }
  }

  // Enhanced activity details based on type
  const getActivityDetails = (activity: any) => {
    const baseDetails = {
      timestamp: activity.time,
      status: activity.status,
      description: activity.description
    }

    switch (activity.type) {
      case 'login':
        return {
          ...baseDetails,
          icon: <LogIn className="w-6 h-6 text-green-400" />,
          category: 'Authentication',
          securityLevel: 'High',
          authenticationMethod: 'Biometric',
          device: 'iPhone 14 Pro',
          location: 'New York, US',
          ipAddress: '192.168.1.100',
          sessionDuration: '2 hours',
          sensitiveData: {
            username: 'encrypted_username',
            password: '••••••••',
            twoFactor: 'Enabled'
          }
        }
      
      case 'creditcard':
        return {
          ...baseDetails,
          icon: <CreditCard className="w-6 h-6 text-blue-400" />,
          category: 'Payment Card',
          cardType: 'Visa',
          issuer: 'Chase Bank',
          sensitiveData: {
            cardNumber: '•••• •••• •••• 4242',
            expiryDate: '••/••',
            cvv: '•••',
            cardholder: 'John Doe'
          },
          encryption: 'AES-256',
          lastUsed: '2 days ago',
          usageCount: 12
        }
      
      case 'securenote':
        return {
          ...baseDetails,
          icon: <FileText className="w-6 h-6 text-yellow-400" />,
          category: 'Secure Note',
          noteType: 'Recovery Phrase',
          encryption: 'End-to-End Encrypted',
          sensitiveData: {
            title: 'Crypto Wallet Recovery',
            content: 'Encrypted content - requires authorization to view',
            tags: ['recovery', 'important']
          },
          created: '2024-01-15',
          lastModified: '2 hours ago',
          size: '2.4 KB'
        }
      
      case 'walletaddress':
        return {
          ...baseDetails,
          icon: <Wallet className="w-6 h-6 text-cyan-400" />,
          category: 'Wallet Address',
          network: 'Ethereum Mainnet',
          address: '0x742d35Cc6634C0532925a3b8D...',
          balance: '2.45 ETH',
          value: '$4,250.50',
          transactions: 42,
          firstAdded: '2024-01-10',
          lastActivity: '5 minutes ago'
        }
      
      case 'security':
        return {
          ...baseDetails,
          icon: <Shield className="w-6 h-6 text-purple-400" />,
          category: 'Security Settings',
          setting: 'Two-Factor Authentication',
          previousState: 'Disabled',
          newState: 'Enabled',
          authorizedBy: 'Biometric Auth',
          device: 'MacBook Pro',
          location: 'San Francisco, US',
          securityImpact: 'High'
        }
      
      default:
        return baseDetails
    }
  }

  const renderSensitiveData = (sensitiveData: any, type: string) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Encrypted Data</span>
          <button
            onClick={() => setShowSensitiveData(!showSensitiveData)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
          >
            {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSensitiveData ? 'Hide' : 'Reveal'}
          </button>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
          {Object.entries(sensitiveData).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-400 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span className="text-white font-mono text-sm">
                {showSensitiveData ? value : '••••••••'}
              </span>
            </div>
          ))}
        </div>
        
        {!showSensitiveData && (
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            Sensitive data hidden for security
          </div>
        )}
      </div>
    )
  }

  const renderActivitySpecificDetails = (details: any) => {
    switch (activity.type) {
      case 'login':
        return (
          <div className="space-y-3">
            <DetailRow label="Authentication Method" value={details.authenticationMethod} />
            <DetailRow label="Device" value={details.device} />
            <DetailRow label="Location" value={details.location} />
            <DetailRow label="IP Address" value={details.ipAddress} />
            <DetailRow label="Session Duration" value={details.sessionDuration} />
            <DetailRow label="Security Level" value={details.securityLevel} color="text-green-400" />
          </div>
        )
      
      case 'creditcard':
        return (
          <div className="space-y-3">
            <DetailRow label="Card Type" value={details.cardType} />
            <DetailRow label="Issuer" value={details.issuer} />
            <DetailRow label="Encryption" value={details.encryption} />
            <DetailRow label="Last Used" value={details.lastUsed} />
            <DetailRow label="Usage Count" value={details.usageCount} />
            {renderSensitiveData(details.sensitiveData, 'creditcard')}
          </div>
        )
      
      case 'securenote':
        return (
          <div className="space-y-3">
            <DetailRow label="Note Type" value={details.noteType} />
            <DetailRow label="Encryption" value={details.encryption} />
            <DetailRow label="Created" value={details.created} />
            <DetailRow label="Last Modified" value={details.lastModified} />
            <DetailRow label="Size" value={details.size} />
            {renderSensitiveData(details.sensitiveData, 'securenote')}
          </div>
        )
      
      case 'walletaddress':
        return (
          <div className="space-y-3">
            <DetailRow label="Network" value={details.network} />
            <DetailRow 
              label="Address" 
              value={details.address} 
              isCopyable 
              onCopy={() => copyToClipboard(details.address, 'address')}
            />
            <DetailRow label="Balance" value={details.balance} />
            <DetailRow label="USD Value" value={details.value} color="text-green-400" />
            <DetailRow label="Transactions" value={details.transactions} />
            <DetailRow label="First Added" value={details.firstAdded} />
            <DetailRow label="Last Activity" value={details.lastActivity} />
          </div>
        )
      
      case 'security':
        return (
          <div className="space-y-3">
            <DetailRow label="Setting Changed" value={details.setting} />
            <DetailRow label="Previous State" value={details.previousState} color="text-red-400" />
            <DetailRow label="New State" value={details.newState} color="text-green-400" />
            <DetailRow label="Authorized By" value={details.authorizedBy} />
            <DetailRow label="Device" value={details.device} />
            <DetailRow label="Location" value={details.location} />
            <DetailRow label="Security Impact" value={details.securityImpact} color="text-amber-400" />
          </div>
        )
      
      default:
        return null
    }
  }

  if (!activity) return null

  const details = getActivityDetails(activity)

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
            className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-800/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  {details.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{activity.action}</h3>
                  <p className="text-gray-400 text-sm">{details.category} • {details.description}</p>
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
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Status" value={details.status} />
                <DetailRow label="Time" value={details.timestamp} />
              </div>

              {/* Activity Specific Details */}
              {renderActivitySpecificDetails(details)}

              {/* Security Information */}
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Security Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">Encryption:</span>
                    <span className="text-white">AES-256</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400">Transmission:</span>
                    <span className="text-white">End-to-End</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700 sticky bottom-0 bg-gray-800/90 backdrop-blur-sm">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add export or share functionality
                    console.log('Export activity details')
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Export Details
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper component for detail rows
const DetailRow = ({ 
  label, 
  value, 
  color = "text-white", 
  isCopyable = false, 
  onCopy 
}: any) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 text-sm">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`${color} text-sm font-medium`}>{value}</span>
      {isCopyable && (
        <button
          onClick={onCopy}
          className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
          title={`Copy ${label}`}
        >
          <Copy className="w-3 h-3" />
        </button>
      )}
    </div>
  </div>
)

export default ActivityModal