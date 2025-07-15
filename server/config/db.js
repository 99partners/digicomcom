import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment-specific variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.join(__dirname, '..', envFile) });

// Fallback to .env if specific environment file is not found
dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        // Add connection event listeners
        mongoose.connection.on('connected', () => {
            console.log(`MongoDB Connected Successfully [${process.env.NODE_ENV} mode]`);
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
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            autoIndex: true, // Build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            family: 4 // Use IPv4, skip trying IPv6
        });

        // Test the connection by making a simple query
        await mongoose.connection.db.admin().ping();
        console.log(`Database connection test successful [${process.env.NODE_ENV} mode]`);

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Throw the error to be handled by the caller
        throw error;
    }
};

