"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Globe, User, Lock, Link as LinkIcon, FileText, Shield, CheckCircle } from "lucide-react"

interface AddLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newLogin: Partial<LoginItem>) => void
}

export interface NewLoginData {
  website: string
  username: string
  password: string
  url: string
  category: string
  notes?: string
  twoFactorEnabled: boolean
}

export default function AddLoginModal({ isOpen, onClose, onSave }: AddLoginModalProps) {
  const [formData, setFormData] = useState<NewLoginData>({
    website: "",
    username: "",
    password: "",
    url: "",
    category: "",
    notes: "",
    twoFactorEnabled: false,
  })

  const handleChange = (key: keyof NewLoginData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.website || !formData.username || !formData.password) return
    onSave(formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-lg p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Add New Login
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Website */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Website</label>
                <div className="flex items-center bg-gray-800/50 rounded-lg p-2">
                  <Globe className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Website URL</label>
                <div className="flex items-center bg-gray-800/50 rounded-lg p-2">
                  <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Username / Email</label>
                <div className="flex items-center bg-gray-800/50 rounded-lg p-2">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="johndoe@example.com"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Password</label>
                <div className="flex items-center bg-gray-800/50 rounded-lg p-2">
                  <Lock className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="Social / Finance / Work"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Notes</label>
                <div className="flex items-start bg-gray-800/50 rounded-lg p-2">
                  <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder="Any additional information..."
                    rows={3}
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500 resize-none"
                  />
                </div>
              </div>

              {/* 2FA */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.twoFactorEnabled}
                  onChange={(e) => handleChange("twoFactorEnabled", e.target.checked)}
                  id="2fa"
                  className="accent-cyan-500"
                />
                <label htmlFor="2fa" className="text-gray-300 text-sm">
                  Two-factor authentication enabled
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
