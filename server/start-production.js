#!/usr/bin/env node

// Production startup script for live environment
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting 99 Digicom API Server in Production Mode');
console.log('================================================');

// Set production environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5051';

// Required environment variables for production
const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET'
];

// Check for required environment variables
console.log('🔍 Checking environment variables...');
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingVars.join(', '));
    console.log('💡 Setting fallback values for production...');
    
    // Set fallback values
    if (!process.env.MONGODB_URI) {
        process.env.MONGODB_URI = 'mongodb+srv://99partnersin:99Partnersin@digicom.epvwtpt.mongodb.net/digicom-db?retryWrites=true&w=majority&appName=digicom';
    }
    
    if (!process.env.JWT_SECRET) {
        process.env.JWT_SECRET = 'sbdhsbd#2oj23j2j3j2j3j2j3j2j3j2j3j2j3';
    }
}

// Display current configuration
console.log('🔧 Production Configuration:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log('');

// Start the server
console.log('🚀 Starting server...');
const serverProcess = spawn('node', ['index.js'], {
    stdio: 'inherit',
    env: process.env,
    cwd: __dirname
});

// Handle server process events
serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
});

serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
});

// Handle process signals
process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    serverProcess.kill('SIGTERM');
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    serverProcess.kill('SIGTERM');
});

// Keep the process alive
process.stdin.resume(); 