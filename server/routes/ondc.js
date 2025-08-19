// routes/ondc.js
import express from "express";
const router = express.Router();

router.post("/on_subscribe", (req, res) => {
  res.json({ success: true, message: "Subscribed OK" });
});

export default router;
