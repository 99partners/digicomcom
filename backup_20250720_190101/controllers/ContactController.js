import Contact from '../models/ContactModel.js';

const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create new contact entry
        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        // Save to database
        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: newContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form',
            error: error.message
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: error.message
        });
    }
};

export { submitContactForm, getAllContacts }; 