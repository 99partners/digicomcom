import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    // Log the error
    logger.error(err, req);

    // Don't expose error details in production
    const response = {
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'An error occurred' 
            : err.message,
        error: process.env.NODE_ENV === 'production' 
            ? undefined 
            : {
                name: err.name,
                stack: err.stack,
                details: err.details || err
            }
    };

    // Set appropriate status code
    const statusCode = err.statusCode || 500;

    // Send error response
    res.status(statusCode).json(response);
}; 