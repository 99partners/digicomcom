import mongoose from 'mongoose';

const platformAMSFormSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  businessType: {
    type: String,
    required: true,
    enum: ['individual', 'pvt-ltd', 'partnership', 'llp', 'startup', 'other'],
  },
  servicesNeeded: [{
    type: String,
    enum: [
      'Setting Up Seller Account',
      'Account Management Services (AMS)',
      'eCommerce Advertising & Marketing',
      'Product Listing Optimization',
      'Inventory Management',
      'Order & Return Management',
      'Performance Analytics',
      'Platform Compliance Support',
    ],
  }],
  platforms: [{
    type: String,
    enum: [
      'ONDC',
      'Amazon',
      'Flipkart',
      'Meesho',
      'Jiomart',
      'Zomato',
      'Swiggy',
      'Myntra',
      'Nykaa',
      'Custom Website',
      'Other',
    ],
  }],
  currentSalesVolume: {
    type: String,
    enum: ['0', 'less-1l', '1l-5l', '5l-10l', '10l-plus'],
  },
  additionalNotes: {
    type: String,
  },
  consent: {
    type: Boolean,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'completed', 'rejected'],
    default: 'pending',
  }
}, {
  timestamps: true
});

export default mongoose.model('PlatformAMSForm', platformAMSFormSchema); 