import axios from 'axios';

// Enhanced environment detection
const isProduction = () => {
  // Check multiple indicators for production environment
  return (
    import.meta.env.PROD || 
    import.meta.env.VITE_ENV === 'production' ||
    (window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    !window.location.hostname.includes('local') &&
    !window.location.hostname.includes('dev'))
  );
};

const isDevelopment = () => {
  return !isProduction();
};

// Environment-specific configuration with fallbacks
const ENV = import.meta.env.MODE || import.meta.env.VITE_ENV || (isProduction() ? 'production' : 'development');

const API_CONFIG = {
  development: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5051',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    enableLogs: true,
    enableRetry: true,
  },
  production: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.99digicom.com',
    fallbackUrls: [], // Remove fallback URLs to prevent 404 errors
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000,
    enableLogs: false,
    enableRetry: false, // Disable retry in production to avoid multiple CORS errors
  }
};

// Get current environment configuration
const currentConfig = API_CONFIG[ENV] || API_CONFIG.development;

// Log environment info (only in development)
if (isDevelopment()) {
  console.log('🔧 API Configuration:', {
    environment: ENV,
    baseUrl: currentConfig.baseUrl,
    hostname: window.location.hostname,
    isProduction: isProduction()
  });
}

// Helper function to construct API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${currentConfig.baseUrl}/${cleanEndpoint}`;
};

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: currentConfig.baseUrl,
  withCredentials: true,
  timeout: currentConfig.timeout,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  validateStatus: status => status >= 200 && status < 500
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Ensure headers are properly set for each request
  config.headers = {
    ...config.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  // Get both auth tokens from localStorage
  const userToken = localStorage.getItem('authToken');
  const adminToken = localStorage.getItem('adminToken');
  
  // If admin token exists and the request is to an admin endpoint, use admin token
  if (adminToken && config.url?.includes('/api/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  // Otherwise, if user token exists and not already set in request, use that
  else if (userToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
}, (error) => {
  console.error('Request configuration error:', error);
  return Promise.reject(error);
});

// Add response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors with improved retry logic and fallback
    if (!error.response || error.code === 'ERR_NETWORK' || error.code === 'ERR_FAILED') {
      console.error('Network error occurred:', {
        code: error.code,
        message: error.message,
        url: originalRequest.url,
        baseURL: originalRequest.baseURL
      });
      
      // Don't try fallback URLs in production to avoid CORS/404 errors
      
      // Only retry GET requests and only once (and only in development)
      if (!originalRequest._retry && originalRequest.method === 'get' && ENV === 'development') {
        originalRequest._retry = true;
        try {
          // Add a small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          return await axiosInstance(originalRequest);
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          throw new Error('Network connection failed. Please check your internet connection and try again.');
        }
      }
      
      // Provide more specific error messages
      if (error.code === 'ERR_FAILED') {
        throw new Error('Server connection failed. The API server may be temporarily unavailable. Please try again later.');
      }
      
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Check if this is an admin route or admin user context
      const isAdminRoute = originalRequest.url?.includes('/api/admin') || window.location.pathname.startsWith('/admin');
      
      if (isAdminRoute) {
        localStorage.removeItem('adminToken');
        // Only redirect if not already on admin login page
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      } else {
        localStorage.removeItem('authToken');
        const publicPaths = ['/', '/about', '/contact', '/partners', '/services', '/resources', '/signup', '/login', '/forgot-password', '/privacypolicy', '/termsofservice', '/cookiepolicy', '/faqss', '/platform-enablement-ams'];
        const isPublicPath = publicPaths.some(path => window.location.pathname === path || window.location.pathname.startsWith(path + '/'));
        
        if (!isPublicPath && !window.location.pathname.includes('login')) {
          window.location.href = '/partnerlogin';
        }
      }
      throw new Error('Your session has expired. Please log in again.');
    }

    // Handle other status codes
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred. Please try again.';
      throw new Error(message);
    }

    return Promise.reject(error);
  }
);

// Connectivity test function
export const testApiConnection = async () => {
  const testResults = {
    mainUrl: null,
    fallbackUrls: [],
    environment: ENV,
    hostname: window.location.hostname
  };

  // Test main URL
  try {
    const response = await axios.get(`${currentConfig.baseUrl}/health`, { timeout: 10000 });
    testResults.mainUrl = {
      url: currentConfig.baseUrl,
      status: 'success',
      response: response.data
    };
  } catch (error) {
    testResults.mainUrl = {
      url: currentConfig.baseUrl,
      status: 'failed',
      error: error.message,
      code: error.code
    };
  }

  // Test fallback URLs in production
  if (ENV === 'production' && currentConfig.fallbackUrls) {
    for (const fallbackUrl of currentConfig.fallbackUrls) {
      try {
        const response = await axios.get(`${fallbackUrl}/health`, { timeout: 10000 });
        testResults.fallbackUrls.push({
          url: fallbackUrl,
          status: 'success',
          response: response.data
        });
      } catch (error) {
        testResults.fallbackUrls.push({
          url: fallbackUrl,
          status: 'failed',
          error: error.message,
          code: error.code
        });
      }
    }
  }

  return testResults;
};

// Export environment info for debugging
export const getEnvironmentInfo = () => ({
  environment: ENV,
  isProduction: isProduction(),
  isDevelopment: isDevelopment(),
  config: currentConfig,
  hostname: window.location.hostname,
  origin: window.location.origin
});

export { currentConfig as API_CONFIG };
export default axiosInstance;