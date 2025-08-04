import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import GoogleUser from '../models/GoogleUserModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ 
            success: false, 
            message: "Token is required" 
        });
    }

    try {
        console.log('Attempting to verify Google token...');
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        }).catch(error => {
            console.error('Google token verification failed:', error);
            throw new Error('Invalid Google token');
        });
        
        console.log('Google token verified successfully');
        const payload = ticket.getPayload();
        const { sub: googleId, name, email, picture: avatar } = payload;
        
        console.log('Extracted user data:', { googleId, email });
        // Check if user exists
        let user = await GoogleUser.findOne({ googleId });

        if (!user) {
            // Create new user if doesn't exist
            user = await GoogleUser.create({
                googleId,
                name,
                email,
                avatar
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '1d' }
        );

        // Set cookie
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            domain: process.env.NODE_ENV === 'production' ? '.99digicom.com' : undefined,
            path: '/'
        });

        return res.json({
            success: true,
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Google login error:', error);
        const errorMessage = error.message === 'Invalid Google token' 
            ? 'Failed to verify Google token. Please try again.'
            : 'An error occurred during Google authentication.';
        
        return res.status(error.message === 'Invalid Google token' ? 401 : 500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};