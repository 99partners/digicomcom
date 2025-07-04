import axios from 'axios';

// Ensure HTTPS is always used in production
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://99digicom.com'
  : 'http://localhost:5050';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Enable sending cookies
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'production') {

    if (config.url && !config.url.startsWith('https:')) {
      config.url = config.url.replace(/^http:/i, 'https:');
    }
    if (config.baseURL && !config.baseURL.startsWith('https:')) {
      config.baseURL = config.baseURL.replace(/^http:/i, 'https:');
    }
  }
  return config;
});

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  let url = `${API_BASE_URL}/${cleanEndpoint}`;

  if (process.env.NODE_ENV === 'production') {
    url = url.replace(/^http:/i, 'https:');
  }

  return url;
};