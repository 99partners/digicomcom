// // routes/ondc.js
// import express from "express";
// const router = express.Router();

// router.post("/on_subscribe", (req, res) => {
//   res.json({ success: true, message: "Subscribed OK" });
// });

// export default router;


// routes/ondc.js
import express from "express";
const router = express.Router();

// Allow preflight requests (CORS)
router.options("/on_subscribe", (req, res) => {
  res.sendStatus(200);
});

// Allow GET just in case ONDC calls it
router.get("/on_subscribe", (req, res) => {
  res.json({ success: true, message: "GET on_subscribe works" });
});

// Your actual subscription endpoint
router.post("/on_subscribe", (req, res) => {
  console.log("🔔 ONDC on_subscribe called:", req.body);
  res.json({ success: true, message: "Subscribed OK" });
});

export default router;
