const mongoose = require('mongoose');

const serviceApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Platform Enablement', 'Account Management Services (AMS)', 'Marketing Services', 'Co-Branding Partnership']
  },
  marketplaces: [{
    type: String,
    enum: ['ondc', 'amazon', 'flipkart', 'meesho', 'jiomart', 'indiamart', 'snapdeal']
  }],
  serviceAccountNumber: String,
  hasGST: {
    type: String,
    enum: ['yes', 'no']
  },
  gstNumber: String,
  salesVolume: {
    type: String,
    enum: ['Less than ₹50,000', '₹50,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000+']
  },
  marketingServices: [{
    type: String,
    enum: [
      'Sponsored Ad Campaigns (PPC)',
      'Seasonal & Festival Campaigns',
      'Platform-Specific Promotions',
      'Social Media & Off-Platform Promotions',
      'Creative & Content Design'
    ]
  }],
  isManufacturer: Boolean,
  yearEstablished: String,
  numberOfProducts: Number,
  productUSP: String,
  category: String,
  description: String,
  panNumber: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

serviceApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ServiceApplication', serviceApplicationSchema); 