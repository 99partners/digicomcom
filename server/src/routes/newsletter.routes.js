const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');

// POST /api/newsletter/subscribe
router.post('/subscribe', newsletterController.subscribe);

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', newsletterController.unsubscribe);

module.exports = router; 