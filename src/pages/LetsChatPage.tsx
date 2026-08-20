import { useState } from 'react'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { DISPLAY, Eyebrow, primaryButton } from '../components/shared'

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

export default function LetsChatPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/lets-chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Something went wrong. Please try again.")
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Let's Chat | Empire of Light"
        description="Send a quick note and Kelly will get back to you."
        path="/lets-chat"
        noindex
      />
      <MarketingHeader />

      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[560px]">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="m-0 mb-4 text-[32px] leading-[1.1] font-light md:text-[42px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            Let&rsquo;s chat
          </h1>
          <p className="m-0 mb-9 text-[16px] leading-[1.6] md:text-[17px]" style={{ color: '#544D5A' }}>
            Send a quick note and I&rsquo;ll get back to you.
          </p>

          {status === 'success' ? (
            <div className="rounded-2xl border p-6" style={{ background: '#FFFFFF', borderColor: '#D8D2DC' }}>
              <p className="m-0 text-[16px] leading-[1.6]" style={{ color: '#131114' }}>
                Thanks — your message is on its way. I&rsquo;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label style={labelStyle} htmlFor="name">
                  Name
                </label>
                <input id="name" type="text" required style={inputStyle} value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="email">
                  Email
                </label>
                <input id="email" type="email" required style={inputStyle} value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="message">
                  Message
                </label>
                <textarea id="message" required rows={5} style={{ ...inputStyle, resize: 'vertical' }} value={form.message} onChange={set('message')} />
              </div>
              {/* Honeypot — hidden from real visitors, bots tend to fill every field they find. */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
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
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
