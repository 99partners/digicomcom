import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'

const app = express()
const PORT = process.env.PORT || 5050
// const allowedOrigins = ['https://mern-auth-frontend-5pdz.onrender.com', "http://localhost:5173"]
//call the DB fun.
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173","http://99digicom.com" ,"https://99digicom.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Optional: if using cookies or sessions
}));

//Routes
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js';
import AdminRouter from './routes/AdminRoutes.js'
import platformAMSRoutes from './routes/platformAMSRoutes.js';
import coBrandingRoutes from './routes/coBrandingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

//API's Endpoints...........
app.get('/', (req, res)=>{
    res.send(`<h1> API's is Working... </h1>`)
})

//✅ Register Routes
app.use('/api/auth',  AuthRouter);
app.use('/api/user', UserRouter);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api/platform-ams", platformAMSRoutes);
app.use('/api/co-branding', coBrandingRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})





