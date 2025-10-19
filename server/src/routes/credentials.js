const express = require('express');

const router = express.Router();

const { addCredential, getCredentials } = require('./../controllers/credentialsController');
// router.use(protect);

router.post('/', addCredential);
router.get('/', getCredentials);

module.exports = router;

