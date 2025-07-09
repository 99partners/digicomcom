import axios from 'axios';

const BASE_URL = 'https://api.99digicom.com';

// Production API service
const apiService = {
  get: async (endpoint) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  },
  post: async (endpoint, data) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  put: async (endpoint, data) => {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  delete: async (endpoint) => {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response.data;
  }
};

export default apiService;