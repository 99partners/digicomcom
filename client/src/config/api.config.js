import axios from 'axios';
import AUTH_CONFIG from './auth.config';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
export const API_BASE_URL = API_URL;

const getAuthHeaders = (customHeaders = {}) => {
  const token = localStorage.getItem(AUTH_CONFIG.adminTokenKey);
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-Custom-Request': 'system-account',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Authorization': token ? `Bearer ${token}` : '',
    ...customHeaders
  };
};

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: getAuthHeaders(),
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure CORS credentials are properly set
    config.withCredentials = true;
    
    // Log the request for debugging
    console.log('Making request to:', config.url, {
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for handling token expiration and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_CONFIG.adminTokenKey);
    }
    
    // Network error handling
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - Is the server running?', {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }

    return Promise.reject(error);
  }
);

const apiService = {
  post: async (endpoint, data = {}, options = {}) => {
    try {
      console.log(`Making POST request to ${endpoint}`, { data, options });
      const response = await axiosInstance.post(endpoint, data, {
        withCredentials: true,
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      console.error(`Error in POST ${endpoint}:`, error);
      throw error;
    }
  },

  get: async (endpoint, options = {}) => {
    try {
      console.log(`Making GET request to ${endpoint}`, { options });
      const response = await axiosInstance.get(endpoint, {
        withCredentials: true,
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      console.error(`Error in GET ${endpoint}:`, error);
      throw error;
    }
  }
};

export default apiService;