const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
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
  salesVolume: String,
  marketingServices: [String],
  yearEstablished: String,
  numberOfProducts: Number,
  productUSP: String,
  category: String,
  description: String,
  panNumber: String,
  isManufacturer: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema); 