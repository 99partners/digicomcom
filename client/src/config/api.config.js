import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://api.99digicom.com'
  : 'http://localhost:5050';

// API service with error handling
const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default apiService;