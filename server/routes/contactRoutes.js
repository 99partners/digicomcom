import express from 'express';
import { submitContactForm, getAllContacts } from '../controllers/ContactController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/submit', submitContactForm);
router.get('/all', adminAuth, getAllContacts);

export default router; 