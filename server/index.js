import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Available but using custom CORS implementation
import mongoose from 'mongoose';
import { logger } from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5050;

// Enhanced production logging
console.log('🚀 Starting server with configuration:', {
    environment: process.env.NODE_ENV,
    port: PORT,
    hostname: process.env.HOSTNAME || 'localhost',
    timestamp: new Date().toISOString()
});

// Set production environment variables if not set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

// Production JWT secret fallback
if (!process.env.JWT_SECRET && !process.env.JWT_SECRET_KEY) {
    process.env.JWT_SECRET = 'sbdhsbd#2oj23j2j3j2j3j2j3j2j3j2j3j2j3';
    console.log('⚠️ Using fallback JWT secret for production');
}

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware: Logging, JSON & cookies
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

// Log all unhandled errors
process.on('uncaughtException', (error) => {
    logger.error(error);
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(new Error('Unhandled Promise Rejection: ' + reason));
    console.error('Unhandled Promise Rejection:', reason);
});

// CORS Configuration - Manual implementation to prevent duplicate headers
const allowedOrigins = [
    'https://99digicom.com',
    'https://www.99digicom.com',
    'https://api.99digicom.com',
    ...(process.env.NODE_ENV !== 'production' ? [
        'http://localhost:5173',
        'http://localhost:5050',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5050'
    ] : [])
];

// Log CORS configuration
console.log('🔒 CORS Configuration:', {
    environment: process.env.NODE_ENV,
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
});

console.log('Current environment:', process.env.NODE_ENV);
console.log('Allowed CORS origins:', allowedOrigins);

// Enhanced CORS middleware with better error handling and logging
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const requestInfo = {
        origin,
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString()
    };
    
    // Log all incoming requests
    logger.cors('REQUEST', requestInfo);

    // Function to set CORS headers
    const setCorsHeaders = () => {
        if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            // Important: Vary header for CDN caching
            res.setHeader('Vary', 'Origin');
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        // Add max age for preflight caching
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    };

    try {
        // Handle preflight requests first
        if (req.method === 'OPTIONS') {
            if (allowedOrigins.includes(origin) || !origin) {
                setCorsHeaders();
                            logger.cors('PREFLIGHT_APPROVED', { origin });
            return res.status(204).end();
        }
        logger.cors('PREFLIGHT_BLOCKED', { origin });
        return res.status(204).end(); // Still return 204 for security
    }

    // Handle actual requests
    if (allowedOrigins.includes(origin) || !origin) {
        setCorsHeaders();
        logger.cors('REQUEST_APPROVED', { origin });
        return next();
    }

    // Log blocked requests
    logger.cors('REQUEST_BLOCKED', {
        ...requestInfo,
        reason: 'Origin not allowed',
        allowedOrigins: allowedOrigins
    });

        // In production, don't expose allowed origins
        return res.status(403).json({
            error: 'CORS policy violation',
            message: process.env.NODE_ENV === 'production' 
                ? 'Origin not allowed' 
                : `Origin ${origin} not in allowed list: ${allowedOrigins.join(', ')}`
        });

    } catch (error) {
        console.error('🔥 CORS error:', error);
        return res.status(500).json({
            error: 'Internal CORS error',
            message: process.env.NODE_ENV === 'production' 
                ? 'Server configuration error' 
                : error.message
        });
    }
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

// Health check endpoint with CORS test
app.get('/health', (req, res) => {
    const origin = req.headers.origin;
    const isOriginAllowed = allowedOrigins.includes(origin);
    
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        port: PORT,
        cors: {
            allowedOrigins: allowedOrigins,
            currentOrigin: origin,
            isOriginAllowed,
            headers: {
                sent: res.getHeaders(),
                received: req.headers
            }
        },
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        server: {
            nodeVersion: process.version,
            platform: process.platform,
            memory: process.memoryUsage()
        }
    });
});

// CORS test endpoint
app.options('/api/cors-test', (req, res) => {
    const origin = req.headers.origin;
    console.log('🔍 CORS Test - Preflight from:', origin);
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        console.log('✅ CORS Test - Preflight approved');
    } else {
        console.warn('❌ CORS Test - Preflight blocked');
    }
    
    res.status(204).end();
});

app.get('/api/cors-test', (req, res) => {
    const origin = req.headers.origin;
    console.log('🔍 CORS Test - Request from:', origin);
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        console.log('✅ CORS Test - Request approved');
        res.json({ 
            success: true, 
            message: 'CORS is working correctly',
            origin,
            timestamp: new Date().toISOString()
        });
    } else {
        console.warn('❌ CORS Test - Request blocked');
        res.status(403).json({ 
            success: false, 
            message: 'CORS check failed' 
        });
    }
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

// Add error handler middleware last
app.use(errorHandler);

// Initialize server
const startServer = async () => {
    try {
        // Log server startup
        logger.access(
            { 
                method: 'SYSTEM', 
                url: '/startup',
                status: 'INITIALIZING',
                environment: process.env.NODE_ENV,
                port: PORT
            }, 
            null, 
            0
        );
        console.log('🔄 Initializing server...');
        
        // Connect to MongoDB
        console.log('🔄 Connecting to database...');
        await connectDB();
        
        // Log successful database connection
        logger.db('CONNECT', 'system', { status: 'connected' }, Date.now());
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
