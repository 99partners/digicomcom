const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit contact form
router.post('/submit', contactController.submitContact);

// Get all contact submissions (admin only)
router.get('/submissions', contactController.getAllContacts);

// Update contact status (admin only)
router.patch('/status/:id', contactController.updateContactStatus);

// Delete contact submission (admin only)
router.delete('/:id', contactController.deleteContact);

module.exports = router; 