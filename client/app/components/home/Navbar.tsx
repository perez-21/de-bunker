"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Menu, X, Lock, Cpu, ArrowRight, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    products: [
      { name: 'Secure Transfer', description: 'End-to-end encrypted file sharing', href: '#', icon: Lock },
      { name: 'Data Vault', description: 'Encrypted cloud storage', href: '#', icon: Shield },
      { name: 'Identity Guard', description: 'Digital identity protection', href: '#', icon: Cpu },
    ],
    solutions: [
      { name: 'Enterprise', description: 'For large organizations', href: '#' },
      { name: 'Business', description: 'For small to medium businesses', href: '#' },
      { name: 'Personal', description: 'For individual users', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Careers', href: '#' },
    ]
  };


const connectWallet = async () => {
  try {
    if (typeof window === "undefined") return alert("Window not available");
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it to continue.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log("Connected wallet:", account);
    alert(`Connected as ${account}`);
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Failed to connect wallet.");
  }
};





  return (
    <>
     <motion.nav
  className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-700 ${
    isScrolled
      ? 'bg-gray-900/95 border-gray-800/50 shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
      : 'bg-gradient-to-b from-black/40 to-transparent border-transparent'
  }`}
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6 }}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
          <motion.div 
  className="flex items-center gap-3"
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  <div className="relative">
    <div className={`absolute inset-0 rounded-xl ${
      isScrolled ? 'bg-blue-500' : 'bg-blue-400'
    } blur-md opacity-50`}></div>
    {/* Replace with your logo */}
    <img 
      src="/logo.png" 
      alt="GWAG Logo" 
      className="relative w-8 h-8 rounded-lg object-contain"
    />
  </div>
  <span className={`text-xl font-bold bg-gradient-to-r ${
    isScrolled 
      ? 'from-blue-400 to-cyan-300' 
      : 'from-white to-blue-100'
  } bg-clip-text text-transparent`}>
    GWAG
  </span>
</motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 font-medium group">
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'products' ? 'rotate-180' : ''
                  } group-hover:rotate-180`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl p-4"
                    >
                      <div className="space-y-2">
                        {navigation.products.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
                          >
                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                              <item.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {item.description}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 font-medium group">
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  } group-hover:rotate-180`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl p-4"
                    >
                      <div className="space-y-2">
                        {navigation.solutions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
                          >
                            <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {item.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Links */}
              {navigation.company.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
             <button
  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
  onClick={connectWallet}
>
  Sign In
</button>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
  onClick={connectWallet}
>
  <Shield className="w-4 h-4" />
  Get Started
</motion.button>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Products Mobile */}
                <div>
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Products
                  </div>
                  <div className="space-y-2">
                    {navigation.products.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{item.name}</div>
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Solutions Mobile */}
                <div>
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Solutions
                  </div>
                  <div className="space-y-2">
                    {navigation.solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Company Mobile */}
                <div>
                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Company
                  </div>
                  <div className="space-y-2">
                    {navigation.company.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block p-3 text-white font-medium rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <button 
                    className="w-full text-center text-gray-300 hover:text-white transition-colors duration-200 font-medium py-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Navbar;