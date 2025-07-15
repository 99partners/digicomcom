import mongoose from 'mongoose';

const amsFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Make userId optional for now
  },
  marketplaces: {
    ondc: { type: Boolean, default: false },
    amazon: { type: Boolean, default: false },
    flipkart: { type: Boolean, default: false },
    meesho: { type: Boolean, default: false },
    jiomart: { type: Boolean, default: false },
    indiamart: { type: Boolean, default: false },
    snapdeal: { type: Boolean, default: false }
  },
  serviceAccountNumber: {
    type: String,
    required: true
  },
  hasGST: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  gstNumber: {
    type: String,
    required: function() {
      return this.hasGST === 'yes';
    },
    validate: {
      validator: function(v) {
        if (this.hasGST === 'yes') {
          return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
        }
        return true;
      },
      message: 'Invalid GST number format'
    }
  },
  monthlySales: {
    type: String,
    enum: ['', 'less_50k', '50k_2L', '2L_5L', 'above_5L']
  },
  status: {
    type: String,
    enum: ['pending', 'in_review', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('AMSForm', amsFormSchema); 