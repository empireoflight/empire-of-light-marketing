import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { DISPLAY, Eyebrow, primaryButton, secondaryButtonOnDark } from '../components/shared'

type OfferId = 'cohort' | 'workshop'
type Status = 'idle' | 'submitting' | 'success' | 'error'

// One page, one URL per event: /event/<slug>. To add an event, add a line here.
// Any other slug (and plain /event) shows the generic "event attendees" version.
const EVENTS: Record<string, string> = {
  'ai-week': 'AI Week',
  'the-commwell': 'The Commwell',
}

// Per-event price overrides, keyed by event slug. Events not listed here use the prices in OFFERS.
const PRICE_OVERRIDES: Record<string, Partial<Record<OfferId, { regular: string; sale: string }>>> = {
  'ai-week': { workshop: { regular: '$5,000', sale: '$4,000' } },
}

const OFFERS: {
  id: OfferId
  audience: string
  title: string
  lead: string
  body: string[]
  includesLabel: string
  includes: string[]
  closing?: string
  regular: string
  sale: string
  unit: string
}[] = [
  {
    id: 'cohort',
    audience: 'For individuals',
    title: 'Group Unmasking Cohort',
    lead: 'You know this life ain’t it. But you’re not quite sure what comes next.',
    body: [
      'Maybe you discovered later in life that you’re neurodivergent. Maybe your marriage ended. Maybe something happened that made you realize the life you’ve been living doesn’t feel like yours anymore.',
      'Whatever brought you here, you know something needs to change. But figuring out who you are, what you actually want, and how to get there can feel overwhelming when everything you’ve known is being called into question.',
      'That’s where the Empire of Light Unmasking Cohort comes in.',
      'Together, we’ll explore our visions for what’s next, experiment with ways to start living into those visions now, navigate the friction that comes with trying something new, and evolve our visions as we learn about ourselves and each other.',
      'You don’t have to figure it all out before you begin. We’ll create space to explore, try things, get curious about what comes up, and discover new possibilities together.',
      'If you’re ready to stop trying to make a life that doesn’t fit work, and start discovering what does, this group is for you.',
    ],
    includesLabel: 'What’s included',
    includes: [
      'A six-week group experience kicking off in January',
      'Guided vision-setting and individual reflection',
      'Experiments to help you bring your vision into everyday life',
      'Space to explore the friction, patterns, and discoveries that emerge',
      'A community of people navigating their own next chapters',
    ],
    regular: '$495',
    sale: '$396',
    unit: 'per person',
  },
  {
    id: 'workshop',
    audience: 'For teams',
    title: 'Hivemindset Vision Program',
    lead: 'Most teams struggle because they never got on the same page in the first place.',
    body: [
      'Whether you’re starting a new project or looking to reenergize an existing team, our vision-setting process helps your team get aligned on what you’re building and why it matters.',
      'Reflect individually with our innovative framework, come together for a facilitated vision session, and move forward with a shared vision and commitment to action.',
    ],
    includesLabel: 'Includes',
    includes: [
      'A kickoff session to prepare your team',
      'Individual reflection using the Empire of Light framework',
      'A facilitated vision-setting workshop',
      'A follow-up vision commitment session to turn your shared vision into action',
      'Access to the Empire of Light app',
    ],
    closing: 'Walk away with a shared vision, clearer priorities, and a team ready to move forward together.',
    regular: '$3,500',
    sale: '$2,800',
    unit: 'for teams of up to 10 people',
  },
]

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

export default function EventOfferPage() {
  const { slug } = useParams()
  const eventName = slug ? EVENTS[slug] : undefined
  const attendees = eventName ? `${eventName} attendees` : 'event attendees'
  const offers = OFFERS.map((o) => ({ ...o, ...(slug ? PRICE_OVERRIDES[slug]?.[o.id] : undefined) }))
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [offer, setOffer] = useState<OfferId | ''>('')
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
        body: JSON.stringify({ ...form, offer, event: eventName ?? '' }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }
      track('event_offer_inquiry', { offer, event: eventName ?? 'generic' })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Event Offer: 20% Off | Empire of Light"
        description={`A special offer for ${attendees}: 20% off a Group Unmasking Cohort or a Hivemindset Vision Program.`}
        path={slug ? `/event/${slug}` : '/event'}
        noindex
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[104px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.5,
          }}
        />
        <div className="relative mx-auto max-w-[840px] text-center">
          <div className="mb-6 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            Special event offer
          </div>
          <h1
            className="m-0 mb-6 text-[36px] leading-[1.1] font-light md:text-[54px] md:leading-[1.06]"
            style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}
          >
            20% off for {attendees}
          </h1>
          <p className="mx-auto mb-9 max-w-[620px] text-[17px] leading-[1.55] md:text-[19px]" style={{ color: 'rgba(251,247,242,.78)' }}>
            Choose a Group Unmasking Cohort for yourself or a Hivemindset Vision Program for your team. Both include access to the
            Empire of Light app and methodology.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a href="#offers" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}>
              See the offers
            </a>
            <a href="#inquire" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Send an inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="px-6 py-16 md:px-8 md:py-24" style={{ scrollMarginTop: 60 }}>
        <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
          {offers.map((o) => (
            <div
              key={o.id}
              className="grid gap-10 rounded-[20px] border p-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-14 md:p-12"
              style={{ background: '#FFFFFF', borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}
            >
              <div>
                <Eyebrow>{o.audience}</Eyebrow>
                <h2
                  className="m-0 mb-6 text-[28px] leading-[1.12] font-light md:text-[38px] md:leading-[1.08]"
                  style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}
                >
                  {o.title}
                </h2>
                <p className="m-0 mb-5 text-[19px] font-semibold leading-[1.4] md:text-[21px]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                  {o.lead}
                </p>
                {o.body.map((para) => (
                  <p key={para} className="m-0 mb-4 text-[16px] leading-[1.65] md:text-[17px]" style={{ color: '#544D5A' }}>
                    {para}
                  </p>
                ))}
                <div className="mt-8 mb-4 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#131114' }}>
                  {o.includesLabel}
                </div>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {o.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-2.5 h-[7px] w-[7px] flex-none rounded-full" style={{ background: '#D99A22' }} />
                      <span className="text-[16px] leading-[1.55]" style={{ color: '#131114' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {o.closing && (
                  <p className="m-0 mt-6 text-[16px] font-semibold leading-[1.6] md:text-[17px]" style={{ color: '#131114' }}>
                    {o.closing}
                  </p>
                )}
              </div>

              <div className="self-start rounded-2xl border p-7 text-center" style={{ background: '#FFF6E8', borderColor: '#F0DDB8' }}>
                <div
                  className="mb-5 inline-block rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]"
                  style={{ ...DISPLAY, background: '#131114', color: '#FEE16A' }}
                >
                  20% off
                </div>
                <div className="text-[20px] leading-none line-through" style={{ color: '#8C8492' }}>
                  {o.regular}
                </div>
                <div className="mt-2 text-[56px] leading-none font-light" style={{ ...DISPLAY, color: '#131114' }}>
                  {o.sale}
                </div>
                <div className="mt-3 text-[15px]" style={{ color: '#544D5A' }}>
                  {o.unit}
                </div>
                <p className="m-0 mt-6 border-t pt-5 text-[14px] leading-[1.55]" style={{ borderColor: '#F0DDB8', color: '#544D5A' }}>
                  Includes access to the Empire of Light app and methodology.
                </p>
                <a
                  href="#inquire"
                  onClick={() => setOffer(o.id)}
                  className="mt-6 block rounded-lg px-6 py-4 text-[15px] font-semibold"
                  style={primaryButton()}
                >
                  Choose this offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquire" className="px-6 pb-16 md:px-8 md:pb-24" style={{ scrollMarginTop: 60 }}>
        <div className="mx-auto max-w-[640px]">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="m-0 mb-4 text-[30px] leading-[1.1] font-light md:text-[40px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            Interested? Send me a note
          </h2>
          <p className="m-0 mb-9 text-[16px] leading-[1.6] md:text-[17px]" style={{ color: '#544D5A' }}>
            Choose the offer you’d like and I’ll reach out with more details.
          </p>

          {status === 'success' ? (
            <div className="rounded-2xl border p-6" style={{ background: '#FFFFFF', borderColor: '#D8D2DC' }}>
              <p className="m-0 text-[16px] leading-[1.6]" style={{ color: '#131114' }}>
                Thanks — your note is on its way. I’ll be in touch soon with details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 p-0" style={{ fontSize: 13, fontWeight: 600, color: '#544D5A' }}>
                  Which offer are you interested in?
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {offers.map((o) => {
                    const selected = offer === o.id
                    return (
                      <label
                        key={o.id}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border p-4"
                        style={{ borderColor: selected ? '#D99A22' : '#D8D2DC', background: selected ? '#FFF6E8' : '#FFFFFF' }}
                      >
                        <input
                          type="radio"
                          name="offer"
                          value={o.id}
                          checked={selected}
                          onChange={() => setOffer(o.id)}
                          required
                          style={{ accentColor: '#D99A22', marginTop: 4 }}
                        />
                        <span>
                          <span className="block text-[15px] font-semibold leading-[1.3]" style={{ color: '#131114' }}>
                            {o.title}
                          </span>
                          <span className="mt-1 block text-[13px]" style={{ color: '#544D5A' }}>
                            <span className="line-through" style={{ color: '#8C8492' }}>
                              {o.regular}
                            </span>{' '}
                            {o.sale} {o.unit}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
              <div>
                <label style={labelStyle} htmlFor="event-name">
                  Name
                </label>
                <input id="event-name" type="text" required style={inputStyle} value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="event-email">
                  Email
                </label>
                <input id="event-email" type="email" required style={inputStyle} value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="event-message">
                  Anything you’d like me to know? (optional)
                </label>
                <textarea id="event-message" rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.message} onChange={set('message')} />
              </div>
              {/* Honeypot — hidden from real visitors, bots tend to fill every field they find. */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="event-company">Company</label>
                <input id="event-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
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
                {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
