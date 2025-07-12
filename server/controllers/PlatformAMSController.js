import PlatformAMSForm from '../models/PlatformAMSForm.js';

// Submit platform AMS form
export const submitForm = async (req, res) => {
  try {
    const formData = req.body;
    
    // Create new form submission
    const submission = new PlatformAMSForm(formData);
    
    // Save to database
    await submission.save();
    
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: submission
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
      error: error.message
    });
  }
};

// Get all form submissions (admin only)
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await PlatformAMSForm.find()
      .sort({ submittedAt: -1 }); // Most recent first
    
    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
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
    
    const submission = await PlatformAMSForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: submission
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating submission status',
      error: error.message
    });
  }
}; 