import dotenv from 'dotenv';
dotenv.config({ path: './.env.production' });

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { verifyGoogleToken } from './middleware/userAuth.js';
import GoogleUser from './models/GoogleUserModel.js';

const app = express();
const PORT = process.env.PORT || 5051;

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

// Create API router
const apiRouter = express.Router();

// Protected Route
apiRouter.get("/protected", verifyGoogleToken, async (req, res, next) => {
    try {
        const { sub, email, name, picture } = req.user;
        const user = await GoogleUser.findOneAndUpdate(
            { googleId: sub },
            { email, name, avatar: picture },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            message: "Authorized access granted",
            user
        });
    } catch (err) {
        next(err);
    }
});

// Enhanced production logging
console.log('🚀 Starting server with configuration:', {
    environment: process.env.NODE_ENV,
    port: PORT,
    hostname: process.env.HOSTNAME || 'localhost',
    timestamp: new Date().toISOString()
});

// Set production environment variables if not set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

// Production JWT secret fallback
if (!process.env.JWT_SECRET && !process.env.JWT_SECRET_KEY) {
    process.env.JWT_SECRET = 'sbdhsbd#2oj23j2j3j2j3j2j3j2j3j2j3j2j3';
    console.log('⚠️ Using fallback JWT secret for production');
}

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware: JSON & cookies
app.use(express.json());
app.use(cookieParser());

// CORS Configuration - Manual implementation to prevent duplicate headers
const extraAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

const allowedOrigins = [
    'https://99digicom.com',
    'https://www.99digicom.com',
    'https://api.99digicom.com',
    ...(process.env.NODE_ENV !== 'production' ? [
        'http://localhost:5173',
        'http://localhost:5051',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5051'
    ] : []),
    ...extraAllowedOrigins
];
console.log('Current environment:', process.env.NODE_ENV);
console.log('Allowed CORS origins:', allowedOrigins);



app.all("/on_subscribe", (req, res) => {
    if (req.method === "GET") {
        console.log("GET request for verification:", req.query);
        res.json({ status: "ready", timestamp: new Date().toISOString() });
    } else if (req.method === "POST") {
        console.log("POST subscription request:", req.body);
        res.json({
            answer: req.body.challenge || "subscription_accepted",
            message: "Subscription processed"
        });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
});



app.use((req, res, next) => {
    const origin = req.headers.origin;

    console.log('🔍 Request from origin:', origin || 'NO ORIGIN', 'Method:', req.method);

    if (
        process.env.NODE_ENV !== 'production' ||
        !origin || // allow requests without Origin (curl, ONDC registry, etc.)
        allowedOrigins.includes(origin)
    ) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRF-Token, x-csrf-token');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-Requested-With');
        res.setHeader('Access-Control-Max-Age', '86400');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
    } else {
        console.warn('❌ Origin blocked:', origin);
        res.status(403).json({ error: 'Not allowed by CORS' });
        return;
    }

    next();
});


// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Global error handler caught:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
import AuthRouter from './routes/AuthRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import AdminRouter from './routes/AdminRoutes.js';
import platformAMSRoutes from './routes/platformAMSRoutes.js';
import coBrandingRoutes from './routes/coBrandingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import partnerRequestRoutes from './routes/partnerRequestRoutes.js';
import amsRoutes from './routes/amsRoutes.js';
import marketingApplicationRoutes from './routes/marketingApplicationRoutes.js';
import advertisingRoutes from './routes/advertisingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import googleRoutes from './routes/googleRoutes.js';
import ondc from './routes/ondc.js';
import onSubscribeRoute from './routes/on_subscribe.js';

// API routes
app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', AdminRouter);
app.use('/api/platform-ams', platformAMSRoutes);
app.use('/api/co-branding', coBrandingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/partner-requests', partnerRequestRoutes);
app.use('/api/ams', amsRoutes);
app.use('/api/marketing', marketingApplicationRoutes);
app.use('/api/advertising', advertisingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/google', googleRoutes);
app.use('/ondc', ondc);
app.use("/", onSubscribeRoute);

// Basic route to test server
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully!',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        port: PORT
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        port: PORT,
        cors: {
            allowedOrigins: allowedOrigins,
            currentOrigin: req.headers.origin
        },
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'API is running',
        environment: process.env.NODE_ENV,
        version: '1.0.0',
        endpoints: [
            '/api/auth',
            '/api/user',
            '/api/admin',
            '/api/partner',
            '/api/blogs',
            '/api/contact',
            '/api/newsletter'
        ],
        timestamp: new Date().toISOString()
    });
});

// Error handling for unhandled routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Initialize server
const startServer = async () => {
    try {
        console.log('🔄 Initializing server...');

        // Connect to MongoDB
        console.log('🔄 Connecting to database...');
        await connectDB();
        console.log('✅ Database connected successfully');

        // Start listening only after successful DB connection
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running successfully!`);
            console.log(`📍 Local: http://localhost:${PORT}`);
            console.log(`🌐 Network: http://0.0.0.0:${PORT}`);
            console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`🔗 API info: http://localhost:${PORT}/api`);
        });

        // Handle server errors
        server.on('error', (err) => {
            console.error('Server error:', err);
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use`);
                process.exit(1);
            }
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                mongoose.connection.close(() => {
                    console.log('Database connection closed');
                    process.exit(0);
                });
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('Error details:', error.message);
        process.exit(1); // Exit if we can't connect to the database
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
startServer();
