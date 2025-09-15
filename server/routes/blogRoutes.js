import express from 'express';
const router = express.Router();
import adminAuth from '../middleware/adminAuth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/blogs'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/BlogController.js';

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes (admin only)
router.post('/', adminAuth, upload.single('image'), createBlog);
router.put('/:id', adminAuth, upload.single('image'), updateBlog);
router.delete('/:id', adminAuth, deleteBlog);

export default router;