import type { VercelRequest, VercelResponse } from '@vercel/node'

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'Empire of Light <notifications@app.empireoflightcollective.com>'
const TO_ADDRESS = 'kelly@empireoflightcollective.com'

const OFFERS: Record<string, string> = {
  cohort: 'Group Unmasking Cohort',
  workshop: 'Hivemindset Vision Program',
}

function escapeHtml(str: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return str.replace(/[&<>"']/g, (c) => map[c])
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, offer, event, message, company } = (req.body ?? {}) as {
    name?: string
    email?: string
    offer?: string
    event?: string // which event page the visitor came from, e.g. "AI Week"; empty on the generic page
    message?: string
    company?: string // honeypot — hidden from real visitors via CSS; bots tend to fill every field
  }

  if (company) {
    // Silently accept so the bot doesn't learn its submission was rejected.
    res.status(200).json({ ok: true })
    return
  }

  if (!name?.trim() || !email?.trim()) {
    res.status(400).json({ error: 'Name and email are required.' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' })
    return
  }
  if (!offer || !(offer in OFFERS)) {
    res.status(400).json({ error: 'Please choose which offer you’re interested in.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in this Vercel project')
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
    return
  }

  const offerLabel = OFFERS[offer]
  const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()
  const eventLabel = typeof event === 'string' ? oneLine(event).slice(0, 80) : ''
  const html = `
    <p><strong>Event:</strong> ${eventLabel ? escapeHtml(eventLabel) : '<em>(general event page)</em>'}</p>
    <p><strong>Offer:</strong> ${escapeHtml(offerLabel)} (event offer, 20% off)</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${message?.trim() ? escapeHtml(message).replace(/\n/g, '<br>') : '<em>(none)</em>'}</p>
  `.trim()

  const resendRes = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      reply_to: email,
      subject: `Event offer inquiry — ${eventLabel ? `${eventLabel} — ` : ''}${offerLabel} — ${oneLine(name)}`,
      html,
    }),
  })

  if (!resendRes.ok) {
    const body = await resendRes.text()
    console.error(`Resend API error (${resendRes.status}): ${body}`)
    res.status(502).json({ error: 'Something went wrong sending your message. Please try again later.' })
    return
  }

  res.status(200).json({ ok: true })
}
