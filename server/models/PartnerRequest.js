import mongoose from 'mongoose';

const partnerRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  companyName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a unique index on userId to ensure one request per user
partnerRequestSchema.index({ userId: 1 }, { unique: true });

const PartnerRequest = mongoose.model('PartnerRequest', partnerRequestSchema);

export default PartnerRequest; 