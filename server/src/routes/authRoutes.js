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
  res.setHeader('X-Custom-Header', 'verification-request');
  next();
});

// Authentication routes
router.post('/session', authController.login);
router.post('/session/refresh', authController.refreshToken);
router.post('/session/end', auth, authController.logout);
router.post('/user/create', authController.register);
router.post('/user/reset-credentials', authController.forgotPassword);
router.post('/user/update-credentials', authController.resetPassword);
router.get('/user/validate', auth, authController.validateToken);

module.exports = router; 