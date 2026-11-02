import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { DISPLAY } from './shared'

const BULB_COLORS = ['#2FA58A', '#F6DC6B', '#FFFFFF', '#A8C6F5']

/** A row of blinking bulbs, each one a beat off from its neighbor. */
function Bulbs({ count, offset = 0 }: { count: number; offset?: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-2.5">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="eol-bulb block h-[11px] w-[11px] rounded-full"
          style={{
            background: BULB_COLORS[(i + offset) % BULB_COLORS.length],
            boxShadow: `0 0 8px 2px ${BULB_COLORS[(i + offset) % BULB_COLORS.length]}`,
            animation: `eol-bulb-blink 1.4s ease-in-out ${(i % 4) * 0.35}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

/** Home page announcement for the Holiday Edition: festive on purpose. */
export function HolidayBanner() {
  return (
    <Link
      to="/holiday"
      onClick={() => track('event_banner_click', { location: 'home', event: 'holiday-edition' })}
      className="flex items-center justify-center gap-4 px-4 py-3 text-center text-[14px] font-bold md:text-[16px]"
      style={{ ...DISPLAY, background: 'repeating-linear-gradient(135deg, #C8281A 0 22px, #D8301F 22px 44px)', color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}
    >
      <span className="hidden sm:block">
        <Bulbs count={5} />
      </span>
      <span>Holiday Edition! Free! Reimagine your holiday traditions with us &rarr;</span>
      <span className="hidden sm:block">
        <Bulbs count={5} offset={2} />
      </span>
    </Link>
  )
}
