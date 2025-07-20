import mongoose from 'mongoose';

const partnerRequestSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['ams', 'platform', 'cobranding', 'marketing']
    },
    marketplaces: [{
        type: String,
        enum: ['ONDC', 'Amazon', 'Flipkart', 'Meesho', 'JioMart', 'IndiaMART', 'Snapdeal']
    }],
    serviceAccountNumber: {
        type: String
    },
    hasGST: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    gstNumber: {
        type: String,
        validate: {
            validator: function(v) {
                // GST format validation
                return !v || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
            },
            message: props => `${props.value} is not a valid GST number!`
        }
    },
    monthlyOnlineSales: {
        type: String,
        enum: ['', 'less-50k', '50k-2L', '2L-5L', '5L+']
    },
    marketingServices: {
        sponsoredAds: Boolean,
        seasonalCampaigns: Boolean,
        platformPromotions: Boolean,
        socialMediaPromotions: Boolean,
        creativeDesign: Boolean,
        platformSpecificAds: Boolean
    },
    // Co-branding specific fields
    isManufacturer: {
        type: Boolean,
        default: false
    },
    yearEstablished: String,
    numberOfProducts: String,
    productUSP: String,
    productCategory: String,
    productDescription: String,
    panNumber: {
        type: String,
        validate: {
            validator: function(v) {
                // PAN format validation
                return !v || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: props => `${props.value} is not a valid PAN number!`
        }
    },
    additionalNotes: String,
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

// Update the updatedAt field on save
partnerRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const PartnerRequest = mongoose.model('PartnerRequest', partnerRequestSchema);
export default PartnerRequest; 