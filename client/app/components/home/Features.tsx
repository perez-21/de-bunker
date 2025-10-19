"use client"

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, RefreshCw, Cpu, Database, Key, Globe } from 'lucide-react';

const features = [
  {
    title: 'Blockchain Security',
    description: 'Leveraging decentralized technology with immutable audit trails and cryptographic verification for unparalleled data protection',
    icon: Database,
    gradient: 'from-blue-400 to-cyan-400',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    features: ['Immutable audit trails', 'Smart contract verification', 'Decentralized storage']
  },
  {
    title: 'Zero-Knowledge Proofs',
    description: 'Advanced cryptographic protocols that verify data authenticity without exposing any sensitive information',
    icon: Eye,
    gradient: 'from-purple-400 to-pink-400',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    features: ['ZK-SNARKs protocol', 'Privacy-preserving verification', 'Cryptographic proofs']
  },
  {
    title: 'Military-Grade Encryption',
    description: 'AES-256-GCM encryption with perfect forward secrecy ensuring your data remains protected at all times',
    icon: Shield,
    gradient: 'from-green-400 to-emerald-400',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    features: ['AES-256-GCM standard', 'Perfect forward secrecy', 'Quantum-resistant algorithms']
  },
  {
    title: 'Cross-Platform Sync',
    description: 'Seamless and secure synchronization across all your devices with end-to-end encrypted cloud backup',
    icon: RefreshCw,
    gradient: 'from-orange-400 to-red-400',
    bgGradient: 'from-orange-500/10 to-red-500/10',
    features: ['End-to-end encrypted sync', 'Real-time updates', 'Offline access']
  },
  {
    title: 'Multi-Factor Authentication',
    description: 'Advanced multi-layered security with biometric verification and hardware key support',
    icon: Key,
    gradient: 'from-cyan-400 to-blue-400',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
    features: ['Biometric verification', 'Hardware key support', 'Time-based OTP']
  },
  {
    title: 'Global Infrastructure',
    description: 'Worldwide distributed nodes ensuring 99.9% uptime and low-latency access from anywhere',
    icon: Globe,
    gradient: 'from-pink-400 to-purple-400',
    bgGradient: 'from-pink-500/10 to-purple-500/10',
    features: ['Global CDN network', '99.9% uptime SLA', 'Edge computing']
  }
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
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
              ENTERPRISE FEATURES
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
              Advanced
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Security Features
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Enterprise-grade security features built with cutting-edge technology to protect your most sensitive data
            <span className="text-cyan-300 font-semibold"> across all platforms and devices</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 h-full group-hover:border-gray-600/50 transition-all duration-500">
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.bgGradient} mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                </motion.div>

                {/* Content */}
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-4`}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-center text-gray-400 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * itemIndex }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "256-bit", label: "Encryption Standard" },
            { number: "99.99%", label: "Uptime SLA" },
            { number: "0", label: "Security Breaches" },
            { number: "150+", label: "Countries Served" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;