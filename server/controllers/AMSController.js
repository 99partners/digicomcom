import AMSForm from '../models/AMSForm.js';

// Submit AMS form
export const submitForm = async (req, res) => {
  try {
    console.log('Received AMS form data:', req.body);
    
    // Validate required fields
    const { marketplaces, hasGST, serviceAccountNumber } = req.body;
    
    if (!marketplaces || typeof marketplaces !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Marketplaces selection is required'
      });
    }

    if (!hasGST || !['yes', 'no'].includes(hasGST)) {
      return res.status(400).json({
        success: false,
        message: 'GST information is required'
      });
    }

    if (!serviceAccountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Service Account Number is required'
      });
    }

    // Create form data without userId first
    const formData = {
      ...req.body
    };

    // Only add userId if it exists in the request
    if (req.user && req.user._id) {
      formData.userId = req.user._id;
    }
    
    // Validate GST number if hasGST is 'yes'
    if (formData.hasGST === 'yes') {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(formData.gstNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid GST number format'
        });
      }
    }
    
    console.log('Creating new AMS submission with data:', formData);
    
    // Create new form submission
    const submission = new AMSForm(formData);
    
    // Save to database
    const savedSubmission = await submission.save();
    console.log('AMS form submission saved successfully:', savedSubmission);
    
    res.status(201).json({
      success: true,
      message: 'AMS form submitted successfully',
      data: savedSubmission
    });
  } catch (error) {
    console.error('AMS form submission error:', error);
    
    // Handle specific MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Error submitting AMS form',
      error: error.message
    });
  }
};

// Get all AMS form submissions (admin only)
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await AMSForm.find()
      .sort({ submittedAt: -1 }); // Most recent first
    
    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching AMS submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};

// Update submission status (admin only)
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const submission = await AMSForm.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'AMS submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: submission
    });
  } catch (error) {
    console.error('Error updating AMS submission status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating submission status',
      error: error.message
    });
  }
}; 