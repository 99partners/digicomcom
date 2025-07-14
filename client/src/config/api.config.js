import axios from 'axios';

// Get environment variables with fallbacks
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://99digicom.com'  // Production URL
    : 'http://localhost:5050'); // Development URL

const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 
  (import.meta.env.MODE === 'production' ? 60000 : 30000);

// Helper function to construct API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: API_TIMEOUT,
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
  if (import.meta.env.MODE === 'production') {
    if (config.url && !config.url.startsWith('https://')) {
      config.url = config.url.replace('http://', 'https://');
    }
    if (config.baseURL && !config.baseURL.startsWith('https://')) {
      config.baseURL = config.baseURL.replace('http://', 'https://');
    }
  }

  // Add cache-busting parameter for GET requests
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
  }

  return config;
}, (error) => {
  console.error('Request configuration error:', error);
  return Promise.reject(error);
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      console.error('Network error occurred:', error);
      // Only retry once to prevent infinite loops
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          return await axiosInstance(originalRequest);
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          if (import.meta.env.MODE === 'production') {
            return Promise.reject(new Error('Connection failed. Please check your internet connection and try again.'));
          } else {
            return Promise.reject(new Error('Network connection failed. Please check your internet connection.'));
          }
        }
      }
    }

    // Handle CORS errors
    if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
      console.error('CORS or network error:', error);
      if (import.meta.env.MODE === 'production') {
        return Promise.reject(new Error('Unable to connect to the server. Please refresh the page and try again.'));
      } else {
        return Promise.reject(new Error('Unable to connect to the server. Please try again later.'));
      }
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Check if this was an admin request
      if (originalRequest.url?.includes('/api/admin')) {
        localStorage.removeItem('adminToken');
        if (!window.location.pathname.includes('adminlogin')) {
          window.location.href = '/adminlogin';
        }
      } else {
        localStorage.removeItem('authToken');
        if (!window.location.pathname.includes('login')) {
          window.location.href = '/partnerlogin';
        }
      }
      return Promise.reject(new Error('Your session has expired. Please log in again.'));
    }

    // Handle forbidden errors
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
      return Promise.reject(new Error('You do not have permission to perform this action.'));
    }

    // Handle bad request errors
    if (error.response?.status === 400) {
      console.error('Bad request:', error.response.data);
      const message = error.response.data.message || 'Invalid request. Please check your input.';
      return Promise.reject(new Error(message));
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
      if (import.meta.env.MODE === 'production') {
        return Promise.reject(new Error('A server error occurred. Our team has been notified and is working on it.'));
      } else {
        return Promise.reject(new Error('Server error occurred. Please try again later.'));
      }
    }

    // Handle other errors
    if (error.response?.data?.message) {
      console.error('API Error:', error.response.data.message);
      return Promise.reject(new Error(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default axiosInstance;