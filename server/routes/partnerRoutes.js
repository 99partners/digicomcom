import express from 'express';
import { createRequest, checkExistingRequest, getPartnerRequests, getUserApplications } from '../controllers/PartnerController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/users', userAuth, createRequest);
router.get('/has-request', userAuth, checkExistingRequest);
router.get('/my-requests', userAuth, getPartnerRequests);
router.get('/applications', userAuth, getUserApplications);

export default router; 