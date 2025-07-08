import axios from 'axios';

// Ensure HTTPS is always used in production
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.99digicom.com'
  : 'http://localhost:5050';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': window.location.origin
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
  if (process.env.NODE_ENV === 'production' && config.url?.startsWith('http:')) {
    config.url = config.url.replace('http:', 'https:');
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
        }
      }
    }

    // Handle CORS errors
    if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
      console.error('CORS or network error:', error);
      // You might want to show a user-friendly message here
      return Promise.reject(new Error('Unable to connect to the server. Please try again later.'));
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
    }
    
    // Handle CORS errors
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Ensure the URL uses HTTPS in production
  let url = `${API_BASE_URL}/${cleanEndpoint}`;
  if (process.env.NODE_ENV === 'production' && url.startsWith('http:')) {
    url = url.replace('http:', 'https:');
  }
  // Add cache-busting parameter
  url += (url.includes('?') ? '&' : '?') + '_t=' + new Date().getTime();
  return url;
};

export default axiosInstance;