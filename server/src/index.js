require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceApplicationRoutes = require('./routes/serviceApplicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://99digicom.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Add pre-flight response
app.options('*', cors());

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// Request logging
app.use(morgan('dev'));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Health check endpoints
app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint is working' });
});

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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digicomcom')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 