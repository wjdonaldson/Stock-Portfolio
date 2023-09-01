const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../../controllers/api/portfolios');
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with '/api/portfolio'

// We don't need a parameter for the portfolio
// because we just use the logged in user
router.post('/', ensureLoggedIn, portfolioCtrl.create);
router.get('/', ensureLoggedIn, portfolioCtrl.show);
router.post('/purchase', ensureLoggedIn, portfolioCtrl.addPurchase);
router.put('/purchase/:id', ensureLoggedIn, portfolioCtrl.updatePurchase);

module.exports = router;