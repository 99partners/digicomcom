import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const PORT = process.env.PORT || 5050

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Security middleware
app.enable('trust proxy');

// Force HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // Redirect to https
      return res.redirect('https://' + req.headers.host + req.url);
    }
  }
  next();
});

// Secure headers middleware
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Parse JSON bodies and cookies before CORS
app.use(express.json())
app.use(cookieParser())

// CORS Configuration
const allowedDomains = [
  'https://99digicom.com',
  'https://www.99digicom.com',
  'https://api.99digicom.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('Request origin:', origin);

  // Allow requests with no origin
  if (!origin) {
    return next();
  }

  if (allowedDomains.includes(origin)) {
    // Set basic CORS headers
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
      // Accept all requested headers
      const requestHeaders = req.headers['access-control-request-headers'];
      if (requestHeaders) {
        res.header('Access-Control-Allow-Headers', requestHeaders);
      }

      // Accept all requested methods
      const requestMethod = req.headers['access-control-request-method'];
      if (requestMethod) {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      }

      res.header('Access-Control-Max-Age', '86400'); // 24 hours
      return res.status(204).end();
    }

    next();
  } else {
    // Log unauthorized attempts
    console.warn('Unauthorized access attempt from:', origin);
    res.status(403).json({
      error: 'CORS Error',
      message: 'Access forbidden: Origin not allowed',
      allowedOrigins: allowedDomains,
      requestOrigin: origin
    });
  }
});

//call the DB fun.
connectDB()

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//Routes
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js';
import AdminRouter from './routes/AdminRoutes.js'
import platformAMSRoutes from './routes/platformAMSRoutes.js';
import coBrandingRoutes from './routes/coBrandingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

//API's Endpoints...........
app.get('/', (req, res)=>{
    res.send(`<h1> API's is Working... </h1>`)
})

//:white_tick: Register Routes
app.use('/api/auth',  AuthRouter);
app.use('/api/user', UserRouter);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api/platform-ams", platformAMSRoutes);
app.use('/api/co-branding', coBrandingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})
