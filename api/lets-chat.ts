import type { VercelRequest, VercelResponse } from '@vercel/node'
import { addToEmailList, emailListLine } from './_email-list.js'
import type { EmailListResult } from './_email-list.js'

// Same pattern as the product app's supabase/functions/_shared/email/resend.ts —
// reads RESEND_API_KEY server-side, sends via Resend's REST API directly (no SDK).
const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'Empire of Light <notifications@app.empireoflightcollective.com>'
const TO_ADDRESS = 'kelly@empireoflightcollective.com'

function escapeHtml(str: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return str.replace(/[&<>"']/g, (c) => map[c])
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, message, subscribe, company } = (req.body ?? {}) as {
    name?: string
    email?: string
    message?: string
    subscribe?: boolean // opted in to the email list via the checkbox
    company?: string // honeypot — hidden from real visitors via CSS; bots tend to fill every field
  }

  if (company) {
    // Silently accept so the bot doesn't learn its submission was rejected.
    res.status(200).json({ ok: true })
    return
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in this Vercel project')
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
    return
  }

  const wantsList = subscribe === true
  const listResult: EmailListResult | null = wantsList ? await addToEmailList(apiKey, name, email) : null
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${emailListLine(wantsList, listResult)}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `.trim()

  const resendRes = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      reply_to: email,
      subject: `Let's chat — ${name}`,
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
