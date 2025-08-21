// Node 16.17+ has crypto.randomUUID built-in
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const reqId = randomUUID(); // e.g., "d7c2c7ca-7e8d-4c35-b2f2-0c8b7c2b1a0a"

const workDir = process.cwd();
const ondcDir = path.join(workDir, ".ondc");
const filePath = path.join(ondcDir, "request_id.txt");

// 1) Persist to a small local folder for reuse in Step 4 and Step 5
fs.mkdirSync(ondcDir, { recursive: true });
fs.writeFileSync(filePath, reqId, "utf8");

// 2) (Optional) export to .env so other scripts can read it as ONDC_REQUEST_ID
const envPath = path.join(workDir, ".env");
const envLine = `ONDC_REQUEST_ID=${reqId}\n`;
try {
  let existing = "";
  if (fs.existsSync(envPath)) existing = fs.readFileSync(envPath, "utf8");
  // replace if exists, else append
  if (/^ONDC_REQUEST_ID=.*/m.test(existing)) {
    const updated = existing.replace(/^ONDC_REQUEST_ID=.*/m, envLine.trim());
    fs.writeFileSync(envPath, updated + (updated.endsWith("\n") ? "" : "\n"));
  } else {
    fs.appendFileSync(envPath, envLine);
  }
} catch (_) {
  // If you don't want to touch .env, you can ignore this block.
}

console.log("✅ Generated ONDC Request ID:", reqId);
console.log("   Saved to:", filePath);
console.log("   Also available as env var: ONDC_REQUEST_ID");
