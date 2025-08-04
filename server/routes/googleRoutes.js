import express from 'express';
import { googleLogin } from '../controllers/GoogleAuthController.js';

const router = express.Router();

// Google login route
router.post('/google-login', googleLogin); // Handle Google authentication

export default router;