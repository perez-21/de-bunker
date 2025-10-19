"use client"

import { motion } from 'framer-motion'
import { Download, Eye, Shield, Clock, User, FileText, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { fileExchangeContract } from '@/app/shared/contractInfo'
import { useWeb3 } from '@/app/hooks/useWeb3'

export default function ReceivedPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'downloaded'>('all')
  const [receivedFiles, setReceivedFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { provider, isConnected, account } = useWeb3()

  // Mock data - replace with actual blockchain data
  const mockFiles = [
    {
      id: '1',
      name: 'Quarterly_Report.pdf',
      size: '2.4 MB',
      from: { name: 'John Smith', email: 'john@company.com' },
      sentAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-01-22T10:30:00Z',
      status: 'unread',
      encryption: 'military'
    },
    {
      id: '2',
      name: 'Contract_Agreement.docx',
      size: '1.8 MB',
      from: { name: 'Sarah Wilson', email: 'sarah@partner.com' },
      sentAt: '2024-01-14T14:20:00Z',
      expiresAt: '2024-01-21T14:20:00Z',
      status: 'downloaded',
      encryption: 'standard'
    },
    {
      id: '3',
      name: 'Project_Presentation.pptx',
      size: '15.2 MB',
      from: { name: 'Mike Johnson', email: 'mike@client.com' },
      sentAt: '2024-01-13T09:15:00Z',
      expiresAt: '2024-01-20T09:15:00Z',
      status: 'unread',
      encryption: 'military'
    }
  ]

  useEffect(() => {
    const fetchReceivedFiles = async () => {
      setIsLoading(true)
      
      try {
        if (isConnected && provider && account) {
          // Create contract instance with provider
          const contract = new ethers.Contract(
            fileExchangeContract.address, 
            fileExchangeContract.ABI, 
            provider
          )

          // Listen for events (optional - for real-time updates)
          const eventFilter = contract.filters.KeySent(account)
          
          contract.on(eventFilter, (receiver, encryptedKey, event) => {
            console.log('New file received!', event)
            // Handle new file event - you might want to refetch files here
          })

          // Fetch files from blockchain (you'll need to implement this based on your contract)
          // const filesFromBlockchain = await contract.getReceivedFiles(account)
          // setReceivedFiles(filesFromBlockchain)
          
          // For now, use mock data
          setReceivedFiles(mockFiles)
        } else {
          // Use mock data when not connected
          setReceivedFiles(mockFiles)
        }
      } catch (error) {
        console.error('Error fetching received files:', error)
        // Fallback to mock data
        setReceivedFiles(mockFiles)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReceivedFiles()

    // Cleanup event listeners
    return () => {
      if (provider && isConnected) {
        // You might want to remove event listeners here
      }
    }
  }, [isConnected, provider, account])

  const filteredFiles = receivedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.from.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || file.status === filter
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days} days` : 'Expired'
  }

  const handleDownload = async (fileId: string) => {
    // Implement download logic here
    console.log('Downloading file:', fileId)
    // You'll need to:
    // 1. Get encrypted file from IPFS
    // 2. Get encrypted key from blockchain
    // 3. Decrypt the key
    // 4. Decrypt the file
    // 5. Download the file
  }

  const handleViewDetails = (fileId: string) => {
    // Implement view details logic
    console.log('Viewing details for file:', fileId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading received files...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Received Files</h1>
        <p className="text-gray-400">Access files securely shared with you</p>
        
        {/* Connection Status */}
        {!isConnected && (
          <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            <p className="text-amber-400 text-sm">
              Connect your wallet to access blockchain-stored files
            </p>
          </div>
        )}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'unread', label: 'Unread' },
            { id: 'downloaded', label: 'Downloaded' }
          ].map(filterOption => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterOption.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700/50 text-gray-400 hover:text-white'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors w-64"
          />
        </div>
      </motion.div>

      {/* Files Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            {/* File Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  file.encryption === 'military' ? 'bg-green-500/20' : 'bg-blue-500/20'
                }`}>
                  <Shield className={`w-5 h-5 ${
                    file.encryption === 'military' ? 'text-green-400' : 'text-blue-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm line-clamp-1">{file.name}</h3>
                  <p className="text-gray-400 text-xs">{file.size}</p>
                </div>
              </div>
              {file.status === 'unread' && (
                <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">New</span>
              )}
            </div>

            {/* Sender Info */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {file.from.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{file.from.name}</p>
                <p className="text-gray-400 text-xs">{file.from.email}</p>
              </div>
            </div>

            {/* File Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Sent</span>
                <span className="text-white">{formatDate(file.sentAt)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Expires</span>
                <span className="text-amber-400">{getTimeRemaining(file.expiresAt)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Encryption</span>
                <span className="text-green-400">{file.encryption === 'military' ? 'Military' : 'Standard'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleDownload(file.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 rounded-lg transition-all duration-300 text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button 
                onClick={() => handleViewDetails(file.id)}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No files found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Files shared with you will appear here'}
          </p>
        </motion.div>
      )}
    </div>
  )
}