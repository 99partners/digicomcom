import express from 'express';
import { submitForm, getAllSubmissions, updateSubmissionStatus } from '../controllers/PlatformAMSController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Middleware to log request details
const logRequest = (req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);
  next();
};

// Temporarily remove userAuth for testing
router.post('/submit', logRequest, submitForm);

// Admin routes (protected)
router.get('/submissions', adminAuth, getAllSubmissions);
router.patch('/submissions/:id/status', adminAuth, updateSubmissionStatus);

export default router; 