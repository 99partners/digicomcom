# 99 Digicom Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (for local development)

### 1. Start Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start development server with hot reload
npm run server

# OR start production server
npm start
```

The backend will start on `http://localhost:5050`

### 2. Start Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# OR start with production mode
npm run dev:prod
```

The frontend will start on `http://localhost:5173`

## 🌍 Environment Configuration

### Local Development
The app automatically detects when running locally and uses:
- **API Base URL**: `http://localhost:5050`
- **CORS**: Permissive for localhost variants
- **Logging**: Enabled for debugging
- **Error Messages**: Detailed for development

### Production/Live
When deployed to a live domain, the app automatically switches to:
- **API Base URL**: `https://api.99digicom.com`
- **CORS**: Strict domain validation
- **Logging**: Disabled for performance
- **Error Messages**: User-friendly

### Manual Environment Override

You can override the environment detection by setting environment variables:

**Client (.env files in client directory):**
```env
VITE_ENV=production
VITE_API_BASE_URL=https://your-api-domain.com
VITE_API_TIMEOUT=60000
```

**Server (.env file in server directory):**
```env
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
PORT=5050
```

## 🔧 API Configuration Features

### Automatic Environment Detection
```javascript
// The API config automatically detects:
// - localhost vs. live domain
// - development vs. production mode
// - Available environment variables

import { getEnvironmentInfo } from './config/api.config.js';
console.log(getEnvironmentInfo());
```

### Error Handling
- **Network Errors**: Automatic retry with exponential backoff
- **CORS Issues**: Clear error messages with troubleshooting tips
- **Authentication**: Automatic token refresh and redirect handling
- **Server Errors**: Environment-appropriate error messages

### Development Features
- 🔍 **Request/Response Logging**: See all API calls in console
- 🔄 **Auto-retry**: Failed requests are automatically retried
- 🌐 **CORS Debugging**: Detailed CORS error information
- ⚡ **Cache Busting**: GET requests include timestamps

## 🛠️ Troubleshooting

### "Connection Refused" Errors

1. **Check Backend Server**
   ```bash
   cd client
   npm run check:api
   ```

2. **Start Backend If Not Running**
   ```bash
   cd client
   npm run start:server
   ```

3. **Verify Ports**
   - Backend should be on port 5050
   - Frontend should be on port 5173

### CORS Issues

1. **Development**: The server automatically allows localhost variants
2. **Production**: Add your domain to `ALLOWED_ORIGINS` environment variable

### Environment Variables Not Working

1. **Client**: Variables must start with `VITE_`
2. **Server**: Use standard environment variable names
3. **Restart**: Both servers after changing environment variables

## 📝 Available Scripts

### Client Scripts
```bash
npm run dev          # Start development server
npm run dev:prod     # Start with production API settings
npm run build        # Build for production
npm run build:dev    # Build with development settings
npm run preview      # Preview production build
npm run start:server # Start backend server from client directory
npm run check:api    # Test if backend is running
```

### Server Scripts
```bash
npm start           # Start production server
npm run server      # Start development server with hot reload
```

## 🔐 Authentication

The API configuration automatically handles:
- **User Authentication**: Regular user login tokens
- **Admin Authentication**: Admin panel access tokens
- **Token Refresh**: Automatic token validation
- **Redirects**: Smart redirection based on user type

## 📱 Form Submissions

All forms now include:
- ✨ **Success Animation**: Confetti celebration on successful submission
- 🔄 **Auto-redirect**: Automatic navigation to My Applications
- 🛡️ **Error Handling**: Comprehensive error messages
- 📝 **Validation**: Client and server-side validation

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Deploy contents to your hosting provider
```

### Backend Deployment
```bash
# Set environment variables
export NODE_ENV=production
export ALLOWED_ORIGINS=https://yourdomain.com

# Start production server
npm start
```

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=5050
ALLOWED_ORIGINS=https://99digicom.com,https://www.99digicom.com
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend (Build-time variables):**
```env
VITE_ENV=production
VITE_API_BASE_URL=https://api.99digicom.com
```

## 🐛 Debug Information

### Check Current Configuration
```javascript
// In browser console
import { getEnvironmentInfo } from './src/config/api.config.js';
console.log(getEnvironmentInfo());
```

### Server Status
```bash
# Check if server is running
curl http://localhost:5050/

# Check server logs
cd server && npm run server
```

## 📊 Performance

### Development
- Hot reload enabled
- Source maps included
- Detailed error messages
- Request/response logging

### Production
- Minified bundles
- Tree shaking enabled
- Gzip compression
- Optimized chunk splitting

---

🎉 **Happy Coding!** If you encounter any issues, check the console for detailed error messages in development mode. 