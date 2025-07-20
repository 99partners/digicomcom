import mongoose from "mongoose";

const marketingApplicationSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    businessType: {
        type: String,
        required: true,
        enum: ['individual', 'pvt-ltd', 'partnership', 'llp', 'other']
    },
    marketingServices: [{
        type: String,
        required: true,
        enum: ['social-media', 'seo', 'content-marketing', 'email-marketing', 'ppc', 'other']
    }],
    currentMarketingChannels: [{
        type: String
    }],
    monthlyMarketingBudget: {
        type: String,
        enum: ['less-10k', '10k-50k', '50k-1l', 'above-1l', '']
    },
    targetAudience: {
        type: String,
        required: true
    },
    marketingGoals: [{
        type: String,
        required: true
    }],
    timeline: {
        type: String,
        required: true,
        enum: ['immediate', '1-3-months', '3-6-months', 'more-than-6-months']
    },
    socialMedia: {
        instagram: String,
        facebook: String,
        linkedin: String,
        twitter: String
    },
    additionalRequirements: {
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

const MarketingApplication = mongoose.model("MarketingApplication", marketingApplicationSchema);
export default MarketingApplication; 