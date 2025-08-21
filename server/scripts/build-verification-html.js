// server/scripts/build-verification-html.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Example: Build a verification HTML file
const subscriberId = process.argv[2] || "preprod.99digicom.com"; // pass as argument or fallback
const publicDir = path.join(__dirname, "../public");

// ✅ Make sure "public" folder exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const filePath = path.join(publicDir, "ondc-site-verification.html");

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>ONDC Verification</title>
  </head>
  <body>
    <h1>Subscriber ID: ${subscriberId}</h1>
  </body>
</html>
`;

// Save file
fs.writeFileSync(filePath, htmlContent, "utf8");

console.log(`✅ Verification file created at: ${filePath}`);
