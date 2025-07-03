import Admin from '../models/AdminModel.js';
import Newsletter from '../models/Newsletter.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

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

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ 
            success: true, 
            message: 'Login successful',
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
        const [totalUsers, totalSubscribers, totalBlogs, totalPartners] = await Promise.all([
            User.countDocuments(),
            Newsletter.countDocuments(),
            Promise.resolve(2), // Placeholder for blog count
            Promise.resolve(1)  // Placeholder for partner count
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalSubscribers,
                totalBlogs,
                totalPartners
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