// routes/auth.js
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import GoogleUser from '../models/GoogleUserModel.js';
import jwt from 'jsonwebtoken';

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

    // Store or update user in GoogleUser collection
    let user = await GoogleUser.findOne({ googleId });
    if (!user) {
      user = await GoogleUser.create({
        googleId,
        name,
        email,
        avatar: picture,
      });
    } else {
      user.name = name;
      user.email = email;
      user.avatar = picture;
      await user.save();
    }

    // Issue your own JWT for the app
    const appToken = jwt.sign(
      { userId: user._id, email: user.email, name: user.name, avatar: user.avatar },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
        avatar: user.avatar,
      },
      token: appToken
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

export default router;
