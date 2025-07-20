import express from 'express';
import { submitAdvertisingForm } from '../controllers/AdvertisingController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Log incoming requests
router.use((req, res, next) => {
    console.log('Advertising Route accessed:', req.method, req.path);
    next();
});

// Submit advertising form
router.post('/submit', userAuth, submitAdvertisingForm);

export default router; 