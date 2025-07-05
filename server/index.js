// import express from 'express'
// import 'dotenv/config'
// import cookieParser from 'cookie-parser'
// import { connectDB } from './config/db.js'
// import multer from 'multer'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import cors from 'cors'
// const app = express()
// const PORT = process.env.PORT || 5050

// // Get current directory
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // Security middleware
 

// 15// Parse JSON bodies and cookies
// app.use(express.json())
// app.use(cookieParser())

// // CORS Configuration with detailed error handling
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     'https://99digicom.com',
//     'https://www.99digicom.com',
//     'https://api.99digicom.com',
//     'http://localhost:5173',
//     'http://localhost:3000'
//   ];
  
//   const origin = req.headers.origin;
//   console.log('Request origin:', origin);

//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   }

//   // Handle preflight
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // Log request details
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);

//   next();
// });

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   next();
// });

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, uniqueSuffix + path.extname(file.originalname))
//   }
// })
// const upload = multer({ storage: storage })

// //call the DB fun.
// connectDB()

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// //Routes
// import AuthRouter from './routes/AuthRoutes.js'
// import UserRouter from './routes/UserRoutes.js'
// import newsletterRoutes from './routes/newsletterRoutes.js';
// import AdminRouter from './routes/AdminRoutes.js'
// import platformAMSRoutes from './routes/platformAMSRoutes.js';
// import coBrandingRoutes from './routes/coBrandingRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';
// import blogRoutes from './routes/blogRoutes.js';

// //API's Endpoints...........
// app.get('/', (req, res)=>{
//     res.send(`<h1> API's is Working... </h1>`)
// })

// //:white_tick: Register Routes
// app.use('/api/auth',  AuthRouter);
// app.use('/api/user', UserRouter);
// app.use("/api/newsletter", newsletterRoutes);
// app.use("/api/admin", AdminRouter);
// app.use("/api/platform-ams", platformAMSRoutes);
// app.use('/api/co-branding', coBrandingRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/blogs', blogRoutes);

// app.listen(PORT,()=>{
//     console.log(`Server running on PORT : ${PORT}`)
// })


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

// CORS Configuration with allowed origins
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://99digicom.com',
    'https://www.99digicom.com',
    'https://api.99digicom.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
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

// Routes
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import AdminRouter from './routes/AdminRoutes.js'
import platformAMSRoutes from './routes/platformAMSRoutes.js'
import coBrandingRoutes from './routes/coBrandingRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

// Test route
app.get('/', (req, res) => {
  res.send(`<h1>API is Working...</h1>`)
})

// Register API routes
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/admin', AdminRouter)
app.use('/api/platform-ams', platformAMSRoutes)
app.use('/api/co-branding', coBrandingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blogs', blogRoutes)

// ✅ Serve frontend (must be AFTER all API routes)
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`)
})
