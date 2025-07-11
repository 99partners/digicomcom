const express = require('express');
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log('Contact route accessed:', req.method, req.path);
    next();
});

// Placeholder contact routes
router.post('/submit', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Contact form submission endpoint'
    });
});

router.get('/inquiries', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Get inquiries endpoint',
        data: []
    });
});

module.exports = router; 