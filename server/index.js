import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';

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

// Middleware: JSON & cookies
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedDomains = process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) : 
    (process.env.NODE_ENV === 'production' ?
        [
            'https://99digicom.com',
            'https://www.99digicom.com',
            'https://api.99digicom.com',
            'https://99partners.in',
            'https://www.99partners.in',
            'http://99digicom.com',
            'http://www.99digicom.com'
        ] :
        [
            'http://localhost:5173',
            'http://localhost:5050',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5050'
        ]);

console.log('Current environment:', process.env.NODE_ENV);
console.log('Allowed CORS origins:', allowedDomains);

// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }

        // In development, be more permissive with localhost variations
        if (process.env.NODE_ENV !== 'production') {
            const isLocalhost = origin.includes('localhost') || 
                              origin.includes('127.0.0.1') || 
                              origin.includes('0.0.0.0');
            
            if (isLocalhost) {
                console.log('✅ Localhost origin allowed:', origin);
                return callback(null, true);
            }
        }

        // Check if the origin matches any allowed domain
        const normalizedOrigin = origin.toLowerCase().trim();
        if (allowedDomains.some(domain => normalizedOrigin === domain.toLowerCase().trim())) {
            callback(null, true);
        } else {
            console.warn(`Unauthorized access attempt from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

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

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        port: PORT,
        cors: {
            allowedOrigins: allowedDomains,
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
