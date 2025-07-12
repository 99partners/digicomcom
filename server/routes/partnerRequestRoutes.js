import express from 'express';
import userAuth from '../middleware/userAuth.js';
import PartnerRequest from '../models/PartnerRequestModel.js';

const router = express.Router();

// Create a new partner request
router.post('/', userAuth, async (req, res) => {
    try {
        console.log('Received partner request data:', req.body);
        console.log('User ID from auth:', req.user.id);

        // Validate required fields
        if (!req.body.serviceType) {
            return res.status(400).json({
                success: false,
                message: 'Service type is required'
            });
        }

        if (!req.body.hasGST) {
            return res.status(400).json({
                success: false,
                message: 'GST information is required'
            });
        }

        const partnerRequest = new PartnerRequest({
            ...req.body,
            userId: req.user.id // Changed from req.user._id to req.user.id
        });

        console.log('Created partner request object:', partnerRequest);

        // Validate the document
        const validationError = partnerRequest.validateSync();
        if (validationError) {
            console.error('Validation error:', validationError);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(validationError.errors).map(err => err.message)
            });
        }

        const savedRequest = await partnerRequest.save();
        console.log('Successfully saved partner request:', savedRequest);
        
        res.status(201).json({
            success: true,
            message: 'Partner request created successfully',
            data: savedRequest
        });
    } catch (error) {
        console.error('Detailed error:', error);
        if (error.name === 'ValidationError') {
            console.error('Validation error details:', error.errors);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        console.error('Partner request creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating partner request',
            error: error.stack
        });
    }
});

// Get all partner requests for the logged-in user
router.get('/my-requests', userAuth, async (req, res) => {
    try {
        const requests = await PartnerRequest.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error('Error fetching partner requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching partner requests',
            error: error.message
        });
    }
});

// Get a specific partner request
router.get('/:id', userAuth, async (req, res) => {
    try {
        const request = await PartnerRequest.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Partner request not found'
            });
        }

        res.json({
            success: true,
            data: request
        });
    } catch (error) {
        console.error('Error fetching partner request:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching partner request',
            error: error.message
        });
    }
});

// Update a partner request
router.put('/:id', userAuth, async (req, res) => {
    try {
        const request = await PartnerRequest.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Partner request not found'
            });
        }

        // Only allow updating if the request is still pending
        if (request.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot update a processed request'
            });
        }

        Object.assign(request, req.body);
        await request.validate();
        const updatedRequest = await request.save();

        res.json({
            success: true,
            message: 'Partner request updated successfully',
            data: updatedRequest
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        console.error('Error updating partner request:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating partner request',
            error: error.message
        });
    }
});

export default router; 