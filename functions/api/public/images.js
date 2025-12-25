/**
 * Public API endpoint for fetching image URLs from D1
 *
 * GET /api/public/images?key=hero-main - Get image URL and metadata by key
 * GET /api/public/images?category=hero - Get all images in a category
 */

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  const category = url.searchParams.get('category');

  try {
    if (key) {
      // Fetch specific image by key
      const image = await env.DB.prepare(`
        SELECT key, r2_key, alt_text, category FROM images WHERE key = ?
      `).bind(key).first();

      if (!image) {
        return new Response(JSON.stringify({ error: 'Image not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Construct full R2 URL
      const imageUrl = `${env.R2_PUBLIC_URL}/${image.r2_key}`;

      return new Response(JSON.stringify({
        key: image.key,
        url: imageUrl,
        alt: image.alt_text || '',
        category: image.category
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });

    } else if (category) {
      // Fetch all images in a category
      const imagesResult = await env.DB.prepare(`
        SELECT key, r2_key, alt_text, category FROM images WHERE category = ?
      `).bind(category).all();

      const images = imagesResult.results.map(img => ({
        key: img.key,
        url: `${env.R2_PUBLIC_URL}/${img.r2_key}`,
        alt: img.alt_text || '',
        category: img.category
      }));

      return new Response(JSON.stringify(images), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });

    } else {
      // Return all images
      const imagesResult = await env.DB.prepare(`
        SELECT key, r2_key, alt_text, category FROM images ORDER BY category, key
      `).all();

      const images = imagesResult.results.map(img => ({
        key: img.key,
        url: `${env.R2_PUBLIC_URL}/${img.r2_key}`,
        alt: img.alt_text || '',
        category: img.category
      }));

      return new Response(JSON.stringify(images), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch images',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
