import { Link } from 'react-router-dom'
import { DISPLAY, SUBSTACK_URL, trackSubstack } from './shared'

export function MarketingFooter() {
  return (
    <footer className="border-t px-6 py-8 md:px-8" style={{ background: '#000000', borderColor: 'rgba(251,247,242,.12)' }}>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ ...DISPLAY, color: 'rgba(251,247,242,.6)' }}>
            Empire of Light
          </span>
          <span className="text-[14px]" style={{ color: 'rgba(251,247,242,.45)' }}>
            Reimagine &middot; Do &middot; Unlearn &middot; Evolve
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/thesis" className="text-[14px]" style={{ color: '#FEE16A' }}>
              Thesis
            </Link>
            <Link to="/about" className="text-[14px]" style={{ color: 'rgba(251,247,242,.45)' }}>
              About
            </Link>
            <Link to="/lets-chat" className="text-[14px]" style={{ color: 'rgba(251,247,242,.45)' }}>
              Contact
            </Link>
            <Link to="/privacy" className="text-[14px]" style={{ color: 'rgba(251,247,242,.45)' }}>
              Privacy Policy
            </Link>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'rgba(251,247,242,.12)' }}
        >
          <p className="m-0 max-w-[520px] text-[13.5px] leading-[1.55]" style={{ color: 'rgba(251,247,242,.5)' }}>
            Also offering fractional vision, strategy &amp; execution advisory for leaders and teams navigating AI
            transformation and complex change.{' '}
            <Link to="/advisory" style={{ color: '#FEE16A' }}>
              Learn more
            </Link>
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackSubstack('footer')}
            className="shrink-0 text-[13.5px] font-medium"
            style={{ color: 'rgba(251,247,242,.75)' }}
          >
            Follow us on Substack &rarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
