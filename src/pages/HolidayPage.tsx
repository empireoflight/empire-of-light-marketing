import holidayArt from '../assets/landing/holiday-edition.jpg'
import { InquiryForm } from '../components/InquiryForm'
import { MarketingFooter } from '../components/MarketingFooter'
import { MarketingHeader } from '../components/MarketingHeader'
import { Seo } from '../components/Seo'
import { DISPLAY, Eyebrow, HEADER_GRADIENT, primaryButton } from '../components/shared'

// Colors lifted from the Holiday Edition graphic: bulbs, the red banner, and the heart.
const BULB_COLORS = ['#2FA58A', '#F6DC6B', '#D8301F', '#A8C6F5']
const HOLIDAY_RED = '#FF3333'

interface Step {
  date: string
  title: string
  meta?: string
  cycle?: string
  body: string[]
  bulb: string
  bulbText: string
}

const STEPS: Step[] = [
  {
    date: 'Friday, Nov 13',
    title: 'Kickoff call',
    meta: '30 minutes',
    body: ['Introductions, an overview of Empire of Light, how the experience works, and an invitation to join the app.'],
    bulb: BULB_COLORS[0],
    bulbText: '#FFFFFF',
  },
  {
    date: 'Friday, Nov 20',
    title: 'Reimagine → Do workshop',
    meta: '10:30 AM–12:00 PM Pacific',
    cycle: 'Reimagine · Do',
    body: [
      'A facilitated session to reflect on what we want, challenge some existing patterns, and identify ways we’d like to show up differently.',
      'Leave with a handful of small experiments to try over the holidays.',
    ],
    bulb: BULB_COLORS[1],
    bulbText: '#131114',
  },
  {
    date: 'Late November–December',
    title: 'Weekly drop-ins',
    meta: '30-minute calls',
    cycle: 'Unlearn',
    body: [
      'Check in, share experiences, troubleshoot friction, celebrate discoveries, and support each other’s experiments.',
      'We’ll likely set up a chat group too, so we can stay in touch easily throughout the holidays.',
      'No pressure to have it all figured out.',
    ],
    bulb: BULB_COLORS[2],
    bulbText: '#FFFFFF',
  },
  {
    date: 'January',
    title: 'Reflection and evolution',
    meta: 'Another live session',
    cycle: 'Evolve',
    body: ['What did we learn? What changed? What do we want to carry forward? What do we want to do differently next?'],
    bulb: BULB_COLORS[3],
    bulbText: '#131114',
  },
]

/** A wavy string of holiday lights, like the one across the top of the graphic. Fixed height; the width crops to fit. */
function LightString() {
  const width = 1200
  const wave = (x: number) => 52 + 22 * Math.sin(x / 64)
  const points = Array.from({ length: 61 }, (_, i) => `${i * 20},${wave(i * 20).toFixed(1)}`).join(' ')
  const bulbs = Array.from({ length: 14 }, (_, i) => 40 + i * 86)
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} 120`}
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none absolute inset-x-0 top-0 block w-full"
      style={{ height: 96 }}
    >
      <polyline points={points} fill="none" stroke="#131114" strokeWidth="2" strokeLinejoin="round" />
      {bulbs.map((x, i) => {
        const y = wave(x)
        const color = BULB_COLORS[i % BULB_COLORS.length]
        return (
          <g key={x}>
            <rect x={x - 5} y={y} width="10" height="12" rx="2" fill="#131114" />
            <circle cx={x} cy={y + 26} r="15" fill={color} />
            <circle cx={x - 5} cy={y + 20} r="3.2" fill="#FFFFFF" opacity=".55" />
          </g>
        )
      })}
    </svg>
  )
}

export default function HolidayPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Holiday Edition (Free) | Empire of Light"
        description="Do you dread the holidays? Join the free Empire of Light Holiday Edition: a kickoff call, a Reimagine → Do workshop, weekly drop-ins, and a January reflection. Reimagine your holiday traditions."
        path="/holiday"
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-[120px] pb-16 md:px-8 md:pt-[130px] md:pb-24" style={{ background: HEADER_GRADIENT }}>
        <LightString />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <span
              className="mb-7 inline-block rounded-xl px-5 py-2.5 text-[14px] font-bold uppercase tracking-[0.14em] md:text-[15px]"
              style={{ ...DISPLAY, background: HOLIDAY_RED, color: '#FFFFFF' }}
            >
              Holiday Edition &middot; Free
            </span>
            <h1
              className="m-0 mb-6 text-[40px] leading-[1.05] font-semibold md:text-[60px] lg:text-[68px]"
              style={{ ...DISPLAY, letterSpacing: '.01em', color: '#131114' }}
            >
              Do you dread the holidays?
            </h1>
            <p className="m-0 mb-9 max-w-[540px] text-[18px] leading-[1.55] md:text-[21px]" style={{ color: '#2B262E' }}>
              Or do you ever look around and wonder what we are actually celebrating? Join the Empire of Light Holiday Edition and
              reimagine how you want to show up this season.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <a href="#signup" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={primaryButton({ boxShadow: '0 6px 24px rgba(19,17,20,.18)' })}>
                Sign me up
              </a>
              <a
                href="#how"
                className="rounded-lg border px-8 py-4 text-[15px] font-semibold"
                style={{ ...DISPLAY, color: '#131114', borderColor: 'rgba(19,17,20,.45)', background: 'rgba(255,255,255,.35)' }}
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 mb-0 text-[15px] font-medium" style={{ color: '#2B262E' }}>
              Free to join. Donations will be accepted at the end.
            </p>
          </div>
          <img
            src={holidayArt}
            alt="The Empire of Light heart model (Reimagine, Do, Unlearn, Evolve) wrapped in holiday lights, labeled Holiday Edition"
            width={1000}
            height={1000}
            className="mx-auto block w-full max-w-[520px] rounded-3xl"
            style={{ boxShadow: '0 20px 60px rgba(19,17,20,.18)' }}
          />
        </div>
      </section>

      {/* The idea */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[780px] text-center">
          <Eyebrow>The idea</Eyebrow>
          <p className="m-0 mb-7 text-[26px] leading-[1.25] font-light md:text-[38px] md:leading-[1.2]" style={{ ...DISPLAY, letterSpacing: '.01em', color: '#131114' }}>
            When was the last time you allowed yourself to reimagine your holiday traditions?
          </p>
          <p className="m-0 mb-4 text-[17px] leading-[1.65] md:text-[18px]" style={{ color: '#544D5A' }}>
            Come join our Empire of Light Holiday Edition! It&rsquo;s free, and donations will be accepted at the end.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 pb-16 md:px-8 md:pb-24" style={{ scrollMarginTop: 60 }}>
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="m-0 mb-10 text-[30px] leading-[1.1] font-light md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            From kickoff to reflection
          </h2>
          <ol className="m-0 flex list-none flex-col gap-5 p-0">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-[16px] font-bold"
                    style={{ ...DISPLAY, background: step.bulb, color: step.bulbText }}
                  >
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && <span className="mt-2 w-[2px] flex-1" style={{ background: '#D8D2DC' }} />}
                </div>
                <div className="rounded-2xl border p-6 md:p-8" style={{ background: '#FFFFFF', borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}>
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span
                      className="rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]"
                      style={{ ...DISPLAY, background: step.bulb, color: step.bulbText }}
                    >
                      {step.date}
                    </span>
                    {step.meta && (
                      <span className="text-[14px] font-medium" style={{ color: '#544D5A' }}>
                        {step.meta}
                      </span>
                    )}
                  </div>
                  <h3 className="m-0 mb-3 text-[22px] leading-[1.2] font-semibold md:text-[26px]" style={{ ...DISPLAY, color: '#131114' }}>
                    {step.title}
                  </h3>
                  {step.body.map((para) => (
                    <p key={para} className="m-0 mb-3 text-[16px] leading-[1.62] last:mb-0 md:text-[17px]" style={{ color: '#544D5A' }}>
                      {para}
                    </p>
                  ))}
                  {step.cycle && (
                    <div className="mt-4 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                      {step.cycle}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <InquiryForm
        id="signup"
        offer="holiday"
        page="Holiday Edition page"
        heading="Join the Holiday Edition"
        intro="It’s free. Sign up and I’ll send the details for the kickoff call."
        messageLabel="Anything you’d like me to know? (optional)"
        submitLabel="Sign me up"
        successMessage="You’re in! Thanks for signing up. I’ll send details for the kickoff call soon."
      />

      <MarketingFooter />
    </div>
  )
}
