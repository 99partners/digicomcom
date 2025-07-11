import jwt from 'jsonwebtoken';
import Admin from '../models/AdminModel.js';

const adminAuth = async (req, res, next) => {
    try {
        // Check Authorization header first
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract token from Bearer header
            token = authHeader.split(' ')[1];
        } else {
            // Fallback to cookie
            token = req.cookies.adminToken;
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                message: 'Admin not found' 
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
};

export default adminAuth; 