import express from 'express';
import { submitCoBrandingForm } from '../controllers/CoBrandingController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Log incoming requests
router.use((req, res, next) => {
    console.log('Co-Branding Route accessed:', req.method, req.path);
    next();
});

// Submit co-branding form
router.post('/submit', userAuth, submitCoBrandingForm);

export default router; 