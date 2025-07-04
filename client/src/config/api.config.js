import axios from 'axios';

// Ensure HTTPS is always used in production
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://99digicom.com'
  : 'http://localhost:5050';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Enable sending cookies
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor to ensure HTTPS in production
axios.interceptors.request.use((config) => {
  // Ensure the URL uses HTTPS in production
  if (process.env.NODE_ENV === 'production' && config.url?.startsWith('http:')) {
    config.url = config.url.replace('http:', 'https:');
  }
  
  // Add credentials and CORS headers
  config.withCredentials = true;
  config.headers['Access-Control-Allow-Credentials'] = true;
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle CORS and other errors
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 403 && error.response?.data?.error === 'CORS Error') {
    console.error('CORS Error:', error.response.data.message);
  }
  return Promise.reject(error);
});

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Ensure the URL uses HTTPS in production
  let url = `${API_BASE_URL}/${cleanEndpoint}`;
  if (process.env.NODE_ENV === 'production' && url.startsWith('http:')) {
    url = url.replace('http:', 'https:');
  }
  return url;
};