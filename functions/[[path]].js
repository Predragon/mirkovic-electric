/**
 * Cloudflare Pages Function to inject dynamic content into static pages
 * This runs at the edge and modifies the HTML before serving
 */

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

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

    // Fetch SEO metadata for this page
    const seoResult = await env.DB.prepare(`
      SELECT * FROM seo_metadata WHERE page_id = ?
    `).bind(pageId).first();

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
      // Service pages and other pages: hero image + text sections
      // Replace the hero background image
      if (content['hero'] && content['hero'].type === 'image') {
        // Match hero images in inline styles: style={{ backgroundImage: `url('/images/hero/...')` }}
        // Also match direct src attributes: src="/images/hero/..."
        html = html.replace(
          /\/images\/hero\/[a-zA-Z0-9\-_]+\.(webp|jpg|jpeg|png)/g,
          content['hero'].value
        );
      }

      // Text content replacements for service pages
      // These defaults match services.ts - they will be replaced if custom text is saved in admin
      const serviceTextDefaults = {
        'ev-charging': {
          'page-subtitle': 'System-Level EV Charging Solutions for Residential and Commercial Properties',
          'page-title': 'EV Charging &amp; Load Sharing',
          'page-description': 'Electric vehicle charging is one of the fastest-growing electrical loads in modern properties. When not properly planned, EV chargers can exceed available service capacity or trigger costly and unnecessary upgrades. Mirkovic Electric designs and installs EV charging systems that integrate safely with existing electrical infrastructure through load management, smart controls, and utility-aware planning.',
        },
        'power-planning': {
          'page-subtitle': 'Advanced Electrical Planning for Modern High-Demand Systems',
          'page-title': 'Power Planning, Load Management &amp; Smart Panels',
          'page-description': 'Modern properties face increasing electrical demands from EVs, heat pumps, induction cooking, solar, battery storage, and advanced systems. Without proper planning, these loads can exceed service capacity, trigger unnecessary upgrades, or create permitting issues. Mirkovic Electric provides integrated power planning, load management, and smart panel solutions designed to safely support new electrical loads while minimizing costly service upgrades and avoiding compliance problems.',
        },
        'service-upgrades': {
          'page-subtitle': 'Code-Compliant Service Upgrades for Modern Electrical Demand',
          'page-title': 'Electrical Service Upgrades',
          'page-description': 'As properties add EV chargers, heat pumps, induction cooking, solar, battery storage, and new equipment, existing electrical services are often no longer sufficient. An undersized or outdated service can limit what a property can support and lead to safety, reliability, or permitting issues. Mirkovic Electric provides professional electrical service and panel upgrades for residential and commercial properties, with a focus on proper planning, clean execution, and long-term reliability.',
        },
        'permits-pge': {
          'page-subtitle': 'Pre-Construction Planning, Utility Coordination, and Inspection Support',
          'page-title': 'Permits &amp; PG&amp;E Coordination',
          'page-description': 'Electrical projects in the Bay Area frequently require coordination with local building departments and PG&amp;E. Service upgrades, EV charging installations, smart panels, and load management solutions often involve multiple approval steps before construction can begin. Mirkovic Electric manages the permitting and utility coordination process to reduce delays, avoid rejections, and ensure electrical work proceeds in compliance with local and utility requirements.',
        },
        'audio-systems': {
          'page-subtitle': 'Reference-Grade Audio Infrastructure, System Design, and Integration',
          'page-title': 'Audiophile Audio Systems &amp; Networked Playback',
          'page-description': 'High-performance audio systems require more than quality components. Signal integrity, electrical noise control, proper grounding, and reliable network infrastructure all play a critical role in system performance. Mirkovic Electric designs and installs reference-grade audio infrastructure for clients who value sound quality, system reliability, and long-term flexibility. This service focuses on infrastructure, system topology, and bit-perfect signal delivery rather than consumer-grade audio packages.',
        },
        'general-electrical': {
          'page-subtitle': 'Professional Electrical Work for Residential and Commercial Properties',
          'page-title': 'General Electrical &amp; Infrastructure',
          'page-description': 'Modern electrical work for residential and commercial properties-done cleanly, safely, and built to support future needs. Mirkovic Electric provides professional electrical service, upgrades, and corrective work with the same planning-first mindset used on higher-complexity projects. We prioritize safe execution, code compliance, clear communication, and workmanship that holds up over time.',
        },
      };

      const defaults = serviceTextDefaults[pageId];
      if (defaults) {
        // Replace page subtitle
        if (content['page-subtitle'] && content['page-subtitle'].type === 'text') {
          const escaped = escapeHtml(content['page-subtitle'].value);
          const regex = new RegExp(defaults['page-subtitle'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          html = html.replace(regex, escaped);
        }

        // Replace page title
        if (content['page-title'] && content['page-title'].type === 'text') {
          const escaped = escapeHtml(content['page-title'].value);
          const regex = new RegExp(defaults['page-title'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          html = html.replace(regex, escaped);
        }

        // Replace page description
        if (content['page-description'] && content['page-description'].type === 'text') {
          const escaped = escapeHtml(content['page-description'].value);
          const regex = new RegExp(defaults['page-description'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          html = html.replace(regex, escaped);
        }
      }
    }

    // Inject SEO meta tags if available
    if (seoResult) {
      const metaTags = [];

      // Title tag
      if (seoResult.meta_title) {
        html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(seoResult.meta_title)}</title>`);
      }

      // Meta description
      if (seoResult.meta_description) {
        metaTags.push(`<meta name="description" content="${escapeHtml(seoResult.meta_description)}">`);
      }

      // Robots
      if (seoResult.robots) {
        metaTags.push(`<meta name="robots" content="${escapeHtml(seoResult.robots)}">`);
      }

      // Canonical URL
      if (seoResult.canonical_url) {
        metaTags.push(`<link rel="canonical" href="${escapeHtml(seoResult.canonical_url)}">`);
      }

      // Open Graph tags
      const ogTitle = seoResult.og_title || seoResult.meta_title;
      const ogDescription = seoResult.og_description || seoResult.meta_description;

      if (ogTitle) {
        metaTags.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}">`);
      }
      if (ogDescription) {
        metaTags.push(`<meta property="og:description" content="${escapeHtml(ogDescription)}">`);
      }
      if (seoResult.og_image) {
        metaTags.push(`<meta property="og:image" content="${escapeHtml(seoResult.og_image)}">`);
      }
      metaTags.push(`<meta property="og:type" content="website">`);

      // Twitter Card tags
      if (seoResult.twitter_card) {
        metaTags.push(`<meta name="twitter:card" content="${escapeHtml(seoResult.twitter_card)}">`);
      }
      if (ogTitle) {
        metaTags.push(`<meta name="twitter:title" content="${escapeHtml(ogTitle)}">`);
      }
      if (ogDescription) {
        metaTags.push(`<meta name="twitter:description" content="${escapeHtml(ogDescription)}">`);
      }
      if (seoResult.og_image) {
        metaTags.push(`<meta name="twitter:image" content="${escapeHtml(seoResult.og_image)}">`);
      }

      // Inject all meta tags before </head>
      if (metaTags.length > 0) {
        const tagsHtml = '\n  ' + metaTags.join('\n  ') + '\n  ';
        html = html.replace('</head>', tagsHtml + '</head>');
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
