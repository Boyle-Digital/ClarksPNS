// Full-bleed cinematic band: real drone footage over a Clark's store,
// then a 3D-tilt showcase of real storefronts linking to their pages.
// Video only loads when the section scrolls into view (poster until then).
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// Locally bundled so the homepage never depends on the image CDN.
import filmPoster from '@/assets/images/showcase/film-poster.jpg'
import imgWestwood from '@/assets/images/showcase/westwood.jpg'
import imgWinchester from '@/assets/images/showcase/winchester-road.jpg'
import imgLucille from '@/assets/images/showcase/lucille-dr.jpg'
import imgMidway from '@/assets/images/showcase/midway.jpg'
import imgHalGreer from '@/assets/images/showcase/hal-greer.jpg'
import imgSouthPoint from '@/assets/images/showcase/south-point.jpg'

const SHOWCASE: Array<{ slug: string; name: string; place: string; tag: string; img: string }> = [
  {
    slug: 'westwood-ashland-ky',
    name: 'Westwood',
    place: 'Fairview — Ashland, KY',
    tag: 'The flagship — where we started',
    img: imgWestwood
  },
  {
    slug: 'winchester-road-lexington-ky',
    name: 'Winchester Road',
    place: 'Lexington, KY',
    tag: 'Brand new in Lexington',
    img: imgWinchester
  },
  {
    slug: 'lucille-dr-lexington-ky',
    name: 'Lucille Dr',
    place: 'Lexington, KY',
    tag: 'Our newest store',
    img: imgLucille
  },
  {
    slug: 'midway-midway-ky',
    name: 'Midway',
    place: 'Midway, KY',
    tag: 'Dog park on site',
    img: imgMidway
  },
  {
    slug: 'hal-greer-huntington-wv',
    name: 'Hal Greer Blvd',
    place: 'Huntington, WV',
    tag: 'West Virginia proud',
    img: imgHalGreer
  },
  {
    slug: 'south-point-so-point-oh',
    name: 'South Point',
    place: 'South Point, OH',
    tag: 'Ohio proud',
    img: imgSouthPoint
  }
]

export default function HometownCinema() {
  return (
    <section
      aria-label='Our hometowns'
      className='relative isolate overflow-hidden bg-black text-white'
    >
      {/* Background layer */}
      <div className='absolute inset-0'>
        <img
          src={filmPoster}
          alt=''
          aria-hidden
          className='h-full w-full object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80' />
      </div>

      <div className='container relative z-[1] mx-auto px-6 py-20 md:px-10 md:py-28'>
        <div className="font-display text-xs uppercase tracking-[0.3em] text-white/70">
          Across the Tri-State
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-6xl">
          Proudly serving you.
        </h2>
        <p className='mt-4 max-w-prose text-lg text-white/85'>
          Kentucky. Ohio. West Virginia. Sixty-three stores, one promise —
          hot food, friendly faces, and a clean stop every time. Wherever
          the road takes you, there’s a Clark’s close by. Come see us.
        </p>

        {/* Showcase cards */}
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]'>
          {SHOWCASE.map(s => (
            <TiltCard key={s.slug} store={s} />
          ))}
        </div>

        <Link
          to='/locations'
          className='mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-brand transition-transform hover:-translate-y-0.5'
        >
          Find your Clark’s
        </Link>
      </div>
    </section>
  )
}

function TiltCard({
  store
}: {
  store: { slug: string; name: string; place: string; tag: string; img: string }
}) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(8px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <Link
      ref={ref}
      to={`/locations/${store.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className='group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition-[transform,border-color] duration-200 [transform-style:preserve-3d] hover:border-white/40'
    >
      <div className='aspect-[4/3] overflow-hidden'>
        <img
          src={store.img}
          alt={`Clark’s Pump-N-Shop — ${store.name}, ${store.place}`}
          loading='lazy'
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]'
        />
      </div>
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10'>
        <div className="font-display text-lg font-bold leading-tight">
          {store.name}
        </div>
        <div className='text-sm text-white/75'>{store.place}</div>
        <div className='mt-1 text-xs text-white/60'>{store.tag}</div>
      </div>
    </Link>
  )
}
