const User = require('../models/User');
const Newsletter = require('../models/Newsletter');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verify hardcoded admin credentials
        if (username === 'admin99' && password === '99Partnersin') {
            // Generate admin token
            const token = jwt.sign(
                { 
                    id: 'admin',
                    isAdmin: true 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.json({
                success: true,
                token,
                message: 'Admin login successful'
            });
        }

        res.status(401).json({
            success: false,
            message: 'Invalid admin credentials'
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Admin login failed'
        });
    }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, activeUsers, newsletterSubscribers] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isVerified: true }),
            Newsletter.countDocuments({ active: true })
        ]);

        res.json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                newsletterSubscribers,
                totalPartners: 2 // Hardcoded for now
            }
        });
    } catch (error) {
        console.error('Error getting dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get dashboard statistics'
        });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email phone isVerified createdAt')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        });
    }
}; 