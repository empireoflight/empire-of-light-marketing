import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import logoMark from '../assets/logo-mark.png'
import heartModel from '../assets/landing/heart-model.webp'
import founderPhoto from '../assets/landing/founder-photo.jpg'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, OctopusIcon, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const PATHS = [
  {
    eyebrow: 'For teams and groups',
    title: 'Team Program',
    body: 'What if we ran teams from a place of unconditional love and focused on shifting the hive mind of the team so they can move faster, together, towards a common goal? For corporate teams, co-housing and community-building projects, and interdisciplinary groups.',
    cta: 'Explore the Team Program',
    to: '/teams',
  },
  {
    eyebrow: 'For individuals',
    title: 'Unmasking Cohort',
    body: 'A six-week group experience for people in the middle of a big life change: a late neurodivergence discovery, the end of a marriage, a life that no longer feels like yours. Explore a vision for what’s next, try it on, and work through what comes up, together.',
    cta: 'Explore the Unmasking Cohort',
    to: '/unmasking-cohort',
  },
]

export default function HomePage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Empire of Light | A Heart-Centered Operating System for Collective Intelligence"
        description="Empire of Light helps people and teams bring more ambitious visions to life faster, with more unity. A heart-centered operating system and collective intelligence platform for teams and Unmasking Cohorts."
        path="/"
      />
      <MarketingHeader />

      {/* Announcement: AI Week event offer */}
      <Link
        to="/event/ai-week"
        onClick={() => track('event_banner_click', { location: 'home', event: 'ai-week' })}
        className="block px-6 py-3 text-center text-[14px] font-semibold md:text-[15px]"
        style={{ ...DISPLAY, background: '#EDE4FA', color: '#131114' }}
      >
        At AI Week? Get 20% off a Group Unmasking Cohort or Team Hivemindset Vision Program &rarr;
      </Link>

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
            A heart-centered operating system
          </div>
          <h1
            className="m-0 mb-7 text-[38px] leading-[1.1] font-light md:text-[52px] lg:text-[64px] lg:leading-[1.06]"
            style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}
          >
            Bring more ambitious visions to life faster, with more unity.
          </h1>
          <p className="mx-auto mb-10 max-w-[640px] text-[18px] leading-[1.5] md:text-[21px]" style={{ color: 'rgba(251,247,242,.78)' }}>
            Empire of Light is a collective intelligence platform that helps people and teams develop a shared vision, move towards
            it, navigate the friction that emerges, and evolve as they learn.
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
            <a href="#paths" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Choose your path
            </a>
          </div>
        </div>
      </section>

      {/* The heart model: where it came from, and why it works for groups */}
      <section id="different" className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto max-w-[1120px]">
          <Eyebrow>Why this is different</Eyebrow>
          <h2 className="m-0 mb-10 max-w-[900px] text-[34px] leading-[1.1] font-light md:mb-12 md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            Focus on what we can control and let the rest emerge
          </h2>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[56px]">
            <div>
              <p className="m-0 mb-5 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                When you&rsquo;re creating something genuinely new, the outcome isn&rsquo;t fully within your control. Empire of Light
                focuses instead on what you can influence: your vision, your actions, and the collective intelligence of the group. Results
                aren&rsquo;t ignored. They feed back into the system, helping you understand what to change and where to go next.
              </p>
              <p className="m-0 mb-5 text-[19px] font-semibold leading-[1.4]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                Reimagine. Do. Unlearn. Evolve. Repeat.
              </p>
              <p className="m-0 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                This cycle came out of my own personal transformation. It turns out to work just as well for teams and groups, which
                is why there are two ways in.
              </p>
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
        </div>
      </section>

      {/* The two paths */}
      <section id="paths" className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <Eyebrow>Choose your path</Eyebrow>
          <h2 className="m-0 mb-10 text-[30px] leading-[1.1] font-light md:text-[44px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            Unlock the future of your dreams
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PATHS.map((path) => (
              <Link
                key={path.to}
                to={path.to}
                className="flex flex-col rounded-2xl border p-8 md:p-10"
                style={{ borderColor: '#D8D2DC', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}
              >
                <Eyebrow>{path.eyebrow}</Eyebrow>
                <h3 className="m-0 mb-4 text-[26px] leading-[1.15] font-light md:text-[32px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                  {path.title}
                </h3>
                <p className="m-0 mb-7 text-[16px] leading-[1.62] md:text-[17px]" style={{ color: '#544D5A' }}>
                  {path.body}
                </p>
                <span className="mt-auto text-[14px] font-semibold uppercase tracking-[0.1em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                  {path.cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Go deeper: thesis + living proof */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto grid max-w-[1120px] gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border p-8 md:p-10" style={{ borderColor: '#D8D2DC', background: '#FDFAF4' }}>
            <div className="mb-6" style={{ color: '#D99A22' }}>
              <OctopusIcon size={40} />
            </div>
            <Eyebrow>The thesis</Eyebrow>
            <h3 className="m-0 mb-4 text-[24px] leading-[1.2] font-light md:text-[28px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
              We need new ways of operating
            </h3>
            <p className="m-0 mb-7 text-[16px] leading-[1.62] md:text-[17px]" style={{ color: '#544D5A' }}>
              People are tired, and no one is going to save us. Here&rsquo;s the working theory behind Empire of Light: why we
              can&rsquo;t keep repeating old patterns, and what it could look like to build on collective intelligence and
              unconditional love instead.
            </p>
            <Link to="/thesis" className="mt-auto text-[14px] font-semibold uppercase tracking-[0.1em]" style={DISPLAY}>
              Read the full thesis &rarr;
            </Link>
          </div>
          <div className="flex flex-col rounded-2xl border p-8 md:p-10" style={{ borderColor: '#D8D2DC', background: '#FDFAF4' }}>
            <img
              src={founderPhoto}
              alt="Kelly, founder of Empire of Light"
              width={143}
              height={223}
              className="mb-6 block rounded-xl object-cover"
              style={{ height: 96, width: 62 }}
            />
            <Eyebrow>Living proof</Eyebrow>
            <h3 className="m-0 mb-4 text-[24px] leading-[1.2] font-light md:text-[28px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
              It started when my life fell apart
            </h3>
            <p className="m-0 mb-7 text-[16px] leading-[1.62] md:text-[17px]" style={{ color: '#544D5A' }}>
              Burnout, divorce, a layoff all at once, and the rebuilding that followed. I noticed a pattern in how I was
              transforming my life, and I&rsquo;ve since watched that same pattern help teams move together differently. This is
              where I keep the proof, and it keeps growing.
            </p>
            <Link to="/living-proof" className="mt-auto text-[14px] font-semibold uppercase tracking-[0.1em]" style={DISPLAY}>
              See the living proof &rarr;
            </Link>
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
          <h2 className="m-0 mb-6 text-[34px] leading-[1.1] font-light md:text-[52px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            Find your starting point
          </h2>
          <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-[1.55] md:text-[19px]" style={{ color: 'rgba(251,247,242,.72)' }}>
            Book a conversation, and we&rsquo;ll help you work out where to begin.
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
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
