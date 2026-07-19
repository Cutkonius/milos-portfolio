// Generate a scrypt hash for the CMS admin password (HQ_PASS_HASH).
//   node scripts/hash-password.mjs "your-strong-password"
// Copy the printed "<saltHex>:<hashHex>" into HQ_PASS_HASH.
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`${salt.toString("hex")}:${hash.toString("hex")}`);
