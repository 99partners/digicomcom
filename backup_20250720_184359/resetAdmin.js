import mongoose from 'mongoose';
import Admin from './models/AdminModel.js';
import dotenv from 'dotenv';

dotenv.config();

const resetAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digicomcom');
        
        // Delete all existing admin accounts
        await Admin.deleteMany({});
        console.log('Deleted existing admin accounts');

        // Create new admin account
        await Admin.create({
            username: 'admin99',
            password: '99Partnersin'
        });
        console.log('Created new admin account');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
    }
};

resetAdmin(); 