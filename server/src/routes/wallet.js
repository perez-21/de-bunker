const express = require('express');
const { protect } = require('../middleware/auth');
const { validateStake, validateTransfer } = require('../middleware/validation');
const {
  getBalance,
  stakeTokens,
  unstakeTokens,
  claimRewards,
  transferTokens
} = require('../controllers/walletController');

const router = express.Router();

router.use(protect);

router.get('/balance/:walletAddress', getBalance);
router.post('/stake', validateStake, stakeTokens);
router.post('/claim-rewards', claimRewards);
router.post('/transfer', validateTransfer, transferTokens);

module.exports = router;

