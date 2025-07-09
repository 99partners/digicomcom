import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData, getDashboardStats, checkPartnerRequest } from '../controllers/UserController.js';

const UserRouter = express.Router()

UserRouter.get('/data', userAuth, getUserData)
UserRouter.get('/dashboard-stats', userAuth, getDashboardStats)
UserRouter.get('/partner/has-request', userAuth, checkPartnerRequest)

export default UserRouter;