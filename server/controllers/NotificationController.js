import Notification from '../models/NotificationModel.js';
import User from '../models/UserModel.js';

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const { title, message, type, category, priority, targetAudience, targetUserIds, scheduledAt, expiresAt, metadata } = req.body;
        
        // Validate required fields
        if (!title || !message) {
            return res.status(400).json({
                success: false,
                message: 'Title and message are required'
            });
        }

        // If targetAudience is 'specific', validate targetUserIds
        if (targetAudience === 'specific' && (!targetUserIds || targetUserIds.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'Target user IDs are required for specific audience notifications'
            });
        }

        const notification = new Notification({
            title,
            message,
            type: type || 'info',
            category: category || 'general',
            priority: priority || 'medium',
            targetAudience: targetAudience || 'all',
            targetUserIds: targetAudience === 'specific' ? targetUserIds : [],
            scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(),
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            createdBy: req.admin.id,
            metadata: metadata || {}
        });

        await notification.save();

        // Populate createdBy field
        await notification.populate('createdBy', 'username');

        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: notification
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating notification',
            error: error.message
        });
    }
};

// Get all notifications (admin)
export const getAllNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, category, targetAudience, isActive } = req.query;
        
        // Build filter object
        const filter = {};
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (targetAudience) filter.targetAudience = targetAudience;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const skip = (page - 1) * limit;

        const notifications = await Notification.find(filter)
            .populate('createdBy', 'username')
            .populate('targetUserIds', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Notification.countDocuments(filter);

        res.json({
            success: true,
            data: notifications,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notifications',
            error: error.message
        });
    }
};

// Get notification by ID
export const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id)
            .populate('createdBy', 'username')
            .populate('targetUserIds', 'name email')
            .populate('readBy.userId', 'name email');

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.json({
            success: true,
            data: notification
        });
    } catch (error) {
        console.error('Error fetching notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notification',
            error: error.message
        });
    }
};

// Update notification
export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove fields that shouldn't be updated
        delete updateData.createdBy;
        delete updateData.readBy;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        const notification = await Notification.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'username')
         .populate('targetUserIds', 'name email');

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.json({
            success: true,
            message: 'Notification updated successfully',
            data: notification
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating notification',
            error: error.message
        });
    }
};

// Delete notification
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting notification',
            error: error.message
        });
    }
};

// Toggle notification active status
export const toggleNotificationStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        notification.isActive = !notification.isActive;
        await notification.save();

        await notification.populate('createdBy', 'username');

        res.json({
            success: true,
            message: `Notification ${notification.isActive ? 'activated' : 'deactivated'} successfully`,
            data: notification
        });
    } catch (error) {
        console.error('Error toggling notification status:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling notification status',
            error: error.message
        });
    }
};

// Get notifications for a specific user (for dashboard/notifications)
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, unreadOnly = false } = req.query;

        const currentDate = new Date();
        const skip = (page - 1) * limit;

        // Build filter for user notifications
        const filter = {
            isActive: true,
            scheduledAt: { $lte: currentDate },
            $or: [
                { expiresAt: null },
                { expiresAt: { $gt: currentDate } }
            ],
            $or: [
                { targetAudience: 'all' },
                { targetAudience: 'partners' }, // Assuming all users are partners for now
                { targetUserIds: userId }
            ]
        };

        // Add unread filter if requested
        if (unreadOnly === 'true') {
            filter['readBy.userId'] = { $ne: userId };
        }

        const notifications = await Notification.find(filter)
            .sort({ priority: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Notification.countDocuments(filter);

        // Mark notifications as read if they're not already
        const unreadNotifications = notifications.filter(notif => 
            !notif.readBy.some(read => read.userId.toString() === userId)
        );

        if (unreadNotifications.length > 0) {
            await Promise.all(
                unreadNotifications.map(notif => 
                    Notification.findByIdAndUpdate(notif._id, {
                        $addToSet: {
                            readBy: {
                                userId: userId,
                                readAt: new Date()
                            }
                        }
                    })
                )
            );
        }

        res.json({
            success: true,
            data: notifications,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching user notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notifications',
            error: error.message
        });
    }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        // Check if already read
        const alreadyRead = notification.readBy.some(read => read.userId.toString() === userId);

        if (!alreadyRead) {
            notification.readBy.push({
                userId: userId,
                readAt: new Date()
            });
            await notification.save();
        }

        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({
            success: false,
            message: 'Error marking notification as read',
            error: error.message
        });
    }
};

// Get notification statistics
export const getNotificationStats = async (req, res) => {
    try {
        const stats = await Notification.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: { $sum: { $cond: ['$isActive', 1, 0] } },
                    inactive: { $sum: { $cond: ['$isActive', 0, 1] } },
                    byType: {
                        $push: {
                            type: '$type',
                            count: 1
                        }
                    },
                    byCategory: {
                        $push: {
                            category: '$category',
                            count: 1
                        }
                    }
                }
            }
        ]);

        res.json({
            success: true,
            data: stats[0] || {
                total: 0,
                active: 0,
                inactive: 0,
                byType: [],
                byCategory: []
            }
        });
    } catch (error) {
        console.error('Error fetching notification stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notification statistics',
            error: error.message
        });
    }
}; 