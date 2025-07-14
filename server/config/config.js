import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Load environment variables from the appropriate .env file
dotenv.config({
  path: path.resolve(process.cwd(), `server/.env.${env}`),
});

const development = {
  app: {
    port: process.env.PORT || 5050,
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/digicom-db',
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  cors: {
    origin: 'http://localhost:5173',
  },
};

const production = {
  app: {
    port: process.env.PORT || 5050,
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  cors: {
    origin: 'https://99digicom.com',
  },
};

const config = {
  development,
  production,
};

export default config[env];
