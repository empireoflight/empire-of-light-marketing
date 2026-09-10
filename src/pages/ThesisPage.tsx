import { Link } from 'react-router-dom'
import heartModel from '../assets/landing/heart-model.webp'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, OctopusIcon, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const REVOLUTIONS = [
  {
    label: 'Technological revolution',
    body: 'Artificial intelligence is rapidly changing how work gets done, and what work is even for.',
  },
  {
    label: 'Cultural revolution',
    body: 'People are craving community, connection, meaningful work, and a life that feels good now, not someday. More people are questioning old definitions of success and expanding their sense of what’s possible.',
  },
  {
    label: 'Geopolitical revolution',
    body: 'People are increasingly questioning systems that weren’t built for the benefit of most humans. The wealth gap is growing, trust in institutions is declining, and many people are tired of working this hard for so little reward.',
  },
]

const CYCLE_STAGES = [
  {
    n: '01',
    title: 'Reimagine',
    subtitle: 'Clarify Vision',
    body: 'Connect with what feels meaningful, alive, and worth creating, through presence rather than analysis. What future are we creating? Why does it matter? What values guide us? A compelling vision becomes an organizing force that aligns decisions across the whole system.',
  },
  {
    n: '02',
    title: 'Do',
    subtitle: 'Take Aligned Action',
    body: 'Act before certainty. Individuals begin acting from the identity they’re becoming: experimenting, committing, building something. Small experiments generate learning while creating forward momentum. Progress emerges through cycles of action, not perfect planning.',
  },
  {
    n: '03',
    title: 'Unlearn',
    subtitle: 'Integrate Friction',
    body: 'Meet uncertainty, limitation, friction, and grief. In individuals, this can show up as fear, limiting beliefs, or emotional and somatic activation. In organizations, it can show up as conflict, misalignment, communication breakdowns, or protective behaviors. Practices like reflection, somatic regulation, facilitated dialogue, and structured sensemaking help teams metabolize friction instead of getting trapped by it.',
  },
  {
    n: '04',
    title: 'Evolve',
    subtitle: 'Express & Evolve',
    body: 'Integrate what has been learned. As learning accumulates, teams celebrate progress, refine their vision, and begin the next cycle from a higher level of collective capability. Creativity becomes evidence that the system has developed new capacity.',
  },
]

const SCALING_BODY = [
  'Consider what that looks like in practice: an individual clarifying a personal vision, a leadership team clarifying a strategic vision, a startup clarifying a product vision.',
  'This opens up a larger possibility: what if the inner work traditionally done by individuals could become a collective capability?',
  'This is the premise of lightwork at scale.',
  'Lightwork is, at its core, the practice of bringing awareness, intention, and love to the places where we’re operating unconsciously, so we can transform rather than simply reproduce old patterns.',
  'At scale, that means creating the conditions for groups to do the same thing together: surface what is really happening, work through the friction that keeps people disconnected, reconnect with what matters, and channel that energy toward something they want to create.',
  'The framework is especially well-suited to group transformation. The visions can be bigger, the actions more impactful, and the friction work is often easier to do collectively. Group dynamics surface hidden assumptions, competing mental models, and relationship patterns that don’t come to the surface as easily in individual work alone.',
  'Empire of Light isn’t a replacement for individual therapeutic work or 1:1 therapy. It’s a practical framework for helping groups transform together while building something meaningful.',
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

const APPLICATIONS = [
  'AI transformation initiatives',
  'Leadership teams',
  'Product organizations',
  'Cross-functional innovation groups',
  'Research collaborations',
  'Community initiatives',
  'Regenerative business ecosystems',
  'Incubators and interdisciplinary design teams',
]

const RESEARCH_QUESTIONS = [
  'Under what conditions does collective transformation emerge?',
  'How can collective intelligence be measured?',
  'What role does vision play in sustaining adaptation?',
  'Which facilitation practices most effectively help teams metabolize friction?',
  'How can AI support, not replace, the uniquely human capacities that enable collective transformation?',
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
        title="The Empire of Light Thesis | A Theory of Collective Transformation"
        description="How shifts in individual consciousness translate into collective transformation within organizational systems — the research and framework behind Empire of Light."
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
            A Theory of Collective Transformation
          </h1>
          <p className="mx-auto m-0 max-w-[600px] text-[17px] leading-[1.55]" style={{ color: 'rgba(251,247,242,.72)' }}>
            How shifts in individual consciousness translate into collective transformation within organizational systems.
          </p>
        </div>
      </section>

      {/* Why this matters now */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="Why this matters now" title="Organizations are facing a convergence of forces unlike anything in recent history" />
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
              The pace of change is accelerating, but most organizations still operate on models designed for an old paradigm.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              At the same time, people have been doing a tremendous amount of their own expansion work: becoming more conscious, healing
              old patterns, reconnecting with what matters, imagining different ways of living and working. That work matters, but
              eventually we reach the limits of what we can transform on our own.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              If we want a different future, we have to change the systems we&rsquo;re part of, and we have to change them together.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              We don&rsquo;t need to transform everything at once. We can start by creating{' '}
              <strong style={{ color: '#131114', fontWeight: 600 }}>pockets of light</strong>: teams, organizations, and communities where
              people work differently, with more trust, connection, creativity, meaning, and collective intelligence.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              We create one pocket of light, then another, and then another. Over time, those pockets start to form a pattern, and
              patterns are what eventually shift systems.
            </p>
            <p className="m-0 text-[16px] font-semibold leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              This is lightwork at scale: taking the work of individual transformation into the places where we create the future
              together.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              Transformation is a process of adaptation, not simply a problem to solve, and the next generation of organizations will
              need an operating system that develops collective intelligence alongside strategy and execution.
            </p>
          </div>
        </div>
      </section>

      {/* The insight */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[840px]">
          <SectionHeading
            eyebrow="The insight"
            title="Individual and collective transformation follow the same underlying adaptive pattern"
            color="#FEE16A"
          />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Through four years of observing my own transformation, combined with product strategy practice and organizational
              facilitation, I began to notice a recurring pattern: meaningful change didn&rsquo;t happen through a linear progression
              from insight to action. It emerged through a continual movement between imagining what could be, acting toward it,
              encountering friction, letting go of what no longer fit, and integrating what was learned.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              I call this pattern Reimagine &rarr; Do &rarr; Unlearn &rarr; Evolve. This currently represents a working theory, refined
              through direct practice rather than a finished, proven model.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              <strong style={{ color: '#FBF7F2', fontWeight: 600 }}>Thesis:</strong> Individual and collective transformation follow the
              same underlying adaptive pattern, moving from contraction and self-protection toward connection, creativity, and adaptive
              action. From a fear-based operating system to one rooted in trust, and at its deepest level, unconditional love.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              <strong style={{ color: '#FBF7F2', fontWeight: 600 }}>Proposed mechanism:</strong> A compelling vision provides enough
              motivational pull to sustain engagement through uncertainty, identity destabilization, and emotional processing, enabling
              adaptive reorganization at both the individual and collective level. What we learn becomes part of the next iteration of
              the vision.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Transformation, then, is less about moving cleanly from one state to another than about becoming capable of moving with
              what&rsquo;s emerging.
            </p>
          </div>
        </div>
      </section>

      {/* The framework */}
      <section id="framework" className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-12 grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <SectionHeading eyebrow="The Empire of Light Framework" title="Reimagine → Do → Unlearn → Evolve" />
              <p className="m-0 mb-4 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
                The Empire of Light Framework is an adaptive cycle, a heart model, for helping individuals and groups translate vision
                into reality while continuously learning and evolving.
              </p>
              <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
                Vision has to come first. You can&rsquo;t ask anyone to let go of old patterns in service of nothing; it&rsquo;s the pull
                of a real vision that makes unlearning possible.
              </p>
            </div>
            <img
              src={heartModel}
              alt="The Empire of Light heart model — Reimagine, Do, Unlearn, Evolve"
              width={750}
              height={549}
              className="block w-full rounded-2xl object-cover"
              style={{ aspectRatio: '750 / 549' }}
            />
          </div>
          <div
            className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-2"
            style={{ background: '#D8D2DC', borderColor: '#D8D2DC' }}
          >
            {CYCLE_STAGES.map((stage) => (
              <div key={stage.n} className="p-8" style={{ background: '#FFFFFF' }}>
                <div className="mb-5 text-[13px] font-semibold tracking-[0.16em]" style={{ ...DISPLAY, color: '#A96D0F' }}>
                  {stage.n} &middot; {stage.subtitle}
                </div>
                <h3 className="m-0 mb-3 text-[22px] font-semibold tracking-[0.03em] md:text-[24px]" style={{ ...DISPLAY, color: '#131114' }}>
                  {stage.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.65]" style={{ color: '#544D5A' }}>
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-center text-[15px]" style={{ color: '#8C8492' }}>
            The phases aren&rsquo;t steps to complete so much as capacities to cultivate.
          </p>
        </div>
      </section>

      {/* Scaling / lightwork at scale */}
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

      {/* Collective intelligence as an OS */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="Collective intelligence as an operating system" title="Strategy, execution, and adaptation aren’t separate functions" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              Traditional management systems are good at organizing work. They&rsquo;re much less effective at organizing attention,
              energy, meaning, and adaptation.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              Empire of Light proposes that organizations should intentionally cultivate collective intelligence: the ability of a group
              to perceive reality accurately, coordinate action effectively, generate novel solutions, and continuously adapt together. In
              this model, strategy, execution, emotional regulation, learning, and creativity aren&rsquo;t separate functions so much as
              parts of one adaptive system.
            </p>
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
          <div className="flex flex-col gap-5 text-left">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              Picture the Empire of Light mascot: an octopus, a living symbol of collective intelligence when it&rsquo;s working. Now
              imagine an octopus whose hearts and brains aren&rsquo;t on the same page. It tries to camouflage itself and instead flashes
              through seven different colors at once, giving away exactly the confusion it&rsquo;s trying to hide.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              That&rsquo;s how most organizations run. Internal friction, the misalignment between the hearts and brains of a team, gets
              in the way of external progress. Empire of Light exists to help teams become one unified octopus: many arms, one nervous
              system, moving as a whole.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-9 max-w-[720px]">
            <SectionHeading eyebrow="Applications" title="The framework applies wherever groups are trying to create meaningful change" />
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              The same operating system adapts to each context:
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {APPLICATIONS.map((item) => (
              <div key={item} className="rounded-full px-5.5 py-3 text-[14px] font-medium md:text-[15px]" style={{ background: '#FFFFFF', border: '1px solid #D8D2DC', color: '#131114' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI era */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="A human operating system for the AI era" title="Strengthen the human system first. Then technology amplifies it." color="#FEE16A" />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Artificial intelligence amplifies both capability and complexity. Most organizations respond by investing primarily in
              technology. Empire of Light proposes the opposite sequence: strengthen the human operating system first, so technology
              becomes an amplifier rather than a source of fragmentation.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              Instead of replacing human judgment, AI becomes a partner in cultivating collective intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Research agenda */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[840px]">
          <SectionHeading eyebrow="A research agenda" title="This framework is a working theory" />
          <p className="m-0 mb-6 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
            Empire of Light isn&rsquo;t a finished model: it&rsquo;s a working theory to be tested, refined, and potentially falsified
            through practice and research. Open questions include:
          </p>
          <div className="flex flex-col gap-4">
            {RESEARCH_QUESTIONS.map((q) => (
              <div key={q} className="flex items-start gap-3.5">
                <div className="mt-2.5 h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: '#D99A22' }} />
                <div className="text-[16px] leading-[1.6] md:text-[17px]" style={{ color: '#131114' }}>
                  {q}
                </div>
              </div>
            ))}
          </div>
          <p className="m-0 mt-6 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
            Empire of Light is an invitation to investigate these questions through practice.
          </p>
        </div>
      </section>

      {/* The invitation + CTA */}
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[112px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            The invitation
          </div>
          <div className="mx-auto mb-7 flex max-w-[620px] flex-col gap-4 text-left">
            <p className="m-0 text-[15.5px] leading-[1.65] md:text-[16.5px]" style={{ color: 'rgba(251,247,242,.72)' }}>
              If individual and collective transformation share an underlying adaptive pattern, then organizations can intentionally
              create the conditions for that pattern to occur, building practices that make vision visible, action experimental,
              friction discussable, learning safe, and adaptation continuous.
            </p>
            <p className="m-0 text-[15.5px] leading-[1.65] md:text-[16.5px]" style={{ color: 'rgba(251,247,242,.72)' }}>
              Perhaps this is the opportunity of this particular moment. We&rsquo;re becoming increasingly clear about what we
              don&rsquo;t want. The next step is less about fighting what&rsquo;s broken than about gathering, imagining, and building
              what we do want, together.
            </p>
          </div>
          <p className="m-0 mb-5 text-[18px] leading-[1.55] md:text-[21px] font-light" style={{ ...DISPLAY, color: 'rgba(251,247,242,.85)' }}>
            Imagine organizations where strategy, emotional intelligence, creativity, and execution are no longer separate disciplines:
            where meetings generate energy instead of draining it, conflict becomes a source of learning rather than division, and
            technology amplifies human potential instead of compensating for its absence.
          </p>
          <h2 className="m-0 mb-6 text-[30px] leading-[1.1] font-light md:text-[46px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            This is the future Empire of Light exists to build, starting now.
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
            <Link to="/about" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Meet Kelly
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
