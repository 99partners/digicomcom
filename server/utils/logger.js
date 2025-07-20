import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
try {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
} catch (error) {
    console.error('Failed to create logs directory:', error);
    // Fallback to current directory if logs directory creation fails
    logsDir = __dirname;
}

// Create separate log files for different types of logs with error handling
const createLogStream = (filename) => {
    try {
        return fs.createWriteStream(path.join(logsDir, filename), { 
            flags: 'a',
            mode: 0o666 // Set file permissions
        });
    } catch (error) {
        console.error(`Failed to create log stream for ${filename}:`, error);
        // Return a dummy stream that just console.logs
        return {
            write: (data) => console.log(`[${filename}]`, data)
        };
    }
};

const accessLogStream = createLogStream('access.log');
const errorLogStream = createLogStream('error.log');
const corsLogStream = createLogStream('cors.log');

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
            type: 'ACCESS'
        };

        // If this is a real request (not a system message)
        if (req && typeof req === 'object' && req.method) {
            Object.assign(log, {
                method: req.method,
                url: req.url,
                status: res?.statusCode,
                duration: `${duration}ms`,
                ip: req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress,
                userAgent: req.headers?.['user-agent'],
                origin: req.headers?.origin,
                referer: req.headers?.referer,
                contentType: req.headers?.['content-type']
            });
        } else if (typeof req === 'object') {
            // For system messages
            Object.assign(log, req);
        }
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
            type: 'API'
        };

        // Only log if we have a valid request object
        if (req && typeof req === 'object' && req.method) {
            Object.assign(log, {
                method: req.method,
                url: req.url,
                status: res?.statusCode,
                duration: `${duration}ms`,
                requestHeaders: req.headers,
                requestBody: req.body,
                responseHeaders: res?.getHeaders?.()
            });
        }
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