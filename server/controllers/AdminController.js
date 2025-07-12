import Admin from '../models/AdminModel.js';
import Newsletter from '../models/Newsletter.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import PartnerRequest from '../models/PartnerRequestModel.js';
import Contact from '../models/ContactModel.js';

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
        const users = await User.find({}, 'name email phone isAccountVerified')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            users
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
        );

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