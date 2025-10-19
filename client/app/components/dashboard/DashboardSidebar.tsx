"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Shield,
  Upload,
  Download,
  FileText,
  Settings,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Key,
  CreditCard,
  StickyNote,
  Wallet,
  Lock, // ✅ added
} from "lucide-react"

import { usePathname } from "next/navigation"
import Link from "next/link"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Upload, label: "Send Files", href: "/dashboard/send" },
  { icon: Download, label: "Received", href: "/dashboard/received" },
  { icon: FileText, label: "My Vault", href: "/dashboard/vault" },
  { icon: Users, label: "Contacts", href: "/dashboard/contacts" },
  { icon: Shield, label: "Security", href: "/dashboard/security" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

const vaultCategories = [
  { icon: Key, label: "Logins", count: 24, color: "text-blue-400" },
  { icon: CreditCard, label: "Cards", count: 5, color: "text-green-400" },
  { icon: StickyNote, label: "Notes", count: 12, color: "text-yellow-400" },
  { icon: Wallet, label: "Wallets", count: 8, color: "text-purple-400" },
]

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showVaultCategories, setShowVaultCategories] = useState(false)

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...")
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarWidth = isCollapsed ? "w-20" : "w-64"

  // Improved active state check that includes nested routes
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 ${sidebarWidth}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 
          lg:static lg:z-auto lg:h-screen
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3 flex-1">
              {/* Logo and Company Name */}
              <Link href="/dashboard" className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-50" />
                  <img 
                    src="/logo.png" 
                    alt="GWAG Logo" 
                    className="relative w-8 h-8 rounded-lg object-contain"
                  />
                </div>
                {!isCollapsed && (
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    De-bunker
                  </span>
                )}
              </Link>

              {/* Collapse Button - Always visible on desktop */}
              <button
                onClick={toggleCollapse}
                className="hidden lg:flex p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Close button (mobile only) */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Collapse Toggle (desktop only) - Alternative position */}
          {/*<button
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 mx-3 mt-3 mb-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>*/}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.href)
                const isVault = item.label === "My Vault"
                
                return (
                  <li key={item.href}>
                    <div>
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (isVault && !isCollapsed) {
                            e.preventDefault()
                            setShowVaultCategories(!showVaultCategories)
                          } else {
                            onClose()
                          }
                        }}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                          active
                            ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white shadow-lg shadow-blue-500/10"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/80 border border-transparent"
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <item.icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'group-hover:text-blue-300'}`} />
                        {!isCollapsed && (
                          <span className={`font-medium ${active ? 'text-white' : 'group-hover:text-white'}`}>
                            {item.label}
                          </span>
                        )}
                      </Link>

                      {/* Vault Subcategories */}
                      {isVault && !isCollapsed && showVaultCategories && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1 border-l border-gray-700/50 pl-2"
                        >
                          {vaultCategories.map((category) => {
                            const categoryHref = `/dashboard/vault/${category.label.toLowerCase()}`
                            const isCategoryActive = pathname === categoryHref
                            
                            return (
                              <Link
                                key={category.label}
                                href={categoryHref}
                                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                  isCategoryActive
                                    ? "bg-gray-800/80 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                }`}
                              >
                                <category.icon className={`w-4 h-4 ${category.color}`} />
                                <span className="text-sm flex-1">{category.label}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  isCategoryActive 
                                    ? "bg-blue-500/20 text-blue-300" 
                                    : "bg-gray-700/50 text-gray-400"
                                }`}>
                                  {category.count}
                                </span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 space-y-2 border-t border-gray-700/50">
            {/* Security Status */}
            {!isCollapsed && (
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Lock className="w-4 h-4 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Session Secure</p>
                  <p className="text-xs text-green-400">Encrypted</p>
                </div>
              </div>
            )}

            {isCollapsed && (
              <div className="flex justify-center p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Lock className="w-4 h-4 text-green-400" />
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 w-full group ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 group-hover:text-red-300" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar