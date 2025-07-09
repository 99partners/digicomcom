# 99Digicom Server

Backend server for 99Digicom website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digicom
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Newsletter

#### Subscribe to Newsletter
- **POST** `/api/newsletter/subscribe`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Successfully subscribed to newsletter"
  }
  ```

#### Unsubscribe from Newsletter
- **POST** `/api/newsletter/unsubscribe`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Successfully unsubscribed from newsletter"
  }
  ```

## Features

- Email validation
- Duplicate subscription prevention
- Reactivation of previously unsubscribed emails
- MongoDB integration
- CORS support
- Security headers with Helmet
- Request logging with Morgan 