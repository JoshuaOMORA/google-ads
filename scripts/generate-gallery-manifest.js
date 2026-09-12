import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const galleryDir = path.join(projectRoot, 'public', 'images', 'puppy-gallery');
const outputPath = path.join(projectRoot, 'src', 'data', 'gallery-manifest.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const manifest = {};

if (!fs.existsSync(galleryDir)) {
  console.warn('Gallery directory not found:', galleryDir);
  fs.writeFileSync(outputPath, '{}');
  process.exit(0);
}

const entries = fs.readdirSync(galleryDir, { withFileTypes: true });
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const folderPath = path.join(galleryDir, entry.name);
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/images/puppy-gallery/${entry.name}/${f}`);
  manifest[entry.name] = files;
}

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n');
const totalImages = Object.values(manifest).reduce((s, a) => s + a.length, 0);
console.log(`Gallery manifest generated: ${Object.keys(manifest).length} puppies, ${totalImages} images`);
