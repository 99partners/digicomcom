const ContactModel = require('../models/contactModel');

const contactController = {
    // Submit contact form
    submitContact: async (req, res) => {
        try {
            const { name, email, phone, subject, message } = req.body;

            // Validate required fields
            if (!name || !email || !phone || !subject || !message) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            // Create new contact submission
            const newContact = new ContactModel({
                name,
                email,
                phone,
                subject,
                message
            });

            await newContact.save();

            res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully'
            });
        } catch (error) {
            console.error('Contact form submission error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to submit contact form'
            });
        }
    },

    // Get all contact submissions (for admin)
    getAllContacts: async (req, res) => {
        try {
            const contacts = await ContactModel.find()
                .sort({ submittedAt: -1 });

            res.status(200).json({
                success: true,
                data: contacts
            });
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch contact submissions'
            });
        }
    },

    // Update contact status
    updateContactStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!['new', 'read', 'responded'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status'
                });
            }

            const contact = await ContactModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact submission not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Contact status updated successfully',
                data: contact
            });
        } catch (error) {
            console.error('Error updating contact status:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update contact status'
            });
        }
    },

    // Delete contact submission
    deleteContact: async (req, res) => {
        try {
            const { id } = req.params;

            const contact = await ContactModel.findByIdAndDelete(id);

            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact submission not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Contact submission deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete contact submission'
            });
        }
    }
};

module.exports = contactController; 