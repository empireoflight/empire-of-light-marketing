import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoMark from '../assets/logo-mark.png'
import { BOOKING_URL, DISPLAY, HEADER_GRADIENT, navLink, navLinkStyle, primaryButton, trackBooking } from './shared'

const NAV_LINKS = [
  { to: '/teams', label: 'Team Program' },
  { to: '/now-what-cohort', label: 'Now What? Cohort' },
  { to: '/thesis', label: 'Thesis' },
  { to: '/living-proof', label: 'Living Proof' },
  { to: '/about', label: 'About' },
]

export function MarketingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{ background: HEADER_GRADIENT, backdropFilter: 'blur(12px)', borderColor: 'rgba(19,17,20,.12)' }}
    >
      <div className="mx-auto flex max-w-[1120px] items-center gap-6 px-6 py-3.5 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoMark} alt="" width={28} height={28} style={{ display: 'block', borderRadius: 7 }} />
          <span className="text-[14px] font-semibold uppercase tracking-[0.14em]" style={{ ...DISPLAY, color: '#131114' }}>
            Empire of Light
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={navLink} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackBooking('header_desktop')}
            className="rounded-lg px-4.5 py-2 text-[14px] font-semibold"
            style={primaryButton()}
          >
            Book a conversation
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackBooking('header_mobile')}
            className="rounded-lg px-4 py-2 text-[13px] font-semibold"
            style={primaryButton()}
          >
            Book a conversation
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-lg border px-3.5 py-2 text-[13px] font-semibold"
            style={{ ...DISPLAY, borderColor: 'rgba(19,17,20,.32)', color: '#131114' }}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="flex flex-col border-t px-6 py-2 lg:hidden" style={{ borderColor: 'rgba(19,17,20,.12)' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-3 text-[16px] font-medium"
              style={{ ...DISPLAY, color: '#131114' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
