import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const PORT = 5050 // Fixed port for development

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
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5050'  // Added localhost:5050
];

// Enable CORS with domain checking
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('Request origin:', origin);

  if (allowedDomains.includes(origin)) {
    // Set CORS headers for allowed domains
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    next(); // Proceed with the request
  } else {
    // Log and deny access to other domains
    console.warn('Unauthorized access attempt from:', origin);
    res.status(403).json({ 
      error: 'CORS Error',
      message: 'Access forbidden: Origin not allowed',
      allowedOrigins: allowedDomains,
      requestOrigin: origin
    });
  }
});

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

// ✅ Register API routes BEFORE static frontend
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
// ✅ Mount newsletter routes at root level since paths include /api/newsletter
app.use('/api/newsletter', newsletterRoutes)  // Routes already include full /api/newsletter path
app.use('/api/admin', AdminRouter)
app.use('/api/platform-ams', platformAMSRoutes)
app.use('/api/co-branding', coBrandingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blogs', blogRoutes)

// ✅ Serve static frontend AFTER all API routes
app.use(express.static(path.join(__dirname, 'client/dist')))

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`)
})
