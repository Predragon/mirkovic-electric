/**
 * Public API endpoint for fetching service data from D1
 *
 * GET /api/public/services - List all visible services
 * GET /api/public/services?slug=ev-charging - Get single service with details
 */

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  try {
    if (slug) {
      // Fetch single service with all related data
      const service = await env.DB.prepare(`
        SELECT * FROM services WHERE slug = ? AND visible = 1
      `).bind(slug).first();

      if (!service) {
        return new Response(JSON.stringify({ error: 'Service not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Fetch sections
      const sectionsResult = await env.DB.prepare(`
        SELECT * FROM service_sections
        WHERE service_id = ?
        ORDER BY order_index
      `).bind(service.id).all();

      // Fetch metadata
      const metadataResult = await env.DB.prepare(`
        SELECT meta_key, meta_value FROM service_metadata
        WHERE service_id = ?
      `).bind(service.id).all();

      // Transform metadata into object
      const metadata = {};
      metadataResult.results.forEach(item => {
        try {
          metadata[item.meta_key] = JSON.parse(item.meta_value);
        } catch (e) {
          metadata[item.meta_key] = item.meta_value;
        }
      });

      // Transform sections
      const sections = sectionsResult.results.map(section => ({
        heading: section.heading,
        content: section.content_type === 'list' ? JSON.parse(section.content) : section.content,
        contentType: section.content_type
      }));

      // Combine all data
      const fullService = {
        slug: service.slug,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        sections,
        ...metadata
      };

      return new Response(JSON.stringify(fullService), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });

    } else {
      // Fetch all visible services (list view)
      const servicesResult = await env.DB.prepare(`
        SELECT id, slug, title, subtitle, description, order_index
        FROM services
        WHERE visible = 1
        ORDER BY order_index
      `).all();

      return new Response(JSON.stringify(servicesResult.results), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });
    }

  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch services',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
