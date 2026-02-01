#!/usr/bin/env node
/**
 * Sync Content URLs Script
 *
 * Updates page_content table to use the latest image URLs from the images table.
 * This fixes the issue where content still references old .blob files after optimization.
 *
 * Usage:
 *   export ADMIN_TOKEN=your-admin-password
 *   node scripts/sync-content-urls.js
 */

async function main() {
  const ADMIN_API_URL = process.env.ADMIN_API_URL || 'https://admin.mirkovicelectric.com';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const DRY_RUN = process.argv.includes('--dry-run');

  if (!ADMIN_TOKEN) {
    console.error('Error: ADMIN_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log('Content URL Sync');
  console.log('=================');
  console.log(`API URL: ${ADMIN_API_URL}`);
  console.log(`Dry run: ${DRY_RUN ? 'Yes' : 'No'}\n`);

  // Step 1: Get all images with their current URLs
  console.log('Fetching image list...');
  const imagesResponse = await fetch(`${ADMIN_API_URL}/api/admin/images/list`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });

  if (!imagesResponse.ok) {
    console.error(`Failed to fetch images: ${imagesResponse.status}`);
    process.exit(1);
  }

  const images = await imagesResponse.json();
  console.log(`  Found ${images.length} images\n`);

  // Build a map of image key to URL
  const imageUrlMap = {};
  for (const img of images) {
    imageUrlMap[img.key] = img.url;
  }

  // Step 2: Get current homepage content
  console.log('Fetching current content...');
  const contentResponse = await fetch(
    `${ADMIN_API_URL}/api/public/content?page=homepage&status=published`
  );

  if (!contentResponse.ok) {
    console.error(`Failed to fetch content: ${contentResponse.status}`);
    process.exit(1);
  }

  const contentData = await contentResponse.json();
  const currentContent = contentData.content || {};

  // Step 3: Find content that needs updating
  const updates = {};
  let updateCount = 0;

  console.log('\nAnalyzing content URLs...');
  console.log('-'.repeat(70));

  for (const [sectionId, url] of Object.entries(currentContent)) {
    // Skip non-image content
    if (!url.startsWith('http')) continue;

    // Check if URL ends with .blob
    if (url.includes('.blob')) {
      // Extract the image key from the URL
      // URL format: https://media.mirkovicelectric.com/images/general/permits-pge-1766726259607.blob
      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1]; // permits-pge-1766726259607.blob

      // Try to find matching image by key prefix
      // The key is the part before the timestamp: permits-pge
      const keyMatch = filename.match(/^(.+?)-\d+\.blob$/);
      if (keyMatch) {
        const keyPrefix = keyMatch[1];

        // Find image with matching key
        const matchingImage = images.find(img => img.key === keyPrefix || img.key.startsWith(keyPrefix));

        if (matchingImage && matchingImage.url !== url) {
          console.log(`  ${sectionId}:`);
          console.log(`    OLD: ${url.substring(url.lastIndexOf('/') + 1)}`);
          console.log(`    NEW: ${matchingImage.url.substring(matchingImage.url.lastIndexOf('/') + 1)}`);
          updates[sectionId] = matchingImage.url;
          updateCount++;
        }
      }
    }
  }

  console.log('-'.repeat(70));
  console.log(`\nFound ${updateCount} URLs to update\n`);

  if (updateCount === 0) {
    console.log('All content URLs are already up to date!');
    return;
  }

  if (DRY_RUN) {
    console.log('Dry run - no changes made');
    return;
  }

  // Step 4: Save as draft
  console.log('Saving updated content as draft...');
  const draftResponse = await fetch(`${ADMIN_API_URL}/api/admin/content/draft`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page_id: 'homepage',
      sections: updates
    })
  });

  if (!draftResponse.ok) {
    const error = await draftResponse.text();
    console.error(`Failed to save draft: ${draftResponse.status} - ${error}`);
    process.exit(1);
  }

  const draftResult = await draftResponse.json();
  console.log(`  Saved ${draftResult.updates?.length || 0} sections as draft`);

  // Step 5: Publish
  console.log('Publishing to production...');
  const publishResponse = await fetch(`${ADMIN_API_URL}/api/admin/content/publish`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page_id: 'homepage'
    })
  });

  if (!publishResponse.ok) {
    const error = await publishResponse.text();
    console.error(`Failed to publish: ${publishResponse.status} - ${error}`);
    process.exit(1);
  }

  const publishResult = await publishResponse.json();
  console.log(`  Published ${publishResult.published?.length || 0} sections\n`);

  console.log('Content URLs synced successfully!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
