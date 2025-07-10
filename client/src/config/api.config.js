import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const apiService = {
  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint) => {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;