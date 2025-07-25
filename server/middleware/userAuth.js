//Why this middleware is needed ?
  

/*
In the sendVerifyOtp, verifyEmail in this two controller we are geeting
userId from req.body. but in ui we are sending userId.

so using middleware function we are getting token from cookie and 
we are getting userId from that token. 

*/


import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        // Check for token in Authorization header first
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract token from Bearer header
            token = authHeader.split(' ')[1];
        } else {
            // Fallback to cookie
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false, 
                message: "Not Authorized. Please login again."
            });
        }

        // Use consistent JWT secret
        const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            console.error('JWT secret is not configured');
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }

        const decoded = jwt.verify(token, jwtSecret);

        if (!decoded.id) {
            return res.status(401).json({
                success: false, 
                message: "Invalid token. Please login again."
            });
        }

        // Set both req.user and req.body.userId for backward compatibility
        req.user = { id: decoded.id };
        req.body.userId = decoded.id;
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }
        return res.status(401).json({
            success: false, 
            message: "Authentication failed. Please login again."
        });
    }
};

export default userAuth;

