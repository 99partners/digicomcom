// ✅ newsletterRoutes.js (ES module)
import express from "express";
import mongoose from "mongoose";
import Newsletter from "../models/Newsletter.js";
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Save email to DB
    await Newsletter.create({ email });
    // console.log(`✅ Newsletter subscription from: ${email}`);
    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("❌ Error subscribing:", error);
    return res.status(500).json({ message: "Subscription failed" });
  }
});

// Delete subscriber (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
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

router.get("/", async (req, res) => {
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
