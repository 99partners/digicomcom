import axios from 'axios';

// Ensure HTTPS is always used in production
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://99digicom.com'  // Updated production URL
  : 'http://localhost:5050';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Get both auth tokens from localStorage
  const userToken = localStorage.getItem('authToken');
  const adminToken = localStorage.getItem('adminToken');
  
  // If admin token exists and the request is to an admin endpoint, use admin token
  if (adminToken && config.url?.includes('/api/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  // Otherwise, if user token exists, use that
  else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
}, (error) => {
  console.error('Request configuration error:', error);
  return Promise.reject(error);
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Check if this was an admin request
      if (error.config.url?.includes('/api/admin')) {
        localStorage.removeItem('adminToken');
        window.location.href = '/adminlogin';
      } else {
        localStorage.removeItem('authToken');
        window.location.href = '/partnerlogin';
      }
      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response?.data?.message) {
      console.error('API Error:', error.response.data.message);
    } else {
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;