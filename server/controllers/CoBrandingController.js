import CoBrandingModel from '../models/CoBrandingModel.js';
import userModel from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { SERVICE_FORM_CONFIRMATION_TEMPLATE, sendEmail } from '../config/emailTemplets.js';

export const submitCoBrandingForm = async (req, res) => {
    try {
        console.log('Received co-branding form submission:', req.body);
        
        const {
            isManufacturer,
            establishmentYear,
            companyName,
            numberOfProducts,
            productCategories,
            productUSP,
            productDescription,
            panNumber
        } = req.body;

        const userId = req.user.id; // From userAuth middleware

        // Validate required fields
        if (!numberOfProducts || !productCategories || !productUSP || !productDescription || !panNumber) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create new co-branding application
        const newApplication = new CoBrandingModel({
            userId,
            isManufacturer,
            establishmentYear,
            companyName,
            numberOfProducts,
            productCategories,
            productUSP,
            productDescription,
            panNumber,
            status: 'pending' // Default status
        });

        // Save to database
        await newApplication.save();
        console.log('Co-branding application saved:', newApplication);

        // Send confirmation email to user
        try {
            const user = await userModel.findById(userId);
            if (user) {
                // Create service-specific details for Co-branding
                const productCategoriesText = Array.isArray(productCategories) ? 
                    productCategories.join(', ') : 
                    (productCategories || 'Not specified');

                const serviceSpecificDetails = `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 8px;"><strong>Manufacturer:</strong> ${isManufacturer ? 'Yes' : 'No'}</p>
                        ${establishmentYear ? `<p style="margin: 0 0 8px;"><strong>Establishment Year:</strong> ${establishmentYear}</p>` : ''}
                        ${companyName ? `<p style="margin: 0 0 8px;"><strong>Company Name:</strong> ${companyName}</p>` : ''}
                        <p style="margin: 0 0 8px;"><strong>Number of Products:</strong> ${numberOfProducts}</p>
                        <p style="margin: 0 0 8px;"><strong>Product Categories:</strong> ${productCategoriesText}</p>
                        ${panNumber ? `<p style="margin: 0;"><strong>PAN Number:</strong> ${panNumber}</p>` : ''}
                    </div>`;

                const emailContent = SERVICE_FORM_CONFIRMATION_TEMPLATE
                    .replace(/{{userName}}/g, user.name)
                    .replace(/{{userEmail}}/g, user.email)
                    .replace(/{{serviceType}}/g, 'Co-Branding Partnership')
                    .replace(/{{applicationId}}/g, newApplication._id.toString())
                    .replace(/{{submissionDate}}/g, new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }))
                    .replace(/{{serviceSpecificDetails}}/g, serviceSpecificDetails);

                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: '✅ Co-Branding Application Received - Next Steps Inside',
                    html: emailContent
                };

                const emailResult = await sendEmail(transporter, mailOptions);
                if (emailResult.success) {
                    console.log('Co-branding confirmation email sent successfully to:', user.email);
                } else {
                    console.error('Failed to send co-branding confirmation email:', emailResult.error);
                }
            }
        } catch (emailError) {
            console.error('Error sending co-branding confirmation email:', emailError);
            // Don't fail the whole request if email fails
        }

        res.status(200).json({
            success: true,
            message: 'Co-branding application submitted successfully',
            data: newApplication
        });
    } catch (error) {
        console.error('Error in submitCoBrandingForm:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit co-branding application',
            error: error.message
        });
    }
};

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

        const application = new CoBrandingModel({
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
        const applications = await CoBrandingModel.find().sort({ submittedAt: -1 });
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
        const application = await CoBrandingModel.findById(req.params.id);
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
        const application = await CoBrandingModel.findByIdAndUpdate(
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
        const application = await CoBrandingModel.findByIdAndDelete(req.params.id);
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