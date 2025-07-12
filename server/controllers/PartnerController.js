import PartnerRequest from '../models/PartnerRequestModel.js';

export const createRequest = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('User from auth:', req.user);

        const { serviceType } = req.body;
        
        // Validate service type
        const validServiceTypes = ['ams', 'platform', 'cobranding', 'marketing'];
        if (!serviceType || !validServiceTypes.includes(serviceType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid service type'
            });
        }

        if (!req.user || !req.user.id) {
            console.error('No user found in request');
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;

        // Check if user already has a pending request
        const existingRequest = await PartnerRequest.findOne({ 
            userId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending request'
            });
        }

        // Create new request
        const request = new PartnerRequest({
            userId,
            serviceType
        });

        console.log('Creating new request:', request);

        await request.save();
        console.log('Request saved successfully');

        res.status(201).json({
            success: true,
            message: 'Request created successfully',
            request
        });
    } catch (error) {
        console.error('Detailed error in createRequest:', error);
        
        // Check for MongoDB validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request data',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Check for MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A request with this information already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Error creating request'
        });
    }
};

export const checkExistingRequest = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const request = await PartnerRequest.findOne({ userId });
        
        res.json({
            success: true,
            hasRequest: !!request,
            request: request || null
        });
    } catch (error) {
        console.error('Error checking request:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error checking request status'
        });
    }
}; 

export const getPartnerRequests = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const requests = await PartnerRequest.find({ userId })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error('Error fetching partner requests:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching partner requests'
        });
    }
}; 