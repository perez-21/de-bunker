



"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Shield, Key, CreditCard, LogIn, FileText, Eye, CheckCircle } from "lucide-react"
import ActivityModal from "./ActivityModal"
import AuthorizationModal from "../modal/authorize"
import { useWeb3 } from "../../hooks/useWeb3"

interface Activity {
  id: string
  type: "login" | "creditcard" | "securenote" | "walletaddress" | "security"
  icon: any
  action: string
  description: string
  time: string
  color: string
  status?: "pending" | "confirmed" | "failed"
  address?: string
}

export default function RecentActivity() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const { isConnected } = useWeb3()

  const activities: Activity[] = [
    {
      id: "1",
      type: "login",
      icon: LogIn,
      action: "Login",
      description: "Accessed vault via biometric authentication",
      time: "2 minutes ago",
      color: "text-green-400",
      status: "confirmed"
    },
    {
      id: "2",
      type: "creditcard",
      icon: CreditCard,
      action: "Credit Card Viewed",
      description: "Viewed encrypted card details",
      time: "25 minutes ago",
      color: "text-blue-400",
      status: "confirmed"
    },
    {
      id: "3",
      type: "securenote",
      icon: FileText,
      action: "Secure Note Edited",
      description: "Updated recovery phrase note",
      time: "1 hour ago",
      color: "text-yellow-400",
      status: "pending"
    },
    {
      id: "4",
      type: "walletaddress",
      icon: Key,
      action: "Wallet Address Added",
      description: "New ETH address linked to vault",
      time: "3 hours ago",
      color: "text-cyan-400",
      status: "confirmed"
    },
    {
      id: "5",
      type: "security",
      icon: Shield,
      action: "Two-Factor Enabled",
      description: "Activated 2FA security layer",
      time: "Yesterday",
      color: "text-purple-400",
      status: "confirmed"
    }
  ]

  // Handle click on an activity
  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setShowAuth(true) // Require authorization before opening ActivityModal
  }

  // Called by AuthorizationModal
  const handleAuthorize = async (privateKey: string): Promise<boolean> => {
    // You could add your own private key verification logic here
    // e.g., verify the key matches the connected wallet
    console.log("Authorizing with private key:", privateKey)

    // For demo, simulate a small delay and "success"
    await new Promise((res) => setTimeout(res, 1000))
    setShowAuth(false)
    setIsModalOpen(true) // Open the ActivityModal after authorization
    return true
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-3 h-3 text-green-400" />
      case "pending":
        return <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
      case "failed":
        return <div className="w-3 h-3 bg-red-400 rounded-full" />
      default:
        return null
    }
  }

  return (
    <>
      {/* Activity List */}
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
              onClick={() => handleActivityClick(activity)}
              className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-gray-600/50 group-hover:scale-110 transition-transform">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{activity.action}</p>
                    {getStatusIcon(activity.status)}
                  </div>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
                <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
              </div>

              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Authorization Modal */}
      {showAuth && (
        <AuthorizationModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onAuthorize={handleAuthorize}
          actionDescription={`Authorize access to "${selectedActivity?.action}"`}
          requiredPermissions={["View activity details"]}
          contractAddress="0x8dAE...A21f"
          estimatedGas="0.0021 ETH"
        />
      )}

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
      />
    </>
  )
}
