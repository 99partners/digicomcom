import mongoose from 'mongoose';
import config from './config.js';

export const connectDB = async () => {
    try {
        // Add connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('MongoDB Connected Successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB Disconnected');
        });

        // Connect with options
        await mongoose.connect(config.db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            autoIndex: true, // Build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            family: 4 // Use IPv4, skip trying IPv6
        });

        // Test the connection by making a simple query
        await mongoose.connection.db.admin().ping();
        console.log('Database connection test successful');

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Throw the error to be handled by the caller
        throw error;
    }
};

