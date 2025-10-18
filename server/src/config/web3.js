const { Web3 } = require('web3');
const { ethers } = require('ethers');

// Web3 instance for Ethereum
const web3 = new Web3(process.env.ETH_SEPOLIA_URL);

// Ethers provider
const ethersProvider = new ethers.JsonRpcProvider(process.env.ETH_SEPOLIA_URL);

// BlockDAG provider (adjust based on BlockDAG's RPC)
const blockDAGProvider = new Web3(process.env.BLOCKDAG_RPC_URL);

// Wallet instance for transactions
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethersProvider);

module.exports = {
  web3,
  ethersProvider,
  blockDAGProvider,
  wallet
};

