/**
 * Public API endpoint for fetching site settings from D1
 *
 * GET /api/public/settings - Get all site settings grouped by category
 * GET /api/public/settings?key=phone - Get specific setting by key
 */

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  try {
    if (key) {
      // Fetch specific setting by key
      const setting = await env.DB.prepare(`
        SELECT key, value, category FROM site_settings WHERE key = ?
      `).bind(key).first();

      if (!setting) {
        return new Response(JSON.stringify({ error: 'Setting not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        key: setting.key,
        value: setting.value,
        category: setting.category
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });

    } else {
      // Fetch all settings grouped by category
      const settingsResult = await env.DB.prepare(`
        SELECT key, value, category FROM site_settings ORDER BY category, key
      `).all();

      // Group by category
      const grouped = {};
      settingsResult.results.forEach(setting => {
        if (!grouped[setting.category]) {
          grouped[setting.category] = {};
        }
        grouped[setting.category][setting.key] = setting.value;
      });

      return new Response(JSON.stringify(grouped), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });
    }

  } catch (error) {
    console.error('Error fetching settings:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch settings',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
