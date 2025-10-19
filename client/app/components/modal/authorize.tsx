"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Eye, 
  EyeOff, 
  Key, 
  Shield, 
  AlertTriangle, 
  CheckCircle2,
  Copy,
  ExternalLink
} from "lucide-react"

interface AuthorizationModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthorize: (privateKey: string) => Promise<boolean>
  actionDescription: string
  requiredPermissions?: string[]
  contractAddress?: string
  estimatedGas?: string
}

export default function AuthorizationModal({
  isOpen,
  onClose,
  onAuthorize,
  actionDescription,
  requiredPermissions = [],
  contractAddress,
  estimatedGas
}: AuthorizationModalProps) {
  const [privateKey, setPrivateKey] = useState("")
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleAuthorize = async () => {
    if (!privateKey.trim()) {
      setError("Please enter your private key")
      return
    }

    // Basic private key validation
    if (!privateKey.match(/^[a-fA-F0-9]{64}$/) && !privateKey.startsWith('0x')) {
      setError("Invalid private key format. Must be 64 hex characters or start with 0x")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await onAuthorize(privateKey)
      if (success) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          resetModal()
        }, 2000)
      } else {
        setError("Authorization failed. Please check your private key and try again.")
      }
    } catch (err) {
      setError("Authorization error. Please try again.")
      console.error("Authorization error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setPrivateKey("")
    setShowPrivateKey(false)
    setError("")
    setSuccess(false)
    setIsLoading(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatPrivateKey = (key: string) => {
    if (key.length <= 12) return key
    return `${key.slice(0, 8)}...${key.slice(-8)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Authorization Required</h2>
                  <p className="text-gray-400 text-sm">Confirm this action with your private key</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Action Description */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm font-medium">{actionDescription}</p>
              </div>

              {/* Transaction Details */}
              {(contractAddress || estimatedGas || requiredPermissions.length > 0) && (
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-sm">Transaction Details</h3>
                  
                  {contractAddress && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Contract</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-xs">
                          {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(contractAddress)}
                          className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {estimatedGas && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Estimated Gas</span>
                      <span className="text-yellow-400 font-medium">{estimatedGas}</span>
                    </div>
                  )}

                  {requiredPermissions.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-gray-400 text-sm">Required Permissions:</span>
                      <div className="space-y-1">
                        {requiredPermissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-white">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Private Key Input */}
              <div className="space-y-3">
                <label className="text-white font-semibold text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  Private Key
                </label>
                
                <div className="relative">
                  <input
                    type={showPrivateKey ? "text" : "password"}
                    value={privateKey}
                    onChange={(e) => {
                      setPrivateKey(e.target.value)
                      setError("")
                    }}
                    placeholder="Enter your private key (0x... or 64 hex characters)"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
                    disabled={isLoading}
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Security Warning */}
                <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 text-sm font-medium">Security Notice</p>
                    <p className="text-red-400 text-xs">
                      Your private key is never stored or transmitted. It's only used locally to sign this transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <p className="text-green-300 text-sm">Authorization successful! Transaction submitted.</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-700/50">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={handleAuthorize}
                disabled={isLoading || !privateKey.trim() || success}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Authorizing...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Success
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Authorize
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}