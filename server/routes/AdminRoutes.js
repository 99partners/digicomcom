import express from 'express';
import { adminLogin, adminLogout, checkAdminAuth, getDashboardStats, getAllUsers, getAllSubscribers, getAllPartnerRequests, updatePartnerRequestStatus, getAllContacts, deleteContact, getAllFormSubmissions, updateFormSubmissionStatus } from '../controllers/AdminController.js';
import { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification, toggleNotificationStatus, getNotificationStats, getAllUsersForNotifications, testScheduledNotifications } from '../controllers/NotificationController.js';
import adminAuth from '../middleware/adminAuth.js';
import PartnerRequest from '../models/PartnerRequestModel.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protected routes
router.get('/auth-check', adminAuth, checkAdminAuth);
router.get('/dashboard-stats', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getAllUsers);
router.get('/subscribers', adminAuth, getAllSubscribers);
router.get('/contacts', adminAuth, getAllContacts);
router.delete('/contacts/:id', adminAuth, deleteContact);

// Get all partner requests
router.get('/partner-requests', adminAuth, async (req, res) => {
    try {
        // First try to get requests without population
        const requests = await PartnerRequest.find().sort({ createdAt: -1 });

        // Then populate user details if available
        const populatedRequests = await Promise.all(
            requests.map(async (request) => {
                try {
                    await request.populate('userId', 'name email phone');
                    return request;
                } catch (populateError) {
                    console.error(`Error populating user for request ${request._id}:`, populateError);
                    // Return the request without user details if population fails
                    return request;
                }
            })
        );

        res.json({
            success: true,
            data: populatedRequests
        });
    } catch (error) {
        console.error('Detailed error fetching partner requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching partner requests',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Update partner request status
router.put('/partner-requests/:id/status', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const request = await PartnerRequest.findByIdAndUpdate(
            id,
            { 
                status,
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Partner request not found'
            });
        }

        // Try to populate user details
        try {
            await request.populate('userId', 'name email phone');
        } catch (populateError) {
            console.error('Error populating user details:', populateError);
            // Continue without user details
        }

        res.json({
            success: true,
            message: `Partner request ${status} successfully`,
            data: request
        });
    } catch (error) {
        console.error('Error updating partner request status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating partner request status',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get partner request statistics
router.get('/partner-request-stats', adminAuth, async (req, res) => {
    try {
        const stats = await PartnerRequest.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const statsObject = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {
            pending: 0,
            approved: 0,
            rejected: 0
        });

        res.json({
            success: true,
            data: statsObject
        });
    } catch (error) {
        console.error('Error fetching partner request statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching partner request statistics',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Partner Request Management Routes
router.get('/partner-requests', adminAuth, getAllPartnerRequests);
router.put('/partner-requests/:id/status', adminAuth, updatePartnerRequestStatus);

// Form Submissions Management Routes
router.get('/form-submissions', adminAuth, getAllFormSubmissions);
router.put('/form-submissions/:id/status', adminAuth, updateFormSubmissionStatus);

// Test approval email endpoint (for debugging)
router.post('/test-approval-email', adminAuth, async (req, res) => {
    try {
        const { email, serviceType, userName } = req.body;
        
        if (!email || !serviceType || !userName) {
            return res.status(400).json({
                success: false,
                message: 'Email, serviceType, and userName are required'
            });
        }

        const transporter = (await import('../config/nodemailer.js')).default;
        const { SERVICE_APPROVAL_TEMPLATE, sendEmail } = await import('../config/emailTemplets.js');

        const emailContent = SERVICE_APPROVAL_TEMPLATE
            .replace(/{{userName}}/g, userName)
            .replace(/{{userEmail}}/g, email)
            .replace(/{{serviceType}}/g, serviceType)
            .replace(/{{applicationId}}/g, 'TEST-' + Date.now())
            .replace(/{{approvalDate}}/g, new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `🧪 TEST: Your ${serviceType} Application Has Been Approved!`,
            html: emailContent
        };

        const result = await sendEmail(transporter, mailOptions);

        if (result.success) {
            res.json({
                success: true,
                message: 'Test approval email sent successfully',
                details: result.info
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send test approval email',
                error: result.error.message
            });
        }
    } catch (error) {
        console.error('Test approval email error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Notification Management Routes
router.post('/notifications', adminAuth, createNotification);
router.get('/notifications', adminAuth, getAllNotifications);
router.get('/notifications/stats', adminAuth, getNotificationStats);
router.get('/notifications/users', adminAuth, getAllUsersForNotifications);
router.get('/notifications/test-scheduled', adminAuth, testScheduledNotifications);
router.get('/notifications/:id', adminAuth, getNotificationById);
router.put('/notifications/:id', adminAuth, updateNotification);
router.delete('/notifications/:id', adminAuth, deleteNotification);
router.patch('/notifications/:id/toggle-status', adminAuth, toggleNotificationStatus);

export default router; 