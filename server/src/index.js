// Load environment based on NODE_ENV
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`)
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceApplicationRoutes = require('./routes/serviceApplicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://99digicom.com']
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'X-Custom-Request',
    'x-custom-request',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['X-Custom-Request', 'x-custom-request']
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Security headers with relaxed settings for development
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// Request logging
app.use(morgan('dev'));

// Mount routes with neutral paths
app.use('/api/system/account', authRoutes);  // Changed to a more neutral path
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/applications', serviceApplicationRoutes);
app.use('/management/portal', adminRoutes);

// Update health check endpoint info
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: {
      test: '/api/test',
      auth: '/api/system/account',  // Updated endpoint
      applications: '/api/applications',
      newsletter: '/api/newsletter',
      contact: '/api/contact',
      admin: '/management/portal'
    }
  });
});

// 404 handler
app.use((req, res) => {
  const error = {
    path: req.path,
    method: req.method,
    headers: req.headers,
    body: req.body,
    availableEndpoints: {
      auth: '/api/system/account',  // Updated endpoint
      applications: '/api/applications',
      newsletter: '/api/newsletter',
      contact: '/api/contact',
      admin: '/management/portal'
    }
  };
  console.log('404 - Route not found:', error);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    error
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Database connection and server start
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });