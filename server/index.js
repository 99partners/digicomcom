import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const PORT = 5050

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware: JSON & cookies
app.use(express.json())
app.use(cookieParser())

// CORS Configuration
const allowedDomains = [
  'https://99digicom.com',
  'https://api.99digicom.com',
  'https://www.99digicom.com',
  'http://localhost:5173'
];

// Enable CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedDomains.indexOf(origin) === -1) {
      console.warn('Unauthorized access attempt from:', origin);
      return callback(null, false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// Connect DB
connectDB()

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Import routes
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import AdminRouter from './routes/AdminRoutes.js'
import platformAMSRoutes from './routes/platformAMSRoutes.js'
import coBrandingRoutes from './routes/coBrandingRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import partnerRoutes from './routes/partnerRoutes.js'

// API routes
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/admin', AdminRouter)
app.use('/api/platform-ams', platformAMSRoutes)
app.use('/api/co-branding', coBrandingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/partner', partnerRoutes)

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong! Please try again later.'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
