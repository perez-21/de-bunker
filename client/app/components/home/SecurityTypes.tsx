"use client"

import { motion } from 'framer-motion';
import { Shield, Lock, CreditCard, FileText, Wallet, Key, Eye, CheckCircle, Cpu } from 'lucide-react';

const securityTypes = [
  {
    id: 'login',
    title: 'Login Credentials',
    description: 'Secure transfer of usernames and passwords with military-grade end-to-end encryption and zero-knowledge architecture',
    icon: Key,
    features: ['End-to-end encryption', 'Zero-knowledge proof', 'Multi-factor authentication', 'Biometric verification'],
    gradient: 'from-green-400 to-cyan-400',
    bgGradient: 'from-green-500/10 to-cyan-500/10'
  },
  {
    id: 'creditcard',
    title: 'Payment Information',
    description: 'PCI DSS compliant protection for credit cards and banking details with real-time fraud detection',
    icon: CreditCard,
    features: ['PCI DSS Level 1 Certified', 'Dynamic tokenization', 'Real-time fraud detection', '3D Secure support'],
    gradient: 'from-blue-400 to-purple-400',
    bgGradient: 'from-blue-500/10 to-purple-500/10'
  },
  {
    id: 'securenote',
    title: 'Secure Documents',
    description: 'Encrypted storage and transfer for sensitive documents, notes, and confidential files',
    icon: FileText,
    features: ['AES-256-GCM encryption', 'Secure sharing controls', 'Version history', 'Digital signatures'],
    gradient: 'from-purple-400 to-pink-400',
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    id: 'wallet',
    title: 'Crypto Assets',
    description: 'Blockchain-verified secure transfer of cryptocurrency wallets and digital asset keys',
    icon: Wallet,
    features: ['Multi-signature support', 'Cold storage integration', 'Gas optimization', 'Cross-chain compatibility'],
    gradient: 'from-orange-400 to-red-400',
    bgGradient: 'from-orange-500/10 to-red-500/10'
  }
];

const SecurityTypes = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Elements Matching Hero */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-300"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-32">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8"
          >
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">
              PROTECTED DATA TYPES
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Secure
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Everything
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            End-to-end encrypted transfer for your most sensitive information across all major data categories
            <span className="text-cyan-300 font-semibold"> with blockchain-verified security protocols</span>
          </motion.p>
        </motion.div>

        {/* Security Type Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {securityTypes.map((type, index) => (
            <motion.div
              key={type.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 h-full group-hover:border-gray-600/50 transition-all duration-500 overflow-hidden">
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.bgGradient} mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <type.icon className={`w-8 h-8 bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`} />
                </motion.div>

                {/* Content */}
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent mb-4`}>
                  {type.title}
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {type.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {type.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * featureIndex }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-3"
            >
              <Shield className="w-5 h-5" />
              <span>Start Protecting Data</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50 -z-10"></div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group border border-gray-600 hover:border-gray-400 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3"
            >
              <Eye className="w-5 h-5" />
              <span>View Security Demo</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityTypes;