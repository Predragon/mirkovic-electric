import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch('https://api.leadconnectorhq.com/widget/form/O2BgIkUyRcytJ2XQaUrF', {
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

    const text = await response.text()
    console.log('GHL Response:', { status: response.status, body: text })

    // Accept any response from GHL as success
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('API contact error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
