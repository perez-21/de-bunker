"use client"

import { motion } from 'framer-motion';
import { Cpu, Shield, Mail, MapPin, Phone, Twitter, Github, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Security", href: "#security" },
        { name: "Enterprise", href: "#enterprise" },
        { name: "Pricing", href: "#pricing" },
        { name: "API Docs", href: "#api" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "For Business", href: "#business" },
        { name: "For Developers", href: "#developers" },
        { name: "For Enterprises", href: "#enterprises" },
        { name: "Case Studies", href: "#cases" },
        { name: "Integrations", href: "#integrations" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Security", href: "#security-policy" },
        { name: "Compliance", href: "#compliance" },
        { name: "DPA", href: "#dpa" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-300" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-500" }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@de-bunker.com", href: "mailto:hello@de-bunker.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-50"></div>
                <Cpu className="relative w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                DE-BUNKER
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-6 leading-relaxed max-w-md"
            >
              Web3-powered secure data transfer platform protecting your digital identity across all platforms with military-grade encryption.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                {section.title}
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm">
                Get the latest security insights and product updates delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              <p>&copy; {currentYear} DE-BUNKER. All rights reserved.</p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800/50`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <Shield className="w-4 h-4 text-green-400" />
              <span>SOC 2 Compliant • GDPR Ready</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;