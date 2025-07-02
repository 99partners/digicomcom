import express from 'express';
import CoBranding from '../models/CoBrandingModel.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Submit co-branding application
router.post('/submit', async (req, res) => {
    try {
        const {
            brandName,
            website,
            registeredName,
            businessType,
            productCategories,
            topProducts,
            platforms,
            salesVolume,
            marketingGoals,
            targetAudience,
            timeline,
            instagram,
            facebook,
            youtube,
            additionalNotes,
            consent
        } = req.body;

        // Create new co-branding application
        const application = new CoBranding({
            brandName,
            website,
            registeredName,
            businessType,
            productCategories,
            topProducts,
            platforms,
            salesVolume,
            marketingGoals,
            targetAudience,
            timeline,
            socialMedia: {
                instagram,
                facebook,
                youtube
            },
            additionalNotes,
            consent
        });

        // Save to database
        await application.save();

        res.status(201).json({
            success: true,
            message: 'Co-branding application submitted successfully',
            data: application
        });

    } catch (error) {
        console.error('Error submitting co-branding application:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting application',
            error: error.message
        });
    }
});

// Get all co-branding applications (admin only)
router.get('/applications', adminAuth, async (req, res) => {
    try {
        const applications = await CoBranding.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error fetching co-branding applications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
});

export default router; 