const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Session management routes
router.post('/login', authController.login);
router.get('/login', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Method not allowed. Please use POST for login.',
    error: {
      path: req.path,
      method: req.method,
      correctMethod: 'POST',
      correctEndpoint: '/api/session/user/login',
      headers: {
        required: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        }
      }
    }
  });
});

router.post('/signup', authController.signup);
router.get('/profile', auth, authController.getProfile);

// Password management routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// OTP verification routes
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

// Handle 404 for this router
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    error: {
      path: req.path,
      method: req.method,
      availableRoutes: {
        login: 'POST /login',
        signup: 'POST /signup',
        profile: 'GET /profile',
        forgotPassword: 'POST /forgot-password',
        resetPassword: 'POST /reset-password',
        sendOTP: 'POST /send-otp',
        verifyOTP: 'POST /verify-otp'
      }
    }
  });
});

module.exports = router; 