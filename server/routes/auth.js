// // routes/auth.js
// import express from 'express';
// import { OAuth2Client } from 'google-auth-library';

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// router.post('/google-login', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId, picture } = payload;

//     // Save user to DB or generate JWT here
//     res.status(200).json({
//       message: 'Login successful',
//       user: { email, name, googleId, picture },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Invalid Google token' });
//   }
// });

// export default router;


import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    // 1️⃣ Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // 2️⃣ Create new user
      user = new User({
        name,
        email,
        googleId,
        picture,
        isAccountVerified: true, // optional
      });

      await user.save();
      console.log('🆕 New Google user saved to DB');
    } else {
      console.log('🔁 Existing user found');
    }

    // 3️⃣ Send back user info
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

export default router;
