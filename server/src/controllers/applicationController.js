const Application = require('../models/ApplicationModel');

// Submit new application
const submitApplication = async (req, res) => {
    try {
        console.log('Received application data:', req.body);

        const application = new Application(req.body);
        await application.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to submit application'
        });
    }
};

// Get all applications
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch applications'
        });
    }
};

// Get application by ID
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch application'
        });
    }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            data: application
        });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update application status'
        });
    }
};

module.exports = {
    submitApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus
}; 