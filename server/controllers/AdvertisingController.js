import AdvertisingModel from '../models/AdvertisingModel.js';
import userModel from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { SERVICE_FORM_CONFIRMATION_TEMPLATE } from '../config/emailTemplets.js';

export const submitAdvertisingForm = async (req, res) => {
    try {
        console.log('Received advertising form submission:', req.body);
        
        const { services, selectedPlan } = req.body;
        const userId = req.user.id; // From userAuth middleware

        if (!services || !selectedPlan) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create new advertising application
        const newApplication = new AdvertisingModel({
            userId,
            services,
            selectedPlan,
            status: 'pending' // Default status
        });

        // Save to database
        await newApplication.save();
        console.log('Advertising application saved:', newApplication);

        // Send confirmation email to user
        try {
            const user = await userModel.findById(userId);
            if (user) {
                // Create service-specific details for Advertising/Marketing
                const selectedServices = Object.entries(services || {})
                    .filter(([key, value]) => value === true)
                    .map(([key]) => {
                        const serviceNames = {
                            sponsoredAds: 'Sponsored Ad Campaigns (PPC)',
                            seasonalCampaigns: 'Seasonal & Festival Campaigns',
                            platformPromotions: 'Platform-Specific Promotions',
                            socialMedia: 'Social Media & Off-Platform Promotions',
                            creativeDesign: 'Creative Design Services'
                        };
                        return serviceNames[key] || key;
                    })
                    .join(', ') || 'None selected';

                const serviceSpecificDetails = `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 8px;"><strong>Selected Services:</strong> ${selectedServices}</p>
                        <p style="margin: 0;"><strong>Selected Plan:</strong> ${selectedPlan}</p>
                    </div>`;

                const emailContent = SERVICE_FORM_CONFIRMATION_TEMPLATE
                    .replace(/{{userName}}/g, user.name)
                    .replace(/{{userEmail}}/g, user.email)
                    .replace(/{{serviceType}}/g, 'Marketing & Advertising Services')
                    .replace(/{{applicationId}}/g, newApplication._id.toString())
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
                    subject: '✅ Marketing Application Received - Next Steps Inside',
                    html: emailContent
                };

                await transporter.sendMail(mailOptions);
                console.log('Marketing confirmation email sent to:', user.email);
            }
        } catch (emailError) {
            console.error('Error sending marketing confirmation email:', emailError);
            // Don't fail the whole request if email fails
        }

        res.status(200).json({
            success: true,
            message: 'Advertising application submitted successfully',
            data: newApplication
        });
    } catch (error) {
        console.error('Error in submitAdvertisingForm:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit advertising application',
            error: error.message
        });
    }
}; 