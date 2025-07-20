#!/bin/bash

# CORS Fix Deployment Script for 99digicom.com
# This script will update the server files and restart the production server

echo "🚀 Starting CORS fix deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "server/index.js" ]; then
    echo -e "${RED}❌ Error: server/index.js not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Display current configuration
echo -e "${YELLOW}📋 Current CORS configuration:${NC}"
echo "Checking allowedOrigins in server/index.js..."
grep -A 10 "allowedOrigins = \[" server/index.js

echo -e "\n${YELLOW}🔧 Deploying CORS fixes...${NC}"

# Step 1: Create backup of current server files
echo "1. Creating backup..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r server/ "$BACKUP_DIR/"
echo -e "${GREEN}✅ Backup created in $BACKUP_DIR${NC}"

# Step 2: Verify the fixed CORS configuration
echo "2. Verifying CORS configuration..."
if grep -q "https://99digicom.com" server/index.js; then
    echo -e "${GREEN}✅ 99digicom.com found in allowed origins${NC}"
else
    echo -e "${RED}❌ 99digicom.com NOT found in allowed origins${NC}"
    exit 1
fi

# Step 3: Display deployment commands for production server
echo -e "\n${YELLOW}🌐 PRODUCTION SERVER DEPLOYMENT COMMANDS:${NC}"
echo "Please run these commands on your production server:"
echo ""
echo -e "${GREEN}# 1. SSH into your production server${NC}"
echo "ssh root@your-server-ip"
echo ""
echo -e "${GREEN}# 2. Navigate to project directory${NC}"
echo "cd /root/digicomcom"
echo ""
echo -e "${GREEN}# 3. Backup current server${NC}"
echo "cp -r server/ server_backup_\$(date +%Y%m%d_%H%M%S)/"
echo ""
echo -e "${GREEN}# 4. Upload the fixed server/index.js${NC}"
echo "# From your local machine, run:"
echo "scp server/index.js root@your-server-ip:/root/digicomcom/server/index.js"
echo ""
echo -e "${GREEN}# 5. Upload the fixed server/routes/newsletterRoutes.js${NC}"
echo "scp server/routes/newsletterRoutes.js root@your-server-ip:/root/digicomcom/server/routes/newsletterRoutes.js"
echo ""
echo -e "${GREEN}# 6. Restart the server (choose one method)${NC}"
echo "# Method 1: If using PM2"
echo "pm2 restart all"
echo "pm2 logs --lines 50"
echo ""
echo "# Method 2: If using npm directly"
echo "pkill -f 'node.*index.js'"
echo "cd /root/digicomcom/server"
echo "npm run start:production"
echo ""
echo -e "${GREEN}# 7. Test the CORS fix${NC}"
echo "curl -v -H \"Origin: https://99digicom.com\" https://api.99digicom.com/api/blogs"
echo ""
echo -e "${GREEN}# 8. Monitor logs${NC}"
echo "tail -f /root/digicomcom/server/logs/cors.log"
echo "tail -f /root/digicomcom/server/logs/access.log"

# Step 4: Create a simple test script
echo -e "\n${YELLOW}🧪 Creating test script...${NC}"
cat > test-api.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing API endpoints from 99digicom.com origin..."

# Test blogs endpoint
echo "Testing /api/blogs..."
curl -s -H "Origin: https://99digicom.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.99digicom.com/api/blogs \
     -w "\nStatus: %{http_code}\n" \
     -D headers.txt

echo "Response headers:"
cat headers.txt | grep -i "access-control"

# Test newsletter endpoint
echo -e "\nTesting /api/newsletter..."
curl -s -H "Origin: https://99digicom.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.99digicom.com/api/newsletter \
     -w "\nStatus: %{http_code}\n" \
     -D headers2.txt

echo "Response headers:"
cat headers2.txt | grep -i "access-control"

# Cleanup
rm -f headers.txt headers2.txt

echo -e "\n✅ API testing completed"
EOF

chmod +x test-api.sh
echo -e "${GREEN}✅ Test script created: test-api.sh${NC}"

# Step 5: Display manual upload commands
echo -e "\n${YELLOW}📁 MANUAL FILE UPLOAD (Alternative method):${NC}"
echo "If you prefer to upload files manually:"
echo ""
echo "1. Upload server/index.js:"
echo "   scp server/index.js root@your-server:/root/digicomcom/server/"
echo ""
echo "2. Upload server/routes/newsletterRoutes.js:"
echo "   scp server/routes/newsletterRoutes.js root@your-server:/root/digicomcom/server/routes/"
echo ""
echo "3. Upload server/utils/logger.js:"
echo "   scp server/utils/logger.js root@your-server:/root/digicomcom/server/utils/"

echo -e "\n${GREEN}🎯 QUICK FIX SUMMARY:${NC}"
echo "The main issue: CORS middleware needs to be updated and server restarted"
echo "Key files to update: server/index.js, server/routes/newsletterRoutes.js"
echo "After deployment, test with: ./test-api.sh"

echo -e "\n${GREEN}✅ Deployment script completed!${NC}"
echo "Next steps:"
echo "1. Upload the files to your production server"
echo "2. Restart your server process"
echo "3. Test the API endpoints"
echo "4. Monitor the logs for any issues" 