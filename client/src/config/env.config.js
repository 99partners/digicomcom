const env = {
  production: {
    API_URL: 'https://api.99digicom.com',
    WEBSITE_URL: 'https://99digicom.com'
  },
  development: {
    API_URL: 'http://localhost:5050',
    WEBSITE_URL: 'http://localhost:5173'
  }
};

const currentEnv = process.env.NODE_ENV || 'development';
const config = {
  ...env[currentEnv],
  isDevelopment: currentEnv === 'development',
  isProduction: currentEnv === 'production'
};

export default config; 