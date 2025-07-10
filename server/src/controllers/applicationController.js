const Application = require('../models/Application');

// Create new application
exports.createApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      userId: req.user.id
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application'
    });
  }
};

// Get all applications for a user
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch applications'
    });
  }
};

// Get single application
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch application'
    });
  }
};

// Update application
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        status: 'pending' // Only allow updates for pending applications
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or cannot be updated'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update application'
    });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      status: 'pending' // Only allow deletion of pending applications
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or cannot be deleted'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete application'
    });
  }
}; 