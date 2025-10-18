const { web3, ethersProvider, wallet } = require('../config/web3');
const TokenABI = require('../../').abi;

class BlockchainService {
  constructor() {
    this.tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    this.tokenContract = new web3.eth.Contract(TokenABI, this.tokenContractAddress);
    this.ethersTokenContract = new ethers.Contract(
      this.tokenContractAddress, 
      TokenABI, 
      wallet
    );
  }

  // Get wallet balance
  async getBalance(address) {
    try {
      const balance = await this.tokenContract.methods.balanceOf(address).call();
      return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      throw new Error(`Error getting balance: ${error.message}`);
    }
  }

  // Get staked balance
  async getStakedBalance(address) {
    try {
      const staked = await this.tokenContract.methods.stakedBalance(address).call();
      return web3.utils.fromWei(staked, 'ether');
    } catch (error) {
      throw new Error(`Error getting staked balance: ${error.message}`);
    }
  }

  // Stake tokens
  async stakeTokens(userAddress, amount) {
    try {
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
      
      const tx = await this.ethersTokenContract.stakeTokens(amountInWei);
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.hash,
        status: receipt.status === 1 ? 'confirmed' : 'failed',
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      throw new Error(`Error staking tokens: ${error.message}`);
    }
  }

  // Unstake tokens
  async unstakeTokens(userAddress, amount) {
    try {
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
      
      const tx = await this.ethersTokenContract.unstakeTokens(amountInWei);
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.hash,
        status: receipt.status === 1 ? 'confirmed' : 'failed',
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      throw new Error(`Error unstaking tokens: ${error.message}`);
    }
  }

  // Claim rewards
  async claimRewards(userAddress) {
    try {
      const tx = await this.ethersTokenContract.claimReward();
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.hash,
        status: receipt.status === 1 ? 'confirmed' : 'failed',
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      throw new Error(`Error claiming rewards: ${error.message}`);
    }
  }

  // Calculate rewards
  async calculateRewards(userAddress) {
    try {
      const rewards = await this.tokenContract.methods.calculateReward(userAddress).call();
      return web3.utils.fromWei(rewards, 'ether');
    } catch (error) {
      throw new Error(`Error calculating rewards: ${error.message}`);
    }
  }

  // Transfer tokens
  async transferTokens(fromAddress, toAddress, amount) {
    try {
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
      
      const tx = await this.ethersTokenContract.transfer(toAddress, amountInWei);
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.hash,
        status: receipt.status === 1 ? 'confirmed' : 'failed',
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      throw new Error(`Error transferring tokens: ${error.message}`);
    }
  }

  // Get transaction receipt
  async getTransactionReceipt(txHash) {
    try {
      return await web3.eth.getTransactionReceipt(txHash);
    } catch (error) {
      throw new Error(`Error getting transaction receipt: ${error.message}`);
    }
  }

  // Listen to contract events
  setupEventListeners() {
    this.tokenContract.events.TokensStaked({})
      .on('data', event => {
        console.log('Tokens staked:', event.returnValues);
      })
      .on('error', error => {
        console.error('Event error:', error);
      });

    this.tokenContract.events.TokensUnstaked({})
      .on('data', event => {
        console.log('Tokens unstaked:', event.returnValues);
      });
  }
}

module.exports = new Blockchain;

