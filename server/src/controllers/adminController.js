const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login controller
const adminLogin = async (req, res) => {
    try {
        console.log('Admin login attempt - Request body:', req.body);
        
        const { email, password } = req.body;
        
        if (!email || !password) {
            console.log('Missing credentials:', { email: !!email, password: !!password });
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // For development purposes, using hardcoded admin credentials
        // In production, this should be replaced with database lookup
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@digicomcom.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        console.log('Validating credentials for:', email);

        if (email !== adminEmail) {
            console.log('Invalid email:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = password === adminPassword; // In production, use bcrypt.compare

        if (!isPasswordValid) {
            console.log('Invalid password for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: 'admin', email: adminEmail, role: 'admin' },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        // Set cookie for additional security
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        console.log('Admin login successful:', email);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: 'admin',
                email: adminEmail,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        // Placeholder dashboard stats
        const stats = {
            totalUsers: 0,
            activeUsers: 0,
            totalOrders: 0,
            recentActivity: []
        };

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get users list
const getUsers = async (req, res) => {
    try {
        // Placeholder users list
        const users = [];

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    adminLogin,
    getDashboardStats,
    getUsers
}; 