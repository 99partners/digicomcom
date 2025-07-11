const Newsletter = require('../models/NewsletterModel');

// Subscribe to newsletter
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      // If subscriber exists but is inactive, reactivate them
      if (!existingSubscriber.active) {
        existingSubscriber.active = true;
        await existingSubscriber.save();
        return res.status(200).json({
          success: true,
          message: 'Successfully resubscribed to newsletter'
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Email is already subscribed'
      });
    }

    // Create new subscriber
    const newSubscriber = await Newsletter.create({ 
      email: email.toLowerCase(),
      active: true 
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: newSubscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to subscribe to newsletter'
    });
  }
};

// Unsubscribe from newsletter
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in newsletter list'
      });
    }

    subscriber.active = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
      data: subscriber
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to unsubscribe from newsletter'
    });
  }
};

// Get all subscribers (for admin)
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({})
      .select('email subscribedAt active')
      .sort('-subscribedAt');

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved subscribers',
      data: subscribers
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get subscribers'
    });
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getAllSubscribers
}; 