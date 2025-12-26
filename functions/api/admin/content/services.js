/**
 * Admin API endpoint for managing services (CRUD operations)
 *
 * GET    /api/admin/content/services - List all services
 * GET    /api/admin/content/services?id=1 - Get specific service
 * POST   /api/admin/content/services - Create new service
 * PUT    /api/admin/content/services - Update service
 * DELETE /api/admin/content/services?id=1 - Delete service
 */

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    if (id) {
      // Fetch specific service with all related data
      const service = await env.DB.prepare(`
        SELECT * FROM services WHERE id = ?
      `).bind(id).first();

      if (!service) {
        return new Response(JSON.stringify({ error: 'Service not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Fetch sections
      const sectionsResult = await env.DB.prepare(`
        SELECT * FROM service_sections WHERE service_id = ? ORDER BY order_index
      `).bind(id).all();

      // Fetch metadata
      const metadataResult = await env.DB.prepare(`
        SELECT meta_key, meta_value FROM service_metadata WHERE service_id = ?
      `).bind(id).all();

      // Transform metadata
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
        id: section.id,
        heading: section.heading,
        content: section.content_type === 'list' ? JSON.parse(section.content) : section.content,
        contentType: section.content_type,
        orderIndex: section.order_index
      }));

      return new Response(JSON.stringify({
        ...service,
        sections,
        metadata
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // List all services
      const servicesResult = await env.DB.prepare(`
        SELECT * FROM services ORDER BY order_index
      `).all();

      return new Response(JSON.stringify(servicesResult.results), {
        headers: { 'Content-Type': 'application/json' }
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

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const data = await request.json();
    const { slug, title, subtitle, description, orderIndex, visible, sections, metadata } = data;

    // Validate required fields
    if (!slug || !title || !subtitle || !description) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        required: ['slug', 'title', 'subtitle', 'description']
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert service
    const serviceResult = await env.DB.prepare(`
      INSERT INTO services (slug, title, subtitle, description, order_index, visible)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      slug,
      title,
      subtitle,
      description,
      orderIndex || 0,
      visible !== undefined ? (visible ? 1 : 0) : 1
    ).run();

    const serviceId = serviceResult.meta.last_row_id;

    // Insert sections if provided
    if (sections && Array.isArray(sections)) {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const content = Array.isArray(section.content) ?
          JSON.stringify(section.content) : section.content;
        const contentType = Array.isArray(section.content) ? 'list' : 'text';

        await env.DB.prepare(`
          INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
          VALUES (?, ?, ?, ?, ?)
        `).bind(serviceId, section.heading, content, contentType, i).run();
      }
    }

    // Insert metadata if provided
    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        const metaValue = typeof value === 'string' ? value : JSON.stringify(value);
        await env.DB.prepare(`
          INSERT INTO service_metadata (service_id, meta_key, meta_value)
          VALUES (?, ?, ?)
        `).bind(serviceId, key, metaValue).run();
      }
    }

    return new Response(JSON.stringify({
      success: true,
      id: serviceId,
      message: 'Service created successfully'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating service:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create service',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;

  try {
    const data = await request.json();
    const { id, slug, title, subtitle, description, orderIndex, visible, sections, metadata } = data;

    if (!id) {
      return new Response(JSON.stringify({
        error: 'Missing service ID'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update service
    await env.DB.prepare(`
      UPDATE services
      SET slug = ?, title = ?, subtitle = ?, description = ?, order_index = ?, visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      slug,
      title,
      subtitle,
      description,
      orderIndex || 0,
      visible ? 1 : 0,
      id
    ).run();

    // Delete existing sections and metadata
    await env.DB.prepare(`DELETE FROM service_sections WHERE service_id = ?`).bind(id).run();
    await env.DB.prepare(`DELETE FROM service_metadata WHERE service_id = ?`).bind(id).run();

    // Re-insert sections
    if (sections && Array.isArray(sections)) {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const content = Array.isArray(section.content) ?
          JSON.stringify(section.content) : section.content;
        const contentType = Array.isArray(section.content) ? 'list' : 'text';

        await env.DB.prepare(`
          INSERT INTO service_sections (service_id, heading, content, content_type, order_index)
          VALUES (?, ?, ?, ?, ?)
        `).bind(id, section.heading, content, contentType, i).run();
      }
    }

    // Re-insert metadata
    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        const metaValue = typeof value === 'string' ? value : JSON.stringify(value);
        await env.DB.prepare(`
          INSERT INTO service_metadata (service_id, meta_key, meta_value)
          VALUES (?, ?, ?)
        `).bind(id, key, metaValue).run();
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Service updated successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating service:', error);
    return new Response(JSON.stringify({
      error: 'Failed to update service',
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
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({
      error: 'Missing service ID'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Delete service (cascade will delete sections and metadata)
    await env.DB.prepare(`DELETE FROM services WHERE id = ?`).bind(id).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Service deleted successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting service:', error);
    return new Response(JSON.stringify({
      error: 'Failed to delete service',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
