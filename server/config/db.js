import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

export const connectDB = async () => {
    try {
        // Add connection event listeners
        mongoose.connection.on('connected', () => {
            console.log(`MongoDB Connected Successfully [${process.env.NODE_ENV}]`);
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB Disconnected');
        });

        // Connect with options
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: process.env.NODE_ENV === 'production' ? 10000 : 5000, // Longer timeout in production
            autoIndex: process.env.NODE_ENV !== 'production', // Only build indexes in development
            maxPoolSize: process.env.NODE_ENV === 'production' ? 50 : 10, // More connections in production
            family: 4 // Use IPv4, skip trying IPv6
        });

        // Test the connection by making a simple query
        await mongoose.connection.db.admin().ping();
        console.log(`Database connection test successful [${process.env.NODE_ENV}]`);

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Throw the error to be handled by the caller
        throw error;
    }
};

