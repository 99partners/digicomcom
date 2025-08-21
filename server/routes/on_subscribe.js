// // routes/on_subscribe.js
// // Node.js 16+ (preferably 18+). Uses built-in crypto.

// const fs = require('fs');
// const crypto = require('crypto');
// const express = require('express');
// const router = express.Router();

// // ---------- CONFIG: change to your values / env ----------
// const ENCRYPTION_PRIVATE_KEY_RAW = process.env.ENCRYPTION_PRIVATE_KEY_RAW
//   || fs.readFileSync(process.env.ENCRYPTION_PRIVATE_KEY_PATH || './encryption_private_key.pem', 'utf8');

// // Choose ONDC public key depending on environment:
// const ONDC_PUBLIC_KEYS = {
//   prod: "MCowBQYDK2VuAyEAvVEyZY91O2yV8w8/CAwVDAnqIZDJJUPdLUUKwLo3K0M=",
//   preprod: "MCowBQYDK2VuAyEAa9Wbpvd9SsrpOZFcynyt/TO3x0Yrqyys4NUGIvyxX2Q=",
//   staging: "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM="
// };
// const ONDC_ENV = process.env.ONDC_ENV || 'staging'; // 'staging' | 'preprod' | 'prod'
// const ONDC_PUB_BASE64 = ONDC_PUBLIC_KEYS[ONDC_ENV];

// // ---------- helpers ----------
// function loadPrivateKey(raw) {
//   raw = raw.trim();
//   if (raw.startsWith('-----BEGIN')) {
//     // PEM (PKCS#8) or similar
//     return crypto.createPrivateKey({ key: raw, format: 'pem', type: 'pkcs8' });
//   }
//   // assume base64 DER (PKCS8)
//   return crypto.createPrivateKey({ key: Buffer.from(raw, 'base64'), format: 'der', type: 'pkcs8' });
// }

// function loadONDCPublicKey(base64Str) {
//   // ONDC publishes public keys as base64 DER (SPKI). Load as 'der' + 'spki'.
//   return crypto.createPublicKey({ key: Buffer.from(base64Str, 'base64'), format: 'der', type: 'spki' });
// }

// // Try to parse common challenge encodings:
// // 1) JSON with { iv, ciphertext, tag } (all base64) OR
// // 2) concatenated: [12-byte IV][ciphertext][16-byte tag]
// function parseChallengeBuffer(buf) {
//   // try JSON
//   try {
//     const s = buf.toString('utf8');
//     const j = JSON.parse(s);
//     if (j && (j.iv || j.ciphertext)) {
//       return {
//         iv: Buffer.from(j.iv, 'base64'),
//         ciphertext: Buffer.from(j.ciphertext, 'base64'),
//         authTag: j.tag ? Buffer.from(j.tag, 'base64') : null
//       };
//     }
//   } catch (e) {
//     // not JSON — fall through
//   }
//   // fallback: assume 12 byte IV, 16 byte tag at end (common AES-GCM layout)
//   if (buf.length < (12 + 16)) throw new Error('challenge buffer too small for expected layout');
//   const iv = buf.slice(0, 12);
//   const authTag = buf.slice(buf.length - 16);
//   const ciphertext = buf.slice(12, buf.length - 16);
//   return { iv, ciphertext, authTag };
// }

// // ------------- The route -------------
// router.post('/:callback_path/on_subscribe', express.json({ limit: '1mb' }), async (req, res) => {
//   try {
//     // load keys (do this once at startup in production)
//     const encPrivKey = loadPrivateKey(ENCRYPTION_PRIVATE_KEY_RAW);
//     const ondcPubKey = loadONDCPublicKey(ONDC_PUB_BASE64);

//     // location of challenge_string in payload may vary; common path:
//     const challengeB64 = req.body?.message?.challenge_string || req.body?.challenge_string;
//     if (!challengeB64) return res.status(400).json({ error: 'missing challenge_string' });

//     const challengeBuf = Buffer.from(challengeB64, 'base64');
//     const { iv, ciphertext, authTag } = parseChallengeBuffer(challengeBuf);

//     // derive X25519 shared secret
//     // crypto.diffieHellman accepts KeyObjects
//     const sharedSecret = crypto.diffieHellman({
//       privateKey: encPrivKey,
//       publicKey: ondcPubKey
//     }); // Buffer (usually 32 bytes for X25519)

//     // HKDF(SHA-256) to derive AES-256 key.
//     // Salt: you can set a salt if protocol specifies. Using empty salt is acceptable if no salt provided.
//     const salt = Buffer.alloc(0);
//     const info = Buffer.from('on_subscribe'); // domain-separation label
//     const aesKey = crypto.hkdfSync('sha256', sharedSecret, salt, info, 32); // 32 bytes => AES-256

//     // decrypt AES-256-GCM
//     const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
//     if (authTag) decipher.setAuthTag(authTag);
//     const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');

//     // Registry expects the decrypted challenge string in the response body (usually exact plaintext)
//     // Example returning the plaintext in the message field (confirm expected response format with ONDC).
//     return res.json({ message: { challenge_response: plaintext }});
//   } catch (err) {
//     console.error('on_subscribe decryption error:', err);
//     // respond NACK (or appropriate ack) — follow ONDC expected response shape
//     return res.status(500).json({ message: { ack: { status: 'NACK' } }, error: { message: err.message }});
//   }
// });

// module.exports = router;


// routes/on_subscribe.js
// Node.js 16+ (preferably 18+). Uses built-in crypto.

const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

// ---------- CONFIG: change to your values / env ----------
const ENCRYPTION_PRIVATE_KEY_RAW = process.env.ENCRYPTION_PRIVATE_KEY_RAW
  || fs.readFileSync(process.env.ENCRYPTION_PRIVATE_KEY_PATH || './encryption_private_key.pem', 'utf8');

// Choose ONDC public key depending on environment:
const ONDC_PUBLIC_KEYS = {
  prod: "MCowBQYDK2VuAyEAvVEyZY91O2yV8w8/CAwVDAnqIZDJJUPdLUUKwLo3K0M=",
  preprod: "MCowBQYDK2VuAyEAa9Wbpvd9SsrpOZFcynyt/TO3x0Yrqyys4NUGIvyxX2Q=",
  staging: "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM="
};
const ONDC_ENV = process.env.ONDC_ENV || 'staging'; // 'staging' | 'preprod' | 'prod'
const ONDC_PUB_BASE64 = ONDC_PUBLIC_KEYS[ONDC_ENV];

// ---------- helpers ----------
function loadPrivateKey(raw) {
  raw = raw.trim();
  if (raw.startsWith('-----BEGIN')) {
    // PEM (PKCS#8) or similar
    return crypto.createPrivateKey({ key: raw, format: 'pem', type: 'pkcs8' });
  }
  // assume base64 DER (PKCS8)
  return crypto.createPrivateKey({ key: Buffer.from(raw, 'base64'), format: 'der', type: 'pkcs8' });
}

function loadONDCPublicKey(base64Str) {
  // ONDC publishes public keys as base64 DER (SPKI). Load as 'der' + 'spki'.
  return crypto.createPublicKey({ key: Buffer.from(base64Str, 'base64'), format: 'der', type: 'spki' });
}

// Try to parse common challenge encodings:
// 1) JSON with { iv, ciphertext, tag } (all base64) OR
// 2) concatenated: [12-byte IV][ciphertext][16-byte tag]
function parseChallengeBuffer(buf) {
  // try JSON
  try {
    const s = buf.toString('utf8');
    const j = JSON.parse(s);
    if (j && (j.iv || j.ciphertext)) {
      return {
        iv: Buffer.from(j.iv, 'base64'),
        ciphertext: Buffer.from(j.ciphertext, 'base64'),
        authTag: j.tag ? Buffer.from(j.tag, 'base64') : null
      };
    }
  } catch (e) {
    // not JSON — fall through
  }
  // fallback: assume 12 byte IV, 16 byte tag at end (common AES-GCM layout)
  if (buf.length < (12 + 16)) throw new Error('challenge buffer too small for expected layout');
  const iv = buf.slice(0, 12);
  const authTag = buf.slice(buf.length - 16);
  const ciphertext = buf.slice(12, buf.length - 16);
  return { iv, ciphertext, authTag };
}

// ------------- The route -------------
router.post('/:callback_path/on_subscribe', express.json({ limit: '1mb' }), async (req, res) => {
  try {
    // load keys (do this once at startup in production)
    const encPrivKey = loadPrivateKey(ENCRYPTION_PRIVATE_KEY_RAW);
    const ondcPubKey = loadONDCPublicKey(ONDC_PUB_BASE64);

    // location of challenge_string in payload may vary; common path:
    const challengeB64 = req.body?.message?.challenge_string || req.body?.challenge_string;
    if (!challengeB64) return res.status(400).json({ error: 'missing challenge_string' });

    const challengeBuf = Buffer.from(challengeB64, 'base64');
    const { iv, ciphertext, authTag } = parseChallengeBuffer(challengeBuf);

    // derive X25519 shared secret
    // crypto.diffieHellman accepts KeyObjects
    const sharedSecret = crypto.diffieHellman({
      privateKey: encPrivKey,
      publicKey: ondcPubKey
    }); // Buffer (usually 32 bytes for X25519)

    // HKDF(SHA-256) to derive AES-256 key.
    // Salt: you can set a salt if protocol specifies. Using empty salt is acceptable if no salt provided.
    const salt = Buffer.alloc(0);
    const info = Buffer.from('on_subscribe'); // domain-separation label
    const aesKey = crypto.hkdfSync('sha256', sharedSecret, salt, info, 32); // 32 bytes => AES-256

    // decrypt AES-256-GCM
    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
    if (authTag) decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');

    // Registry expects the decrypted challenge string in the response body (usually exact plaintext)
    // Example returning the plaintext in the message field (confirm expected response format with ONDC).
    return res.json({ message: { challenge_response: plaintext }});
  } catch (err) {
    console.error('on_subscribe decryption error:', err);
    // respond NACK (or appropriate ack) — follow ONDC expected response shape
    return res.status(500).json({ message: { ack: { status: 'NACK' } }, error: { message: err.message }});
  }
});

module.exports = router;
