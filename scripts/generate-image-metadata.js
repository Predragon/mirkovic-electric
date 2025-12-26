/**
 * Generate SQL to insert image metadata into D1
 * Run: node scripts/generate-image-metadata.js > scripts/image-metadata.sql
 */

const fs = require('fs');
const path = require('path');

const imageDir = 'public/images';

// Recursively find all images
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Generate SQL
const images = findImages(imageDir);

console.log('-- Image Metadata Migration');
console.log('-- Generated:', new Date().toISOString());
console.log('-- Total images:', images.length);
console.log('');

images.forEach(imagePath => {
  // Remove 'public/images/' prefix
  const relativePath = imagePath.replace('public/images/', '');

  // Extract category from path
  const parts = relativePath.split('/');
  const category = parts.length > 1 ? parts[0] : 'general';
  const filename = parts[parts.length - 1];
  const nameWithoutExt = filename.replace(/\.(webp|jpg|jpeg|png)$/i, '');

  // Generate key (slug-friendly name)
  const key = nameWithoutExt.toLowerCase().replace(/\s+/g, '-');

  // R2 path
  const r2Key = `images/${category}/${filename}`;

  // Generate alt text from filename
  const altText = nameWithoutExt
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  const sql = `INSERT INTO images (image_key, r2_key, category, alt_text, file_size, mime_type, created_at)
VALUES ('${key}', '${r2Key}', '${category}', '${altText}', 0, 'image/webp', CURRENT_TIMESTAMP);`;

  console.log(sql);
});

console.log('');
console.log('-- Done! Copy the SQL above and run it in D1 Console');
