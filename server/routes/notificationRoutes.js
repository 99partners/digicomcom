import express from 'express';
import { getUserNotifications, markNotificationAsRead } from '../controllers/NotificationController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// User notification routes (protected)
router.get('/user', userAuth, getUserNotifications);
router.patch('/:id/read', userAuth, markNotificationAsRead);

export default router; 