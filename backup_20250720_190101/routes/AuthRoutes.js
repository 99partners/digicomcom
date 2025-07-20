import express from 'express';
import { register, login, logout, isAuthenticated, sendRestOtp, sendVerifyOtp, verifyEmail, resetPassword } from '../controllers/AuthController.js';
import userAuth from '../middleware/userAuth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
AuthRouter.post('/verify-account', userAuth, verifyEmail);
AuthRouter.get('/is-auth', userAuth, isAuthenticated);
AuthRouter.post('/send-reset-otp', sendRestOtp);
AuthRouter.post('/reset-password', resetPassword);

// Test email endpoint (for debugging)
AuthRouter.post('/test-email', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required'
            });
        }

        const transporter = (await import('../config/nodemailer.js')).default;
        const { sendEmail } = await import('../config/emailTemplets.js');

        const testEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #22D172;">🧪 Test Email from 99DigiCom</h2>
            <p>This is a test email to verify your Brevo email configuration.</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> ✅ Email configuration is working!</p>
            <hr>
            <p style="font-size: 12px; color: #666;">
                If you received this email, your Brevo SMTP configuration is working correctly.
            </p>
        </div>`;

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: '🧪 Test Email - Brevo Configuration',
            html: testEmailContent
        };

        const result = await sendEmail(transporter, mailOptions);

        if (result.success) {
            res.json({
                success: true,
                message: 'Test email sent successfully',
                details: result.info
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send test email',
                error: result.error.message
            });
        }
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

export default AuthRouter;