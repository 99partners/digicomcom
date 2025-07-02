import express from 'express';
import { adminLogin, adminLogout, getDashboardStats, getAllUsers, getAllSubscribers } from '../controllers/AdminController.js';
import adminAuth from '../middleware/adminAuth.js';

const AdminRouter = express.Router();

// Public routes
AdminRouter.post('/login', adminLogin);
AdminRouter.post('/logout', adminLogout);

// Protected routes
AdminRouter.get('/dashboard-stats', adminAuth, getDashboardStats);
AdminRouter.get('/users', adminAuth, getAllUsers);
AdminRouter.get('/subscribers', adminAuth, getAllSubscribers);

export default AdminRouter; 