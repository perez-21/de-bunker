const express = require('express');

const router = express.Router();

const { addContent, getContent, deleteContent } = require('./../controllers/ipfsController');
// router.use(protect);

router.post('/', addContent);
router.get('/:id', getContent);
router.delete('/:id', deleteContent);

module.exports = router;

