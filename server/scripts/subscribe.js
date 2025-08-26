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

// Read your private key for signing
const privateKey = fs.readFileSync("./config/private.pem", "utf-8");

// ✅ HTTPS agent to handle ONDC SSL certs
const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Required for Pilot, NOT for Production
});

// Your request payload
const requestBody = {
    subscriber_id: "staging.99digicom.com",
    subscriber_url: "/ondc/on_subscribe",
    domain: "nic2004:60232",  // Change as per your business domain
    country: "IND",
    city: "std:0278",       // Example for Bangalore, change if required
    signing_public_key: "MCowBQYDK2VwAyEAkACXYYSQ9v4M6316htJZEDAPn/qr+cDIrqEZyoH6bkQ=",
    encryption_public_key: "MCowBQYDK2VuAyEApRxiGHn7rEv61pQMA81G/4DI9d4/VUgMBtOxYBVFa3M=",
    created: new Date().toISOString(),
};

// Make the subscription request
async function subscribe() {
    try {
        const response = await fetch("https://pilot-gateway-1.beckn.nsdl.co.in/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            agent: httpsAgent,
        });

        const result = await response.json();
        console.log("✅ Subscription Response:", result);
    } catch (error) {
        console.error("❌ Subscription Error:", error.message);
    }
}

subscribe();
