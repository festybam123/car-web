import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'client', 'dist');
const dest = path.join(process.cwd(), 'server', 'public');

function copyRecursive(srcDir, destDir) {
  const entries = readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (statSync(src).isDirectory()) {
    mkdirSync(dest, { recursive: true });
    copyRecursive(src, dest);
    console.log('Copied client/dist to server/public for Vercel deployment');
  }
} catch (err) {
  console.warn('Could not copy dist:', err.message);
}
