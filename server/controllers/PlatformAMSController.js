import PlatformAMSForm from '../models/PlatformAMSForm.js';
import userModel from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { SERVICE_FORM_CONFIRMATION_TEMPLATE, SERVICE_APPROVAL_TEMPLATE, sendEmail } from '../config/emailTemplets.js';

// Submit platform AMS form
export const submitForm = async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    
    // Validate required fields
    const { marketplaces, hasGST } = req.body;
    
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

    // Create form data without userId first
    const formData = {
      ...req.body
    };

    // Only add userId if it exists in the request
    if (req.user && req.user.id) {
      formData.userId = req.user.id;
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
    
    console.log('Creating new submission with data:', formData);
    
    // Create new form submission
    const submission = new PlatformAMSForm(formData);
    
    // Save to database
    const savedSubmission = await submission.save();
    console.log('Form submission saved successfully:', savedSubmission);
    
    // Send confirmation email to user
    try {
      if (req.user && req.user.id) {
        const user = await userModel.findById(req.user.id);
        if (user) {
          // Create service-specific details for Platform Enablement
          const selectedMarketplaces = Object.entries(formData.marketplaces || {})
            .filter(([key, value]) => value === true)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(', ') || 'None selected';

          const serviceSpecificDetails = `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 8px;"><strong>Selected Marketplaces:</strong> ${selectedMarketplaces}</p>
              <p style="margin: 0 0 8px;"><strong>GST Status:</strong> ${formData.hasGST === 'yes' ? 'Yes' : 'No'}</p>
              ${formData.hasGST === 'yes' && formData.gstNumber ? `<p style="margin: 0 0 8px;"><strong>GST Number:</strong> ${formData.gstNumber}</p>` : ''}
              ${formData.monthlySales ? `<p style="margin: 0;"><strong>Monthly Sales:</strong> ${formData.monthlySales}</p>` : ''}
            </div>`;

          const emailContent = SERVICE_FORM_CONFIRMATION_TEMPLATE
            .replace(/{{userName}}/g, user.name)
            .replace(/{{userEmail}}/g, user.email)
            .replace(/{{serviceType}}/g, 'Platform Enablement Services')
            .replace(/{{applicationId}}/g, savedSubmission._id.toString())
            .replace(/{{submissionDate}}/g, new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }))
            .replace(/{{serviceSpecificDetails}}/g, serviceSpecificDetails);

          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: '✅ Platform Enablement Application Received - Next Steps Inside',
            html: emailContent
          };

          const emailResult = await sendEmail(transporter, mailOptions);
          if (emailResult.success) {
            console.log('Platform enablement confirmation email sent successfully to:', user.email);
          } else {
            console.error('Failed to send platform enablement confirmation email:', emailResult.error);
          }
        }
      }
    } catch (emailError) {
      console.error('Error sending platform enablement confirmation email:', emailError);
      // Don't fail the whole request if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: savedSubmission
    });
  } catch (error) {
    console.error('Form submission error:', error);
    
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
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Send approval email if status is approved
    if (status === 'approved' && submission.userId) {
      try {
        const user = submission.userId;
        
        const emailContent = SERVICE_APPROVAL_TEMPLATE
          .replace(/{{userName}}/g, user.name)
          .replace(/{{userEmail}}/g, user.email)
          .replace(/{{serviceType}}/g, 'Platform Enablement Services')
          .replace(/{{applicationId}}/g, submission._id.toString())
          .replace(/{{approvalDate}}/g, new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: '🎉 Your Platform Enablement Application Has Been Approved!',
          html: emailContent
        };

        const emailResult = await sendEmail(transporter, mailOptions);
        if (emailResult.success) {
          console.log(`Platform Enablement approval email sent successfully to: ${user.email}`);
        } else {
          console.error(`Failed to send Platform Enablement approval email to: ${user.email}`, emailResult.error);
        }
      } catch (emailError) {
        console.error('Error sending Platform Enablement approval email:', emailError);
        // Don't fail the status update if email fails
      }
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