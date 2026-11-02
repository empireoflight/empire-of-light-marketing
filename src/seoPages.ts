// Single source of truth for each page's title, description, and share image.
// Used by <Seo> (client-side, after React mounts) and by the Vite build, which writes a copy of index.html
// per page with these tags already in it, because link-preview bots (iMessage, Slack, LinkedIn, Facebook...)
// don't run JavaScript and only see the raw HTML. Add a new page here and it gets both.
import { EVENTS } from './events.ts'

export interface PageSeo {
  title: string
  description: string
  /** Path under the site root to a 1200x630 share image. Defaults to /og-image.png. */
  image?: string
  noindex?: boolean
}

export const SEO_PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Empire of Light | A Heart-Centered Operating System for Collective Intelligence',
    description:
      'Empire of Light helps people and teams bring more ambitious visions to life faster, with more unity. A heart-centered operating system and collective intelligence platform for teams and Now What? Cohorts.',
  },
  '/teams': {
    title: 'Team Program | Empire of Light',
    description:
      'A different way of running a team. Empire of Light helps teams unlock the collective intelligence already inside them: a facilitated engagement plus app for shared vision, aligned action, and processing friction together.',
  },
  '/now-what-cohort': {
    title: 'Now What? Cohort | Empire of Light',
    description:
      'A six-week group experience for people navigating a major life change. Explore a vision for what\'s next, experiment with living into it, and work through the friction together.',
  },
  '/holiday': {
    title: 'Holiday Edition (Free) | Empire of Light',
    description:
      'Do you dread the holidays? Join the free Empire of Light Holiday Edition: a kickoff call, a Reimagine → Do workshop, weekly drop-ins, and a January reflection. Reimagine your holiday traditions.',
    image: '/og-holiday.png',
  },
  '/holiday-game': {
    title: 'Holiday Lights Game | Empire of Light',
    description: 'Light up the board and see which holiday offer from Empire of Light is waiting for you.',
    image: '/og-holiday.png',
    noindex: true,
  },
  '/thesis': {
    title: 'The Empire of Light Thesis | A Team Operating System for Collective Transformation',
    description:
      'Empire of Light is a team operating system for collective transformation — the methodology behind how teams reimagine what\'s possible, take action, unlearn old patterns, and evolve together.',
  },
  '/living-proof': {
    title: 'Living Proof | Empire of Light',
    description:
      'How a personal breakdown and rebuild became the Empire of Light methodology, and the growing body of proof that it works: the timeline, the art, and the teams.',
  },
  '/about': {
    title: 'About Kelly Woznicki | Empire of Light',
    description:
      'Meet Kelly Woznicki — 15+ years leading product and UX, now building Empire of Light to help teams align vision, strategy, structure, and energy.',
  },
  '/advisory': {
    title: 'Product + Transformation Leadership | Empire of Light',
    description:
      'Fractional vision, strategy, and execution advisory for leaders and teams navigating AI transformation and complex organizational change.',
  },
  '/lets-chat': {
    title: 'Let\'s Chat | Empire of Light',
    description:
      'Send a quick note and Kelly will get back to you.',
  },
  '/privacy': {
    title: 'Privacy Policy | Empire of Light',
    description:
      'How Empire of Light collects, stores, and protects your data — including a full breakdown of the app\'s five-tier privacy system.',
  },
  '/terms': {
    title: 'Terms of Service | Empire of Light',
    description:
      'The terms that govern your use of empireoflightcollective.com, including how the founding co-creator pilot engagement works.',
  },
}

/** Event offer pages: one per event slug, plus a generic version for plain /event. Not indexed. */
export function eventSeo(eventName?: string): PageSeo {
  const attendees = eventName ? `${eventName} attendees` : 'event attendees'
  return {
    title: 'Event Offer: 20% Off | Empire of Light',
    description: `A special offer for ${attendees}: 20% off a Now What? Cohort or a Hivemindset Vision Program.`,
    noindex: true,
  }
}

SEO_PAGES['/event'] = eventSeo()
for (const [slug, name] of Object.entries(EVENTS)) SEO_PAGES[`/event/${slug}`] = eventSeo(name)
