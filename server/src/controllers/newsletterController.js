const NewsletterModel = require('../models/newsletterModel');

const newsletterController = {
    // Subscribe to newsletter
    subscribe: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required'
                });
            }

            // Check if email already exists
            const existingSubscriber = await NewsletterModel.findOne({ email });
            if (existingSubscriber) {
                if (existingSubscriber.isActive) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email is already subscribed'
                    });
                } else {
                    // Reactivate subscription
                    existingSubscriber.isActive = true;
                    await existingSubscriber.save();
                    return res.status(200).json({
                        success: true,
                        message: 'Subscription reactivated successfully'
                    });
                }
            }

            // Create new subscriber
            const newSubscriber = new NewsletterModel({ email });
            await newSubscriber.save();

            res.status(201).json({
                success: true,
                message: 'Successfully subscribed to newsletter'
            });
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to subscribe to newsletter'
            });
        }
    },

    // Get all subscribers
    getSubscribers: async (req, res) => {
        try {
            const subscribers = await NewsletterModel.find()
                .sort({ subscriptionDate: -1 });

            res.status(200).json({
                success: true,
                data: subscribers
            });
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch subscribers'
            });
        }
    },

    // Unsubscribe from newsletter
    unsubscribe: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required'
                });
            }

            const subscriber = await NewsletterModel.findOne({ email });
            if (!subscriber) {
                return res.status(404).json({
                    success: false,
                    message: 'Subscriber not found'
                });
            }

            subscriber.isActive = false;
            await subscriber.save();

            res.status(200).json({
                success: true,
                message: 'Successfully unsubscribed from newsletter'
            });
        } catch (error) {
            console.error('Newsletter unsubscribe error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to unsubscribe from newsletter'
            });
        }
    }
};

module.exports = newsletterController; 