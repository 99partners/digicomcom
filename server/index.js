import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5050;

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware: JSON & cookies
app.use(express.json());
app.use(cookieParser());

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// Enhanced CORS Configuration for multiple environments
const getDefaultAllowedOrigins = () => {
    const defaultOrigins = [
        'https://99digicom.com',
        'https://www.99digicom.com',
        'https://api.99digicom.com'
    ];

    // Add development origins if not in production
    if (isDevelopment) {
        defaultOrigins.push(
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://localhost:5050',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174'
        );
    }

    return defaultOrigins;
};

const allowedDomains = process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) : 
    getDefaultAllowedOrigins();

console.log('🌐 CORS Configuration:', {
    environment: process.env.NODE_ENV || 'development',
    allowedOrigins: allowedDomains,
    isDevelopment,
    isProduction
});

// Enhanced CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // Log origin in development mode
        if (isDevelopment) {
            console.log('🔍 Request origin:', origin);
        }
        
        // Allow requests with no origin (like mobile apps, Postman, or curl requests)
        if (!origin) {
            if (isDevelopment) {
                console.log('✅ No origin provided, allowing request');
            }
            return callback(null, true);
        }

        // In development, be more permissive with localhost variations
        if (isDevelopment) {
            const isLocalhost = origin.includes('localhost') || 
                              origin.includes('127.0.0.1') || 
                              origin.includes('0.0.0.0');
            
            if (isLocalhost) {
                console.log('✅ Localhost origin allowed:', origin);
                return callback(null, true);
            }
        }

        // Check if the origin matches any allowed domain
        const isAllowed = allowedDomains.some(domain => {
            // Exact match
            if (domain === origin) return true;
            
            // Wildcard subdomain support (e.g., *.99digicom.com)
            if (domain.startsWith('*.')) {
                const baseDomain = domain.slice(2);
                return origin.endsWith(baseDomain);
            }
            
            return false;
        });

        if (isAllowed) {
            if (isDevelopment) {
                console.log('✅ Origin allowed:', origin);
            }
            callback(null, true);
        } else {
            console.warn(`❌ Unauthorized access attempt from: ${origin} [${process.env.NODE_ENV || 'development'} mode]`);
            if (isDevelopment) {
                // In development, log more details for debugging
                console.warn('Available allowed origins:', allowedDomains);
                // Allow it anyway in development for easier debugging
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
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

// Enhanced security headers middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Set security headers based on environment
    if (isProduction) {
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('X-Frame-Options', 'DENY');
        res.header('X-XSS-Protection', '1; mode=block');
        res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    }
    
    // Set CORS headers if origin is allowed
    const isOriginAllowed = origin && (
        allowedDomains.some(domain => {
            if (domain === origin) return true;
            if (domain.startsWith('*.')) {
                const baseDomain = domain.slice(2);
                return origin.endsWith(baseDomain);
            }
            return false;
        }) ||
        (isDevelopment && (origin.includes('localhost') || origin.includes('127.0.0.1')))
    );
    
    if (isOriginAllowed) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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
    res.json({ message: 'Server is running successfully!' });
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
        // Connect to MongoDB
        await connectDB();
        
        // Start listening only after successful DB connection
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
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
