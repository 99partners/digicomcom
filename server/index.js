import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5050

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware: JSON & cookies
app.use(express.json())
app.use(cookieParser())

// CORS Configuration
const corsOptions = {
  origin: ['https://99digicom.com', 'https://www.99digicom.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle OPTIONS requests for all API routes
app.options('/api/*', cors(corsOptions));

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

// ✅ Explicit newsletter route handling
app.post('/api/newsletter', (req, res, next) => {
  console.log('Newsletter POST request received');
  next();
});
app.use('/api/newsletter', newsletterRoutes)  // Newsletter route registered before static files

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
