// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import DashboardSidebar from "../components/dashboard/DashboardSidebar"
// import DashboardHeader from "../components/dashboard/DashboardHeader"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
//       {/* Sidebar */}
//       <DashboardSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* Main Content */}
//       <div
//         className={`
//           flex-1 flex flex-col transition-all duration-300
//           lg:ml-0
//         `}
//       >
//         {/* Header */}
//         <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={(children as any)?.key || "content"}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {children}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   )
// }










"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "../components/dashboard/DashboardSidebar"
import DashboardHeader from "../components/dashboard/DashboardHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Sidebar - Fixed and non-scrollable */}
      <div className="fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 lg:min-h-screen">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <main className="h-full p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={(children as any)?.key || "content"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}