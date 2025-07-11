//Why this middleware is needed ?
  

/*
In the sendVerifyOtp, verifyEmail in this two controller we are geeting
userId from req.body. but in ui we are sending userId.

so using middleware function we are getting token from cookie and 
we are getting userId from that token. 

*/


import jwt from 'jsonwebtoken';

const userAuth = async(req, res, next) => {
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

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
        } catch (jwtError) {
            // Handle specific JWT errors
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: "Token expired. Please login again."
                });
            }
            if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token. Please login again."
                });
            }
            throw jwtError;
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false, 
            message: "Authentication failed. Please login again."
        });
    }
};

export default userAuth;