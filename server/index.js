import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'



const app = express()
const PORT = process.env.PORT || 5050
// const allowedOrigins = ['https://mern-auth-frontend-5pdz.onrender.com', "http://localhost:5173"]
//call the DB fun.
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // ✅ Your React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Optional: if using cookies or sessions
}));


//API's Endpoints...........

app.get('/', (req, res)=>{
    res.send(`<h1> API's is Working... </h1>`)
})
app.use('/api/auth',  AuthRouter)
app.use('/api/user', UserRouter)






app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})





