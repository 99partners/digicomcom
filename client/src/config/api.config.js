import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const apiService = {
  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint) => {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;