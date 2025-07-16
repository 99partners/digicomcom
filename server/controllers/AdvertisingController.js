import AdvertisingModel from '../models/AdvertisingModel.js';

export const submitAdvertisingForm = async (req, res) => {
    try {
        console.log('Received advertising form submission:', req.body);
        
        const { services, selectedPlan } = req.body;
        const userId = req.user.id; // From userAuth middleware

        if (!services || !selectedPlan) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create new advertising application
        const newApplication = new AdvertisingModel({
            userId,
            services,
            selectedPlan,
            status: 'pending' // Default status
        });

        // Save to database
        await newApplication.save();
        console.log('Advertising application saved:', newApplication);

        res.status(200).json({
            success: true,
            message: 'Advertising application submitted successfully',
            data: newApplication
        });
    } catch (error) {
        console.error('Error in submitAdvertisingForm:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit advertising application',
            error: error.message
        });
    }
}; 