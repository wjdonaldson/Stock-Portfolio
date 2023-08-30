const express = require('express');
const router = express.Router();
const stocksCtrl = require('../../controllers/api/stocks');

// All paths start with '/api/stocks'

router.post('/', stocksCtrl.create);
router.get('/:id', stocksCtrl.show);

module.exports = router;