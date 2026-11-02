import type { VercelRequest, VercelResponse } from '@vercel/node'

// Holiday lights game. Three actions share this endpoint:
//   play   - the email gate. Saves the player to the Resend contact list (subscribed only if they left the box ticked).
//   claim  - a player picked a sticker offer and sent a shipping address. Emails Kelly the details. There's no limit on
//            claims: Kelly checks that people really sign up before mailing anything.
//   refer  - a player introduces a friend: one email to the friend, with the player and Kelly copied.
// Self-contained on purpose: Vercel's build can't resolve imports between files in api/.
const RESEND_EMAILS_URL = 'https://api.resend.com/emails'
const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'
const FROM_ADDRESS = 'Empire of Light <notifications@app.empireoflightcollective.com>'
const TO_ADDRESS = 'kelly@empireoflightcollective.com'
const SITE = 'https://www.empireoflightcollective.com'

// The game ends at the end of December 31 (Pacific). Keep in sync with GAME_ENDS in src/pages/HolidayGamePage.tsx.
const GAME_ENDS = Date.parse('2026-12-31T23:59:59-08:00')

const OFFERS: Record<string, string> = {
  cohort: 'Now What? Cohort: 20% off + free sticker',
  team: 'Team Hivemindset Vision Program: 30% off + free sticker',
}

const STICKERS: Record<string, string> = {
  'empowered-duck': 'Empowered Duck',
  'iguana-dragon': 'Iguana/Dragon',
  'new-heights-bird': 'New Heights Bird',
}

// What a referred friend is told about each offer, and where it lives on the site.
const REFERRAL_OFFERS: Record<string, { label: string; blurb: string; path: string }> = {
  holiday: {
    label: 'the free Holiday Edition of Empire of Light',
    blurb: 'A free, small-group experience for reimagining what the holidays are like and making some of those ideas come true this year.',
    path: '/holiday',
  },
  cohort: {
    label: 'the Now What? Cohort',
    blurb: 'A six-week group for anyone in the middle of a life shift who wants to figure out what’s next.',
    path: '/now-what-cohort',
  },
  team: {
    label: 'the Hivemindset Vision Program',
    blurb: 'For teams losing momentum or heading in a new direction who want to blast off together in the new year.',
    path: '/teams',
  },
  unsure: {
    label: 'Empire of Light',
    blurb: 'A heart-centered operating system that helps people and teams bring more ambitious visions to life faster, with more unity.',
    path: '/',
  },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return str.replace(/[&<>"']/g, (c) => map[c])
}

const clean = (value: unknown, max = 200) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '')

function splitName(name: string) {
  const [first, ...rest] = name.split(' ')
  return { first_name: first || undefined, last_name: rest.join(' ') || undefined }
}

/** Saves the player as a Resend contact. Never throws; a failure is logged and the game carries on. */
async function saveContact(apiKey: string, email: string, name: string, subscribed: boolean): Promise<boolean> {
  const segmentId = process.env.RESEND_SEGMENT_ID
  try {
    const res = await fetch(RESEND_CONTACTS_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        ...splitName(name),
        unsubscribed: !subscribed,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      }),
    })
    if (res.ok) return true
    // An existing contact is expected here (they entered their email at the gate), so this isn't always a real problem.
    console.error(`Resend contacts API (create) ${res.status}: ${await res.text()}`)
    return false
  } catch (err) {
    console.error('Resend contacts API request failed', err)
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = (req.body ?? {}) as Record<string, unknown>

  if (body.company) {
    // Honeypot: silently accept so a bot doesn't learn its submission was rejected.
    res.status(200).json({ ok: true })
    return
  }

  if (Date.now() > GAME_ENDS) {
    res.status(410).json({ error: 'The holiday game has ended. Thanks for playing!' })
    return
  }

  const action = body.action
  const email = clean(body.email, 254).toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in this Vercel project')
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
    return
  }

  const subscribe = body.subscribe === true
  const headers = { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' }

  if (action === 'play') {
    await saveContact(apiKey, email, '', subscribe)
    res.status(200).json({ ok: true })
    return
  }

  if (action === 'claim') {
    const name = clean(body.name, 120)
    const offer = clean(body.offer, 20)
    const sticker = clean(body.sticker, 40)
    const address = (body.address ?? {}) as Record<string, unknown>
    const line1 = clean(address.line1)
    const line2 = clean(address.line2)
    const city = clean(address.city, 100)
    const region = clean(address.region, 100)
    const postal = clean(address.postal, 20)
    const country = clean(address.country, 100)

    if (!name) {
      res.status(400).json({ error: 'Please add your name.' })
      return
    }
    if (!(offer in OFFERS)) {
      res.status(400).json({ error: 'Please choose an offer.' })
      return
    }
    if (!(sticker in STICKERS)) {
      res.status(400).json({ error: 'Please choose a sticker.' })
      return
    }
    if (!line1 || !city || !postal || !country) {
      res.status(400).json({ error: 'Please fill in your street address, city, postal code, and country so I can mail your sticker.' })
      return
    }

    const addressHtml = [line1, line2, [city, region, postal].filter(Boolean).join(', '), country]
      .filter(Boolean)
      .map(escapeHtml)
      .join('<br>')
    const html = `
      <p><strong>Offer:</strong> ${escapeHtml(OFFERS[offer])}</p>
      <p><strong>Sticker:</strong> ${escapeHtml(STICKERS[sticker])}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Email list:</strong> ${subscribe ? 'Yes (subscribed)' : 'No (saved as unsubscribed)'}</p>
      <p><strong>Mail the sticker to:</strong></p>
      <p>${addressHtml}</p>
    `.trim()

    const resendRes = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        reply_to: email,
        subject: `Holiday game claim — ${OFFERS[offer].split(':')[0]} — ${name}`,
        html,
      }),
    })

    if (!resendRes.ok) {
      console.error(`Resend API error (${resendRes.status}): ${await resendRes.text()}`)
      res.status(502).json({ error: 'Something went wrong sending your details. Please try again later.' })
      return
    }

    // After the email is out: save the name they gave on their contact. Best effort.
    await saveContact(apiKey, email, name, subscribe)

    res.status(200).json({ ok: true })
    return
  }

  if (action === 'refer') {
    const name = clean(body.name, 120)
    const friendEmail = clean(body.friendEmail, 254).toLowerCase()
    const friendOffer = clean(body.friendOffer, 20)
    const note = typeof body.note === 'string' ? body.note.replace(/\r\n/g, '\n').trim().slice(0, 700) : ''

    if (!name) {
      res.status(400).json({ error: 'Please add your name.' })
      return
    }
    if (!friendEmail || !EMAIL_PATTERN.test(friendEmail)) {
      res.status(400).json({ error: 'Please enter a valid email address for your friend.' })
      return
    }
    if (friendEmail === email) {
      res.status(400).json({ error: 'That’s your own email address. Add your friend’s instead.' })
      return
    }
    if (!(friendOffer in REFERRAL_OFFERS)) {
      res.status(400).json({ error: 'Please choose which offer you think would resonate.' })
      return
    }
    if (!note) {
      res.status(400).json({ error: 'Please add a short intro note for your friend.' })
      return
    }
    // The note goes out under our name, so keep it to plain words. This also stops the form being used to send links.
    if (/https?:|www\.|\.(com|net|org|io|co)\b/i.test(note)) {
      res.status(400).json({ error: 'Please leave links out of the note. I’ll include the right one.' })
      return
    }

    const offerInfo = REFERRAL_OFFERS[friendOffer]
    const link = `${SITE}${offerInfo.path}`
    const html = `
      <p>Hi,</p>
      <p><strong>${escapeHtml(name)}</strong> wanted to introduce you to Empire of Light, and thought ${escapeHtml(offerInfo.label)} might be a good fit for you.</p>
      <blockquote style="margin:16px 0;padding:8px 16px;border-left:3px solid #D99A22;color:#444">${escapeHtml(note).replace(/\n/g, '<br>')}<br><br>&mdash; ${escapeHtml(name)}</blockquote>
      <p>${escapeHtml(offerInfo.blurb)}</p>
      <p><a href="${link}">${link}</a></p>
      <p>I’m Kelly, the founder of Empire of Light. ${escapeHtml(name)} and I are both copied here, so just reply to this email if you’d like to chat or have any questions.</p>
      <p style="color:#777;font-size:13px">You’re getting this one-time note because ${escapeHtml(name)} (${escapeHtml(email)}) entered your address in our holiday game. We haven’t added you to any list.</p>
    `.trim()

    const resendRes = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: friendEmail,
        cc: [email, TO_ADDRESS],
        reply_to: [email, TO_ADDRESS],
        subject: `${name} thought you’d like Empire of Light`,
        html,
      }),
    })

    if (!resendRes.ok) {
      console.error(`Resend API error (${resendRes.status}): ${await resendRes.text()}`)
      res.status(502).json({ error: 'Something went wrong sending your introduction. Please try again later.' })
      return
    }

    res.status(200).json({ ok: true })
    return
  }

  res.status(400).json({ error: 'Unknown action.' })
}
