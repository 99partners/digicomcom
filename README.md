# Project Configuration

This project is configured to work in both `development` and `production` environments.

## Backend

The backend configuration is located in `server/config/config.js`. This file uses environment variables to configure the application.

### Environment Variables

The backend uses the following environment variables:

*   `NODE_ENV`: The environment to run the application in. Can be `development` or `production`.
*   `PORT`: The port to run the application on.
*   `MONGODB_URI`: The connection string for the MongoDB database.
*   `JWT_SECRET_KEY`: The secret key for signing JWTs.
*   `SMTP_USER`: The username for the SMTP server.
*   `SMTP_PASSWORD`: The password for the SMTP server.
*   `SENDER_EMAIL`: The email address to send emails from.

### Local Development

To run the backend in development mode, create a `.env.development` file in the `server` directory with the following variables:

```
NODE_ENV=development
PORT=5050
MONGODB_URI=mongodb://localhost:27017/digicom-db
JWT_SECRET_KEY='your-secret-key'
...
```

Then, run the following command to start the server:

```
npm run dev
```

### Production

To run the backend in production mode, create a `.env.production` file in the `server` directory with the following variables:

```
NODE_ENV=production
PORT=5050
MONGODB_URI='your-production-mongodb-uri'
JWT_SECRET_KEY='your-production-secret-key'
...
```

Then, run the following command to start the server:

```
npm start
```

## Frontend

The frontend configuration is located in `client/src/config/api.config.js`. This file uses environment variables to configure the application.

### Environment Variables

The frontend uses the following environment variables:

*   `VITE_API_BASE_URL`: The base URL for the backend API.

### Local Development

To run the frontend in development mode, create a `.env.development` file in the `client` directory with the following variable:

```
VITE_API_BASE_URL=http://localhost:5050
```

Then, run the following command to start the client:

```
npm run dev
```

### Production

To run the frontend in production mode, create a `.env.production` file in the `client` directory with the following variable:

```
VITE_API_BASE_URL=https://api.99digicom.com
```

Then, run the following command to build the client:

```
npm run build
```
