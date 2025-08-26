// import fs from "fs";
// import fetch from "node-fetch";

// async function subscribe() {
//   const payload = JSON.parse(
//     fs.readFileSync("./config/subscribe_payload.json", "utf-8")
//   );

//   // Set current UTC timestamp
//   payload.context.timestamp = new Date().toISOString();

//   const response = await fetch("https://pilot-gateway-1.beckn.nsdl.co.in/subscribe", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const result = await response.json();
//   console.log("✅ Subscription Response:", result);
// }

// subscribe();

import fetch from "node-fetch";
import https from "https";
import fs from "fs";
import crypto from "crypto";

// Read your private key for signing
const privateKey = fs.readFileSync("./config/private.pem", "utf-8");

// ✅ HTTPS agent to handle ONDC SSL certs
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

// Function to create signature
function createSignature(privateKey, data) {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(data));
    sign.end();
    return sign.sign(privateKey, 'base64');
}

// Your request payload
const requestBody = {
    subscriber_id: "staging.99digicom.com",
    subscriber_url: "https://staging.99digicom.com/ondc/on_subscribe", // ✅ FIXED: Full URL
    domain: "nic2004:60232",
    country: "IND",
    city: "std:0278",
    signing_public_key: "MCowBQYDK2VwAyEAkACXYYSQ9v4M6316htJZEDAPn/qr+cDIrqEZyoH6bkQ=",
    encryption_public_key: "MCowBQYDK2VuAyEApRxiGHn7rEv61pQMA81G/4DI9d4/VUgMBtOxYBVFa3M=",
    created: new Date().toISOString(),
};

// Create signature
const signature = createSignature(privateKey, requestBody);

// Make the subscription request
async function subscribe() {
    try {
        const response = await fetch("https://pilot-gateway-1.beckn.nsdl.co.in/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Signature keyId=\"staging.99digicom.com|key|ed25519\",algorithm=\"ed25519\",headers=\"(created)\",signature=\"${signature}\",created=\"${Math.floor(Date.now() / 1000)}\"`
            },
            body: JSON.stringify(requestBody),
            agent: httpsAgent,
        });

        // First, check what we're actually getting
        const responseText = await response.text();
        console.log("Raw response:", responseText);
        
        // Then try to parse as JSON
        try {
            const result = JSON.parse(responseText);
            console.log("✅ Subscription Response:", result);
        } catch (parseError) {
            console.error("❌ Failed to parse response as JSON:", responseText);
        }
        
    } catch (error) {
        console.error("❌ Subscription Error:", error.message);
    }
}

subscribe();