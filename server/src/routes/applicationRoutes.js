const express = require('express');
const router = express.Router();
const {
    submitApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus
} = require('../controllers/applicationController');

// Debug middleware
router.use((req, res, next) => {
    console.log('Application route accessed:', req.method, req.path);
    next();
});

// Submit new application
router.post('/', submitApplication);

// Get all applications
router.get('/', getApplications);

// Get application by ID
router.get('/:id', getApplicationById);

// Update application status
router.patch('/:id/status', updateApplicationStatus);

module.exports = router; 