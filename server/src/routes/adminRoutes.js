const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { getDashboardStats, getUsers, adminLogin } = require('../controllers/adminController');

// Debug middleware
router.use((req, res, next) => {
  console.log('Admin route accessed:', req.method, req.path);
  next();
});

// Public admin routes
router.post('/session/validate', adminLogin);

// Protected admin routes
router.get('/dashboard-stats', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getUsers);

// Add more admin routes here as needed
router.get('/partners', adminAuth, (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

router.get('/newsletter', adminAuth, (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

router.get('/contact', adminAuth, (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

router.get('/blog', adminAuth, (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

module.exports = router; 