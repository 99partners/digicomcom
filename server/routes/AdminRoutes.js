const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers } = require('../controllers/AdminController');
const adminAuth = require('../middleware/adminAuth');
const User = require('../src/models/User'); // Added missing import for User model

// Debug middleware
router.use((req, res, next) => {
    console.log('Admin route accessed:', req.method, req.path);
    next();
});

// Test route to check if admin routes are accessible
router.get('/test', (req, res) => {
    res.json({ message: 'Admin routes are working' });
});

// Route for getting users list (temporarily without auth for testing)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'name email phone isVerified createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// Protected route for getting dashboard statistics
router.get('/dashboard-stats', adminAuth, getDashboardStats);

module.exports = router; 