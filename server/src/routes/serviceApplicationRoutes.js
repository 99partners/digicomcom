const express = require('express');
const router = express.Router();
const serviceApplicationController = require('../controllers/serviceApplicationController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create new application
router.post('/', serviceApplicationController.createApplication);

// Get all applications for the logged-in user
router.get('/', serviceApplicationController.getUserApplications);

// Get specific application by ID
router.get('/:id', serviceApplicationController.getApplicationById);

// Add a test route to verify the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Service application routes are working' });
});

module.exports = router; 