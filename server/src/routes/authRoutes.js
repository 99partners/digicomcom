const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Add headers to avoid ad blockers
router.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Service-Worker', 'script');
  res.setHeader('X-Custom-Request', 'system-account');
  next();
});

// Authentication routes with neutral paths
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/password/reset-request', authController.forgotPassword);
router.post('/password/update', authController.resetPassword);
router.get('/status', auth, authController.validateToken);
router.post('/refresh', authController.refreshToken);
router.post('/logout', auth, authController.logout);

module.exports = router; 