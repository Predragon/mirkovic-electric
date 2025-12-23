import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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

    const responseText = await ghlResponse.text()
    console.log('GHL Response:', { status: ghlResponse.status, statusText: ghlResponse.statusText, body: responseText })

    // GHL returns 200 even on success - just check if response was received
    if (ghlResponse.ok || ghlResponse.status === 200) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json(
        { success: false, error: `GHL API returned ${ghlResponse.status}` },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('API contact error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
