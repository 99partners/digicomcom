# 🚀 Live API Backend Deployment Guide

## 🔧 Issues Fixed

### 1. **Environment Configuration**
- ✅ Fixed `.env.production` file dependency
- ✅ Added fallback environment variables
- ✅ Improved environment variable loading

### 2. **Database Connection**
- ✅ Added MongoDB connection fallback
- ✅ Enhanced connection error handling
- ✅ Added connection status monitoring

### 3. **Server Configuration**
- ✅ Added production-specific configurations
- ✅ **FIXED CORS Duplicate Headers Issue** - Custom CORS implementation
- ✅ Enhanced error logging and debugging

### 4. **Health Monitoring**
- ✅ Added `/health` endpoint
- ✅ Added `/api` info endpoint
- ✅ Enhanced server startup logging

---

## 🚀 Quick Deployment Steps

### 1. **Upload Server Files**
Upload the entire `server/` directory to your hosting provider.

### 2. **Set Environment Variables**
On your hosting platform, set these environment variables:

```bash
NODE_ENV=production
PORT=5050
MONGODB_URI=mongodb+srv://99partnersin:99Partnersin@digicom.epvwtpt.mongodb.net/digicom-db?retryWrites=true&w=majority&appName=digicom
JWT_SECRET=sbdhsbd#2oj23j2j3j2j3j2j3j2j3j2j3j2j3
```

### 3. **Start the Server**
Choose one of these methods:

**Option A: Standard Start**
```bash
cd server
npm install
npm run production
```

**Option B: Production Script (Recommended)**
```bash
cd server
npm install
npm run start:prod
```

**Option C: Direct Start**
```bash
cd server
npm install
NODE_ENV=production node index.js
```

---

## 🔍 Debugging Steps

### 1. **Check Server Status**
Visit these URLs in your browser:

- **Root**: `https://api.99digicom.com/`
- **Health**: `https://api.99digicom.com/health`
- **API Info**: `https://api.99digicom.com/api`

### 2. **Test API Endpoints**
```bash
# Test newsletter endpoint
curl -X POST https://api.99digicom.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Test health check
curl https://api.99digicom.com/health
```

### 3. **Check Server Logs**
Look for these success messages:
```
🚀 Starting server with configuration
🔄 Connecting to database...
✅ Database connected successfully
🚀 Server running successfully!
📍 Local: http://localhost:5050
🌐 Network: http://0.0.0.0:5050
```

---

## 🛠️ Troubleshooting Common Issues

### **Issue 1: Server Won't Start**
**Symptoms**: Server crashes immediately or won't start

**Solutions**:
1. Check if port 5050 is available
2. Verify MongoDB connection
3. Check server logs for errors
4. Use production startup script: `npm run start:prod`

### **Issue 2: Database Connection Failed**
**Symptoms**: "Failed to connect to MongoDB" error

**Solutions**:
1. Verify MongoDB URI is correct
2. Check firewall/network settings
3. Verify database user permissions
4. Check if MongoDB cluster is running

### **Issue 3: CORS Errors**
**Symptoms**: "Access blocked by CORS policy" or "Multiple values in Access-Control-Allow-Origin header"

**Solutions**:
1. ✅ **FIXED**: Custom CORS implementation prevents duplicate headers
2. Verify origin domain is in allowed list
3. Check if API domain is correctly configured
4. Ensure server is running on correct port
5. Check browser network tab for exact error

**Note**: The multiple values CORS error has been fixed with a custom CORS implementation that ensures headers are set only once.

### **Issue 4: API Endpoints Not Working**
**Symptoms**: 404 errors or endpoints not responding

**Solutions**:
1. Check if server is running: `https://api.99digicom.com/health`
2. Verify route imports are correct
3. Check if all dependencies are installed
4. Verify API endpoints at: `https://api.99digicom.com/api`

---

## 📊 Production Monitoring

### **Health Check Endpoint**
```
GET https://api.99digicom.com/health
```

Response:
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "production",
  "port": 5050,
  "database": "connected"
}
```

### **API Info Endpoint**
```
GET https://api.99digicom.com/api
```

Response:
```json
{
  "message": "API is running",
  "environment": "production",
  "version": "1.0.0",
  "endpoints": [
    "/api/auth",
    "/api/user",
    "/api/admin",
    "/api/partner",
    "/api/blogs",
    "/api/contact",
    "/api/newsletter"
  ]
}
```

---

## 🔐 Security Considerations

### **Environment Variables**
- Never commit `.env` files to version control
- Use hosting provider's environment variable settings
- Rotate JWT secrets regularly
- Use strong MongoDB passwords

### **CORS Configuration**
- Only allow necessary origins
- Keep the allowed origins list minimal
- Regularly review and update domains

### **Database Security**
- Use MongoDB Atlas IP whitelist
- Enable database authentication
- Use connection string with SSL

---

## 🚀 Deployment Checklist

### **Before Deployment**
- [ ] Server files uploaded
- [ ] Environment variables set
- [ ] Dependencies installed (`npm install`)
- [ ] MongoDB connection tested
- [ ] Port 5050 available

### **After Deployment**
- [ ] Server starts successfully
- [ ] Health check responds: `https://api.99digicom.com/health`
- [ ] API info responds: `https://api.99digicom.com/api`
- [ ] Database connection confirmed
- [ ] CORS working from frontend
- [ ] All API endpoints accessible

### **Testing**
- [ ] Frontend can connect to API
- [ ] User authentication works
- [ ] Newsletter signup works
- [ ] Admin functions work
- [ ] Partner functions work

---

## 📞 Support

If you're still experiencing issues after following this guide:

1. Check server logs for specific error messages
2. Verify all environment variables are set correctly
3. Test individual API endpoints using curl or Postman
4. Check hosting provider documentation for Node.js deployment
5. Verify MongoDB connection string and credentials

---

## 🎉 Success Indicators

Your API backend is working correctly when:

✅ **Server Status**: `https://api.99digicom.com/health` returns healthy status
✅ **API Endpoints**: All endpoints listed in `/api` are accessible
✅ **Database**: MongoDB connection is established
✅ **CORS**: Frontend can make requests without CORS errors
✅ **Authentication**: User login/signup works
✅ **All Features**: Newsletter, contact forms, admin functions work

---

*Last updated: January 2024* 