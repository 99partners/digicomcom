import express from 'express';
import { createRequest, checkExistingRequest } from '../controllers/PartnerController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/users', userAuth, createRequest);
router.get('/has-request', userAuth, checkExistingRequest);

export default router; 