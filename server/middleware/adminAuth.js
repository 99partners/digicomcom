const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (!decoded.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as admin'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = adminAuth; 