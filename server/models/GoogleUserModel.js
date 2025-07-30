import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const GoogleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
}, { timestamps: true });

const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);
export default GoogleUser; 