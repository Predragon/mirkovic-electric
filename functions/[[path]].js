/**
 * Cloudflare Pages Function to inject dynamic content into static pages
 * This runs at the edge and modifies the HTML before serving
 */

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Only process HTML page requests (not assets)
  if (!url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) {
    return next();
  }

  // Get the static HTML from the build
  const response = await next();

  // Only modify HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // Determine if this is staging or production
  const branch = env.CF_PAGES_BRANCH || 'main';
  const status = branch === 'staging' ? 'draft' : 'published';

  // Only inject content for homepage
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return response;
  }

  try {
    // Fetch page content from database
    const contentResult = await env.DB.prepare(`
      SELECT section_id, content_value
      FROM page_content
      WHERE page_id = ? AND (
        status = ?
        OR (status = 'published' AND section_id NOT IN (
          SELECT section_id FROM page_content WHERE page_id = ? AND status = ?
        ))
      )
    `).bind('homepage', status, 'homepage', status).all();

    // Build content map
    const content = {};
    contentResult.results.forEach((row) => {
      content[row.section_id] = row.content_value;
    });

    // Get the HTML
    let html = await response.text();

    // Inject content by replacing image src attributes
    if (content['hero-background']) {
      html = html.replace(
        /\/images\/hero\/ev-charging-hero\.webp/g,
        content['hero-background']
      );
    }

    const cardMappings = [
      { key: 'card-1', default: '/images/cards/general-electrical-full.webp' },
      { key: 'card-2', default: '/images/cards/load-management-full.webp' },
      { key: 'card-3', default: '/images/cards/smart-panels-full.webp' },
      { key: 'card-4', default: '/images/cards/ev-charging-full.webp' },
      { key: 'card-5', default: '/images/cards/permits-pge-full.webp' },
      { key: 'card-6', default: '/images/cards/audio-systems-full.webp' },
    ];

    cardMappings.forEach(({ key, default: defaultPath }) => {
      if (content[key]) {
        const regex = new RegExp(defaultPath.replace(/\//g, '\\/'), 'g');
        html = html.replace(regex, content[key]);
      }
    });

    // Return modified HTML
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

  } catch (error) {
    console.error('Error injecting content:', error);
    // Return original response on error
    return response;
  }
}
