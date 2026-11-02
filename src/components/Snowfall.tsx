import { useMemo } from 'react'

const FLAKES = 20

/** Deterministic pseudo-random so the flakes don't reshuffle on every render. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** Seasonal falling snow over the whole page. Sits above content but never blocks clicks; hidden for reduced-motion users. */
export function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKES }, (_, i) => ({
        left: seeded(i, 1) * 100,
        size: 10 + seeded(i, 2) * 12,
        duration: 14 + seeded(i, 3) * 14,
        delay: -seeded(i, 4) * 20,
        drift: (seeded(i, 5) - 0.5) * 120,
        opacity: 0.35 + seeded(i, 6) * 0.35,
      })),
    [],
  )
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="eol-snowflake absolute top-0 select-none"
          style={
            {
              left: `${f.left}%`,
              fontSize: f.size,
              opacity: f.opacity,
              color: '#A9D4F7',
              textShadow: '0 0 5px rgba(255,255,255,.95), 0 0 2px rgba(60,120,180,.5)',
              animation: `eol-snow-fall ${f.duration}s linear ${f.delay}s infinite`,
              '--eol-drift': `${f.drift}px`,
            } as React.CSSProperties
          }
        >
          ❄
        </span>
      ))}
    </div>
  )
}
