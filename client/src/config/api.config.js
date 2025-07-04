// Ensure HTTPS is always used
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://99digicom.com'
  : 'http://localhost:5050';

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