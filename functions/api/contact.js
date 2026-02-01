// Cloudflare Pages Function to handle form submission to GoHighLevel

// Basic validation helpers
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  // Allow digits, spaces, dashes, parentheses, and + for international
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  return /^\d{10,15}$/.test(cleaned)
}

function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, maxLength)
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()

    // Validate required fields
    const errors = []

    if (!body.email || !isValidEmail(body.email)) {
      errors.push('Valid email is required')
    }

    if (!body.phone || !isValidPhone(body.phone)) {
      errors.push('Valid phone number is required')
    }

    if (!body.firstName || body.firstName.trim().length < 2) {
      errors.push('First name is required (minimum 2 characters)')
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Validation failed',
        errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeString(body.firstName, 100),
      lastName: sanitizeString(body.lastName, 100),
      email: sanitizeString(body.email, 254),
      phone: sanitizeString(body.phone, 20),
      Service: sanitizeString(body.service, 100) || 'Not specified',
      projectDetails: sanitizeString(body.message, 2000),
    }

    // Use environment variable for form ID, with fallback
    const formId = context.env.GHL_FORM_ID || 'O2BgIkUyRcytJ2XQaUrF'
    const ghlResponse = await fetch(`https://api.leadconnectorhq.com/widget/form/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    })

    // GHL returns 204 on success
    if (ghlResponse.ok || ghlResponse.status === 204) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Form submission failed' }), {
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
