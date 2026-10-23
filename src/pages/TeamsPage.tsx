import { Link } from 'react-router-dom'
import logoMark from '../assets/logo-mark.png'
import heartModel from '../assets/landing/heart-model.webp'
import shotVision from '../assets/landing/screenshot-vision-v2.webp'
import shotFriction from '../assets/landing/shot-friction-v2.webp'
import shotCheckin from '../assets/landing/shot-checkin-v2.webp'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, OctopusIcon, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const HOW_STEPS = [
  {
    n: '01',
    title: 'Book a conversation',
    body: 'A short call to talk through your team, where you’re stuck, and whether this is the right fit. Once it’s a match, your team gets access to the app.',
  },
  {
    n: '02',
    title: 'Hivemindset Vision Program',
    body: 'A kickoff session prepares your team. Everyone reflects individually using the Empire of Light framework, then the team comes together for a facilitated workshop to see where there’s alignment, where there’s disconnect, and to co-create a tangible, inspiring vision. A follow-up commitment session turns that vision into action.',
  },
  {
    n: '03',
    title: 'We work the cycle, then evolve',
    body: 'Teams that want to keep going continue into a 4–6 week facilitated engagement: experiments toward the vision, friction logged and processed, biweekly working sessions with us, and weekly async reflection prompts. One full evolve cycle, then the team keeps using the app on its own.',
  },
]

const WHO_FOR = [
  'AI transformation initiatives',
  'Company pivots and leadership changes',
  'Product and GTM teams',
  'Cross-functional innovation teams',
  'Think tanks and research collaborations',
  'Incubators and interdisciplinary design teams',
  'Community-building projects',
  'Regenerative business ecosystems',
]

const BEFORE_AFTER = [
  {
    before: 'Team members didn’t contribute to the vision, so people pull in different directions and aren’t as engaged.',
    after: 'Team members are bought into one vision, so decisions get made faster and actually stick.',
  },
  {
    before: 'Team members are hesitant to take action; there’s a lot of planning and not enough doing.',
    after: 'Small experiments ship every week, building momentum instead of stalling in planning.',
  },
  {
    before: 'Work is kept hidden or in silos.',
    after: 'Work is visible across the team, so nothing gets duplicated, blocked, or dropped.',
  },
  {
    before: 'Role and scope friction goes unspoken until it blows up.',
    after: 'Friction gets surfaced and resolved early, before it costs a deadline or a hire.',
  },
  {
    before: 'Team members are fatigued by the AI landscape.',
    after: 'Team members bring real energy to the work, and it shows up in the output.',
  },
  {
    before: 'The leader is exhausted from carrying the whole load.',
    after: 'The leader spends less time firefighting and more time on what actually moves the business.',
  },
]

const DIFFERENTIATORS = [
  {
    title: 'Heart-centered',
    body: 'We start from the assumption that everyone is doing their best with what they have. Nothing here is scored, ranked, or kept as a performance record, so people can be honest without it being held against them.',
  },
  {
    title: 'Transparent by design',
    body: 'Every question tells you who will see your answer before you type it. Nothing is collected quietly, and nothing gets reported behind the team’s back.',
  },
  {
    title: 'Inside the work, not beside it',
    body: 'A typical engagement survey runs twice a year and ends up as a slide. This runs weekly, built around the vision your team is already working toward, so whatever surfaces gets used that same week.',
  },
]

const FAQS = [
  {
    q: 'How do we get started?',
    a: 'Book a short conversation with us. We’ll talk through your team and what you’re navigating, and if it’s a fit, walk you through the investment and get your team invited into the app.',
  },
  {
    q: 'Is this software or consulting?',
    a: 'Both. We facilitate the engagement directly (the Hivemindset Vision Program, the biweekly sessions, one full evolve cycle), and the app carries the work between sessions and stays with your team afterward.',
  },
  {
    q: 'Can we just use the app?',
    a: 'We recommend facilitating the first cycle together. Teams get a lot more out of it, and it sets your team up to run the app well on its own afterward.',
  },
  {
    q: 'How much time does it take?',
    a: 'The vision process takes about four weeks: a kickoff session, individual reflection, the vision workshop, and a final session to synthesize the vision and get everyone’s agreement. The app is there between sessions for ongoing reflection. Teams that continue into the full engagement add biweekly working sessions and a weekly async prompt that takes minutes. The rest happens inside work you’re already doing.',
  },
  {
    q: 'What size team works best?',
    a: 'Groups of roughly 5 to 15 who share real work and real decisions. Larger organizations usually start with one leadership group.',
  },
]

const APP_PRACTICES = [
  {
    eyebrow: '01 · Co-create a vision',
    title: 'Everyone answers first. Then you see where you actually agree.',
    body: [
      'Each person completes the vision questionnaire on their own, so the loudest voice in the room isn’t automatically the vision. The app synthesizes the responses and flags where the team is already aligned, and where it quietly isn’t.',
      'Together, we co-create a vision that’s more ambitious than we could have envisioned alone. We turn the disconnect into an expanded view of the problem and co-create an aligned path forward.',
    ],
    shot: { src: shotVision, alt: 'The team vision screen', position: 'top' },
    imageSide: 'right' as const,
  },
  {
    eyebrow: '02 · Friction mitigator',
    title: 'Process the friction first, then have the conversation',
    body: [
      'When something is grinding, you work through it alone in the app first: what happened, what you’re actually feeling, what you need. None of it is shared while you’re still figuring out what you think.',
      'Once everyone involved has done that, the app generates a discussion guide built from all sides. The friction becomes material for an actual conversation, instead of something everyone quietly works around.',
    ],
    shot: { src: shotFriction, alt: 'Friction processing with grounding breathwork', position: 'top' },
    imageSide: 'left' as const,
  },
  {
    eyebrow: '03 · Team vibe check',
    title: 'A weekly read on what’s giving energy and what’s draining it',
    body: [
      'A few questions, a few minutes, once a week: what felt energizing, and what felt heavy, confusing, or repetitive.',
      'The evolve rollup turns those weekly answers into a pattern the team can act on for the next cycle. The team sees it directly. It isn’t collected for the leader to review privately.',
    ],
    shot: { src: shotCheckin, alt: 'Weekly vibe check', position: 'top' },
    imageSide: 'right' as const,
  },
]

const TIERS = [
  { n: 0, label: 'Ephemeral, never stored', bg: '#131114', fg: '#FBF7F2', dot: '#2E7D5B' },
  { n: 1, label: 'Private, sealed', bg: '#26222A', fg: '#FBF7F2', dot: '#D99A22' },
  { n: 2, label: 'AI-assisted', bg: '#EDE4FA', fg: '#131114', dot: '#8B5CF6' },
  { n: 3, label: 'Team aggregate', bg: '#FDE3CB', fg: '#131114', dot: '#D99A22' },
  { n: 4, label: 'Team shared', bg: '#FCD9F0', fg: '#131114', dot: '#E86FD0' },
]

export default function TeamsPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Team Program | Empire of Light"
        description="A different way of running a team. Empire of Light helps teams unlock the collective intelligence already inside them: a facilitated engagement plus app for shared vision, aligned action, and processing friction together."
        path="/teams"
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-[120px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.55,
          }}
        />
        <div className="relative mx-auto max-w-[960px] text-center">
          <img src={logoMark} alt="" width={96} height={96} className="mx-auto mb-9 block" style={{ borderRadius: 20 }} />
          <div className="mb-7 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            The Team Program
          </div>
          <h1
            className="m-0 mb-7 text-[38px] leading-[1.1] font-light md:text-[52px] lg:text-[64px] lg:leading-[1.06]"
            style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}
          >
            A different way of running a team
          </h1>
          <p className="mx-auto mb-10 max-w-[640px] text-[18px] leading-[1.5] md:text-[21px]" style={{ color: 'rgba(251,247,242,.78)' }}>
            Empire of Light helps teams develop a shared vision, move towards it, navigate the friction that emerges, and evolve as
            they learn. Unlock the collective intelligence already on your team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('hero')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
            >
              Book a conversation
            </a>
            <a href="#how" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Watch the overview */}
      <section id="how" className="px-6 py-16 md:px-8 md:py-20" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[860px]">
          <div className="mb-6 text-center text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            Watch the overview
          </div>
          <video
            controls
            preload="metadata"
            poster="/video/eol-explainer-poster.jpg"
            className="block w-full rounded-2xl"
            style={{ boxShadow: '0 0 60px rgba(254,225,106,.18)' }}
          >
            <source src="/video/eol-explainer.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Why it matters: octopus quote */}
      <section className="px-6 pt-16 pb-6 md:px-8 md:pt-[88px]" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[840px] text-center">
          <div className="mb-8 flex justify-center" style={{ color: '#D99A22' }}>
            <OctopusIcon size={46} />
          </div>
          <p className="m-0 mb-6 text-[22px] leading-[1.35] font-light md:text-[30px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            An octopus has nine brains: one in its head, and one in each arm. When they&rsquo;re not in sync, it gives itself away.
            Trying to camouflage against the reef, it ends up flashing through seven different colors at once, broadcasting exactly
            the confusion it&rsquo;s trying to hide. This is how most teams operate.
          </p>
          <p className="m-0 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
            Empire of Light is the rhythm &mdash; and the app &mdash; that helps a team tap into its collective intelligence, get its
            arms working from the same signal, and move together toward something they actually want to create.
          </p>
        </div>
      </section>

      {/* Why it's different: the cycle + differentiators */}
      <section id="different" className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto max-w-[1120px]">
          <Eyebrow>Why this is different</Eyebrow>
          <h2 className="m-0 mb-10 max-w-[900px] text-[34px] leading-[1.1] font-light md:mb-12 md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            What if we made a project management system rooted in unconditional love?
          </h2>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[56px]">
            <div>
              <p className="m-0 mb-5 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                Most teams run on fear. Get the results or else. Ship this thing. This is so limiting when it comes to creating value
                for customers and creating a good environment for your team. Empire of Light focuses on making the whole team
                organism better. Results aren&rsquo;t ignored. They feed back into the system, helping the team understand what to
                change and where to go next.
              </p>
              <p className="m-0 mb-5 text-[19px] font-semibold leading-[1.4]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                Reimagine. Do. Unlearn. Evolve. Repeat.
              </p>
              <p className="m-0 mb-5 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                Most tools ask a team to report on how it&rsquo;s doing, after the fact. This gives the team a shared vision, a way to
                move on it, a way to work through the friction that shows up, and a way to keep evolving together. A rhythm the team
                owns, rather than something handed down from above.
              </p>
              <Link to="/thesis" className="text-[14px] font-semibold uppercase tracking-[0.1em]" style={DISPLAY}>
                Read the full thesis &rarr;
              </Link>
            </div>
            <img
              src={heartModel}
              alt="Empire of Light framework diagram"
              width={750}
              height={549}
              className="block w-full rounded-2xl object-cover"
              style={{ aspectRatio: '750 / 549' }}
            />
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.title} className="rounded-xl border p-7" style={{ borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}>
                <h3 className="m-0 mb-3 text-[20px] font-semibold leading-[1.26] md:text-[21px]" style={{ ...DISPLAY, color: '#131114' }}>
                  {item.title}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.62]" style={{ color: '#544D5A' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <Eyebrow>Who it&rsquo;s for</Eyebrow>
          <h2 className="m-0 mb-7 text-[30px] leading-[1.1] font-light md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            Built for teams creating something new
          </h2>
          <div className="flex flex-wrap gap-3">
            {WHO_FOR.map((item) => (
              <div
                key={item}
                className="rounded-full border px-5 py-3 text-[15px] font-medium md:text-[16px]"
                style={{ borderColor: '#D8D2DC', background: '#FFFFFF', color: '#131114' }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results to expect */}
      <section className="px-6 pt-14 pb-16 md:px-8 md:pt-16 md:pb-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-10 max-w-[720px]">
            <Eyebrow>Results to expect</Eyebrow>
            <h2 className="m-0 mb-3 text-[30px] leading-[1.1] font-light md:text-[42px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
              What changes when teams move differently
            </h2>
            <p className="m-0 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
              Get your team aligned around a shared vision, moving on what matters, and better equipped to adapt as the work
              unfolds.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#D8D2DC' }}>
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em]"
                    style={{ ...DISPLAY, color: '#544D5A', background: '#EDE9EF', width: '50%' }}
                  >
                    Before
                  </th>
                  <th
                    className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em]"
                    style={{ ...DISPLAY, color: '#A96D0F', background: '#FFF6E8', width: '50%' }}
                  >
                    After
                  </th>
                </tr>
              </thead>
              <tbody>
                {BEFORE_AFTER.map((row, i) => (
                  <tr key={i} style={{ background: '#FFFFFF' }}>
                    <td className="border-t px-6 py-5 text-[15.5px] leading-[1.55] md:text-[16px]" style={{ borderColor: '#EDE9EF', color: '#544D5A' }}>
                      {row.before}
                    </td>
                    <td className="border-t border-l px-6 py-5 text-[15.5px] leading-[1.55] md:text-[16px]" style={{ borderColor: '#EDE9EF', color: '#131114' }}>
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Program details: how it works */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14 max-w-[720px] md:mb-16">
            <Eyebrow color="#FEE16A">How it works</Eyebrow>
            <p className="m-0 text-[20px] leading-[1.45] font-light md:text-[26px]" style={{ ...DISPLAY, letterSpacing: '.01em', color: '#FBF7F2' }}>
              Software alone doesn&rsquo;t change how a team works, and a workshop alone doesn&rsquo;t survive the week after it
              ends. This is built to do both: we help you establish the rhythm, and the app keeps it going.
            </p>
          </div>
          <div
            className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-3"
            style={{ background: 'rgba(251,247,242,.14)', borderColor: 'rgba(251,247,242,.14)' }}
          >
            {HOW_STEPS.map((step) => (
              <div key={step.n} className="p-8" style={{ background: '#0C0A0D' }}>
                <div className="mb-5 text-[13px] font-semibold tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
                  {step.n}
                </div>
                <h3 className="m-0 mb-3 text-[20px] font-semibold tracking-[0.03em] md:text-[22px]" style={{ ...DISPLAY, color: '#FBF7F2' }}>
                  {step.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'rgba(251,247,242,.7)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-center text-[15px]" style={{ color: 'rgba(251,247,242,.5)' }}>
            Some teams stop after the Hivemindset Vision Program; others continue into the full engagement. Either way, the app carries the
            work before, during, and after.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('how_it_works')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
            >
              Book a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Program details: inside the app */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14 max-w-[760px]">
            <Eyebrow>Inside the app</Eyebrow>
            <h2 className="m-0 mb-5 text-[30px] leading-[1.1] font-light md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
              Practices that keep the team moving
            </h2>
            <p className="m-0 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
              Each one starts with individual reflection, then becomes something the team can act on together in the same week.
            </p>
          </div>
          <div className="flex flex-col gap-16">
            {APP_PRACTICES.map((practice) => (
              <div key={practice.eyebrow} className="grid grid-cols-1 items-center gap-9 md:grid-cols-2">
                <div className={practice.imageSide === 'left' ? 'md:order-2' : 'md:order-1'}>
                  <Eyebrow>{practice.eyebrow}</Eyebrow>
                  <h3 className="m-0 mb-3.5 text-[24px] font-semibold leading-[1.22] md:text-[26px]" style={{ ...DISPLAY, color: '#131114' }}>
                    {practice.title}
                  </h3>
                  {practice.body.map((para) => (
                    <p key={para} className="m-0 mb-4 text-[16px] leading-[1.6] last:mb-0 md:text-[16.5px]" style={{ color: '#544D5A' }}>
                      {para}
                    </p>
                  ))}
                </div>
                <div className={practice.imageSide === 'left' ? 'md:order-1' : 'md:order-2'}>
                  <div
                    className="h-[300px] overflow-hidden rounded-2xl border md:h-[360px]"
                    style={{ background: '#FFFFFF', borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}
                  >
                    <img
                      src={practice.shot.src}
                      alt={practice.shot.alt}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: practice.shot.position }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border p-8 md:p-10" style={{ borderColor: '#D8D2DC', background: '#FFFFFF' }}>
            <Eyebrow>Privacy tiers</Eyebrow>
            <h3 className="m-0 mb-3 text-[22px] font-semibold leading-[1.24] md:text-[24px]" style={{ ...DISPLAY, color: '#131114' }}>
              People tell the truth when they have the psychological safety to do so
            </h3>
            <p className="m-0 mb-6 max-w-[720px] text-[16px] leading-[1.6] md:text-[16.5px]" style={{ color: '#544D5A' }}>
              Every data point above has an assigned privacy tier, made visible to you in the app so you know exactly who will see it
              before you write a word.
            </p>
            <div className="flex flex-wrap gap-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.n}
                  className="flex items-center gap-2.5 rounded-full px-5.5 py-3 text-[14px] font-medium md:text-[15px]"
                  style={{ background: tier.bg, color: tier.fg }}
                >
                  <span className="h-[7px] w-[7px] rounded-full" style={{ background: tier.dot }} />
                  Tier {tier.n} &middot; {tier.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program details: what's included + pricing */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto max-w-[1120px]">
          <div
            className="grid items-center gap-10 rounded-[20px] px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16 md:px-12 md:py-14"
            style={{ background: 'linear-gradient(90deg,#FFF6AD 0%,#FFD0D3 50%,#FFA9F8 100%)' }}
          >
            <div>
              <Eyebrow>Where to start</Eyebrow>
              <h2 className="m-0 mb-6 text-[26px] leading-[1.1] font-light md:text-[34px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                Start with the Hivemindset Vision Program
              </h2>
              <p className="m-0 text-[16px] leading-[1.55] md:text-[17px]" style={{ color: '#131114' }}>
                Some teams stop after the program. Others continue into a 4&ndash;6 week facilitated engagement. The app is included
                either way.
              </p>
            </div>
            <div className="rounded-[20px] px-8 py-10 text-center" style={{ background: '#FFFFFF' }}>
              <Eyebrow>Investment</Eyebrow>
              <div className="text-[26px] leading-[1.2] font-light md:text-[32px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                Sliding scale, based on team size and scope
              </div>
              <p className="mt-6 text-[14px] leading-[1.55]" style={{ color: '#544D5A' }}>
                We&rsquo;re taking on a small number of teams. Spots are limited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[840px]">
          <Eyebrow>Questions</Eyebrow>
          <div className="grid gap-px border-t border-b" style={{ background: '#D8D2DC', borderColor: '#D8D2DC' }}>
            {FAQS.map((faq) => (
              <div key={faq.q} className="px-0 py-7" style={{ background: '#FDFAF4' }}>
                <h3 className="m-0 mb-2.5 text-[19px] font-semibold md:text-[22px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                  {faq.q}
                </h3>
                <p className="m-0 text-[15px] leading-[1.62] md:text-[16px]" style={{ color: '#544D5A' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[112px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <div className="mb-8 flex justify-center">
            <OctopusIcon size={40} color="rgba(254,225,106,.7)" />
          </div>
          <h2 className="m-0 mb-6 text-[34px] leading-[1.1] font-light md:text-[52px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            Start with the vision your team hasn&rsquo;t said out loud yet
          </h2>
          <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-[1.55] md:text-[19px]" style={{ color: 'rgba(251,247,242,.72)' }}>
            Book a conversation, and we&rsquo;ll take it from there.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('final_cta')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
            >
              Book a conversation
            </a>
          </div>
          <p className="mt-6 text-[14px]" style={{ color: 'rgba(251,247,242,.5)' }}>
            Looking for something for yourself?{' '}
            <Link to="/now-what-cohort" style={{ color: '#FEE16A' }}>
              Explore the Now What? Cohort &rarr;
            </Link>
            {' '}&middot;{' '}
            <Link to="/living-proof" style={{ color: '#FEE16A' }}>
              See the living proof &rarr;
            </Link>
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
