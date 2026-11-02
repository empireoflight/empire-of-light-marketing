const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'

export type EmailListResult = 'added' | 'failed'

/**
 * Adds a person who ticked the "email list" checkbox to the Resend contact list.
 * Never throws: the form submission already succeeded by the time this runs, so a failure here is
 * logged and reported in Kelly's notification email instead of shown to the visitor.
 * Set RESEND_SEGMENT_ID to drop new contacts straight into a segment; without it they land in the global contact list.
 */
export async function addToEmailList(apiKey: string, name: string, email: string): Promise<EmailListResult> {
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
export function emailListLine(subscribe: boolean, result: EmailListResult | null): string {
  if (!subscribe) return '<p><strong>Email list:</strong> No</p>'
  if (result === 'added') return '<p><strong>Email list:</strong> Yes (added to your Resend contacts)</p>'
  return '<p><strong>Email list:</strong> Yes, but adding them to Resend failed. Please add them by hand.</p>'
}
