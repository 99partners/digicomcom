import express from 'express';
import { submitForm, getAllSubmissions, updateSubmissionStatus } from '../controllers/PlatformAMSController.js';

const router = express.Router();

// Public route for form submission
router.post('/submit', submitForm);

// Admin routes (protected)
router.get('/submissions', getAllSubmissions);
router.patch('/submissions/:id/status', updateSubmissionStatus);

export default router; 