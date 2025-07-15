import express from 'express';
import {
    createCoBrandingApplication,
    getAllCoBrandingApplications,
    getCoBrandingApplicationById,
    updateCoBrandingApplication,
    deleteCoBrandingApplication
} from '../controllers/CoBrandingController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.post('/submit', createCoBrandingApplication);

// Admin protected routes
router.get('/', adminAuth, getAllCoBrandingApplications);
router.get('/:id', adminAuth, getCoBrandingApplicationById);
router.put('/:id', adminAuth, updateCoBrandingApplication);
router.delete('/:id', adminAuth, deleteCoBrandingApplication);

export default router; 