const express = require('express');
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log('Newsletter route accessed:', req.method, req.path);
    next();
});

// Placeholder newsletter routes
router.post('/subscribe', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Newsletter subscription endpoint'
    });
});

router.post('/unsubscribe', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Newsletter unsubscription endpoint'
    });
});

router.get('/subscribers', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Get subscribers endpoint',
        data: []
    });
});

module.exports = router; 