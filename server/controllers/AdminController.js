const User = require('../models/User');
const Newsletter = require('../models/Newsletter');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        // Get total users count
        const totalUsers = await User.countDocuments();
        
        // Get active users (users who have verified their email)
        const activeUsers = await User.countDocuments({ isVerified: true });
        
        // Get newsletter subscribers count
        const newsletterSubscribers = await Newsletter.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                newsletterSubscribers
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email phone isVerified createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getUsers
}; 