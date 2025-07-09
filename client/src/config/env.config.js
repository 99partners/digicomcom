const env = {
  production: {
    API_URL: 'https://api.99digicom.com',
    WEBSITE_URL: 'https://99digicom.com'
  },
  development: {
    API_URL: 'http://localhost:5000',
    WEBSITE_URL: 'http://localhost:5173'
  }
};

const config = env[process.env.NODE_ENV || 'development'];

export default config; 