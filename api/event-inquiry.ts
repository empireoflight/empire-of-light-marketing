import type { VercelRequest, VercelResponse } from '@vercel/node'

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'Empire of Light <notifications@app.empireoflightcollective.com>'
const TO_ADDRESS = 'kelly@empireoflightcollective.com'

const OFFERS: Record<string, string> = {
  cohort: 'Now What? Cohort',
  workshop: 'Hivemindset Vision Program',
}

const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'

type EmailListResult = 'added' | 'failed'

/**
 * Adds a person who ticked the "email list" checkbox to the Resend contact list.
 * Never throws: the form submission already succeeded by the time this runs, so a failure here is
 * logged and reported in Kelly's notification email instead of shown to the visitor.
 * Set RESEND_SEGMENT_ID to drop new contacts straight into a segment; without it they land in the global contact list.
 */
async function addToEmailList(apiKey: string, name: string, email: string): Promise<EmailListResult> {
  const [firstName, ...rest] = name.trim().split(/\s+/)
  const segmentId = process.env.RESEND_SEGMENT_ID
  try {
    const res = await fetch(RESEND_CONTACTS_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        first_name: firstName,
        last_name: rest.join(' ') || undefined,
        unsubscribed: false,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      }),
    })
    if (res.ok) return 'added'
    console.error(`Resend contacts API error (${res.status}): ${await res.text()}`)
    return 'failed'
  } catch (err) {
    console.error('Resend contacts API request failed', err)
    return 'failed'
  }
}

/** One line for the notification email so Kelly can see the choice even if the automatic add failed. */
function emailListLine(subscribe: boolean, result: EmailListResult | null): string {
  if (!subscribe) return '<p><strong>Email list:</strong> No</p>'
  if (result === 'added') return '<p><strong>Email list:</strong> Yes (added to your Resend contacts)</p>'
  return '<p><strong>Email list:</strong> Yes, but adding them to Resend failed. Please add them by hand.</p>'
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

  const { name, email, offer, event, source, page, message, subscribe, company } = (req.body ?? {}) as {
    name?: string
    email?: string
    offer?: string
    event?: string // which event page the visitor came from, e.g. "AI Week"; empty on the generic page
    source?: string // "program" when sent from a program page (Team Program / Now What? Cohort) rather than an event offer page
    page?: string // human-readable name of the program page, e.g. "Now What? Cohort page"
    message?: string
    subscribe?: boolean // opted in to the email list via the checkbox
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
  const isProgram = source === 'program'
  const pageLabel = typeof page === 'string' ? oneLine(page).slice(0, 80) : ''
  const wantsList = subscribe === true
  const listResult: EmailListResult | null = wantsList ? await addToEmailList(apiKey, name, email) : null
  const html = `
    ${
      isProgram
        ? `<p><strong>Interested in:</strong> ${escapeHtml(offerLabel)}</p>\n    <p><strong>Page:</strong> ${pageLabel ? escapeHtml(pageLabel) : '<em>(unknown)</em>'}</p>`
        : `<p><strong>Event:</strong> ${eventLabel ? escapeHtml(eventLabel) : '<em>(general event page)</em>'}</p>\n    <p><strong>Offer:</strong> ${escapeHtml(offerLabel)} (event offer, 20% off)</p>`
    }
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${emailListLine(wantsList, listResult)}
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
      subject: isProgram
        ? `Inquiry — ${offerLabel} — ${oneLine(name)}`
        : `Event offer inquiry — ${eventLabel ? `${eventLabel} — ` : ''}${offerLabel} — ${oneLine(name)}`,
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
