import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create separate log files for different types of logs
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' });
const corsLogStream = fs.createWriteStream(path.join(logsDir, 'cors.log'), { flags: 'a' });

const formatMessage = (message, data = {}) => {
    const timestamp = new Date().toISOString();
    const formattedData = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
    return `[${timestamp}] ${message}\n${formattedData}\n\n`;
};

export const logger = {
    // Request logging
    access: (req, res, duration) => {
        const log = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'],
            origin: req.headers.origin,
            referer: req.headers.referer,
            contentType: req.headers['content-type']
        };
        accessLogStream.write(formatMessage('ACCESS LOG', log));
    },

    // Error logging
    error: (error, req = null) => {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'ERROR',
            message: error.message,
            stack: error.stack,
            request: req ? {
                method: req.method,
                url: req.url,
                headers: req.headers,
                body: req.body
            } : null
        };
        errorLogStream.write(formatMessage('ERROR LOG', log));
        console.error('🔥 Error:', error.message);
    },

    // CORS logging
    cors: (type, data) => {
        const log = {
            timestamp: new Date().toISOString(),
            type,
            ...data
        };
        corsLogStream.write(formatMessage('CORS LOG', log));
    },

    // API request logging
    api: (req, res, duration) => {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'API',
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            requestHeaders: req.headers,
            requestBody: req.body,
            responseHeaders: res.getHeaders()
        };
        accessLogStream.write(formatMessage('API LOG', log));
    },

    // Database operation logging
    db: (operation, collection, query, duration) => {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'DATABASE',
            operation,
            collection,
            query,
            duration: `${duration}ms`
        };
        accessLogStream.write(formatMessage('DB LOG', log));
    },

    // Authentication logging
    auth: (type, userId, status, details = {}) => {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'AUTH',
            action: type,
            userId,
            status,
            ...details
        };
        accessLogStream.write(formatMessage('AUTH LOG', log));
    }
}; 