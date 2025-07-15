import MarketingApplication from '../models/MarketingApplicationModel.js';

// Create a new marketing application
export const createMarketingApplication = async (req, res) => {
    try {
        const marketingApplication = new MarketingApplication(req.body);
        await marketingApplication.save();
        res.status(201).json({
            success: true,
            message: 'Marketing application submitted successfully',
            data: marketingApplication
        });
    } catch (error) {
        console.error('Error in createMarketingApplication:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting marketing application',
            error: error.message
        });
    }
};

// Get all marketing applications
export const getAllMarketingApplications = async (req, res) => {
    try {
        const applications = await MarketingApplication.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error in getAllMarketingApplications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching marketing applications',
            error: error.message
        });
    }
};

// Get a single marketing application by ID
export const getMarketingApplicationById = async (req, res) => {
    try {
        const application = await MarketingApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Marketing application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error in getMarketingApplicationById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching marketing application',
            error: error.message
        });
    }
};

// Update a marketing application
export const updateMarketingApplication = async (req, res) => {
    try {
        const application = await MarketingApplication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Marketing application not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Marketing application updated successfully',
            data: application
        });
    } catch (error) {
        console.error('Error in updateMarketingApplication:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating marketing application',
            error: error.message
        });
    }
};

// Delete a marketing application
export const deleteMarketingApplication = async (req, res) => {
    try {
        const application = await MarketingApplication.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Marketing application not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Marketing application deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteMarketingApplication:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting marketing application',
            error: error.message
        });
    }
}; 