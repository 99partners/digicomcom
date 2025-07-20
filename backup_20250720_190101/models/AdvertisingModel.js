import mongoose from 'mongoose';

const advertisingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    services: {
        sponsoredAds: {
            type: Boolean,
            default: false
        },
        seasonalCampaigns: {
            type: Boolean,
            default: false
        },
        platformPromotions: {
            type: Boolean,
            default: false
        },
        socialMedia: {
            type: Boolean,
            default: false
        },
        creativeDesign: {
            type: Boolean,
            default: false
        }
    },
    selectedPlan: {
        type: String,
        required: true
    },
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

// Update the updatedAt timestamp before saving
advertisingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const AdvertisingModel = mongoose.model('Advertising', advertisingSchema);

export default AdvertisingModel; 