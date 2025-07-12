// ✅ newsletterRoutes.js (ES module)
import express from "express";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Newsletter subscription (POST)
router.post("/", async (req, res) => {
  console.log('Newsletter subscription request received:', req.body);
  
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      message: "Email is required" 
    });
  }

  try {
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ 
        success: false,
        message: "Email already subscribed" 
      });
    }

    // Save email to DB
    const subscriber = await Newsletter.create({ email });
    return res.status(200).json({ 
      success: true,
      message: "Subscribed successfully!",
      subscriber: subscriber
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Subscription failed. Please try again later.",
      error: error.message 
    });
  }
});

// Delete subscriber (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
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

    return res.status(200).json({ 
      success: true,
      message: "Subscriber removed successfully" 
    });
  } catch (error) {
    console.error("Error removing subscriber:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to remove subscriber" 
    });
  }
});

// Get all subscribers
router.get("/", adminAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false,
        message: "Database connection not ready",
        subscribers: [] 
      });
    }
    const subscribers = await Newsletter.find({}, "email");
    res.status(200).json({ 
      success: true,
      subscribers: subscribers 
    });
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch subscribers",
      subscribers: [] 
    });
  }
});

export default router;
