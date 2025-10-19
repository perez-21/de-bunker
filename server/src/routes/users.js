const express = require('express');
// const { protect } = require('../middleware/auth');
const {
  addUser, getUser
} = require('../controllers/usersController');

const router = express.Router();

// router.use(protect);

router.post('/', addUser);
router.get('/:address', getUser)

module.exports = router;

