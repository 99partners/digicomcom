const ServiceApplication = require('../models/ServiceApplication');

// Create a new service application
exports.createApplication = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated request
    const applicationData = { ...req.body, userId };

    const application = new ServiceApplication(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get all applications for a user
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await ServiceApplication.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Get a single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await ServiceApplication.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message
    });
  }
}; 