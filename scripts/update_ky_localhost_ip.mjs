import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the current local network IPv4 address
function getLocalIPv4() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return null;
}

const ip = getLocalIPv4();

if (!ip) {
  console.error("❌ Unable to determine local IP address.");
  process.exit(1);
}

const filePath = path.resolve(__dirname, '../src/services/api/ky.ts');
const newPrefixUrl = `http://${ip}:5296/`;

try {
  let content = await fs.readFile(filePath, 'utf-8');

  const updated = content.replace(
    /prefixUrl:\s*"http:\/\/[\d.]+:\d+\//,
    `prefixUrl: "${newPrefixUrl}`
  );

  await fs.writeFile(filePath, updated, 'utf-8');
  console.log(`✅ ky.ts updated with local IP: ${newPrefixUrl}`);
} catch (err) {
  console.error(`❌ Error updating ky.ts: ${err.message}`);
  process.exit(1);
}
