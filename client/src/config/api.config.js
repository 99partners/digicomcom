import axios from 'axios';

// Environment-specific configuration
const ENV = import.meta.env.VITE_ENV || 'development';
const API_CONFIG = {
  development: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },
  production: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://99digicom.com',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000,
  }
};

// Get current environment configuration
const currentConfig = API_CONFIG[ENV] || API_CONFIG.development;

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

  return config;
}, (error) => {
  console.error('Request configuration error:', error);
  return Promise.reject(error);
});

// Add response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors with improved retry logic
    if (!error.response || error.code === 'ERR_NETWORK') {
      console.error('Network error occurred:', error);
      
      // Only retry GET requests and only once
      if (!originalRequest._retry && originalRequest.method === 'get') {
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
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      if (originalRequest.url?.includes('/api/admin')) {
        localStorage.removeItem('adminToken');
        window.location.href = '/adminlogin';
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

export { currentConfig as API_CONFIG };
export default axiosInstance;