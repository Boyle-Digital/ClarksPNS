// Scroll-driven wash tunnel: as the section crosses the viewport a car
// rides through FOAM, RINSE, and DRY stages. Pure CSS/SVG driven by
// scroll progress — no libraries, reduced-motion falls back to static.
import { useEffect, useRef, useState } from 'react'

const STAGES = [
  { label: 'FOAM', color: '#7db8ff' },
  { label: 'RINSE', color: '#2fd06f' },
  { label: 'DRY', color: '#ffb84d' }
]

export default function WashTunnel() {
  const secRef = useRef<HTMLElement | null>(null)
  const [p, setP] = useState(0) // 0..1 progress through the section

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setP(0.5)
      return
    }
    const onScroll = () => {
      const el = secRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = r.height + vh
      const done = vh - r.top
      setP(Math.min(1, Math.max(0, done / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const carX = 4 + p * 76 // percent across the tunnel
  const stage = Math.min(2, Math.floor(p * 3))

  return (
    <section
      ref={secRef}
      aria-label='Ride the tunnel'
      className='band-night brand-stripes relative overflow-hidden py-14 text-white md:py-20'
    >
      <div className='container mx-auto px-6 md:px-10'>
        <h2 className='font-display text-4xl md:text-5xl'>Ride the tunnel</h2>
        <p className='mt-2 max-w-prose text-white/80'>
          Scroll to send one through — foam, rinse, spot-free dry.
        </p>

        <div className='relative mt-10 h-44 overflow-hidden rounded-2xl border border-white/15 bg-[#0b153a] md:h-52'>
          {/* stage zones */}
          <div className='absolute inset-0 grid grid-cols-3'>
            {STAGES.map((s, i) => (
              <div
                key={s.label}
                className='relative border-r border-white/10 transition-opacity duration-300 last:border-r-0'
                style={{ opacity: stage === i ? 1 : 0.45 }}
              >
                <div
                  className='absolute inset-x-0 top-0 h-1.5'
                  style={{ background: s.color }}
                />
                <div
                  className='mt-4 text-center font-display text-lg tracking-[0.3em]'
                  style={{ color: s.color }}
                >
                  {s.label}
                </div>
                {/* stage effects */}
                {i === 0 && (
                  <div aria-hidden className='absolute inset-x-4 top-12 bottom-4 opacity-70'>
                    {[...Array(9)].map((_, b) => (
                      <span
                        key={b}
                        className='absolute rounded-full border border-white/60'
                        style={{
                          width: 8 + (b % 4) * 6,
                          height: 8 + (b % 4) * 6,
                          left: `${(b * 37) % 90}%`,
                          top: `${(b * 53) % 80}%`
                        }}
                      />
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <div aria-hidden className='absolute inset-x-6 top-10 bottom-4 flex justify-around opacity-70'>
                    {[...Array(6)].map((_, l) => (
                      <span key={l} className='h-full w-0.5 rounded bg-[#7db8ff]/70' />
                    ))}
                  </div>
                )}
                {i === 2 && (
                  <div aria-hidden className='absolute inset-x-4 top-14 bottom-6 flex flex-col justify-around opacity-60'>
                    {[...Array(4)].map((_, l) => (
                      <span key={l} className='h-0.5 w-full rounded bg-[#ffb84d]/70' />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* the car */}
          <div
            className='absolute bottom-4 transition-transform duration-75'
            style={{ left: `${carX}%` }}
          >
            <svg width='120' height='52' viewBox='0 0 120 52' aria-hidden>
              <rect x='8' y='18' width='100' height='22' rx='10' fill='#eaf0ff' />
              <path d='M28 20 C 36 6, 78 6, 90 20 Z' fill='#eaf0ff' />
              <path d='M34 19 C 41 9, 74 9, 84 19 Z' fill='#0b153a' opacity='0.85' />
              <circle cx='34' cy='42' r='9' fill='#0b153a' />
              <circle cx='34' cy='42' r='4' fill='#8fa0c9' />
              <circle cx='86' cy='42' r='9' fill='#0b153a' />
              <circle cx='86' cy='42' r='4' fill='#8fa0c9' />
              <rect x='98' y='24' width='9' height='6' rx='2' fill='#ffb84d' />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
