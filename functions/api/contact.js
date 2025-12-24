// Cloudflare Pages Function to handle form submission to GoHighLevel
export async function onRequestPost(context) {
  try {
    const body = await context.request.json()

    const ghlResponse = await fetch('https://api.leadconnectorhq.com/widget/form/O2BgIkUyRcytJ2XQaUrF', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: body.firstName || 'Unknown',
        lastName: body.lastName || '',
        email: body.email,
        phone: body.phone,
        Service: body.service || 'Not specified',
        projectDetails: body.message || '',
      }),
    })

    // GHL returns 204 on success
    if (ghlResponse.ok || ghlResponse.status === 204) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response(JSON.stringify({ success: false, error: `GHL returned ${ghlResponse.status}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to submit form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
