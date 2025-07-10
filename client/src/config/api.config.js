import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
export const API_BASE_URL = API_URL; // For backward compatibility

const getAuthHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    ...customHeaders
  };
};

const apiService = {
  post: async (endpoint, data, options = {}) => {
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint, options = {}) => {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: getAuthHeaders(options.headers)
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;