//Why this middleware is needed ?
  

/*
In the sendVerifyOtp, verifyEmail in this two controller we are geeting
userId from req.body. but in ui we are sending userId.

so using middleware function we are getting token from cookie and 
we are getting userId from that token. 

*/


import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

        // Use access token secret
        const jwtSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
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
        // Attempt silent refresh on expired access token
        if (error.name === 'TokenExpiredError') {
            try {
                const refreshToken = req.cookies?.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({ success: false, message: "Token expired. Please login again." });
                }

                const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
                const decodedRefresh = jwt.verify(refreshToken, refreshSecret);

                const accessSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
                const newAccessToken = jwt.sign({ id: decodedRefresh.id }, accessSecret, { expiresIn: '15m' });

                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    domain: process.env.NODE_ENV === 'production' ? '.99digicom.com' : undefined,
                    path: '/',
                    maxAge: 15 * 60 * 1000
                };
                res.cookie('token', newAccessToken, cookieOptions);

                req.user = { id: decodedRefresh.id };
                req.body.userId = decodedRefresh.id;
                return next();
            } catch (refreshError) {
                console.error('Silent refresh failed:', refreshError);
                return res.status(401).json({ success: false, message: "Session expired. Please login again." });
            }
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

export const verifyGoogleToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        req.user = payload;
        next();
    } catch (error) {
        console.error('Google token verification error:', error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default userAuth;

