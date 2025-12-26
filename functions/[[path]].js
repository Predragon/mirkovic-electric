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

  // Map URL paths to page IDs
  const pathToPageId = {
    '/': 'homepage',
    '/index.html': 'homepage',
    '/services/': 'services',
    '/services/general-electrical/': 'general-electrical',
    '/services/power-planning/': 'power-planning',
    '/services/service-upgrades/': 'service-upgrades',
    '/services/ev-charging/': 'ev-charging',
    '/services/permits-pge/': 'permits-pge',
    '/services/audio-systems/': 'audio-systems',
    '/contact/': 'contact',
  };

  const pageId = pathToPageId[url.pathname];

  // Only process pages we have content for
  if (!pageId) {
    return response;
  }

  try {
    // Fetch page content from database
    const contentResult = await env.DB.prepare(`
      SELECT section_id, content_value, content_type
      FROM page_content
      WHERE page_id = ? AND (
        status = ?
        OR (status = 'published' AND section_id NOT IN (
          SELECT section_id FROM page_content WHERE page_id = ? AND status = ?
        ))
      )
    `).bind(pageId, status, pageId, status).all();

    // Build content map with type information
    const content = {};
    contentResult.results.forEach((row) => {
      content[row.section_id] = {
        value: row.content_value,
        type: row.content_type || 'image' // Default to image for backwards compatibility
      };
    });

    // Get the HTML
    let html = await response.text();

    // Inject content based on page type
    if (pageId === 'homepage') {
      // Homepage: hero-background + 6 cards (images)
      if (content['hero-background'] && content['hero-background'].type === 'image') {
        html = html.replace(
          /\/images\/hero\/ev-charging-hero\.webp/g,
          content['hero-background'].value
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
        if (content[key] && content[key].type === 'image') {
          const regex = new RegExp(defaultPath.replace(/\//g, '\\/'), 'g');
          html = html.replace(regex, content[key].value);
        }
      });

      // Text content replacements
      const textReplacements = [
        {
          key: 'hero-subtitle',
          default: 'Licensed Bay Area Electrician Since 1991'
        },
        {
          key: 'hero-title',
          default: 'Modern Electrical Solutions for Today&#x27;s High-Demand Properties'
        },
        {
          key: 'hero-description',
          default: 'EV charging, smart panels, load management, and expert PG&amp;E coordination. Trusted by Bay Area homeowners for over 30 years.'
        },
        {
          key: 'services-subtitle',
          default: 'What We Do'
        },
        {
          key: 'services-title',
          default: 'Our Services'
        },
        {
          key: 'services-description',
          default: 'Comprehensive electrical solutions for modern homes and businesses'
        }
      ];

      textReplacements.forEach(({ key, default: defaultText }) => {
        if (content[key] && content[key].type === 'text') {
          // Escape special HTML characters in the replacement text
          const escapedValue = content[key].value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');

          // Replace the default text with the custom text
          // Use a flexible pattern that handles potential whitespace variations
          const regex = new RegExp(defaultText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          html = html.replace(regex, escapedValue);
        }
      });
    } else {
      // All other pages: just 'hero' section
      // Replace the hero background image in the page
      if (content['hero'] && content['hero'].type === 'image') {
        // Match hero images in inline styles: style={{ backgroundImage: `url('/images/hero/...')` }}
        // Also match direct src attributes: src="/images/hero/..."
        html = html.replace(
          /\/images\/hero\/[a-zA-Z0-9\-_]+\.(webp|jpg|jpeg|png)/g,
          content['hero'].value
        );
      }
    }

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
