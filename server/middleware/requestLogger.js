import { logger } from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
    // Add request timestamp
    req._startTime = Date.now();

    // Store original end function
    const originalEnd = res.end;

    // Override end function to log response
    res.end = function(chunk, encoding) {
        // Calculate request duration
        const duration = Date.now() - req._startTime;

        // Log the request
        logger.access(req, res, duration);

        // If it's an API request, log more details
        if (req.url.startsWith('/api/')) {
            logger.api(req, res, duration);
        }

        // Call original end function
        originalEnd.call(this, chunk, encoding);
    };

    next();
}; 