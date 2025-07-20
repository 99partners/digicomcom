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
