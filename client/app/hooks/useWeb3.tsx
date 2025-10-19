"use client"

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export const useWeb3 = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          const web3Provider = new ethers.BrowserProvider(window.ethereum)
          const web3Signer = await web3Provider.getSigner()
          setProvider(web3Provider)
          setSigner(web3Signer)
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const getTransactionDetails = async (txHash: string) => {
    if (!provider) throw new Error('Provider not connected')
    
    try {
      const tx = await provider.getTransaction(txHash)
      const receipt = await provider.getTransactionReceipt(txHash)
      
      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value || '0'),
        gasPrice: ethers.formatUnits(tx.gasPrice || '0', 'gwei'),
        gasUsed: receipt?.gasUsed.toString(),
        status: receipt?.status === 1 ? 'confirmed' : 'failed',
        blockNumber: tx.blockNumber,
        timestamp: Date.now() // You might want to fetch actual block timestamp
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error)
      throw error
    }
  }

  const getGasDetails = async () => {
    if (!provider) throw new Error('Provider not connected')
    
    try {
      const feeData = await provider.getFeeData()
      return {
        gasPrice: ethers.formatUnits(feeData.gasPrice || '0', 'gwei'),
        maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas || '0', 'gwei'),
        maxPriorityFeePerGas: ethers.formatUnits(feeData.maxPriorityFeePerGas || '0', 'gwei')
      }
    } catch (error) {
      console.error('Error fetching gas details:', error)
      throw error
    }
  }

  return {
    isConnected,
    provider,
    signer,
    getTransactionDetails,
    getGasDetails,
    checkConnection
  }
}