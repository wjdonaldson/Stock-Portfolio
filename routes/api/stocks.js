const express = require('express');
const router = express.Router();
const stocksCtrl = require('../../controllers/api/stocks');
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with '/api/stocks'

router.post('/', ensureLoggedIn, stocksCtrl.create);
router.get('/:id', ensureLoggedIn, stocksCtrl.show);

module.exports = router;