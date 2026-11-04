import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import empoweredDuck from '../assets/stickers/empowered-duck.png'
import iguanaDragon from '../assets/stickers/iguana-dragon.png'
import newHeightsBird from '../assets/stickers/new-heights-bird.png'
import { EmailListCheckbox } from '../components/EmailListCheckbox'
import { MarketingFooter } from '../components/MarketingFooter'
import { MarketingHeader } from '../components/MarketingHeader'
import { Seo } from '../components/Seo'
import { DISPLAY, primaryButton } from '../components/shared'

type Phase = 'gate' | 'cycling' | 'ready'
type OfferId = 'holiday' | 'cohort' | 'team' | 'referral'
type ClaimStatus = 'idle' | 'submitting' | 'success' | 'error'

interface Offer {
  id: OfferId
  title: string
  body: string
  /** Shown as a small tag on the offer card. */
  perk?: string
  price?: string
  /** Fine print under the offer: when the sticker or art is mailed. */
  note?: string
  color: string
  /** Offers with a sticker open the claim form. */
  sticker?: boolean
  /** The referral offer opens the "introduce a friend" form. */
  referral?: boolean
  /** Where the secondary link goes (or the main button, for offers with neither form). */
  cta: { label: string; to: string }
}

const OFFERS: Offer[] = [
  {
    id: 'holiday',
    title: 'Free Holiday Edition of Empire of Light',
    body: 'Great if you want to reimagine what your holidays are like and make some of your ideas come true this year.',
    perk: 'Free',
    color: '#5BE37B',
    cta: { label: 'Join the Holiday Edition', to: '/holiday#signup' },
  },
  {
    id: 'cohort',
    title: '20% off the January Now What? Cohort',
    body: 'Great if you’re experiencing some kind of quantum crumble or life shift and you want to figure out what’s next.',
    perk: 'Free sticker with sign-up',
    price: '$495 → $396 per person',
    note: 'Your sticker is mailed once you sign up and pay for the program.',
    color: '#4FD1D9',
    sticker: true,
    cta: { label: 'See the cohort', to: '/now-what-cohort' },
  },
  {
    id: 'team',
    title: '30% off the Team Hivemindset Vision Program',
    body: 'Great if your team is losing momentum or going in a new direction, and you really want them to blast off in the new year. Think of this as your insurance policy, but with heart.',
    perk: 'Free sticker with sign-up',
    price: '$5,000 → $3,500 per team',
    note: 'Your sticker is mailed once your team signs up and pays for the program.',
    color: '#FFB347',
    sticker: true,
    cta: { label: 'See the program', to: '/teams' },
  },
  {
    id: 'referral',
    title: 'Free art when you refer a friend or team',
    body: 'Refer a friend or team to any program, and when they sign up and pay, I’ll mail you a sticker and a print of your choice.',
    perk: 'Sticker + print',
    note: 'Your sticker and print are mailed once your friend or team signs up and pays for a program.',
    color: '#FF7AC8',
    referral: true,
    cta: { label: 'See the programs', to: '/teams' },
  },
]

const STICKERS = [
  { id: 'empowered-duck', label: 'Empowered Duck', src: empoweredDuck },
  { id: 'iguana-dragon', label: 'Iguana/Dragon', src: iguanaDragon },
  { id: 'new-heights-bird', label: 'New Heights Bird', src: newHeightsBird },
]

// The game ends at the end of December 31 (Pacific). Keep in sync with GAME_ENDS in api/holiday-game.ts.
const GAME_ENDS = Date.parse('2026-12-31T23:59:59-08:00')

const REFERRAL_CHOICES = [
  { id: 'holiday', label: 'Free Holiday Edition' },
  { id: 'cohort', label: 'Now What? Cohort' },
  { id: 'team', label: 'Team Hivemindset Vision Program' },
  { id: 'unsure', label: 'Not sure. You pick!' },
]

// Peg colors lifted from the lite brite board: orange, amber, green, warm white, teal.
const ORANGE = '#FF8A3D'
const AMBER = '#FFC857'
const GREEN = '#5BE37B'
const WHITE = '#FFF3C4'
const TEAL = '#4FD1D9'

// Scattered, not gridded, like the real board. Coordinates are in the 500x320 viewBox below.
const PEGS: { x: number; y: number; color: string }[] = [
  { x: 335, y: 140, color: GREEN },
  { x: 172, y: 165, color: ORANGE },
  { x: 107, y: 187, color: ORANGE },
  { x: 222, y: 197, color: ORANGE },
  { x: 280, y: 189, color: WHITE },
  { x: 63, y: 233, color: WHITE },
  { x: 87, y: 238, color: GREEN },
  { x: 114, y: 238, color: AMBER },
  { x: 153, y: 241, color: ORANGE },
  { x: 189, y: 227, color: ORANGE },
  { x: 217, y: 250, color: TEAL },
  { x: 251, y: 231, color: ORANGE },
  { x: 286, y: 251, color: ORANGE },
  { x: 309, y: 227, color: AMBER },
  { x: 333, y: 255, color: ORANGE },
  { x: 361, y: 220, color: ORANGE },
  { x: 389, y: 255, color: ORANGE },
  { x: 449, y: 255, color: GREEN },
  { x: 117, y: 284, color: WHITE },
  { x: 360, y: 160, color: ORANGE },
  { x: 240, y: 140, color: WHITE },
  { x: 150, y: 195, color: TEAL },
  { x: 420, y: 200, color: AMBER },
  { x: 60, y: 190, color: ORANGE },
  { x: 300, y: 110, color: ORANGE },
  { x: 425, y: 140, color: WHITE },
]

// Each peg is a short acrylic cylinder seen a little off-axis: a pale flat cap in front of a deeper-colored body that trails off at
// its own angle (mostly downward), like the pegs on the real board. Deterministic, so the board looks the same on every visit.
const pegNoise = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}
const PEG_TILT = PEGS.map((_, i) => {
  const angle = ((35 + pegNoise(i, 1) * 110) * Math.PI) / 180
  const length = 3 + pegNoise(i, 2) * 3.4
  return { dx: Math.cos(angle) * length, dy: Math.sin(angle) * length }
})

/** The four offer pegs come from four different color families, so each offer has its own recognizable peg. */
const OFFER_COLOR_GROUPS = [[GREEN], [TEAL], [ORANGE], [AMBER, WHITE]]
function pickOfferPegs(): number[] {
  const groups = pickRandom(OFFER_COLOR_GROUPS, OFFER_COLOR_GROUPS.length)
  return groups.map((colors) => pickRandom(PEGS.map((_, i) => i).filter((i) => colors.includes(PEGS[i].color)), 1)[0])
}

const CYCLE_MS = 6000
const TICK_MS = 320

const inputStyle: CSSProperties = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid rgba(251,247,242,.28)',
  background: 'rgba(251,247,242,.08)',
  padding: '12px 14px',
  fontSize: 15,
  fontFamily: "'Work Sans', system-ui, sans-serif",
  color: '#FBF7F2',
}

const labelStyle: CSSProperties = { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: 'rgba(251,247,242,.72)' }

function pickRandom<T>(items: T[], count: number): T[] {
  const pool = [...items]
  const out: T[] = []
  while (out.length < count && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  return out
}

async function post(body: Record<string, unknown>) {
  const res = await fetch('/api/holiday-game', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }
}

export default function HolidayGamePage() {
  const [phase, setPhase] = useState<Phase>('gate')
  const [email, setEmail] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [honeypot, setHoneypot] = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [gateError, setGateError] = useState('')
  const [lit, setLit] = useState<Set<number>>(new Set())
  // Which peg holds which offer. Re-rolled every round, so the board never plays the same way twice.
  const [offerPegs, setOfferPegs] = useState<number[]>([])
  const [selected, setSelected] = useState<OfferId | null>(null)
  const timers = useRef<number[]>([])

  const offerByPeg = useMemo(() => new Map(offerPegs.map((peg, i) => [peg, OFFERS[i]])), [offerPegs])

  useEffect(
    () => () => {
      timers.current.forEach((t) => {
        window.clearTimeout(t)
        window.clearInterval(t)
      })
    },
    [],
  )

  const startRound = () => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    setSelected(null)
    setOfferPegs(pickOfferPegs())
    if (reduceMotion) {
      setPhase('ready')
      return
    }
    setPhase('cycling')
    const tick = window.setInterval(() => {
      setLit(new Set(pickRandom(PEGS.map((_, i) => i), 4 + Math.floor(Math.random() * 4))))
    }, TICK_MS)
    const done = window.setTimeout(() => {
      window.clearInterval(tick)
      setLit(new Set())
      setPhase('ready')
    }, CYCLE_MS)
    timers.current.push(tick, done)
  }

  const handleGate = async (e: FormEvent) => {
    e.preventDefault()
    setGateStatus('submitting')
    setGateError('')
    try {
      await post({ action: 'play', email, subscribe, company: honeypot })
      track('holiday_game_play')
      setGateStatus('idle')
      startRound()
    } catch (err) {
      setGateStatus('error')
      setGateError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const select = (offer: Offer) => {
    if (selected !== offer.id) track('holiday_game_offer_view', { offer: offer.id })
    setSelected(offer.id)
  }

  const chosenOffer = OFFERS.find((o) => o.id === selected) ?? null
  const ended = Date.now() > GAME_ENDS
  // the card takes the color of the peg that opened it
  const accent = chosenOffer ? PEGS[offerPegs[OFFERS.findIndex((o) => o.id === chosenOffer.id)]]?.color ?? '#FEE16A' : '#FEE16A'

  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#0B0A12', color: '#FBF7F2', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo path="/holiday-game" />
      <MarketingHeader />

      <section className="px-6 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="m-0 mb-5 text-[36px] leading-[1.08] font-light md:text-[56px]" style={{ ...DISPLAY, letterSpacing: '.02em' }}>
            A little holiday magic awaits
          </h1>
          <p className="mx-auto mb-10 max-w-[560px] text-[17px] leading-[1.55] md:text-[19px]" style={{ color: 'rgba(251,247,242,.75)' }}>
            {ended
              ? 'The holiday game has ended. Thanks for playing!'
              : phase === 'gate'
              ? 'Enter your email to see what’s in store. Enjoy the lights, then tap or hover over a glowing peg to reveal your holiday surprise. Offers are good through December 31.'
              : phase === 'cycling'
                ? 'Enjoy the show...'
                : 'Tap or hover over a glowing peg to reveal your holiday surprise.'}
          </p>

          <Board phase={phase} lit={lit} offerByPeg={offerByPeg} selected={selected} onSelect={select} />

          {phase === 'gate' && !ended && (
            <form onSubmit={handleGate} className="mx-auto mt-10 flex max-w-[460px] flex-col gap-4 text-left">
              <div>
                <label style={labelStyle} htmlFor="game-email">
                  First, enter your email to play
                </label>
                <input
                  id="game-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <EmailListCheckbox id="game-subscribe" checked={subscribe} onChange={setSubscribe} tone="dark" />
              {/* Honeypot: hidden from real visitors, bots tend to fill every field they find. */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="game-company">Company</label>
                <input id="game-company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              {gateStatus === 'error' && (
                <div className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: '#FF7AC8', color: '#FFB3DD' }}>
                  {gateError}
                </div>
              )}
              <button
                type="submit"
                disabled={gateStatus === 'submitting'}
                className="rounded-lg px-8 py-4 text-[15px] font-semibold disabled:opacity-60"
                style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
              >
                {gateStatus === 'submitting' ? 'Warming up the lights…' : 'Let’s play'}
              </button>
            </form>
          )}

          {phase === 'ready' && (
            <div className="mx-auto mt-10 max-w-[680px] text-left">
              {chosenOffer ? (
                <OfferCard key={chosenOffer.id} offer={{ ...chosenOffer, color: accent }} email={email} subscribe={subscribe} />
              ) : (
                <p className="m-0 text-center text-[15px]" style={{ color: 'rgba(251,247,242,.55)' }}>
                  Four pegs are glowing. Find them.
                </p>
              )}
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={startRound}
                  className="rounded-lg border px-6 py-3 text-[14px] font-semibold"
                  style={{ ...DISPLAY, color: '#FBF7F2', borderColor: 'rgba(251,247,242,.32)', background: 'transparent' }}
                >
                  Shuffle the lights
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}

/** The painted board: a blob of blue-to-red with scattered pegs, glowing amber behind it, fairy lights along the bottom. */
function Board({
  phase,
  lit,
  offerByPeg,
  selected,
  onSelect,
}: {
  phase: Phase
  lit: Set<number>
  offerByPeg: Map<number, Offer>
  selected: OfferId | null
  onSelect: (offer: Offer) => void
}) {
  const blob = 'M6 300 C2 205 36 84 128 42 C178 20 228 24 266 31 C318 38 342 6 402 5 C466 4 494 108 494 300 Z'
  return (
    <svg
      viewBox="0 0 500 330"
      role="group"
      aria-label="Holiday lights board"
      className="mx-auto block w-full max-w-[640px] overflow-visible"
      style={{ filter: 'drop-shadow(0 0 34px rgba(255,160,60,.5))' }}
    >
      <defs>
        <clipPath id="board-clip">
          <path d={blob} />
        </clipPath>
        <radialGradient id="board-blue" cx="18%" cy="20%" r="55%">
          <stop offset="0%" stopColor="#2230A8" />
          <stop offset="100%" stopColor="#2230A8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="board-teal" cx="6%" cy="68%" r="38%">
          <stop offset="0%" stopColor="#1E7C86" />
          <stop offset="100%" stopColor="#1E7C86" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="board-red" cx="72%" cy="68%" r="62%">
          <stop offset="0%" stopColor="#D0401E" />
          <stop offset="100%" stopColor="#D0401E" stopOpacity="0" />
        </radialGradient>
        <filter id="peg-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      <g clipPath="url(#board-clip)">
        <rect width="500" height="330" fill="#0C1030" />
        <rect width="500" height="330" fill="url(#board-blue)" />
        <rect width="500" height="330" fill="url(#board-teal)" />
        <rect width="500" height="330" fill="url(#board-red)" />
      </g>

      {PEGS.map((peg, i) => {
        const offer = offerByPeg.get(i)
        const isOfferPeg = phase === 'ready' && offer
        const isLit = phase === 'cycling' && lit.has(i)
        const active = isOfferPeg && selected === offer.id
        const glowing = isLit || isOfferPeg
        const { dx, dy } = PEG_TILT[i]
        const r = isOfferPeg ? 8.2 : 6.6
        const k = isOfferPeg ? 1.15 : 1
        // pegs keep their own color: dim when off, full color when lit
        const dim = glowing ? 1 : 0.5
        return (
          <g
            key={i}
            transform={`translate(${peg.x} ${peg.y})`}
            {...(isOfferPeg
              ? {
                  role: 'button',
                  tabIndex: 0,
                  'aria-label': offer.title,
                  onMouseEnter: () => onSelect(offer),
                  onClick: () => onSelect(offer),
                  onFocus: () => onSelect(offer),
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(offer)
                    }
                  },
                  style: { cursor: 'pointer', outline: 'none' },
                }
              : { 'aria-hidden': true })}
          >
            <circle
              className="eol-peg-halo"
              r={isOfferPeg ? 17 : 13}
              fill={peg.color}
              filter="url(#peg-glow)"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: isOfferPeg ? `eol-peg-pulse ${1.6 + (i % 3) * 0.3}s ease-in-out infinite` : undefined,
                opacity: isOfferPeg ? undefined : isLit ? 0.9 : 0,
                transition: 'opacity .45s ease',
              }}
            />
            <g opacity={dim} style={{ transition: 'opacity .45s ease' }}>
              {/* body: the cylinder trailing back from the cap */}
              <line x1={0} y1={0} x2={dx * k} y2={dy * k} stroke={peg.color} strokeWidth={r * 2} strokeLinecap="round" />
              <line x1={0} y1={0} x2={dx * k} y2={dy * k} stroke="#000000" strokeOpacity={0.22} strokeWidth={r * 2} strokeLinecap="round" />
              {/* cap: the pale flat end facing us */}
              <circle r={r} fill={peg.color} stroke={active ? '#FFFFFF' : 'none'} strokeWidth={active ? 2.5 : 0} />
              <circle r={r * 0.82} fill="#FFFFFF" fillOpacity={0.34} />
              <circle cx={-r * 0.3} cy={-r * 0.32} r={r * 0.26} fill="#FFFFFF" fillOpacity={0.5} />
            </g>
            {isOfferPeg && <circle r={28} fill="transparent" />}
          </g>
        )
      })}

      {/* Fairy lights along the bottom, like the string on the mantel in the video. */}
      <path d="M0 312 C60 322 120 306 180 316 S300 308 360 318 S450 306 500 314" fill="none" stroke="#111" strokeWidth="2" />
      {[24, 78, 140, 200, 262, 322, 384, 440, 484].map((x, i) => (
        <circle key={x} cx={x} cy={313 + (i % 2) * 3} r="4" fill={i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#FFE9A8' : '#C8E8F5'} opacity=".9" />
      ))}
    </svg>
  )
}

function OfferCard({ offer, email, subscribe }: { offer: Offer; email: string; subscribe: boolean }) {
  const [claiming, setClaiming] = useState(false)
  return (
    <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: offer.color, background: 'rgba(251,247,242,.06)', boxShadow: `0 0 40px ${offer.color}33` }}>
      {offer.perk && (
        <span className="mb-4 inline-block rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ ...DISPLAY, background: offer.color, color: '#131114' }}>
          {offer.perk}
        </span>
      )}
      <h2 className="m-0 mb-3 text-[24px] leading-[1.2] font-semibold md:text-[30px]" style={{ ...DISPLAY, color: '#FBF7F2' }}>
        {offer.title}
      </h2>
      <p className="m-0 mb-3 text-[16px] leading-[1.6] md:text-[17px]" style={{ color: 'rgba(251,247,242,.82)' }}>
        {offer.body}
      </p>
      {offer.price && (
        <p className="m-0 mb-3 text-[15px] font-medium" style={{ color: offer.color }}>
          {offer.price}
        </p>
      )}
      {offer.note && (
        <p className="m-0 mb-5 text-[14px] leading-[1.5]" style={{ color: 'rgba(251,247,242,.6)' }}>
          {offer.note}
        </p>
      )}

      {claiming && offer.sticker ? (
        <ClaimForm offer={offer} email={email} subscribe={subscribe} />
      ) : claiming && offer.referral ? (
        <ReferralForm offer={offer} email={email} />
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {offer.sticker || offer.referral ? (
            <button type="button" onClick={() => setClaiming(true)} className="rounded-lg px-7 py-3.5 text-[15px] font-semibold" style={primaryButton()}>
              {offer.referral ? 'Introduce a friend or team' : 'Claim this + pick my sticker'}
            </button>
          ) : (
            <Link to={offer.cta.to} className="rounded-lg px-7 py-3.5 text-[15px] font-semibold" style={primaryButton()}>
              {offer.cta.label}
            </Link>
          )}
          {(offer.sticker || offer.referral) && (
            <Link to={offer.cta.to} className="text-[14px] font-semibold underline" style={{ color: 'rgba(251,247,242,.75)' }}>
              {offer.cta.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

function ClaimForm({ offer, email, subscribe }: { offer: Offer; email: string; subscribe: boolean }) {
  const [sticker, setSticker] = useState('')
  const [form, setForm] = useState({ name: '', email })
  const [status, setStatus] = useState<ClaimStatus>('idle')
  const [error, setError] = useState('')
  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!sticker) {
      setStatus('error')
      setError('Please pick a sticker.')
      return
    }
    setStatus('submitting')
    setError('')
    try {
      await post({
        action: 'claim',
        offer: offer.id,
        sticker,
        subscribe,
        name: form.name,
        email: form.email,
      })
      track('holiday_game_claim', { offer: offer.id, sticker })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p className="m-0 mt-5 text-[16px] leading-[1.6]" style={{ color: '#FBF7F2' }}>
        You’re all set! Thanks for playing. I’ve noted your discount and I’ll apply it when you sign up. Your sticker will be mailed once you sign up and pay for the program.
      </p>
    )
  }

  const field = (id: keyof typeof form, label: string, opts: { required?: boolean; type?: string; autoComplete?: string } = {}) => (
    <div>
      <label style={labelStyle} htmlFor={`claim-${id}`}>
        {label}
      </label>
      <input
        id={`claim-${id}`}
        type={opts.type ?? 'text'}
        required={opts.required}
        autoComplete={opts.autoComplete}
        style={inputStyle}
        value={form[id]}
        onChange={set(id)}
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 border-t pt-6" style={{ borderColor: 'rgba(251,247,242,.18)' }}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 p-0" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(251,247,242,.72)' }}>
          Choose your sticker
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {STICKERS.map((s) => {
            const on = sticker === s.id
            return (
              <label
                key={s.id}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center"
                style={{ borderColor: on ? offer.color : 'rgba(251,247,242,.2)', background: on ? 'rgba(251,247,242,.12)' : 'transparent' }}
              >
                <input type="radio" name="sticker" value={s.id} checked={on} onChange={() => setSticker(s.id)} className="sr-only" />
                <img src={s.src} alt={s.label} width={96} height={96} className="block h-[84px] w-[84px] object-contain md:h-[96px] md:w-[96px]" />
                <span className="text-[13px] font-medium" style={{ color: '#FBF7F2' }}>
                  {s.label}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        {field('name', 'Name', { required: true, autoComplete: 'name' })}
        {field('email', 'Email', { required: true, type: 'email', autoComplete: 'email' })}
      </div>
      <p className="m-0 text-[13px] leading-[1.5]" style={{ color: 'rgba(251,247,242,.55)' }}>
        No address needed yet. I’ll mail your sticker once you sign up and pay for the program.
      </p>

      {status === 'error' && (
        <div className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: '#FF7AC8', color: '#FFB3DD' }}>
          {error}
        </div>
      )}
      <button type="submit" disabled={status === 'submitting'} className="rounded-lg px-8 py-4 text-[15px] font-semibold disabled:opacity-60" style={primaryButton()}>
        {status === 'submitting' ? 'Sending…' : 'Claim my offer'}
      </button>
    </form>
  )
}

/** "Introduce a friend": one email to the friend, with the player and Kelly copied. If the friend signs up, Kelly sends the sticker and print herself. */
function ReferralForm({ offer, email }: { offer: Offer; email: string }) {
  const [form, setForm] = useState({ name: '', email, friendEmail: '', friendOffer: '', note: '' })
  const [status, setStatus] = useState<ClaimStatus>('idle')
  const [error, setError] = useState('')
  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      await post({ action: 'refer', name: form.name, email: form.email, friendEmail: form.friendEmail, friendOffer: form.friendOffer, note: form.note })
      track('holiday_game_referral', { offer: form.friendOffer })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p className="m-0 mt-5 text-[16px] leading-[1.6]" style={{ color: '#FBF7F2' }}>
        Sent! You, your friend, and I are all on the email. If they sign up and pay for a program, I’ll mail you a sticker and a print of your choice.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 border-t pt-6" style={{ borderColor: 'rgba(251,247,242,.18)' }}>
      <div>
        <label style={labelStyle} htmlFor="refer-friend-email">
          Your friend’s email
        </label>
        <input id="refer-friend-email" type="email" required style={inputStyle} value={form.friendEmail} onChange={set('friendEmail')} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="refer-offer">
          Which offer do you think would resonate with them?
        </label>
        <select id="refer-offer" required style={inputStyle} value={form.friendOffer} onChange={set('friendOffer')}>
          <option value="" disabled>
            Choose one
          </option>
          {REFERRAL_CHOICES.map((c) => (
            <option key={c.id} value={c.id} style={{ color: '#131114' }}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle} htmlFor="refer-note">
          A little intro note for them
        </label>
        <textarea
          id="refer-note"
          required
          rows={4}
          maxLength={700}
          placeholder="Why you thought of them, and why this might be a good fit."
          style={{ ...inputStyle, resize: 'vertical' }}
          value={form.note}
          onChange={set('note')}
        />
        <span className="mt-1.5 block text-[12px]" style={{ color: 'rgba(251,247,242,.5)' }}>
          Plain words only, no links. I’ll add the right link.
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label style={labelStyle} htmlFor="refer-name">
            Your name
          </label>
          <input id="refer-name" type="text" required autoComplete="name" style={inputStyle} value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="refer-email">
            Your email
          </label>
          <input id="refer-email" type="email" required autoComplete="email" style={inputStyle} value={form.email} onChange={set('email')} />
        </div>
      </div>
      <p className="m-0 text-[13px] leading-[1.5]" style={{ color: 'rgba(251,247,242,.55)' }}>
        I’ll send your friend one email, with you copied. They won’t be added to any list.
      </p>

      {status === 'error' && (
        <div className="rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: '#FF7AC8', color: '#FFB3DD' }}>
          {error}
        </div>
      )}
      <button type="submit" disabled={status === 'submitting'} className="rounded-lg px-8 py-4 text-[15px] font-semibold disabled:opacity-60" style={{ ...primaryButton(), background: offer.color }}>
        {status === 'submitting' ? 'Sending…' : 'Send the introduction'}
      </button>
    </form>
  )
}
