/**
 * Admin authentication middleware for Cloudflare Functions
 *
 * Checks for Authorization: Bearer <password> header
 * Compares with env.ADMIN_PASSWORD
 * Returns 401 Unauthorized if invalid
 */

// Allowed origins for admin endpoints
const ALLOWED_ORIGINS = [
  'https://admin.mirkovicelectric.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

function getCorsOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }
  return ALLOWED_ORIGINS[0]; // Default to admin subdomain
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const corsOrigin = getCorsOrigin(request);

  // Allow OPTIONS requests for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  }

  // Check for Authorization header
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({
      error: 'Unauthorized',
      message: 'Missing Authorization header'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin
      }
    });
  }

  // Extract token from "Bearer <token>" format
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return new Response(JSON.stringify({
      error: 'Unauthorized',
      message: 'Invalid Authorization format. Expected: Bearer <token>'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin
      }
    });
  }

  // Compare with admin password
  const adminPassword = env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new Response(JSON.stringify({
      error: 'Server configuration error',
      message: 'ADMIN_PASSWORD not set'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin
      }
    });
  }

  if (token !== adminPassword) {
    return new Response(JSON.stringify({
      error: 'Unauthorized',
      message: 'Invalid credentials'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin
      }
    });
  }

  // Authentication successful, proceed to the next handler
  const response = await next();

  // Add CORS headers to the response
  response.headers.set('Access-Control-Allow-Origin', corsOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}
