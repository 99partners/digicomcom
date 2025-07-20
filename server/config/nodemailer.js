import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    logger: process.env.NODE_ENV === 'development' // Enable logger in development
});

// Test the connection and log the result
const testConnection = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email server connection successful');
        console.log('📧 SMTP Configuration:', {
            host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            user: process.env.SMTP_USER ? '***' + process.env.SMTP_USER.slice(-4) : 'Not set',
            senderEmail: process.env.SENDER_EMAIL || 'Not set'
        });
    } catch (error) {
        console.error('❌ Email server connection failed:', error);
        console.error('🔧 Check your environment variables:');
        console.error('- SMTP_HOST (should be: smtp-relay.brevo.com)');
        console.error('- SMTP_PORT (should be: 587)');
        console.error('- SMTP_USER (your Brevo login email)');
        console.error('- SMTP_PASSWORD (your Brevo SMTP password/API key)');
        console.error('- SENDER_EMAIL (verified sender email in Brevo)');
    }
};

// Test connection on startup
testConnection();

export default transporter;