// ✅ newsletterRoutes.js (ES module)
import express from "express";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";
import adminAuth from '../middleware/adminAuth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Newsletter subscription (POST)
router.post("/", async (req, res) => {
  const startTime = Date.now();
  
  logger.api(req, res, 0); // Log initial request
  console.log('Newsletter subscription request received:', {
    body: req.body,
    headers: {
      origin: req.headers.origin,
      referer: req.headers.referer,
      'user-agent': req.headers['user-agent']
    }
  });
  
  const { email } = req.body;

  if (!email) {
    logger.error(new Error('Email missing in newsletter subscription'), req);
    return res.status(400).json({ 
      success: false,
      message: "Email is required" 
    });
  }

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      logger.api(req, res, Date.now() - startTime);
      return res.status(400).json({ 
        success: false,
        message: "Email already subscribed" 
      });
    }

    // Save email to DB
    const subscriber = await Newsletter.create({ email });
    
    // Log successful subscription
    logger.db('CREATE', 'Newsletter', { email }, Date.now() - startTime);
    
    // Don't set CORS headers here - let the main CORS middleware handle it
    const response = {
      success: true,
      message: "Subscribed successfully!",
      subscriber: subscriber
    };

    logger.api(req, res, Date.now() - startTime);
    return res.status(200).json(response);

  } catch (error) {
    // Log the error with full context
    logger.error(error, req);
    console.error("Newsletter subscription error:", {
      error: error.message,
      stack: error.stack,
      body: req.body,
      headers: req.headers
    });

    // Check specific error types
    if (error.name === 'MongoError' || error.name === 'MongooseError') {
      return res.status(503).json({ 
        success: false,
        message: "Service temporarily unavailable. Please try again later.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Subscription failed. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete subscriber (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid subscriber ID" 
      });
    }

    const result = await Newsletter.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: "Subscriber not found" 
      });
    }

    logger.db('DELETE', 'Newsletter', { id }, Date.now() - startTime);
    return res.status(200).json({ 
      success: true,
      message: "Subscriber removed successfully" 
    });
  } catch (error) {
    logger.error(error, req);
    console.error("Error removing subscriber:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to remove subscriber" 
    });
  }
});

// Get all subscribers
router.get("/", adminAuth, async (req, res) => {
  const startTime = Date.now();
  
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false,
        message: "Database connection not ready",
        subscribers: [] 
      });
    }
    const subscribers = await Newsletter.find({}, "email");
    
    logger.db('FIND', 'Newsletter', { operation: 'list-all' }, Date.now() - startTime);
    res.status(200).json({ 
      success: true,
      subscribers: subscribers 
    });
  } catch (error) {
    logger.error(error, req);
    console.error("Failed to fetch newsletter subscribers:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch subscribers",
      subscribers: [] 
    });
  }
});

// Remove this OPTIONS handler - let the main CORS middleware handle it
// router.options("/", ...) - REMOVED to prevent conflicts

// Health check endpoint
router.get('/health', (req, res) => {
  const startTime = Date.now();
  
  try {
    const health = {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        connected: mongoose.connection.readyState === 1,
        state: mongoose.connection.readyState
      },
      cors: {
        origin: req.headers.origin,
        allowedOrigins: req.app.get('allowedOrigins')
      }
    };

    logger.api(req, res, Date.now() - startTime);
    res.status(200).json(health);
  } catch (error) {
    logger.error(error, req);
    res.status(503).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
