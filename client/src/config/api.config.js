import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
export const API_BASE_URL = API_URL;

const getAuthHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-Custom-Request': 'system-account',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    ...customHeaders
  };
};

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: getAuthHeaders()
});

const apiService = {
  post: async (endpoint, data, options = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, data, {
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint, options = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, {
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;