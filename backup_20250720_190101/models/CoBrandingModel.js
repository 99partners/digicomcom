import mongoose from 'mongoose';

const coBrandingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isManufacturer: {
        type: Boolean,
        required: true
    },
    establishmentYear: {
        type: Number,
        required: function() {
            return this.isManufacturer;
        }
    },
    companyName: {
        type: String,
        required: function() {
            return this.isManufacturer;
        }
    },
    numberOfProducts: {
        type: Number,
        required: true,
        min: 1
    },
    productCategories: [{
        type: String,
        required: true,
        enum: ['electronics', 'fashion', 'home', 'beauty', 'food', 'health', 'other']
    }],
    productUSP: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true,
        match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
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
coBrandingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const CoBrandingModel = mongoose.model('CoBranding', coBrandingSchema);

export default CoBrandingModel;