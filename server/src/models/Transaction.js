const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['stake', 'unstake', 'transfer', 'reward'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tokenAddress: String,
  fromAddress: String,
  toAddress: String,
  transactionHash: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  blockNumber: Number,
  gasUsed: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);

