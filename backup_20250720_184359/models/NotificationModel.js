import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error'],
        default: 'info'
    },
    category: {
        type: String,
        enum: ['general', 'system', 'account', 'billing', 'marketing', 'feature'],
        default: 'general'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    targetAudience: {
        type: String,
        enum: ['all', 'partners', 'customers', 'specific'],
        default: 'all'
    },
    targetUserIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    scheduledAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    readBy: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        readAt: {
            type: Date,
            default: Date.now
        }
    }],
    metadata: {
        actionUrl: String,
        actionText: String,
        imageUrl: String
    }
}, {
    timestamps: true
});

// Index for efficient querying
notificationSchema.index({ targetAudience: 1, isActive: 1, scheduledAt: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ 'readBy.userId': 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification; 