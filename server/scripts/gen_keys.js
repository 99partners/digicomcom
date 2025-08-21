// // gen_keys.js
// const { generateKeyPairSync } = require("crypto");
// const fs = require("fs");

// // ----------------------
// // 1. Signing Key (Ed25519)
// // ----------------------
// const signing = generateKeyPairSync("ed25519");

// // Public key (DER SPKI → base64)
// const signPubDer = signing.publicKey.export({ format: "der", type: "spki" });
// const signPubB64 = Buffer.from(signPubDer).toString("base64");

// // Private key (PKCS#8 DER)
// const signPrivDer = signing.privateKey.export({ format: "der", type: "pkcs8" });

// // Save to files
// fs.writeFileSync("signing_public_key.der.b64.txt", signPubB64);
// fs.writeFileSync("signing_private_key.pkcs8.der", signPrivDer);

// // ----------------------
// // 2. Encryption Key (X25519)
// // ----------------------
// const encryption = generateKeyPairSync("x25519");

// // Public key (DER SPKI → base64)
// const encPubDer = encryption.publicKey.export({ format: "der", type: "spki" });
// const encPubB64 = Buffer.from(encPubDer).toString("base64");

// // Private key (PKCS#8 DER)
// const encPrivDer = encryption.privateKey.export({ format: "der", type: "pkcs8" });

// // Save to files
// fs.writeFileSync("encryption_public_key.der.b64.txt", encPubB64);
// fs.writeFileSync("encryption_private_key.pkcs8.der", encPrivDer);

// // ----------------------
// // Show keys in console
// // ----------------------
// console.log("✅ Signing Public Key (paste this into ONDC Portal):\n", signPubB64);
// console.log("✅ Encryption Public Key (paste this into ONDC Portal):\n", encPubB64);
// console.log("\n(Private keys saved locally, do NOT upload them)");


// server/scripts/gen_keys.js
import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate RSA key pair
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// Save keys to files inside server/config
writeFileSync(`${__dirname}/../config/public.pem`, publicKey);
writeFileSync(`${__dirname}/../config/private.pem`, privateKey);

console.log("✅ Keys generated in server/config/: public.pem & private.pem");
