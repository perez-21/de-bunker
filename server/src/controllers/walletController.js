const blockchainService = require('../services/blockchainService');
const Transaction = require('../models/Transaction');

exports.getBalance = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    const balance = await blockchainService.getBalance(walletAddress);
    const stakedBalance = await blockchainService.getStakedBalance(walletAddress);
    const rewards = await blockchainService.calculateRewards(walletAddress);

    res.json({
      success: true,
      data: {
        balance: parseFloat(balance),
        stakedBalance: parseFloat(stakedBalance),
        pendingRewards: parseFloat(rewards)
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.stakeTokens = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = req.user;

    const result = await blockchainService.stakeTokens(user.walletAddress, amount);
    
    // Save transaction to database
    await Transaction.create({
      user: user._id,
      type: 'stake',
      amount,
      fromAddress: user.walletAddress,
      transactionHash: result.transactionHash,
      status: result.status,
      gasUsed: result.gasUsed
    });

    res.json({
      success: true,
      transactionHash: result.transactionHash,
      status: result.status
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.claimRewards = async (req, res) => {
  try {
    const user = req.user;

    const result = await blockchainService.claimRewards(user.walletAddress);
    
    await Transaction.create({
      user: user._id,
      type: 'reward',
      amount: 0, // Will be calculated from event
      fromAddress: user.walletAddress,
      transactionHash: result.transactionHash,
      status: result.status,
      gasUsed: result.gasUsed
    });

    res.json({
      success: true,
      transactionHash: result.transactionHash,
      status: result.status
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

