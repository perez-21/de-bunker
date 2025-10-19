"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Shield,
  Lock,
  Users,
  FileText,
  X,
  Clock,
  Eye,
  Wallet,
  Check,
  Copy
} from "lucide-react";
import { ethers } from "ethers";
import { fileExchangeContract } from "@/app/shared/contractInfo";
import { encryptSecretKey } from "@/app/lib/crypto";
import AuthorizationModal from "@/app/components/modal/authorize";

export default function SendPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [encryptionLevel, setEncryptionLevel] = useState<
    "standard" | "military"
  >("military");
  const [expiry, setExpiry] = useState("24h");
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Authorization handler
  const handleAuthorize = async (key: string): Promise<boolean> => {
    try {
      // Simple validation - in production, you'd verify this against the connected wallet
      if (key.startsWith("0x") && key.length === 66) {
        setIsAuthorized(true);
        setPrivateKey(key);
        setShowAuthModal(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Authorization failed:", err);
      return false;
    }
  };

  // Main send function
  async function handleSendEncryptedFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // Validate inputs
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    if (!walletAddress && selectedContacts.length === 0) {
      alert("Please select recipients or enter a wallet address.");
      return;
    }

    // Check authorization
    if (!isAuthorized) {
      setShowAuthModal(true);
      return;
    }

    setIsSending(true);

    try {
      const file = files[0];
      const buffer = await file.arrayBuffer();

      // Generate encryption key
      const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      // Generate Initialization Vector
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt file
      const ciphertextWithTag = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        buffer
      );

      console.log("File encrypted successfully");

      // Simulate IPFS upload (replace with actual IPFS integration)
      const hash = await simulateIPFSUpload(ciphertextWithTag);
      console.log("File uploaded to IPFS:", hash);

      // Simulate public key retrieval (replace with actual backend call)
      const receiverPublicKey = await simulatePublicKeyRetrieval(walletAddress);
      console.log("Receiver public key retrieved");

      // Encrypt the secret key
      const encryptedKey = await encryptSecretKey(walletAddress, key, receiverPublicKey);
      console.log("Secret key encrypted");

      // Simulate blockchain transaction (replace with actual contract call)
      await simulateBlockchainTransaction(walletAddress, encryptedKey, hash);
      console.log("Transaction completed");

      // Success - redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Error sending encrypted file:", error);
      alert("Failed to send file. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  // Simulation functions (replace with actual implementations)
  const simulateIPFSUpload = async (ciphertext: ArrayBuffer): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "Qm" + Math.random().toString(36).substr(2, 44);
  };

  const simulatePublicKeyRetrieval = async (address: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "0x" + Math.random().toString(16).substr(2, 64);
  };

  const simulateBlockchainTransaction = async (receiver: string, encryptedKey: string, hash: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Simulated transaction: ${receiver}, ${encryptedKey}, ${hash}`);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contacts = [
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      address: "0x76efbD2Aa21B0498deC9De34ECf009d66dAF84e2",
      avatar: "JS",
    },
    {
      id: "2", 
      name: "Sarah Wilson",
      email: "sarah@company.com",
      address: "0x8932d4a6e5c6a9b0e8f7c6d5e4a3b2c1d0e9f8a7",
      avatar: "SW",
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Send Secure Files
        </h1>
        <p className="text-gray-400">
          Encrypt and transfer files with military-grade security
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Select Files</h3>

            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-cyan-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">
                Drag and drop files here or click to browse
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Maximum file size: 2GB
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Browse Files
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-white font-semibold mb-3">
                  Selected Files
                </h4>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-white text-sm">{file.name}</p>
                        <p className="text-gray-400 text-xs">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Wallet Address Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Receivers Wallet</h3>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Paste wallet address here..."
                className="flex-1 bg-transparent border-none text-white font-mono text-sm placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={copyWalletAddress}
                disabled={!walletAddress}
                className="flex-shrink-0 p-2 bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-500/50 rounded-lg transition-all duration-300"
                title="Copy address"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-cyan-400" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Recipients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Recipients</h3>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedContacts.map((contactId) => {
                  const contact = contacts.find((c) => c.id === contactId);
                  return contact ? (
                    <div
                      key={contact.id}
                      className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1"
                    >
                      <span className="text-cyan-400 text-sm">
                        {contact.name}
                      </span>
                      <button
                        onClick={() =>
                          setSelectedContacts((prev) =>
                            prev.filter((id) => id !== contact.id)
                          )
                        }
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      if (selectedContacts.includes(contact.id)) {
                        setSelectedContacts((prev) =>
                          prev.filter((id) => id !== contact.id)
                        );
                      } else {
                        setSelectedContacts((prev) => [...prev, contact.id]);
                        // Auto-fill wallet address when selecting a contact
                        setWalletAddress(contact.address);
                      }
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedContacts.includes(contact.id)
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-gray-700/30 border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {contact.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">
                        {contact.name}
                      </p>
                      <p className="text-gray-400 text-xs">{contact.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Security Settings
            </h3>

            <div className="space-y-4">
              {/* Encryption Level */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Encryption Level
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: "military",
                      label: "Military Grade",
                      icon: Shield,
                      description: "AES-256-GCM",
                    },
                    {
                      id: "standard",
                      label: "Standard",
                      icon: Lock,
                      description: "AES-128",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setEncryptionLevel(option.id as any)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        encryptionLevel === option.id
                          ? "bg-green-500/20 border-green-500/50"
                          : "bg-gray-700/30 border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <option.icon className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <p className="text-white text-sm font-medium">
                          {option.label}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Expiry */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Link Expiry
                </label>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              {/* Password Protection */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Password Protection
                </label>
                <input
                  type="password"
                  placeholder="Optional password"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Send Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: isSending ? 1 : 1.02 }}
            whileTap={{ scale: isSending ? 1 : 0.98 }}
            disabled={files.length === 0 || (!walletAddress && selectedContacts.length === 0) || isSending}
            onClick={handleSendEncryptedFile}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isSending ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Encrypting & Sending...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                {isAuthorized ? "Send Encrypted Files" : "Authorize & Send"}
                <Lock className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* Authorization Status */}
          {isAuthorized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
            >
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Wallet Authorized</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Authorization Modal */}
      <AuthorizationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthorize={handleAuthorize}
        actionDescription="Authorize file encryption and blockchain upload"
        requiredPermissions={["File encryption", "IPFS upload", "Smart contract interaction"]}
        contractAddress={fileExchangeContract.address}
        estimatedGas="0.0023 ETH"
      />
    </div>
  );
}