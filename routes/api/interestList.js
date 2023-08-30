const express = require('express');
const router = express.Router();
const interestListCtrl = require('../../controllers/api/interestList');
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with '/api/interest-list'

// We don't need a parameter for show or update
// because we just use the logged in user
router.post('/', ensureLoggedIn, interestListCtrl.create);
router.get('/', ensureLoggedIn, interestListCtrl.show);
router.post('/add-stock', ensureLoggedIn, interestListCtrl.addStock);
router.post('/del-stock', ensureLoggedIn, interestListCtrl.delStock);

module.exports = router;