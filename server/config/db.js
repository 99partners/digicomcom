import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

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
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        });

        console.log('Database connection successful');

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

