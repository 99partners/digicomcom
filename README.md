# DigiComCom Application

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- PM2 (for production)

### Local Development

1. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

2. Set up environment files:

Backend (`server/.env.development`):
```plaintext
PORT=5050
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/digicomcom
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=dev-secret-key
```

Frontend (`client/.env.development`):
```plaintext
VITE_API_URL=http://localhost:5050
```

3. Start development servers:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5050

### Production Deployment

1. Set up environment files:

Backend (`server/.env.production`):
```plaintext
PORT=5050
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
CORS_ORIGIN=https://99digicom.com,https://www.99digicom.com
JWT_SECRET=your-production-secret-key
```

Frontend (`client/.env.production`):
```plaintext
VITE_API_URL=https://api.99digicom.com
```

2. Deploy Backend:
```bash
# Install PM2 globally
npm install -g pm2

# Start the server
cd server
npm run start:pm2

# Other PM2 commands
pm2 logs digicomcom-api    # View logs
pm2 monit                  # Monitor application
pm2 restart digicomcom-api # Restart application
pm2 stop digicomcom-api    # Stop application
```

3. Deploy Frontend:
```bash
cd client
npm run build
```

Deploy the contents of the `dist` directory to your web server.

## Project Structure

```
digicomcom/
├── client/              # Frontend React application
│   ├── src/
│   ├── .env.development
│   └── .env.production
└── server/              # Backend Node.js application
    ├── src/
    ├── .env.development
    └── .env.production
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 5050)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGIN`: Allowed origins for CORS
- `JWT_SECRET`: Secret for JWT tokens

### Frontend
- `VITE_API_URL`: Backend API URL 