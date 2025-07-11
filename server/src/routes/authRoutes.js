const express = require('express');
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log('Auth route accessed:', req.method, req.path);
    next();
});

// Placeholder auth routes
router.post('/login', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Login endpoint'
    });
});

router.post('/register', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Register endpoint'
    });
});

router.post('/forgot-password', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Forgot password endpoint'
    });
});

module.exports = router; 