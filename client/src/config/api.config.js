import axios from 'axios';

// Ensure HTTPS is always used in production
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://99digicom.com'
  : 'http://localhost:5050';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Enable sending cookies
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add request interceptor to ensure HTTPS in production
axios.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'production' && config.url?.startsWith('http:')) {
    config.url = config.url.replace('http:', 'https:');
  }
  return config;
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