import { Link } from 'react-router-dom'
import heartModel from '../assets/landing/heart-model.webp'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, OctopusIcon, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const REVOLUTIONS = [
  {
    label: 'Technological revolution',
    body: 'Artificial intelligence is changing how work gets done, and what work even is.',
  },
  {
    label: 'Consciousness/cultural revolution',
    body: 'People are craving community, connection, and a life that feels good now, not someday. People are questioning old definitions of success and expanding their sense of what is possible.',
  },
  {
    label: 'Geopolitical revolution',
    body: 'People are realizing that a lot of our systems and structures were not built for the benefit of most people, and they are starting to demand reform.',
  },
]

const CYCLE_STAGES = [
  {
    title: 'Reimagine',
    body: [
      'First you need a strong vision.',
      'What are we creating? Why does it matter? What would be possible if we weren’t constrained by the way things have always been done?',
      'A compelling vision gives people something to move toward. It helps a team stay connected through the uncertainty, friction, and identity shifts that come with trying something new.',
      'You can’t ask people to let go of old patterns in service of nothing. There needs to be something worth moving toward.',
    ],
  },
  {
    title: 'Do',
    body: [
      'Then you need to take coordinated action to move toward that vision.',
      'This is where modern spirituality can sometimes lead people astray. It is not enough to just change your frequency. You also have to take action to make your visions come true.',
      'In teams, that action needs to be coordinated. Act before certainty. Experiment. Build something. Try things. Learn by doing.',
      'The goal isn’t to perfectly predict the path to the outcome. It is to start moving and see what happens.',
    ],
  },
  {
    title: 'Unlearn',
    body: [
      'As we take action, fear, doubt, and uncertainty rise to the surface. I call this shadow work. You can call it whatever you want.',
      'In individuals, this can show up as fear, limiting beliefs, uncertainty, or dysregulation. In teams, it surfaces as friction, conflict, misalignment, communication breakdowns, politics, or protective behaviors.',
      'We can address this stuff proactively to help both individuals and teams grow. Like feedback, shadow information is a gift if used properly. It helps us see what isn’t working, where we’re misaligned, and what we may need to let go of.',
      'The goal isn’t to eliminate friction. It’s to become better at working with it.',
    ],
  },
  {
    title: 'Evolve',
    body: [
      'Finally, we use what we’ve learned to evolve. We look at the team vibe, the things that surfaced through the shadow work, and the results of our experiments. We use all of that information to improve the vision and improve the way we work together.',
      'Results and data still matter. They tell us what happened. But they aren’t the thing we control. They are feedback that helps us decide what to try next.',
      'The team starts the next cycle with more awareness and more capability than it had before.',
      'That is how transformation happens. Not by following a perfect plan, but by becoming better at sensing, acting, learning, and evolving together.',
    ],
  },
]

const WHY_BETTER = [
  {
    title: 'Rooted in unconditional love',
    body: 'A purpose greater than any individual, and a direction to move toward together, makes difficult conversations possible without collapsing into blame. It’s a shift from operating through protection to operating through connection, keeping hard conversations in service of growth.',
  },
  {
    title: 'Vision- and action-oriented',
    body: 'Traditional linear goal-setting is too slow for this era. This approach gives teams a nimbler way to manage change, tap into collective intelligence, and iterate. It unlocks flow by giving people something meaningful to move toward while allowing the path to emerge through action.',
  },
  {
    title: 'Heart as a compass, data as a lagging indicator',
    body: 'Data is backward-looking; it can tell you what has happened, but it cannot tell you what wants to emerge. This approach helps teams determine where to move and treats data as confirmation that the system is working. Teams that only look at data tend to make incremental changes. Meaningful transformation requires the capacity to sense and act on what has not yet been measured.',
  },
]

const SCALING_BODY = [
  'An individual can clarify a personal vision, take action, encounter friction, unlearn old patterns, and evolve.',
  'A leadership team can clarify a strategic vision, take coordinated action, encounter organizational friction, unlearn old ways of working, and evolve.',
  'A product team can do the same thing around a product vision.',
  'This opens up a larger possibility: what if the inner work traditionally done by individuals could become a collective capability? That is the premise of lightwork at scale.',
  'Group dynamics surface hidden assumptions, competing mental models, and relationship patterns that don’t always come to the surface in individual work. When we learn to work with those things together, they can become a source of collective intelligence rather than a source of dysfunction.',
  'Collective intelligence is our ability to see what’s really happening, coordinate around what matters, generate ideas together, and adapt as we learn.',
  'This is where I think the really exciting stuff starts.',
]

const APPLICATIONS_INDIVIDUAL = [
  'AuDHD unmasking',
  'Navigating spiritual awakening',
  'Navigating a career or life pivot',
  'Creating a new vision for how you want to live and work',
]

const APPLICATIONS_GROUPS = [
  'Navigating a company pivot or leadership change',
  'AI transformation initiatives',
  'Cross-functional innovation teams',
  'Product or GTM teams that need to come together around a unified vision',
  'Interdisciplinary think tanks',
  'Research collaborations',
  'Community-building projects',
  'Innovation teams working on something new together',
  'Incubators and interdisciplinary design teams',
  'Regenerative business ecosystems',
]

function SectionHeading({ eyebrow, title, color }: { eyebrow: string; title: string; color?: string }) {
  return (
    <>
      <Eyebrow color={color}>{eyebrow}</Eyebrow>
      <h2
        className="m-0 mb-6 text-[28px] leading-[1.1] font-light md:text-[38px] md:leading-[1.06]"
        style={{ ...DISPLAY, letterSpacing: '.02em', color: color === '#FEE16A' ? '#FBF7F2' : '#131114' }}
      >
        {title}
      </h2>
    </>
  )
}

export default function ThesisPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="The Empire of Light Thesis | A Team Operating System for Collective Transformation"
        description="Empire of Light is a team operating system for collective transformation — the methodology behind how teams reimagine what's possible, take action, unlearn old patterns, and evolve together."
        path="/thesis"
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
            Empire of Light Thesis
          </div>
          <h1
            className="m-0 mb-6 text-[36px] leading-[1.1] font-light md:text-[54px] md:leading-[1.06]"
            style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}
          >
            A Team Operating System for Collective Transformation
          </h1>
          <p className="mx-auto m-0 max-w-[600px] text-[17px] leading-[1.55]" style={{ color: 'rgba(251,247,242,.72)' }}>
            How teams reimagine what&rsquo;s possible, take action, unlearn old patterns, and evolve together.
          </p>
        </div>
      </section>

      {/* Why now */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="Why now?" title="We’re experiencing a convergence of forces unlike anything in recent human history" />
          <div className="mb-8 flex flex-col gap-4.5">
            {REVOLUTIONS.map((r) => (
              <div key={r.label} className="flex items-start gap-3.5">
                <div className="mt-2.5 h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: '#D99A22' }} />
                <div className="text-[16px] leading-[1.6] md:text-[17px]" style={{ color: '#131114' }}>
                  <strong style={{ fontWeight: 600 }}>{r.label}.</strong> {r.body}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4.5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              This raises a bigger question: how do we actually change collectively? How do we show up differently and make sure we
              don&rsquo;t keep repeating the same patterns that humans tend to repeat?
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              We need new ways of operating that help us reimagine what&rsquo;s possible, take action toward it, unlearn the patterns
              that get in the way, and evolve as we learn.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              Empire of Light is a team operating system for collective transformation. It helps teams reimagine what&rsquo;s possible,
              move toward it, unlearn old patterns that are getting in the way, and evolve as the team learns.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              We don&rsquo;t have to transform everything at once. We can start by creating{' '}
              <strong style={{ color: '#131114', fontWeight: 600 }}>pockets of light</strong>: teams, organizations, and communities
              where people work differently, with more trust, connection, creativity, meaning, and collective intelligence.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              Create one pocket of light, then another, then another. Over time, those pockets become patterns. And patterns are how
              systems change.
            </p>
          </div>
        </div>
      </section>

      {/* Why the Empire */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="Why the Empire?" title="A model for lightwork at scale" color="#FEE16A" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              The Empire of Light methodology is essentially a model for lightwork at scale.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Lightwork is the practice of bringing awareness, intention, and love to the places where we&rsquo;re operating
              unconsciously, so we can transform rather than simply reproduce old patterns.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Typically, people do this on an individual level through individual expansion work. Maybe they meditate or participate in
              other consciousness expansion practices. They work on themselves, become more conscious, heal old patterns, reconnect
              with what matters, and expand their sense of what&rsquo;s possible.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              That work matters. But eventually, we reach the limits of what we can transform on our own.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              You can change everything you can about yourself, yet the world around you may still be operating on old paradigms that
              no longer fit.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#FBF7F2' }}>
              That is where lightwork at scale comes in.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              How awesome could the world be if we did this work together, in groups? What kind of awesome stuff could we bring into
              the world? How much could we change things for the better?
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              I believe the answer is beyond our wildest dreams, especially if we learn to harness the power of our collective
              intelligence.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Our existing global paradigm largely runs on fear and scarcity, and there is a lot of fear baked deeply into our systems
              and our ways of being. Empire of Light is a movement to shine light on these areas so we can learn and evolve.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#FBF7F2' }}>
              So we can build a society rooted in unconditional love, where human flourishing and personal results are not at odds.
            </p>
          </div>
        </div>
      </section>

      {/* The methodology */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="The Methodology" title="This methodology arose from my own transformation process" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              I&rsquo;ve documented my transformation process over the past five years as I personally moved from a more fear-based
              existence to one more rooted in self-trust and unconditional love.
            </p>
            <Link to="/origin-story" className="text-[14px] font-semibold uppercase tracking-[0.1em]" style={DISPLAY}>
              Read the origin story &rarr;
            </Link>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              I also experimented with these concepts in the teams I managed, and I noticed that individual and group transformation
              follow a similar pattern:
            </p>
            <p className="m-0 text-[22px] font-semibold leading-[1.4] md:text-[26px]" style={{ ...DISPLAY, color: '#A96D0F' }}>
              Reimagine &rarr; Do &rarr; Unlearn &rarr; Evolve
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              This isn&rsquo;t a linear process. These are capacities to cultivate. They can come together in different ways as people
              and teams move through change.
            </p>
          </div>
          <img
            src={heartModel}
            alt="The Empire of Light heart model — Reimagine, Do, Unlearn, Evolve"
            width={750}
            height={549}
            className="mt-10 block w-full rounded-2xl object-cover"
            style={{ aspectRatio: '750 / 549' }}
          />
          <div className="mt-14 flex flex-col gap-12">
            {CYCLE_STAGES.map((stage) => (
              <div key={stage.title}>
                <h3 className="m-0 mb-3 text-[22px] font-semibold tracking-[0.03em] md:text-[24px]" style={{ ...DISPLAY, color: '#131114' }}>
                  {stage.title}
                </h3>
                <div className="flex flex-col gap-4">
                  {stage.body.map((p) => (
                    <p key={p} className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this works better */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading eyebrow="Why this works differently" title="Three principles that set this framework apart" color="#FEE16A" />
          <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ background: 'rgba(251,247,242,.14)', borderColor: 'rgba(251,247,242,.14)' }}>
            {WHY_BETTER.map((item) => (
              <div key={item.title} className="p-8" style={{ background: '#0C0A0D' }}>
                <h3 className="m-0 mb-3 text-[19px] font-semibold" style={{ ...DISPLAY, color: '#FBF7F2' }}>
                  {item.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'rgba(251,247,242,.7)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From individual transformation to lightwork at scale */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="From individual transformation to lightwork at scale" title="The same adaptive cycle operates at multiple scales" />
          <div className="flex flex-col gap-5">
            {SCALING_BODY.map((p, i) => (
              <p key={i} className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* The octopus */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px] text-center">
          <div className="mb-8 flex justify-center" style={{ color: '#D99A22' }}>
            <OctopusIcon size={46} />
          </div>
          <Eyebrow>The octopus: a symbol for Empire of Light</Eyebrow>
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
            Empire of Light&rsquo;s mascot is an octopus: nine brains, one body &mdash; a living symbol of collective intelligence when
            it&rsquo;s in sync, and a dead giveaway of confusion when it&rsquo;s not. That&rsquo;s the pattern this framework exists to
            fix: many arms, one nervous system, moving as a whole.
          </p>
        </div>
      </section>

      {/* Applications */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-9 max-w-[720px]">
            <SectionHeading eyebrow="Applications" title="This methodology can work with individuals and groups" />
          </div>
          <div className="mb-9">
            <div className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
              For individuals
            </div>
            <div className="flex flex-wrap gap-3">
              {APPLICATIONS_INDIVIDUAL.map((item) => (
                <div key={item} className="rounded-full px-5.5 py-3 text-[14px] font-medium md:text-[15px]" style={{ background: '#FFFFFF', border: '1px solid #D8D2DC', color: '#131114' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-9">
            <div className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
              For groups
            </div>
            <div className="flex flex-wrap gap-3">
              {APPLICATIONS_GROUPS.map((item) => (
                <div key={item} className="rounded-full px-5.5 py-3 text-[14px] font-medium md:text-[15px]" style={{ background: '#FFFFFF', border: '1px solid #D8D2DC', color: '#131114' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="m-0 max-w-[720px] text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
            The framework adapts to the context. The underlying pattern stays the same.
          </p>
        </div>
      </section>

      {/* Why this matters for the AI era */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="Why this matters for the AI era" title="Strengthen the human system first. Then technology can amplify it." color="#FEE16A" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              AI is going to amplify whatever human systems we already have.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              If our teams are fragmented, fearful, and misaligned, AI can amplify that. If our teams are connected, creative, and
              capable of learning together, AI can amplify that too.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#FBF7F2' }}>
              The opportunity isn&rsquo;t just to build better AI. It&rsquo;s to build better human systems for working with it.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Empire of Light is a human operating system for the AI era, starting with the teams and groups that are actually
              building the future.
            </p>
          </div>
        </div>
      </section>

      {/* A working theory */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="A working theory" title="This is a working theory, not a finished model" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              I don&rsquo;t think Empire of Light is a finished model.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              It is a working theory that has emerged from my own transformation, my experience bringing products and teams to life,
              and my experiments with these ideas in groups.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              The point isn&rsquo;t to prove that this is the way transformation works.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              The point is to see what happens when we intentionally create the conditions for people and teams to transform
              together.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              Then learn from what happens. Then evolve the model.
            </p>
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[112px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto max-w-[680px] text-center">
          <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            Join us
          </div>
          <div className="mx-auto mb-7 flex max-w-[560px] flex-col gap-4 text-left">
            <p className="m-0 text-[15.5px] leading-[1.65] md:text-[16.5px]" style={{ color: 'rgba(251,247,242,.72)' }}>
              The future won&rsquo;t be built for us. We have to build it. Empire of Light is an operating system that can help us
              get started.
            </p>
            <p className="m-0 text-[15.5px] leading-[1.65] md:text-[16.5px]" style={{ color: 'rgba(251,247,242,.72)' }}>
              The empire is not here to dominate. It is here to illuminate the path forward.
            </p>
          </div>
          <h2 className="m-0 mb-9 text-[34px] leading-[1.1] font-light md:text-[52px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            Join us.
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('thesis_cta')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
            >
              Book a conversation
            </a>
            <Link to="/" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Learn about our product
            </Link>
            <Link to="/origin-story" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Read the origin story
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
