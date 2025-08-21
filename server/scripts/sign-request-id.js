// server/scripts/sign-request-id.js
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load private key
const privateKey = fs.readFileSync(`${__dirname}/../config/private.pem`, "utf8");

// Take request ID from command line or use a default
const requestId = process.argv[2] || "123e4567-e89b-12d3-a456-426614174000";

// Sign request ID
const sign = crypto.createSign("RSA-SHA256");
sign.update(requestId);
sign.end();

const signature = sign.sign(privateKey, "base64");

console.log("Request ID:", requestId);
console.log("Signature:", signature);
