// Fleet & Diesel — the page for road crews, contractors, and anyone who
// drives for a living. Real amenity counts from store data, the Marathon
// fleet card, and a 3D-tilt fuel pump built in brand blue.
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/lib/seo'
import { allStores } from '@/lib/stores'
import Tilt from '@/components/site/Tilt'

const DIESEL = allStores.filter(s => s.amenities?.diesel).length
const KEROSENE = allStores.filter(s => s.amenities?.kerosene).length
const ALWAYS_OPEN = allStores.filter(s => s.open24).length

export default function Fleet() {
  return (
    <main className='w-full overflow-x-clip bg-white'>
      <SEO
        title='Fleet & Diesel — Clark’s Pump-N-Shop'
        description={`Diesel at ${DIESEL} locations, kerosene at ${KEROSENE}, ${ALWAYS_OPEN} stores open 24 hours — plus the Clark's fleet card for your whole crew.`}
        path='/fleet'
      />

      {/* Hero */}
      <section className='relative isolate -mt-[16px] overflow-hidden bg-gradient-to-br from-[#101c4d] via-brand to-[#1b2f7d] md:-mt-[20px]'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.08]'
          style={{
            background:
              'repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 30px)'
          }}
        />
        <div className='container relative z-[1] mx-auto grid grid-cols-1 items-center gap-10 px-6 py-16 text-white md:px-10 md:py-24 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <div className="font-['Oswald'] text-xs uppercase tracking-[0.3em] text-white/70">
              Fleet & Diesel
            </div>
            <h1 className="mt-2 font-['Oswald'] text-4xl font-bold leading-tight md:text-6xl">
              Built for the crews
              <br />
              that build the Tri-State.
            </h1>
            <p className='mt-4 max-w-prose text-lg text-white/90'>
              Contractors, drivers, and working fleets run this region — and
              Clark’s keeps them moving with diesel across three states, a
              fleet card that works chain-wide, and stores that never close.
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <a
                href='https://www.marathonfleetcard.com/associations/?cc=M00528'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-brand transition-transform hover:-translate-y-0.5'
              >
                Get the fleet card
              </a>
              <Link
                to='/locations'
                className='inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10'
              >
                Find diesel near you
              </Link>
            </div>
          </div>
          <div className='lg:col-span-5'>
            <TiltPump />
          </div>
        </div>
        <div className='h-8 w-full bg-gradient-to-b from-transparent to-white md:h-12' />
      </section>

      {/* Counts */}
      <section className='container mx-auto px-6 py-12 md:px-10'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <StatCard n={DIESEL} label='stores with diesel' />
          <StatCard n={KEROSENE} label='stores with kerosene' />
          <StatCard n={ALWAYS_OPEN} label='stores open 24 hours' />
        </div>
        <p className='mt-6 max-w-prose text-black/70'>
          Every store page lists its fuel lineup, hours, and amenities — so
          your drivers know before they roll in. Marathon and ARCO branded
          fuel, chain-wide.
        </p>
        <Link
          to='/locations'
          className='mt-4 inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-white transition-colors hover:bg-brand/90'
        >
          Browse all 63 stores
        </Link>
      </section>
    </main>
  )
}

function StatCard({ n, label }: { n: number; label: string }) {
  return (
    <Tilt max={5}>
    <div className='rounded-2xl border border-black/10 brand-topline bg-surface-alt p-6'>
      <div className="font-['Oswald'] text-5xl font-bold text-brand tabular-nums">
        {n}
      </div>
      <div className='mt-1 font-medium text-black'>{label}</div>
    </div>
    </Tilt>
  )
}

/** Chunky brand fuel pump that tilts toward the cursor. */
function TiltPump() {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 10}deg)`
  }

  return (
    <div className='[perspective:900px]'>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          if (ref.current) ref.current.style.transform = ''
        }}
        className='mx-auto w-full max-w-[320px] transition-transform duration-200 [transform-style:preserve-3d]'
      >
        <svg viewBox='0 0 320 400' role='img' aria-label='Clark’s fuel pump'>
          {/* base */}
          <rect x='40' y='368' width='200' height='18' rx='6' fill='#0b153a' />
          {/* body */}
          <rect x='60' y='60' width='160' height='316' rx='18' fill='#1b2f7d' />
          <rect x='60' y='60' width='160' height='316' rx='18' fill='url(#pumpshine)' />
          {/* screen */}
          <rect x='82' y='88' width='116' height='74' rx='10' fill='#0b153a' />
          <text x='140' y='120' textAnchor='middle' fill='#0084FF' fontFamily='Oswald, sans-serif' fontSize='22' fontWeight='700'>CLARK’S</text>
          <text x='140' y='146' textAnchor='middle' fill='#ffffff' fontFamily='Oswald, sans-serif' fontSize='13' letterSpacing='3'>FLEET READY</text>
          {/* keypad */}
          <g fill='#0084FF' opacity='0.85'>
            <rect x='92' y='182' width='28' height='20' rx='4' />
            <rect x='126' y='182' width='28' height='20' rx='4' />
            <rect x='160' y='182' width='28' height='20' rx='4' />
            <rect x='92' y='208' width='28' height='20' rx='4' />
            <rect x='126' y='208' width='28' height='20' rx='4' />
            <rect x='160' y='208' width='28' height='20' rx='4' />
          </g>
          {/* stripe */}
          <rect x='60' y='250' width='160' height='14' fill='#0084FF' />
          <rect x='60' y='264' width='160' height='6' fill='#e01f26' />
          {/* nozzle + hose */}
          <rect x='222' y='120' width='26' height='60' rx='8' fill='#0b153a' />
          <path d='M235 180 C 258 260, 258 300, 226 352' stroke='#0b153a' strokeWidth='12' fill='none' strokeLinecap='round' />
          <rect x='214' y='104' width='42' height='26' rx='8' fill='#0b153a' />
          <rect x='248' y='108' width='22' height='12' rx='5' fill='#0b153a' />
          {/* wordmark plate */}
          <rect x='82' y='288' width='116' height='62' rx='10' fill='#ffffff' />
          <text x='140' y='314' textAnchor='middle' fill='#263B95' fontFamily='Oswald, sans-serif' fontSize='17' fontWeight='700'>PUMP-N-SHOP</text>
          <text x='140' y='334' textAnchor='middle' fill='#4B5563' fontFamily='Inter, sans-serif' fontSize='8.5' letterSpacing='0.5'>RETURN · REFRESH · REFUEL</text>
          <defs>
            <linearGradient id='pumpshine' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0' stopColor='#ffffff' stopOpacity='0.14' />
              <stop offset='0.45' stopColor='#ffffff' stopOpacity='0' />
              <stop offset='1' stopColor='#000000' stopOpacity='0.18' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
