import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SUBSTACK_URL, trackSubstack } from '../components/shared'

// Landing page for people who find Kelly's art at a show (the Kirkland Arts Center Holiday Market). Standalone on purpose:
// no site header or footer, so it reads as "the page the art points to" rather than a page inside the marketing site.
// Design reference: the "Landing page · art" mockup. Add Bebas Neue to the font link in index.html if it's ever removed.

// Every image in src/assets/art, keyed by its file name without the extension.
const IMAGES = import.meta.glob('../assets/art/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const img = (id: string) => IMAGES[`../assets/art/${id}.jpg`]

const BEBAS: CSSProperties = { fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }
const INK = '#3A1630'
const RED = '#D7263D'
const ROSE = '#8A1F4A'
const LINK_RED = '#B01E33'
const SHADOW = '0 10px 24px rgba(90,20,60,0.18)'

/** Rotated, white-bordered print. `y` nudges it up or down so a row of them looks hung by hand. */
function Print({ id, w, h, rotate, y = 0, round = false, border = 6, style, className = '' }: {
  id: string
  w: number
  h: number
  rotate: number
  y?: number
  round?: boolean
  border?: number
  style?: CSSProperties
  className?: string
}) {
  return (
    <img
      src={img(id)}
      alt=""
      width={w}
      height={h}
      loading="lazy"
      className={`block flex-none object-cover ${className}`}
      style={{
        width: w,
        height: h,
        border: round ? undefined : `${border}px solid #fff`,
        borderRadius: round ? '50%' : undefined,
        boxShadow: SHADOW,
        transform: `rotate(${rotate}deg)${y ? ` translateY(${y}px)` : ''}`,
        ...style,
      }}
    />
  )
}

/** Text on a solid colored label, like a strip of label-maker tape. */
function Label({ children, bg = RED, color = '#fff', padX = 16, radius = 10 }: { children: string; bg?: string; color?: string; padX?: number; radius?: number }) {
  return (
    <span style={{ background: bg, color, padding: `2px ${padX}px`, borderRadius: radius, WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
      {children}
    </span>
  )
}

const bodyText: CSSProperties = { margin: 0, fontSize: 'clamp(19px, 2.4vw, 22px)', lineHeight: 1.6 }
const kicker: CSSProperties = { margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ROSE }
const pill: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 48,
  padding: '12px 24px 8px',
  boxSizing: 'border-box',
  background: '#fff',
  color: INK,
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 18,
  textDecoration: 'none',
  boxShadow: '0 6px 16px rgba(90,20,60,0.10)',
}

const LOOP: { label: string; left: string; top: string }[] = [
  { label: 'Reimagine', left: '50.5%', top: '9%' },
  { label: 'Do', left: '89%', top: '50%' },
  { label: 'Unlearn', left: '50.5%', top: '89%' },
  { label: 'Evolve', left: '12%', top: '50%' },
]

const OFFERS = [
  {
    eyebrow: 'For teams',
    title: 'Team programs',
    body: 'Great for teams going through a pivot or embarking on something new that want to get moving quickly, together, in the right direction.',
    cta: 'Explore team programs →',
    to: '/teams',
  },
  {
    eyebrow: 'For individuals',
    title: 'Cohort programs',
    body: 'For people experiencing significant life shifts who want to reimagine their lives and start making it happen.',
    cta: 'Join a cohort →',
    to: '/now-what-cohort',
  },
]

export default function ArtPage() {
  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        width: '100%',
        background: 'linear-gradient(160deg, #FFF6B0 0%, #FFD9CF 45%, #FFB3EC 100%)',
        fontFamily: "'Josefin Sans', system-ui, sans-serif",
        color: INK,
      }}
    >
      <Seo path="/art" />

      {/* Top art strip */}
      <div role="img" aria-label="A few pieces from my collection" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-6 px-6 pt-8 pb-4 sm:pt-12 sm:pb-6">
        <Print id="a0c59b27ebc14c93d3738452974437fe" w={150} h={140} rotate={-4} />
        <Print id="3d68f6f69fa50989528847d9322eff7f" w={130} h={160} rotate={3} y={14} />
        <Print id="a46aad2c76fad04cc3dc1180631d5384" w={120} h={168} rotate={-2} />
        <Print id="a5e68b2e5f1aa0633df68e3cb948b72f" w={160} h={150} rotate={4} y={10} />
        <Print id="b259abb1625bf47c5775cb14c5c02c04" w={124} h={166} rotate={-3} className="max-sm:hidden" />
        <Print id="f0343fc34ef2d71f1d6c9887a5da7aed" w={140} h={156} rotate={2} y={16} className="max-sm:hidden" />
        <Print id="ce1e25c1f4cd6d550d070079ee397d2c" w={170} h={140} rotate={-4} className="max-sm:hidden" />
        <Print id="cc0f9df9e62b9cbc3948db211c7f6437" w={120} h={120} rotate={6} y={6} round className="max-sm:hidden" />
      </div>

      <div
        className="mx-auto box-border grid max-w-[1360px] grid-cols-[minmax(0,1fr)] px-6 pt-12 pb-6 min-[961px]:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] min-[961px]:gap-x-10"
      >
        {/* Left rail */}
        <div aria-hidden="true" className="hidden flex-col items-end min-[961px]:flex" style={{ gap: 220, paddingTop: 120 }}>
          <Print id="0e48299dbe81e550f34ddc504f30dc30" w={170} h={190} rotate={-5} />
          <Print id="fa44d2720088aa5712ff56ab3d596c01" w={150} h={196} rotate={3} style={{ marginRight: 40 }} />
          <Print id="5e870443b3f987643934f33290df1f35" w={160} h={210} rotate={-3} />
        </div>

        {/* Main column */}
        <main className="flex min-w-0 flex-col" style={{ gap: 72 }}>
          <section className="flex flex-col gap-6">
            <p style={{ ...kicker, fontSize: 15 }}>Found my art at the Kirkland Arts Center Holiday Market? Welcome!</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
              <img
                src={img('b29e6d71ca424edbfd655b00775b562a')}
                alt="Kelly Woznicki, laughing, in a green top and orange-striped scarf"
                width={220}
                height={260}
                className="block flex-none object-cover"
                style={{ width: 220, height: 260, border: '7px solid #fff', boxShadow: SHADOW, transform: 'rotate(-4deg)' }}
              />
              <h1 className="m-0" style={{ ...BEBAS, fontSize: 'clamp(56px, 11vw, 88px)', lineHeight: 1.12, letterSpacing: '0.01em' }}>
                <Label padX={20} radius={12}>
                  Hi, I&rsquo;m Kelly!
                </Label>
              </h1>
            </div>
            <p style={bodyText}>
              A few years ago, my whole life blew up. When I found myself in a very intense awakening journey, I started following my intuition and
              making a lot of art.
            </p>
            <p style={bodyText}>
              I just make the art without thinking, then analyze the patterns later. As I healed, my art (and my health, and my life) got better and
              better. Eventually, I discovered the pattern behind my transformation:
            </p>
          </section>

          {/* The cycle */}
          <section aria-labelledby="cycle" className="flex flex-col items-center gap-10">
            <h2 id="cycle" className="m-0 text-center" style={{ ...BEBAS, fontSize: 'clamp(34px, 7vw, 52px)', lineHeight: 1.4, letterSpacing: '0.02em' }}>
              <Label>Reimagine. Do. Unlearn. Evolve.</Label>
            </h2>
            <div className="relative w-full max-w-[460px]" style={{ aspectRatio: '460 / 420' }}>
              <svg
                viewBox="-30 0 460 420"
                role="img"
                aria-label="Heart diagram: Reimagine leads to Do, Do to Unlearn, Unlearn to Evolve, and Evolve back to Reimagine, in a clockwise loop"
                className="absolute inset-0 h-full w-full"
                style={{ overflow: 'visible' }}
              >
                <path
                  d="M200 372 L46 214 C-14 152 16 40 112 40 C162 40 190 74 200 100 C210 74 238 40 288 40 C384 40 414 152 354 214 Z"
                  fill="#ECEA72"
                  stroke="#2A1420"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path d="M-9 -8 L9 0 L-9 8 Z" fill="#2A1420" transform="translate(118 287) rotate(226)" />
                <path d="M-9 -8 L9 0 L-9 8 Z" fill="#2A1420" transform="translate(20 104) rotate(-71)" />
                <path d="M-9 -8 L9 0 L-9 8 Z" fill="#2A1420" transform="translate(380 104) rotate(71)" />
                <path d="M-9 -8 L9 0 L-9 8 Z" fill="#2A1420" transform="translate(282 287) rotate(134)" />
              </svg>
              {LOOP.map((p) => (
                <span
                  key={p.label}
                  className="absolute text-[16px] font-bold uppercase tracking-[0.06em] sm:text-[20px]"
                  style={{
                    left: p.left,
                    top: p.top,
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    borderRadius: 10,
                    padding: '8px 16px 4px',
                    color: '#2A1420',
                    boxShadow: '0 4px 12px rgba(90,20,60,0.12)',
                  }}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <p style={bodyText}>
              My best art tends to come during the <strong>evolve</strong> phase, usually after I&rsquo;ve processed some difficult feelings and
              reached a new state of awareness.
            </p>
            <p style={bodyText}>
              I presented a poster about this methodology at The Science of Consciousness conference in October, and now it&rsquo;s the foundation
              of my business, Empire of Light.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/science-of-consciousness/"
                className="inline-flex items-center gap-2.5"
                style={{
                  minHeight: 52,
                  padding: '14px 26px 10px',
                  boxSizing: 'border-box',
                  background: INK,
                  color: '#fff',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 18,
                  textDecoration: 'none',
                }}
              >
                See the conference poster
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: -4 }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </section>

          {/* Empire of Light */}
          <section aria-labelledby="eol" className="flex flex-col gap-7">
            <h2 id="eol" className="m-0" style={{ ...BEBAS, fontSize: 'clamp(40px, 8vw, 60px)', lineHeight: 1.3, letterSpacing: '0.02em' }}>
              <Label padX={18}>What&rsquo;s Empire of Light?</Label>
            </h2>
            <p style={{ margin: 0, fontSize: 'clamp(20px, 2.6vw, 24px)', lineHeight: 1.55, fontWeight: 600 }}>
              It&rsquo;s a heart-centered operating framework, designed to bring out the best in people and bring good things into the world.
            </p>
            <div className="grid grid-cols-1 gap-6 min-[961px]:grid-cols-2">
              {OFFERS.map((offer) => (
                <div key={offer.title} className="flex flex-col gap-3.5" style={{ background: '#fff', borderRadius: 24, padding: '32px 28px 28px', boxShadow: '0 12px 32px rgba(90,20,60,0.10)' }}>
                  <p style={kicker}>{offer.eyebrow}</p>
                  <h3 className="m-0" style={{ ...BEBAS, fontSize: 38, lineHeight: 1.05, color: LINK_RED }}>
                    {offer.title}
                  </h3>
                  <p className="grow" style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>
                    {offer.body}
                  </p>
                  <Link to={offer.to} className="inline-flex items-center" style={{ minHeight: 48, fontWeight: 700, fontSize: 18, color: LINK_RED }}>
                    {offer.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center" style={{ ...BEBAS, margin: '8px 0 0', fontSize: 'clamp(30px, 6vw, 44px)', lineHeight: 1.4, letterSpacing: '0.02em' }}>
              <Label bg="#fff" color={LINK_RED} padX={18}>
                Unconventional is celebrated here!
              </Label>
            </p>
          </section>
        </main>

        {/* Right rail */}
        <div aria-hidden="true" className="hidden flex-col items-start min-[961px]:flex" style={{ gap: 200, paddingTop: 40 }}>
          <Print id="c8d354093dec8062cb9aaf03774e7299" w={160} h={196} rotate={4} />
          <Print id="a20b66063fe8fbfdb2c847d9096f9ccb" w={150} h={200} rotate={-3} style={{ marginLeft: 40 }} />
          <Print id="27799eb3fe719f62fb832b88f31405c9" w={170} h={190} rotate={5} />
        </div>
      </div>

      {/* Bottom art strip */}
      <div aria-hidden="true" className="flex flex-wrap items-center justify-center gap-7 px-6 pt-[72px] pb-10">
        <Print id="45923e14ba253f1374faf9aac7f19543" w={140} h={166} rotate={3} />
        <Print id="3ed79b5402af1d8781edc4af405fe53f" w={130} h={162} rotate={-4} y={12} />
        <Print id="0fdb2cb68477b031ae17facc5d232682" w={120} h={168} rotate={2} />
        <Print id="92c946fb4f6d071671ceb4ca73f0c90c" w={120} h={120} rotate={-6} y={8} round />
        <Print id="10bf18dd1f1b61cbff22d4b5c5cfe5fc" w={160} h={166} rotate={-3} />
        <Print id="192085d2e26f291613548b563481021b" w={116} h={170} rotate={4} y={14} />
        <Print id="25371981ef4445fc5583007c468e129d" w={116} h={170} rotate={-2} />
        <Print id="eea10ea937f54ed26b52736ec9ce45e2" w={140} h={160} rotate={3} y={10} />
      </div>

      <section aria-labelledby="follow" className="flex flex-col items-center gap-5 px-6 pt-4 pb-8">
        <h2 id="follow" className="m-0 text-center" style={{ ...BEBAS, fontSize: 44, lineHeight: 1.3, letterSpacing: '0.02em' }}>
          <Label>Follow along</Label>
        </h2>
        <nav aria-label="Social media" className="flex flex-wrap justify-center gap-3">
          <a href="https://www.instagram.com/kellywoz.io" target="_blank" rel="noreferrer" style={pill}>
            Instagram
          </a>
          <a href="https://www.tiktok.com/@kellywoz.io" target="_blank" rel="noreferrer" style={pill}>
            TikTok
          </a>
          <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" onClick={() => trackSubstack('art_page')} style={pill}>
            Substack
          </a>
          <a href="https://www.linkedin.com/in/kellywoznicki/" target="_blank" rel="noreferrer" style={pill}>
            LinkedIn
          </a>
        </nav>
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 pt-6 pb-14" style={{ fontSize: 17, fontWeight: 600 }}>
        <span style={{ ...BEBAS, fontSize: 28, letterSpacing: '0.04em', color: INK }}>Empire of Light</span>
        <Link to="/" style={{ color: LINK_RED }}>
          empireoflightcollective.com
        </Link>
        <a href="mailto:kelly@empireoflightcollective.com" style={{ color: LINK_RED }}>
          kelly@empireoflightcollective.com
        </a>
      </footer>
    </div>
  )
}
