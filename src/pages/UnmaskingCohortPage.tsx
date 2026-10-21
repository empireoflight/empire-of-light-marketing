import { Link } from 'react-router-dom'
import heartModel from '../assets/landing/heart-model.webp'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const TRANSITIONS = [
  'Discovering you’re neurodivergent later in life',
  'The end of a marriage',
  'Another major life transition',
]

const INCLUDES = [
  'A six-week group experience',
  'Guided vision-setting and individual reflection',
  'Experiments to help you bring your vision into everyday life',
  'Space to explore the friction, patterns, and discoveries that emerge',
  'A community of people navigating their own next chapters',
  'Access to the Empire of Light app and methodology',
]

const CYCLE = [
  { stage: 'Reimagine', body: 'Set a vision for what you want your life to feel like, even if it’s still fuzzy.' },
  { stage: 'Do', body: 'Run small experiments that start bringing that vision into everyday life.' },
  { stage: 'Unlearn', body: 'Notice and work through the friction, fear, and old patterns that come up.' },
  { stage: 'Evolve', body: 'Learn from what happened, and let your vision grow with you.' },
]

export default function UnmaskingCohortPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Group Unmasking Cohort | Empire of Light"
        description="A six-week group experience for people navigating a major life change. Explore a vision for what's next, experiment with living into it, and work through the friction together."
        path="/unmasking-cohort"
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-[120px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.5,
          }}
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <div className="mb-7 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            Group Unmasking Cohort
          </div>
          <h1
            className="m-0 mb-7 text-[36px] leading-[1.1] font-light md:text-[50px] lg:text-[60px] lg:leading-[1.06]"
            style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}
          >
            You know this life ain&rsquo;t it. But you&rsquo;re not quite sure what comes next.
          </h1>
          <p className="mx-auto mb-10 max-w-[640px] text-[18px] leading-[1.5] md:text-[21px]" style={{ color: 'rgba(251,247,242,.78)' }}>
            A group experience for figuring out who you actually are and what you actually want, and for starting to live into it,
            with other people doing the same.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link to="/lets-chat" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}>
              Ask about the next cohort
            </Link>
            <a href="#how" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <Eyebrow>Who it&rsquo;s for</Eyebrow>
          <div className="mb-8 flex flex-wrap gap-3">
            {TRANSITIONS.map((item) => (
              <div
                key={item}
                className="rounded-full border px-5 py-3 text-[15px] font-medium md:text-[16px]"
                style={{ borderColor: '#D8D2DC', background: '#FFFFFF', color: '#131114' }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#131114' }}>
              Maybe you discovered later in life that you&rsquo;re neurodivergent. Maybe your marriage ended. Maybe something happened
              that made you realize the life you&rsquo;ve been living doesn&rsquo;t feel like yours anymore.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
              Whatever brought you here, you know something needs to change. But figuring out who you are, what you actually want,
              and how to get there can feel overwhelming when everything you&rsquo;ve known is being called into question.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
              Most of us know who we don&rsquo;t want to be. That&rsquo;s a real starting point. The cohort helps you work out who you
              do want to be, and start becoming that person.
            </p>
          </div>
        </div>
      </section>

      {/* How it works: the cycle */}
      <section id="how" className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FFFFFF' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[56px]">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="m-0 mb-6 text-[30px] leading-[1.1] font-light md:text-[40px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                You don&rsquo;t have to figure it all out before you begin
              </h2>
              <p className="m-0 mb-5 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                Together, we explore our visions for what&rsquo;s next, experiment with ways to start living into them now, navigate
                the friction that comes with trying something new, and evolve our visions as we learn about ourselves and each other.
              </p>
              <p className="m-0 text-[17px] leading-[1.62] md:text-[18px]" style={{ color: '#544D5A' }}>
                It&rsquo;s the same cycle I used to rebuild my own life, and the same one teams use in the Team Program. The group
                matters here: watching other people move through their own visions, friction, and experiments widens what feels
                possible for each of us.
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
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {CYCLE.map((item, i) => (
              <div key={item.stage} className="rounded-xl border p-7" style={{ borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}>
                <div className="mb-3 text-[13px] font-semibold tracking-[0.16em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                  0{i + 1}
                </div>
                <h3 className="m-0 mb-3 text-[20px] font-semibold leading-[1.26]" style={{ ...DISPLAY, color: '#131114' }}>
                  {item.stage}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.62]" style={{ color: '#544D5A' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div
            className="grid items-center gap-10 rounded-[20px] px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16 md:px-12 md:py-14"
            style={{ background: 'linear-gradient(90deg,#FFF6AD 0%,#FFD0D3 50%,#FFA9F8 100%)' }}
          >
            <div>
              <Eyebrow>What&rsquo;s included</Eyebrow>
              <h2 className="m-0 text-[26px] leading-[1.1] font-light md:text-[34px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
                Six weeks, together
              </h2>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 rounded-[20px] p-8 md:p-10" style={{ background: '#FFFFFF' }}>
              {INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[1.5]" style={{ color: '#131114' }}>
                  <span className="mt-[9px] h-[7px] w-[7px] flex-none rounded-full" style={{ background: '#D99A22' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[112px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <h2 className="m-0 mb-6 text-[30px] leading-[1.1] font-light md:text-[46px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            If you&rsquo;re ready to stop forcing a life that doesn&rsquo;t fit, and start discovering what does
          </h2>
          <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-[1.55] md:text-[19px]" style={{ color: 'rgba(251,247,242,.72)' }}>
            This group is for you. Tell us a little about where you are, and we&rsquo;ll share details on the next cohort.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/lets-chat" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}>
              Ask about the next cohort
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('cohort_page')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={secondaryButtonOnDark}
            >
              Book a conversation
            </a>
          </div>
          <p className="mt-6 text-[14px]" style={{ color: 'rgba(251,247,242,.5)' }}>
            Here with a team?{' '}
            <Link to="/teams" style={{ color: '#FEE16A' }}>
              Explore the Team Program &rarr;
            </Link>
            {' '}&middot;{' '}
            <Link to="/living-proof" style={{ color: '#FEE16A' }}>
              See where this came from &rarr;
            </Link>
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
