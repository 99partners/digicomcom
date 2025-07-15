import mongoose from "mongoose";

const coBrandingSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    registeredName: {
        type: String
    },
    businessType: {
        type: String,
        required: true,
        enum: ['individual', 'pvt-ltd', 'partnership', 'llp', 'other']
    },
    productCategories: [{
        type: String,
        required: true
    }],
    topProducts: {
        type: String
    },
    platforms: [{
        type: String
    }],
    salesVolume: {
        type: String,
        enum: ['less-50k', '50k-2l', '2l-5l', '5l-plus', '']
    },
    marketingGoals: [{
        type: String,
        required: true
    }],
    targetAudience: {
        type: String,
        required: true
    },
    timeline: {
        type: String
    },
    socialMedia: {
        instagram: String,
        facebook: String,
        youtube: String
    },
    additionalNotes: {
        type: String
    },
    consent: {
        type: Boolean,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const CoBranding = mongoose.model("CoBranding", coBrandingSchema);
export default CoBranding;