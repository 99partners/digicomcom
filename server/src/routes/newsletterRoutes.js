const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController');
const adminAuth = require('../middleware/adminAuth');

// Debug middleware
router.use((req, res, next) => {
    console.log('Newsletter route accessed:', req.method, req.path);
    next();
});

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes - protected by adminAuth middleware
router.get('/subscribers', adminAuth, getAllSubscribers);

module.exports = router; 