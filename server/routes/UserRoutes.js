import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData, getDashboardStats } from '../controllers/UserController.js';

const UserRouter = express.Router()

UserRouter.get('/data', userAuth, getUserData)
UserRouter.get('/dashboard-stats', userAuth, getDashboardStats)

export default UserRouter;