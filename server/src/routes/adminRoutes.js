const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { getDashboardStats, getUsers, adminLogin } = require('../controllers/adminController');

// Debug middleware
router.use((req, res, next) => {
  console.log('Admin route accessed:', req.method, req.path);
  next();
});

// Admin login - using a less blocked endpoint name
router.post('/auth/verify', adminLogin);

// Protected routes
router.get('/dashboard-stats', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getUsers);

module.exports = router; 