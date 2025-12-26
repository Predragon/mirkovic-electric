/**
 * Admin API endpoint for uploading images to R2
 *
 * POST /api/admin/images/upload
 * Body: multipart/form-data with file, key, category, alt
 */

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const imageKey = formData.get('key');
    const category = formData.get('category');
    const altText = formData.get('alt') || '';

    // Validate inputs
    if (!file || !imageKey || !category) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        required: ['file', 'key', 'category']
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileSize = arrayBuffer.byteLength;

    // Generate R2 key with timestamp to avoid caching issues
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const r2Key = `images/${category}/${imageKey}-${timestamp}.${fileExtension}`;

    // Upload to R2
    await env.R2_BUCKET.put(r2Key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || 'image/webp',
      },
    });

    // Get image dimensions (basic check)
    const dimensions = JSON.stringify({ width: 0, height: 0 }); // Client will send optimized images

    // Update or insert metadata in D1
    const existing = await env.DB.prepare(`
      SELECT id FROM images WHERE key = ?
    `).bind(imageKey).first();

    if (existing) {
      // Update existing image
      await env.DB.prepare(`
        UPDATE images
        SET r2_key = ?, alt_text = ?, original_filename = ?, file_size = ?, uploaded_at = CURRENT_TIMESTAMP
        WHERE key = ?
      `).bind(r2Key, altText, file.name, fileSize, imageKey).run();
    } else {
      // Insert new image
      await env.DB.prepare(`
        INSERT INTO images (key, r2_key, alt_text, category, original_filename, file_size, dimensions)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(imageKey, r2Key, altText, category, file.name, fileSize, dimensions).run();
    }

    // Return success with URL
    const imageUrl = `${env.R2_PUBLIC_URL}/${r2Key}`;

    return new Response(JSON.stringify({
      success: true,
      url: imageUrl,
      key: imageKey,
      r2Key: r2Key,
      message: 'Image uploaded successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(JSON.stringify({
      error: 'Failed to upload image',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
