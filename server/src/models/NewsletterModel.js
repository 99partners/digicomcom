const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
newsletterSchema.index({ email: 1 });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter; 