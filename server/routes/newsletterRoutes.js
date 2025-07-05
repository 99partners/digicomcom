// ✅ newsletterRoutes.js (ES module)
import express from "express";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// ✅ Newsletter subscription (POST)
router.post("/api/newsletter", async (req, res) => {
  console.log('Newsletter subscription request received:', req.body);
  
  const { email } = req.body;

  if (!email) {
    console.log('Newsletter subscription failed: Email is required');
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      console.log('Newsletter subscription failed: Email already exists');
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Save email to DB
    const subscriber = await Newsletter.create({ email });
    console.log('Newsletter subscription successful:', subscriber);
    return res.status(200).json({ 
      message: "Subscribed successfully!",
      subscriber: subscriber
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ 
      message: "Subscription failed",
      error: error.message 
    });
  }
});

// Delete subscriber (admin only)
router.delete("/api/newsletter/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid subscriber ID" });
    }

    const result = await Newsletter.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    return res.status(200).json({ message: "Subscriber removed successfully" });
  } catch (error) {
    console.error("❌ Error removing subscriber:", error);
    return res.status(500).json({ message: "Failed to remove subscriber" });
  }
});

// Get all subscribers
router.get("/api/newsletter", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json([]);
    }
    const subscribers = await Newsletter.find({}, "email");
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("❌ Failed to fetch newsletter subscribers:", error);
    res.status(200).json([]);
  }
});

export default router;
