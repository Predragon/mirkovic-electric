#!/usr/bin/env node
/**
 * Bulk Image Optimizer Script
 *
 * Downloads existing images from R2, optimizes them, and re-uploads with correct extensions.
 *
 * Usage:
 *   1. Set environment variables:
 *      export ADMIN_API_URL=https://admin.mirkovicelectric.com
 *      export ADMIN_TOKEN=your-admin-password
 *
 *   2. Run the script:
 *      node scripts/optimize-existing-images.js
 *
 * Requirements:
 *   npm install sharp node-fetch
 */

const fs = require('fs');
const path = require('path');

// Dynamic imports for ES modules
async function main() {
  // Import sharp and fetch dynamically
  const sharp = (await import('sharp')).default;
  const fetch = (await import('node-fetch')).default;

  // Configuration
  const ADMIN_API_URL = process.env.ADMIN_API_URL || 'https://admin.mirkovicelectric.com';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const DRY_RUN = process.argv.includes('--dry-run');
  const MAX_SIZE_KB = 500; // Target max size in KB
  const MAX_WIDTH = 1920;
  const QUALITY = 85;

  if (!ADMIN_TOKEN) {
    console.error('❌ Error: ADMIN_TOKEN environment variable is required');
    console.error('   Set it with: export ADMIN_TOKEN=your-admin-password');
    process.exit(1);
  }

  console.log('🖼️  Bulk Image Optimizer');
  console.log('========================');
  console.log(`API URL: ${ADMIN_API_URL}`);
  console.log(`Dry run: ${DRY_RUN ? 'Yes (no changes will be made)' : 'No'}`);
  console.log(`Target: max ${MAX_SIZE_KB}KB, ${MAX_WIDTH}px, ${QUALITY}% quality`);
  console.log('');

  // Step 1: Fetch list of images
  console.log('📋 Fetching image list...');
  const listResponse = await fetch(`${ADMIN_API_URL}/api/admin/images/list`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });

  if (!listResponse.ok) {
    console.error(`❌ Failed to fetch images: ${listResponse.status} ${listResponse.statusText}`);
    process.exit(1);
  }

  const { images } = await listResponse.json();
  console.log(`   Found ${images.length} images\n`);

  // Filter images that need optimization (large files or .blob extension)
  const needsOptimization = images.filter(img => {
    const isBlob = img.r2_key?.endsWith('.blob');
    const isLarge = img.file_size > MAX_SIZE_KB * 1024;
    return isBlob || isLarge;
  });

  console.log(`🔍 Images needing optimization: ${needsOptimization.length}`);
  console.log('');

  if (needsOptimization.length === 0) {
    console.log('✅ All images are already optimized!');
    return;
  }

  // Show what will be processed
  console.log('Images to process:');
  console.log('─'.repeat(80));
  for (const img of needsOptimization) {
    const sizeKB = (img.file_size / 1024).toFixed(0);
    const ext = img.r2_key?.split('.').pop() || 'unknown';
    console.log(`  ${img.key.padEnd(30)} ${sizeKB.padStart(6)} KB  .${ext}`);
  }
  console.log('─'.repeat(80));
  console.log('');

  if (DRY_RUN) {
    console.log('🏃 Dry run mode - no changes made');
    return;
  }

  // Create temp directory
  const tempDir = path.join(__dirname, '../.temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Process each image
  let processed = 0;
  let failed = 0;
  let totalSaved = 0;

  for (const img of needsOptimization) {
    console.log(`\n📸 Processing: ${img.key}`);

    try {
      // Download image
      console.log('   ⬇️  Downloading...');
      const imageResponse = await fetch(img.url);
      if (!imageResponse.ok) {
        throw new Error(`Failed to download: ${imageResponse.status}`);
      }
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      const originalSize = imageBuffer.length;
      console.log(`   Original size: ${(originalSize / 1024).toFixed(0)} KB`);

      // Optimize with sharp
      console.log('   🔧 Optimizing...');
      const optimized = await sharp(imageBuffer)
        .resize(MAX_WIDTH, MAX_WIDTH, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: QUALITY })
        .toBuffer();

      const newSize = optimized.length;
      const saved = originalSize - newSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(1);
      console.log(`   Optimized size: ${(newSize / 1024).toFixed(0)} KB (saved ${savedPercent}%)`);

      // Re-upload
      console.log('   ⬆️  Uploading...');

      // Create form data manually for node-fetch
      const FormData = (await import('form-data')).default;
      const formData = new FormData();

      // Create a file-like object
      formData.append('file', optimized, {
        filename: `${img.key}.webp`,
        contentType: 'image/webp',
      });
      formData.append('key', img.key);
      formData.append('category', img.category || 'general');
      formData.append('alt', img.alt_text || '');

      const uploadResponse = await fetch(`${ADMIN_API_URL}/api/admin/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          ...formData.getHeaders()
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${uploadResponse.status} - ${errorText}`);
      }

      const result = await uploadResponse.json();
      console.log(`   ✅ Done! New URL: ${result.url}`);

      processed++;
      totalSaved += saved;

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      failed++;
    }
  }

  // Cleanup temp directory
  fs.rmSync(tempDir, { recursive: true, force: true });

  // Summary
  console.log('\n');
  console.log('═'.repeat(50));
  console.log('📊 Summary');
  console.log('═'.repeat(50));
  console.log(`   Processed: ${processed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('═'.repeat(50));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
