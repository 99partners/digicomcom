import express from 'express';
import {
    createMarketingApplication,
    getAllMarketingApplications,
    getMarketingApplicationById,
    updateMarketingApplication,
    deleteMarketingApplication
} from '../controllers/MarketingApplicationController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.post('/submit', createMarketingApplication);

// Admin protected routes
router.get('/', adminAuth, getAllMarketingApplications);
router.get('/:id', adminAuth, getMarketingApplicationById);
router.put('/:id', adminAuth, updateMarketingApplication);
router.delete('/:id', adminAuth, deleteMarketingApplication);

export default router; 