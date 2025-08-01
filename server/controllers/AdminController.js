import Admin from '../models/AdminModel.js';
import Newsletter from '../models/Newsletter.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import PartnerRequest from '../models/PartnerRequestModel.js';
import Contact from '../models/ContactModel.js';
import transporter from '../config/nodemailer.js';
import { SERVICE_APPROVAL_TEMPLATE, sendEmail } from '../config/emailTemplets.js';

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: '1d' }
        );

        // Set HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send token in response body for localStorage
        res.json({ 
            success: true, 
            message: 'Login successful',
            token, // Add token to response
            admin: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalSubscribers, totalContacts, totalPartners] = await Promise.all([
            User.countDocuments(),
            Newsletter.countDocuments(),
            Contact.countDocuments(),
            Promise.resolve(1)  // Placeholder for partner count
        ]);

        // Get recent contacts
        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalSubscribers,
                totalContacts,
                totalPartners,
                recentContacts
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        // Import service models
        const PlatformAMSForm = (await import('../models/PlatformAMSForm.js')).default;
        const AMSForm = (await import('../models/AMSForm.js')).default;
        const AdvertisingModel = (await import('../models/AdvertisingModel.js')).default;
        const CoBrandingModel = (await import('../models/CoBrandingModel.js')).default;

        const users = await User.find({}, 'name email phone isAccountVerified')
            .sort({ createdAt: -1 });

        // Get service counts for each user
        const usersWithServices = await Promise.all(
            users.map(async (user) => {
                const [platformCount, amsCount, marketingCount, coBrandingCount] = await Promise.all([
                    PlatformAMSForm.countDocuments({ userId: user._id }),
                    AMSForm.countDocuments({ userId: user._id }),
                    AdvertisingModel.countDocuments({ userId: user._id }),
                    CoBrandingModel.countDocuments({ userId: user._id })
                ]);

                return {
                    ...user.toObject(),
                    serviceCounts: {
                        platformEnable: platformCount,
                        ams: amsCount,
                        marketing: marketingCount,
                        coBranding: coBrandingCount,
                        total: platformCount + amsCount + marketingCount + coBrandingCount
                    }
                };
            })
        );

        res.json({
            success: true,
            users: usersWithServices
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get All Subscribers
export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            subscribers
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Check Admin Authentication
export const checkAdminAuth = async (req, res) => {
    try {
        // If middleware passed, admin is authenticated
        const admin = req.admin;
        res.json({
            success: true,
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Admin Logout
export const adminLogout = async (req, res) => {
    try {
        res.cookie('adminToken', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}; 

// Get all partner requests (admin)
export const getAllPartnerRequests = async (req, res) => {
    try {
        const requests = await PartnerRequest.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');

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
};

// Get all form submissions from all collections
export const getAllFormSubmissions = async (req, res) => {
    try {
        // Import all models
        const PlatformAMSForm = (await import('../models/PlatformAMSForm.js')).default;
        const AMSForm = (await import('../models/AMSForm.js')).default;
        const AdvertisingModel = (await import('../models/AdvertisingModel.js')).default;
        const CoBrandingModel = (await import('../models/CoBrandingModel.js')).default;

        // Fetch data from all collections
        const [platformAMSForms, amsForms, advertisingForms, coBrandingForms] = await Promise.all([
            PlatformAMSForm.find().populate('userId', 'name email phone').sort({ createdAt: -1 }),
            AMSForm.find().populate('userId', 'name email phone').sort({ createdAt: -1 }),
            AdvertisingModel.find().populate('userId', 'name email phone').sort({ createdAt: -1 }),
            CoBrandingModel.find().populate('userId', 'name email phone').sort({ createdAt: -1 })
        ]);

        // Transform data to unified format
        const unifiedData = [
            ...platformAMSForms.map(form => ({
                _id: form._id,
                formType: 'platformams',
                serviceType: 'platform',
                status: form.status,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt,
                user: form.userId,
                data: {
                    marketplaces: form.marketplaces,
                    hasGST: form.hasGST,
                    gstNumber: form.gstNumber,
                    monthlySales: form.monthlySales,
                    submittedAt: form.submittedAt
                }
            })),
            ...amsForms.map(form => ({
                _id: form._id,
                formType: 'ams',
                serviceType: 'ams',
                status: form.status,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt,
                user: form.userId,
                data: {
                    marketplaces: form.marketplaces,
                    serviceAccountNumber: form.serviceAccountNumber,
                    hasGST: form.hasGST,
                    gstNumber: form.gstNumber,
                    monthlySales: form.monthlySales,
                    submittedAt: form.submittedAt
                }
            })),
            ...advertisingForms.map(form => ({
                _id: form._id,
                formType: 'advertising',
                serviceType: 'marketing',
                status: form.status,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt,
                user: form.userId,
                data: {
                    services: form.services,
                    selectedPlan: form.selectedPlan
                }
            })),
            ...coBrandingForms.map(form => ({
                _id: form._id,
                formType: 'cobranding',
                serviceType: 'cobranding',
                status: form.status,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt,
                user: form.userId,
                data: {
                    isManufacturer: form.isManufacturer,
                    establishmentYear: form.establishmentYear,
                    companyName: form.companyName,
                    numberOfProducts: form.numberOfProducts,
                    productCategories: form.productCategories,
                    productUSP: form.productUSP,
                    productDescription: form.productDescription,
                    panNumber: form.panNumber
                }
            }))
        ];

        // Sort by creation date (newest first)
        unifiedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            success: true,
            data: unifiedData,
            stats: {
                total: unifiedData.length,
                platformAMS: platformAMSForms.length,
                ams: amsForms.length,
                advertising: advertisingForms.length,
                cobranding: coBrandingForms.length
            }
        });
    } catch (error) {
        console.error('Error fetching form submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching form submissions',
            error: error.message
        });
    }
};

// Update form submission status
export const updateFormSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, formType } = req.body;

        if (!['pending', 'approved', 'rejected', 'in_review'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        let updatedForm;
        let Model;

        // Select the appropriate model based on formType
        switch (formType) {
            case 'platformams':
                Model = (await import('../models/PlatformAMSForm.js')).default;
                break;
            case 'ams':
                Model = (await import('../models/AMSForm.js')).default;
                break;
            case 'advertising':
                Model = (await import('../models/AdvertisingModel.js')).default;
                break;
            case 'cobranding':
                Model = (await import('../models/CoBrandingModel.js')).default;
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid form type'
                });
        }

        // Update the form status
        updatedForm = await Model.findByIdAndUpdate(
            id,
            { 
                status,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('userId', 'name email phone');

        if (!updatedForm) {
            return res.status(404).json({
                success: false,
                message: 'Form submission not found'
            });
        }

        // Send approval email if status is approved
        if (status === 'approved' && updatedForm.userId) {
            try {
                const user = updatedForm.userId;
                
                // Map service types to user-friendly names
                const serviceTypeNames = {
                    'platformams': 'Platform Enablement Services',
                    'ams': 'Account Management Services (AMS)',
                    'advertising': 'Marketing & Advertising Services',
                    'cobranding': 'Co-Branding Partnership'
                };

                const serviceTypeName = serviceTypeNames[formType] || formType;

                const emailContent = SERVICE_APPROVAL_TEMPLATE
                    .replace(/{{userName}}/g, user.name)
                    .replace(/{{userEmail}}/g, user.email)
                    .replace(/{{serviceType}}/g, serviceTypeName)
                    .replace(/{{applicationId}}/g, updatedForm._id.toString())
                    .replace(/{{approvalDate}}/g, new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }));

                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: `🎉 Your ${serviceTypeName} Application Has Been Approved!`,
                    html: emailContent
                };

                const emailResult = await sendEmail(transporter, mailOptions);
                if (emailResult.success) {
                    console.log(`Approval email sent successfully to: ${user.email} for ${serviceTypeName}`);
                } else {
                    console.error(`Failed to send approval email to: ${user.email}`, emailResult.error);
                }
            } catch (emailError) {
                console.error('Error sending approval email:', emailError);
                // Don't fail the status update if email fails
            }
        }

        res.json({
            success: true,
            message: `Form submission ${status} successfully`,
            data: updatedForm
        });
    } catch (error) {
        console.error('Error updating form submission status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating form submission status',
            error: error.message
        });
    }
};

// Update partner request status (admin)
export const updatePartnerRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        // Find the request first to check its current status
        const existingRequest = await PartnerRequest.findById(id);
        
        if (!existingRequest) {
            return res.status(404).json({
                success: false,
                message: 'Partner request not found'
            });
        }

        // Allow admin to update status regardless of current status
        const request = await PartnerRequest.findByIdAndUpdate(
            id,
            { 
                status,
                updatedAt: new Date() 
            },
            { new: true, runValidators: true }
        ).populate('userId', 'name email');

        // Send approval email if status is approved
        if (status === 'approved' && request.userId) {
            try {
                const user = request.userId;
                
                // Map service types to user-friendly names for partner requests
                const serviceTypeNames = {
                    'ams': 'Account Management Services (AMS)',
                    'platform': 'Platform Enablement Services',
                    'cobranding': 'Co-Branding Partnership',
                    'marketing': 'Marketing & Advertising Services'
                };

                const serviceTypeName = serviceTypeNames[request.serviceType] || 'Partner Services';

                const emailContent = SERVICE_APPROVAL_TEMPLATE
                    .replace(/{{userName}}/g, user.name)
                    .replace(/{{userEmail}}/g, user.email)
                    .replace(/{{serviceType}}/g, serviceTypeName)
                    .replace(/{{applicationId}}/g, request._id.toString())
                    .replace(/{{approvalDate}}/g, new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }));

                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: `🎉 Your ${serviceTypeName} Partnership Request Has Been Approved!`,
                    html: emailContent
                };

                const emailResult = await sendEmail(transporter, mailOptions);
                if (emailResult.success) {
                    console.log(`Partner approval email sent successfully to: ${user.email} for ${serviceTypeName}`);
                } else {
                    console.error(`Failed to send partner approval email to: ${user.email}`, emailResult.error);
                }
            } catch (emailError) {
                console.error('Error sending partner approval email:', emailError);
                // Don't fail the status update if email fails
            }
        }

        res.json({
            success: true,
            message: 'Partner request status updated successfully',
            data: request
        });
    } catch (error) {
        console.error('Error updating partner request status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating partner request status',
            error: error.message
        });
    }
}; 

// Get all contact submissions
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: error.message
        });
    }
};

// Delete a contact submission
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact submission deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact submission',
            error: error.message
        });
    }
}; 