import { Link } from 'react-router-dom'
import founderPhoto from '../assets/origin-story/founder-photo-origin.jpg'
import art1 from '../assets/origin-story/art-1.jpg'
import art2 from '../assets/origin-story/art-2.jpg'
import art3 from '../assets/origin-story/art-3.jpg'
import art4 from '../assets/origin-story/art-4.jpg'
import art5 from '../assets/origin-story/art-5.jpg'
import art6 from '../assets/origin-story/art-6.jpg'
import art7 from '../assets/origin-story/art-7.jpg'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { BOOKING_URL, DISPLAY, Eyebrow, primaryButton, secondaryButtonOnDark, trackBooking } from '../components/shared'

const QUESTIONS = [
  'How much better would companies be if they focused on heart over fear?',
  'If a resonant, deeply human, value-based vision held the team together.',
  'If performance reviews weren’t about competition against one another but about how to make the whole organism better?',
  'If trust and unconditional love were the defaults, not fear and scarcity.',
]

const ART_TIMELINE = [
  { src: art1, date: '2023-02-01' },
  { src: art2, date: '2023-08-01' },
  { src: art3, date: '2024-02-01' },
  { src: art4, date: '2024-09-01' },
  { src: art5, date: '2025-04-01' },
  { src: art6, date: '2026-01-01' },
  { src: art7, date: '2026-06-01' },
]

type StageKey = 'reimagine' | 'do' | 'unlearn' | 'evolve'

const STAGES: { key: StageKey; label: string }[] = [
  { key: 'reimagine', label: 'Reimagine — Vision' },
  { key: 'do', label: 'Do — Take Action' },
  { key: 'unlearn', label: 'Unlearn — Shadow & Integration' },
  { key: 'evolve', label: 'Evolve — Create & Evolve' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Vision: '#D99A22',
  'Major life event': '#3A3540',
  Travel: '#2E9C93',
  'Medical/substance change': '#8B5FBF',
  'Relationship experiment': '#C9499C',
  'Type of therapy': '#3D7EBF',
  Somatic: '#C1663D',
  'Create & evolve': '#6B9B3F',
}

interface LifeEvent {
  name: string
  start: string
  end?: string
  stage: StageKey
  tag: keyof typeof CATEGORY_COLORS
}

// Real dates pulled from Kelly's own life-audit tracker, bucketed into the four cycle stages.
const LIFE_EVENTS: LifeEvent[] = [
  { name: 'Quit drinking', start: '2022-01-01', stage: 'do', tag: 'Medical/substance change' },
  { name: 'Start shuffle dancing', start: '2022-05-01', stage: 'do', tag: 'Somatic' },
  { name: 'Burnout moment', start: '2022-05-15', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Cleveland trip', start: '2022-08-28', stage: 'do', tag: 'Travel' },
  { name: 'Discovered AuDHD', start: '2022-09-15', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Start Vyvanse', start: '2022-10-21', stage: 'do', tag: 'Medical/substance change' },
  { name: 'Sudden divorce', start: '2023-02-20', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Whidbey Island', start: '2023-04-30', stage: 'do', tag: 'Travel' },
  { name: 'Psilocybin', start: '2023-04-30', stage: 'do', tag: 'Medical/substance change' },
  { name: 'Poland (Treblinka)', start: '2023-06-07', stage: 'do', tag: 'Travel' },
  { name: 'Serbia', start: '2023-06-13', stage: 'do', tag: 'Travel' },
  { name: 'Laid off from job', start: '2023-06-19', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Cleveland', start: '2023-07-04', stage: 'do', tag: 'Travel' },
  { name: 'Move to new area', start: '2023-04-30', stage: 'do', tag: 'Major life event' },
  { name: 'Whistler', start: '2023-07-15', stage: 'do', tag: 'Travel' },
  { name: 'Get off SSRIs', start: '2023-08-01', stage: 'unlearn', tag: 'Medical/substance change' },
  { name: 'Sell house', start: '2023-09-01', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Final divorce decree', start: '2023-10-04', stage: 'unlearn', tag: 'Major life event' },
  { name: 'Start new job', start: '2023-10-16', stage: 'do', tag: 'Major life event' },
  { name: 'Orcas Island', start: '2024-02-15', stage: 'do', tag: 'Travel' },
  { name: 'Portland', start: '2024-04-15', stage: 'do', tag: 'Travel' },
  { name: 'Cleveland', start: '2024-08-06', stage: 'do', tag: 'Travel' },
  { name: 'Croatia', start: '2024-08-28', stage: 'do', tag: 'Travel' },
  { name: 'Imagine Dragons', start: '2024-09-28', stage: 'do', tag: 'Travel' },
  { name: 'Get off Vyvanse', start: '2024-12-20', stage: 'unlearn', tag: 'Medical/substance change' },
  { name: 'Explore psilocybin', start: '2023-07-15', end: '2025-11-30', stage: 'do', tag: 'Medical/substance change' },
  { name: 'San Diego', start: '2025-02-15', stage: 'do', tag: 'Travel' },
  { name: 'Costa Rica', start: '2025-04-15', stage: 'do', tag: 'Travel' },
  { name: 'Get IUD removed', start: '2025-03-15', stage: 'unlearn', tag: 'Medical/substance change' },
  { name: 'Cleveland', start: '2025-07-04', stage: 'do', tag: 'Travel' },
  { name: 'Hampton, VA — Zeds Dead', start: '2025-11-15', stage: 'do', tag: 'Travel' },
  { name: 'Big Island', start: '2025-12-20', stage: 'do', tag: 'Travel' },
  { name: 'Quit job!', start: '2026-03-07', stage: 'do', tag: 'Major life event' },
  { name: 'Start Empire of Light', start: '2026-02-16', stage: 'do', tag: 'Major life event' },
  { name: 'Shuffle Vibe vision', start: '2022-05-30', end: '2025-05-30', stage: 'reimagine', tag: 'Vision' },
  { name: 'Twin Flame vision', start: '2023-06-15', end: '2025-12-31', stage: 'reimagine', tag: 'Vision' },
  { name: 'Healing Tunnel', start: '2023-04-30', end: '2026-01-01', stage: 'reimagine', tag: 'Vision' },
  { name: 'Empire of Light vision', start: '2024-07-15', end: '2026-08-11', stage: 'reimagine', tag: 'Vision' },
  { name: 'Matriarchal cohousing vision', start: '2025-06-30', end: '2026-08-11', stage: 'reimagine', tag: 'Vision' },
  { name: 'Explore online dating', start: '2023-03-15', end: '2024-02-15', stage: 'do', tag: 'Relationship experiment' },
  { name: 'Explore ENM', start: '2024-03-01', end: '2024-12-31', stage: 'do', tag: 'Relationship experiment' },
  { name: 'Host art nights', start: '2024-01-01', end: '2024-12-01', stage: 'do', tag: 'Relationship experiment' },
  { name: 'Explore celibacy', start: '2025-01-01', end: '2026-08-11', stage: 'do', tag: 'Relationship experiment' },
  { name: 'Somatic trauma therapy', start: '2022-01-01', end: '2023-12-01', stage: 'unlearn', tag: 'Type of therapy' },
  { name: 'AuDHD-informed therapy', start: '2024-01-01', end: '2025-01-01', stage: 'unlearn', tag: 'Type of therapy' },
  { name: 'CBD/THC', start: '2023-04-01', end: '2026-06-30', stage: 'do', tag: 'Medical/substance change' },
  { name: 'Shuffle dancing', start: '2022-05-01', end: '2025-06-30', stage: 'do', tag: 'Somatic' },
  { name: 'Mountain biking', start: '2023-06-01', end: '2025-06-01', stage: 'do', tag: 'Somatic' },
  { name: 'Gateway Experience', start: '2024-10-01', end: '2025-02-01', stage: 'do', tag: 'Somatic' },
  { name: 'Epigenetic core block clearings', start: '2025-04-15', end: '2026-03-15', stage: 'unlearn', tag: 'Somatic' },
  { name: 'TRE', start: '2023-06-30', end: '2023-09-01', stage: 'unlearn', tag: 'Somatic' },
  { name: 'Trigger point / foam roll', start: '2023-06-30', end: '2024-06-30', stage: 'unlearn', tag: 'Somatic' },
  { name: 'Start listening to house music', start: '2023-05-30', stage: 'do', tag: 'Somatic' },
  { name: 'Start listening to bass music', start: '2025-05-30', stage: 'do', tag: 'Somatic' },
  { name: 'Guitar', start: '2022-01-01', end: '2025-01-01', stage: 'evolve', tag: 'Somatic' },
  { name: 'Stim songs', start: '2024-10-15', end: '2025-12-31', stage: 'unlearn', tag: 'Create & evolve' },
  { name: 'Song making', start: '2024-03-01', end: '2024-06-30', stage: 'evolve', tag: 'Create & evolve' },
  { name: 'Experimental dubstep music', start: '2025-10-01', end: '2025-12-31', stage: 'evolve', tag: 'Create & evolve' },
]

// Hand-picked examples for categories where the default first-N pick wasn't the most representative.
const CATEGORY_EXAMPLE_OVERRIDES: Partial<Record<keyof typeof CATEGORY_COLORS, string[]>> = {
  Vision: ['Empire of Light vision', 'Matriarchal cohousing vision'],
  'Relationship experiment': ['Explore online dating', 'Host art nights'],
  Somatic: ['Shuffle dancing', 'Trauma Release Exercises', 'Epigenetic Core Block Clearings', 'Gateway Experience'],
}

// A few representative examples per category, shown in the legend instead of every logged event.
const CATEGORY_EXAMPLES: Record<string, string> = Object.fromEntries(
  Object.keys(CATEGORY_COLORS).map((tag) => {
    const names = Array.from(new Set(LIFE_EVENTS.filter((e) => e.tag === tag).map((e) => e.name)))
    const override = CATEGORY_EXAMPLE_OVERRIDES[tag as keyof typeof CATEGORY_COLORS]
    const shown = (override ?? names.slice(0, 3)).join(', ')
    const shownCount = override ? override.length : Math.min(names.length, 3)
    return [tag, names.length > shownCount ? `${shown}, +${names.length - shownCount} more` : shown]
  }),
)

const TIMELINE_PX = 2000
const TIMELINE_MARGIN = 90

// Parse as local midnight, not UTC — new Date('2022-01-01') is UTC midnight, which
// toLocaleDateString renders as the prior day in any timezone behind UTC.
function parseLocalDate(iso: string) {
  return new Date(`${iso}T00:00:00`)
}

const TIMELINE_START_MS = parseLocalDate('2022-01-01').getTime()
const TIMELINE_END_MS = parseLocalDate('2026-08-11').getTime()
const YEARS = [2022, 2023, 2024, 2025, 2026]

function dateToX(iso: string) {
  const t = parseLocalDate(iso).getTime()
  const clamped = Math.min(Math.max(t, TIMELINE_START_MS), TIMELINE_END_MS)
  const fraction = (clamped - TIMELINE_START_MS) / (TIMELINE_END_MS - TIMELINE_START_MS)
  return TIMELINE_MARGIN + fraction * (TIMELINE_PX - 2 * TIMELINE_MARGIN)
}

function formatDate(iso: string) {
  return parseLocalDate(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function eventTitle(e: LifeEvent) {
  const dateLabel = e.end ? `${formatDate(e.start)} – ${formatDate(e.end)}` : formatDate(e.start)
  return `${e.tag} — ${dateLabel}`
}

interface PositionedEvent extends LifeEvent {
  x1: number
  x2: number
  lane: number
}

// Greedy interval packing: ranged events stack into as few lanes as they need; point events share one row.
function layoutStage(stage: StageKey): { events: PositionedEvent[]; barLanes: number } {
  const withX = LIFE_EVENTS.filter((e) => e.stage === stage)
    .map((e) => ({ ...e, x1: dateToX(e.start), x2: e.end ? dateToX(e.end) : dateToX(e.start) }))
    .sort((a, b) => a.x1 - b.x1)

  const laneEnds: number[] = []
  const events: PositionedEvent[] = []
  const minGap = 6
  for (const e of withX) {
    if (!e.end) {
      events.push({ ...e, lane: -1 })
      continue
    }
    let lane = laneEnds.findIndex((end) => end + minGap <= e.x1)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(e.x2)
    } else {
      laneEnds[lane] = e.x2
    }
    events.push({ ...e, lane })
  }
  return { events, barLanes: laneEnds.length }
}

export default function OriginStoryPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="The Origin Story | Empire of Light"
        description="How a personal breakdown and rebuild became the Empire of Light methodology — and how it grew from one person's transformation into a framework for teams."
        path="/origin-story"
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-16">
          <img
            src={founderPhoto}
            alt="Kelly Woznicki, founder of Empire of Light"
            width={220}
            height={288}
            className="mx-auto block rounded-2xl object-cover md:mx-0"
            style={{ width: 180, height: 236 }}
          />
          <div>
            <Eyebrow>Origin Story</Eyebrow>
            <h1 className="m-0 mb-5 text-[30px] leading-[1.15] font-light md:text-[44px] md:leading-[1.1]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
              This all started when my life fell apart.
            </h1>
            <p className="m-0 text-[17px] leading-[1.6] md:text-[18px]" style={{ color: '#544D5A' }}>
              How a personal breakdown and rebuild became a methodology, and how that methodology grew into a way for teams to work
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Building a life that wasn't mine */}
      <section className="px-6 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[720px] flex-col gap-5">
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#131114' }}>
            I spent the first ~35 years of my life building the life I thought I was supposed to build. As someone who has always
            identified as a renegade, a change maker, I didn&rsquo;t even realize I was building a life that wasn&rsquo;t mine. For the
            most part, I had a good life. I had some fun, interesting jobs in tech. I loved product and UX work. I was involved in the
            local bike racing and trail running communities. I ran 100 miles! I had a husband, two houses (one in Seattle and one in
            Chelan), and three children. We had an au pair! I was climbing the corporate ladder, and I built a really spectacular,
            global team. I poured my heart into it. All of it. But then the burnout set in, especially during Covid times. The work
            never really stopped. Everything blurred together, especially given that my team spanned across the US and India. I drank
            alcohol to cope, to escape for periods of time. But a little voice called me to stop. So I did.
          </p>
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
            That is when the journey really began. Then I had to learn to sit with my feelings and discomfort. I hit a major burnout
            moment and cried at my boss. &ldquo;I can&rsquo;t keep going like this.&rdquo; Then I discovered shuffle dancing, started
            putting myself first, and discovered my neurodivergence. Through the lens of neurodivergence, life was easier to navigate.
            It finally made sense why I never quite fit in. I finally realized how much I was masking. Shortly after these discoveries,
            I found myself in the middle of a divorce, and shortly after that, I got laid off from my job. To add to the pile, I moved,
            sold our Seattle house, and our au pair moved out and our beloved dog died. I lost pretty much all of my external stability and support at once. It
            was too triggering to hang out with old friends, but I was too traumatized to make new ones effectively. This was the origin
            of the Empire of Light methodology.
          </p>
        </div>
      </section>

      {/* The cyclical work */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto flex max-w-[720px] flex-col gap-5">
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: 'rgba(251,247,242,.82)' }}>
            Since I was already unmasking my neurodivergence and my marriage, I decided to go ahead and unpack everything and pursue a
            life that actually suits me. I set an extremely optimistic vision for how good my life could feel, based on some fleeting
            moments I had experienced and some visions that I had. (I&rsquo;ve always been an optimist.) And then I got to work taking
            action to move closer to that vision. I tried new things by leaning into my desires, fears, and following my intuition.
          </p>
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: 'rgba(251,247,242,.82)' }}>
            The grief and shadows that began to surface were intense. More intense as I went. There was a cyclical nature to this dance.
            Take action without overthinking it. Process the shadow. Experience the joy on the other side, analyze my behavior, and
            evolve. With each rep of the cycle, the actions, shadows, and joys got bigger. I could tell I was expanding my consciousness
            at a rapid rate (IYKYK). Closing karmic ties and loops. Freeing myself from all the fears and limiting beliefs that were
            holding me back. Returning to who I really was before I learned to mask.
          </p>
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: 'rgba(251,247,242,.82)' }}>
            First my actions were little things like trying a new dance class or trying online dating. Then bigger things like getting
            off medication, traveling to places alone, and taking on more responsibility at work. Finally, the biggest thing of all:
            quitting my job to build Empire of Light. Over time, I gained more clarity, I unlocked more spiritual gifts, my health
            improved (my vision got better and illness would pass through me much faster), and my art got much better! My ability to
            connect dots and cut through noise heightened. I unlocked a whole new level of creativity.
          </p>
        </div>
      </section>

      {/* How my art evolved */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[1120px]">
          <Eyebrow>My Transformation Journey</Eyebrow>
          <h2 className="m-0 mb-3 text-[26px] leading-[1.15] font-light md:text-[36px] md:leading-[1.1]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#131114' }}>
            A visual map of how I moved through the cycle
          </h2>
          <p className="m-0 mb-9 max-w-[640px] text-[15px] leading-[1.6] md:text-[16px]" style={{ color: '#544D5A' }}>
            Five years of intense transformation following the pattern of Reimagine, Do, Unlearn, Evolve. As you can see, it&rsquo;s
            a little messy and non-linear. The key is that the visions helped me stabilize and push through the big shadow waves as
            I tried new things.
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="relative" style={{ width: TIMELINE_PX }}>
              <div className="pointer-events-none absolute inset-x-0 top-5 bottom-0">
                {YEARS.map((y) => (
                  <div
                    key={y}
                    className="absolute top-0 bottom-0 w-px"
                    style={{ left: dateToX(`${y}-01-01`), background: '#E4DFCE' }}
                  />
                ))}
              </div>
              <div className="relative mb-3 h-5">
                {YEARS.map((y) => (
                  <div
                    key={y}
                    className="absolute text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ ...DISPLAY, left: dateToX(`${y}-01-01`) + 6, color: '#A96D0F' }}
                  >
                    {y}
                  </div>
                ))}
              </div>
              <div className="relative mb-6 flex flex-col gap-2">
                {STAGES.map((stage) => {
                  const { events, barLanes } = layoutStage(stage.key)
                  const blockHeight = 22 + barLanes * 8 + 10
                  return (
                    <div key={stage.key} className="relative" style={{ height: blockHeight }}>
                      <div
                        className="absolute left-0 top-0 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
                        style={{ ...DISPLAY, background: '#FDFAF4', color: '#131114', border: '1px solid #D8D2DC' }}
                      >
                        {stage.label}
                      </div>
                      {events.map((e, i) =>
                        e.lane >= 0 ? (
                          <div
                            key={i}
                            title={eventTitle(e)}
                            className="absolute rounded-full"
                            style={{
                              left: e.x1,
                              width: Math.max(e.x2 - e.x1, 4),
                              top: 22 + e.lane * 8,
                              height: 5,
                              background: CATEGORY_COLORS[e.tag],
                              opacity: 0.8,
                            }}
                          />
                        ) : (
                          <div
                            key={i}
                            title={eventTitle(e)}
                            className="absolute rounded-full"
                            style={{
                              left: e.x1 - 2.5,
                              top: 22 + barLanes * 8 + 3,
                              width: 5,
                              height: 5,
                              background: CATEGORY_COLORS[e.tag],
                            }}
                          />
                        ),
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="relative h-[160px]">
                {ART_TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="absolute flex h-[160px] w-[170px] items-center justify-center overflow-hidden rounded-xl border p-2"
                    style={{ left: dateToX(item.date) - 85, background: '#FFFFFF', borderColor: '#D8D2DC', boxShadow: '0 1px 2px rgba(19,17,20,.06)' }}
                  >
                    <img src={item.src} alt="Kelly's artwork" className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {Object.entries(CATEGORY_COLORS).map(([label, color]) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="h-[8px] w-[8px] flex-none translate-y-[1px] rounded-full" style={{ background: color }} />
                <span className="text-[13px]" style={{ color: '#131114' }}>
                  {label}
                </span>
                <span className="text-[13px]" style={{ color: '#A79E92' }}>
                  {CATEGORY_EXAMPLES[label]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From personal to collective */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-[720px] flex-col gap-5">
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#131114' }}>
            As I experimented with this methodology on myself, I also began experimenting with it in pockets on my team at work. What
            if we ran a team from a flow-based perspective? I set an ambitious vision, empowered my team to get stuff done, and stepped
            out of the way. The result, per the leadership team, was magic. Then I began to wonder: what happens if we do this on a
            bigger scale?
          </p>
          <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
            I continued to refine the methodology, which is how we got to this iteration of Empire of Light.
          </p>
        </div>
      </section>

      {/* Why now */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#FDFAF4' }}>
        <div className="mx-auto max-w-[720px]">
          <Eyebrow>Why this matters now</Eyebrow>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#131114' }}>
              We are in the era of emergence, and we need a new way of leading teams that fosters collective intelligence. One that
              promotes autonomy, yet unity. Clarity and tactical action blended with vision and love.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
              The old business and team management playbooks were focused on fear as a motivator, but those aren&rsquo;t working as well
              anymore. People are waking up. People are starving for community, connection, belonging, and work that matters.
            </p>
            <p className="m-0 text-[17px] leading-[1.75] md:text-[18px]" style={{ color: '#544D5A' }}>
              This is a model for lightwork at scale. To help individuals or groups transmute fear into creation. It&rsquo;s a model
              transitioning a team from the old fear-based ways of operating to a heart, unconditional-love-based OS.
            </p>
          </div>
        </div>
      </section>

      {/* Closing questions + CTA */}
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-[112px]" style={{ background: '#000000' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 50% 100%, #FFF6AD 0%, rgba(254,225,106,.55) 28%, rgba(0,0,0,0) 72%)',
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto max-w-[680px] text-center">
          <div className="mb-8 flex flex-col gap-3 text-left">
            {QUESTIONS.map((q) => (
              <p key={q} className="m-0 text-[17px] leading-[1.55] md:text-[19px]" style={{ ...DISPLAY, fontWeight: 300, color: 'rgba(251,247,242,.85)' }}>
                {q}
              </p>
            ))}
          </div>
          <h2 className="m-0 mb-9 text-[26px] leading-[1.2] font-light md:text-[34px]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            I can tell you now: they would be a whole lot better.
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBooking('origin_story_cta')}
              className="rounded-lg px-8 py-4 text-[15px] font-semibold"
              style={primaryButton({ boxShadow: '0 0 40px rgba(254,225,106,.28)' })}
            >
              Book a conversation
            </a>
            <Link to="/thesis" className="rounded-lg px-8 py-4 text-[15px] font-semibold" style={secondaryButtonOnDark}>
              Read the thesis
            </Link>
          </div>
          <p className="mt-6 text-[14px]" style={{ color: 'rgba(251,247,242,.5)' }}>
            Read the thesis for more on the methodology, how it can be applied, and where it works.
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
