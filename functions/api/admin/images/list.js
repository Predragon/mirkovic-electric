/**
 * Admin API endpoint for listing images
 *
 * GET /api/admin/images/list - Get all images
 * DELETE /api/admin/images/list?key=hero-main - Delete an image
 */

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const imagesResult = await env.DB.prepare(`
      SELECT * FROM images ORDER BY category, key
    `).all();

    const images = imagesResult.results.map(img => ({
      ...img,
      url: `${env.R2_PUBLIC_URL}/${img.r2_key}`
    }));

    return new Response(JSON.stringify(images), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error listing images:', error);
    return new Response(JSON.stringify({
      error: 'Failed to list images',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestDelete(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return new Response(JSON.stringify({
      error: 'Missing image key'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get R2 key from database
    const image = await env.DB.prepare(`
      SELECT r2_key FROM images WHERE key = ?
    `).bind(key).first();

    if (!image) {
      return new Response(JSON.stringify({
        error: 'Image not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete from R2
    await env.R2_BUCKET.delete(image.r2_key);

    // Delete from database
    await env.DB.prepare(`
      DELETE FROM images WHERE key = ?
    `).bind(key).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Image deleted successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting image:', error);
    return new Response(JSON.stringify({
      error: 'Failed to delete image',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
