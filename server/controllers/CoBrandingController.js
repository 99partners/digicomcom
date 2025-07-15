import CoBranding from '../models/CoBrandingModel.js';

// Create a new co-branding application
export const createCoBrandingApplication = async (req, res) => {
    try {
        console.log('Received co-branding application data:', req.body);
        
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

        // Log required fields
        console.log('Required fields validation:');
        console.log('- brandName:', brandName);
        console.log('- businessType:', businessType);
        console.log('- productCategories:', productCategories);
        console.log('- marketingGoals:', marketingGoals);
        console.log('- targetAudience:', targetAudience);
        console.log('- consent:', consent);

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

        console.log('Created CoBranding model instance:', application);

        await application.save();
        console.log('Successfully saved co-branding application with ID:', application._id);

        res.status(201).json({
            success: true,
            message: 'Co-branding application submitted successfully',
            data: application
        });
    } catch (error) {
        console.error('Error in createCoBrandingApplication:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error submitting co-branding application',
            error: error.message
        });
    }
};

// Get all co-branding applications
export const getAllCoBrandingApplications = async (req, res) => {
    try {
        const applications = await CoBranding.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error in getAllCoBrandingApplications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching co-branding applications',
            error: error.message
        });
    }
};

// Get a single co-branding application by ID
export const getCoBrandingApplicationById = async (req, res) => {
    try {
        const application = await CoBranding.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Co-branding application not found'
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error in getCoBrandingApplicationById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching co-branding application',
            error: error.message
        });
    }
};

// Update a co-branding application
export const updateCoBrandingApplication = async (req, res) => {
    try {
        const application = await CoBranding.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Co-branding application not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Co-branding application updated successfully',
            data: application
        });
    } catch (error) {
        console.error('Error in updateCoBrandingApplication:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating co-branding application',
            error: error.message
        });
    }
};

// Delete a co-branding application
export const deleteCoBrandingApplication = async (req, res) => {
    try {
        const application = await CoBranding.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Co-branding application not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Co-branding application deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteCoBrandingApplication:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting co-branding application',
            error: error.message
        });
    }
}; 