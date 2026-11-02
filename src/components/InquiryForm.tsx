import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { track } from '@vercel/analytics'
import { EmailListCheckbox } from './EmailListCheckbox'
import { DISPLAY, Eyebrow, primaryButton } from './shared'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid #D8D2DC',
  background: '#FFFFFF',
  padding: '12px 14px',
  fontSize: 15,
  fontFamily: "'Work Sans', system-ui, sans-serif",
  color: '#131114',
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontSize: 13,
  fontWeight: 600,
  color: '#544D5A',
}

interface InquiryFormProps {
  /** Which offer this page is about. Sent to /api/event-inquiry, which turns it into the offer name in the email. */
  offer: 'cohort' | 'workshop' | 'holiday'
  /** Human-readable page name that shows up in Kelly's notification email, e.g. "Now What? Cohort page". */
  page: string
  heading: string
  intro: string
  messageLabel: string
  /** Anchor id for the section, so buttons elsewhere on the page can scroll here. Defaults to "inquire". */
  id?: string
  submitLabel?: string
  successMessage?: string
}

/** Lead-capture form for the program pages: same fields and style as the event offer page, with the offer fixed by the page. */
export function InquiryForm({
  offer,
  page,
  heading,
  intro,
  messageLabel,
  id = 'inquire',
  submitLabel = 'Send inquiry',
  successMessage = 'Thanks — your note is on its way. I’ll be in touch soon with details.',
}: InquiryFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [subscribe, setSubscribe] = useState(true)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const set = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/event-inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, offer, subscribe, source: 'program', page }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }
      track('program_inquiry', { offer, page })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id={id} className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4', scrollMarginTop: 60 }}>
      <div className="mx-auto max-w-[640px]">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="m-0 mb-4 text-[30px] leading-[1.1] font-light md:text-[40px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
          {heading}
        </h2>
        <p className="m-0 mb-9 text-[16px] leading-[1.6] md:text-[17px]" style={{ color: '#544D5A' }}>
          {intro}
        </p>

        {status === 'success' ? (
          <div className="rounded-2xl border p-6" style={{ background: '#FFFFFF', borderColor: '#D8D2DC' }}>
            <p className="m-0 text-[16px] leading-[1.6]" style={{ color: '#131114' }}>
              {successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={labelStyle} htmlFor={`inquiry-name-${offer}`}>
                Name
              </label>
              <input id={`inquiry-name-${offer}`} type="text" required style={inputStyle} value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`inquiry-email-${offer}`}>
                Email
              </label>
              <input id={`inquiry-email-${offer}`} type="email" required style={inputStyle} value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`inquiry-message-${offer}`}>
                {messageLabel}
              </label>
              <textarea
                id={`inquiry-message-${offer}`}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                value={form.message}
                onChange={set('message')}
              />
            </div>
            <EmailListCheckbox id={`inquiry-subscribe-${offer}`} checked={subscribe} onChange={setSubscribe} />
            {/* Honeypot — hidden from real visitors, bots tend to fill every field they find. */}
            <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor={`inquiry-company-${offer}`}>Company</label>
              <input id={`inquiry-company-${offer}`} type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
            </div>

            {status === 'error' && (
              <div className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: '#E86FD0', color: '#A0409B' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold disabled:opacity-60"
              style={primaryButton()}
            >
              {status === 'submitting' ? 'Sending…' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
