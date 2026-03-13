import { NextResponse } from 'next/server'

interface ContactImage {
  name: string
  base64: string
}

interface ContactBody {
  name: string
  phone?: string
  email?: string
  description: string
  images?: ContactImage[]
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json()

    // Basic validation
    if (!body.name?.trim() || !body.description?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: Send email via Resend once API key is configured
    // For now, log the submission
    console.log('Contact form submission:', {
      name: body.name,
      phone: body.phone,
      email: body.email,
      description: body.description,
      imageCount: body.images?.length ?? 0,
    })

    // Uncomment once RESEND_API_KEY is set in .env.local:
    //
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // const attachments = (body.images ?? []).map((img) => ({
    //   filename: img.name,
    //   content: img.base64.split(',')[1],
    // }))
    //
    // await resend.emails.send({
    //   from: 'Traust smíði <onboarding@resend.dev>',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Ný fyrirspurn frá ${body.name}`,
    //   html: `
    //     <h2>Ný fyrirspurn</h2>
    //     <p><strong>Nafn:</strong> ${body.name}</p>
    //     <p><strong>Sími:</strong> ${body.phone || '—'}</p>
    //     <p><strong>Netfang:</strong> ${body.email || '—'}</p>
    //     <p><strong>Lýsing:</strong></p>
    //     <p>${body.description}</p>
    //   `,
    //   attachments,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
