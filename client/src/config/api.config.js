import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const headers = getAuthHeaders();
  config.headers = {
    ...config.headers,
    ...headers,
  };
  return config;
});

export default api;