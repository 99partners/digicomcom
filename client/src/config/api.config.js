import axios from 'axios';

// Enhanced environment detection
const isProduction = () => {
  // Check multiple indicators for production environment
  return (
    import.meta.env.PROD || 
    import.meta.env.VITE_ENV === 'production' ||
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    !window.location.hostname.includes('local')
  );
};

const isDevelopment = () => {
  return !isProduction();
};

// Environment-specific configuration with fallbacks
const ENV = import.meta.env.VITE_ENV || (isProduction() ? 'production' : 'development');

const API_CONFIG = {
  development: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    enableLogs: true,
    enableRetry: true,
  },
  production: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.99digicom.com',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000,
    enableLogs: false,
    enableRetry: true,
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
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Get both auth tokens from localStorage
  const userToken = localStorage.getItem('authToken');
  const adminToken = localStorage.getItem('adminToken');
  
  // If admin token exists and the request is to an admin endpoint, use admin token
  if (adminToken && config.url?.includes('/api/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  // Otherwise, if user token exists, use that
  else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  // Ensure the URL uses HTTPS in production
  if (isProduction()) {
    if (config.url && !config.url.startsWith('https://')) {
      config.url = config.url.replace('http://', 'https://');
    }
    if (config.baseURL && !config.baseURL.startsWith('https://')) {
      config.baseURL = config.baseURL.replace('http://', 'https://');
    }
  }

  // Add cache-busting parameter for GET requests in development
  if (isDevelopment() && config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
  }

  // Log requests in development
  if (currentConfig.enableLogs) {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  }

  return config;
}, (error) => {
  if (currentConfig.enableLogs) {
    console.error('❌ Request configuration error:', error);
  }
  return Promise.reject(error);
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (currentConfig.enableLogs) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Enhanced error logging
    if (currentConfig.enableLogs) {
      console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    }

    // Handle network errors with better detection
    if (!error.response) {
      // Check if it's a CORS issue
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        if (currentConfig.enableLogs) {
          console.warn('🌐 Network/CORS error detected. Checking server connectivity...');
        }
        
        // Only retry once to prevent infinite loops
        if (currentConfig.enableRetry && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Add a small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            return await axiosInstance(originalRequest);
          } catch (retryError) {
            if (currentConfig.enableLogs) {
              console.error('🔄 Retry failed:', retryError);
            }
            
            // Provide environment-specific error messages
            if (isDevelopment()) {
              return Promise.reject(new Error(
                'Unable to connect to the server. Please make sure the backend server is running on http://localhost:5050'
              ));
            } else {
              return Promise.reject(new Error(
                'Unable to connect to the server. Please check your internet connection and try again.'
              ));
            }
          }
        }
      }
      
      // Default network error message
      const networkErrorMessage = isDevelopment() 
        ? 'Network connection failed. Make sure the backend server is running.'
        : 'Network connection failed. Please check your internet connection.';
      
      return Promise.reject(new Error(networkErrorMessage));
    }

    // Handle CORS errors
    if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
      const corsErrorMessage = isDevelopment()
        ? 'CORS error detected. Check server CORS configuration and ensure backend is running.'
        : 'Unable to connect to the server. Please try again later.';
      
      return Promise.reject(new Error(corsErrorMessage));
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Check if this was an admin request
      if (originalRequest.url?.includes('/api/admin')) {
        localStorage.removeItem('adminToken');
        if (!window.location.pathname.includes('admin')) {
          window.location.href = '/admin/login';
        }
      } else {
        localStorage.removeItem('authToken');
        // Only redirect to login if we're not on a public page
        const publicPaths = [
          '/', '/about', '/contact', '/partners', '/services', '/resources', 
          '/signup', '/login', '/forgot-password', '/privacypolicy', 
          '/termsofservice', '/cookiepolicy', '/faqss', '/platform-enablement-ams'
        ];
        const isPublicPath = publicPaths.some(path => 
          window.location.pathname === path || 
          window.location.pathname.startsWith(path + '/')
        );
        
        if (!isPublicPath && !window.location.pathname.includes('login')) {
          window.location.href = '/partner-login';
        }
      }
      return Promise.reject(new Error('Your session has expired. Please log in again.'));
    }

    // Handle forbidden errors
    if (error.response?.status === 403) {
      return Promise.reject(new Error('You do not have permission to perform this action.'));
    }

    // Handle bad request errors
    if (error.response?.status === 400) {
      const message = error.response.data?.message || 'Invalid request. Please check your input.';
      return Promise.reject(new Error(message));
    }

    // Handle not found errors
    if (error.response?.status === 404) {
      const message = error.response.data?.message || 'The requested resource was not found.';
      return Promise.reject(new Error(message));
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      const serverErrorMessage = isDevelopment()
        ? `Server error (${error.response.status}): ${error.response.data?.message || 'Internal server error'}`
        : 'A server error occurred. Please try again later.';
      
      return Promise.reject(new Error(serverErrorMessage));
    }

    // Handle other errors
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

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