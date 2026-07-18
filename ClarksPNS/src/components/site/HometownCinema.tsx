// Full-bleed cinematic band: real drone footage over a Clark's store,
// then a 3D-tilt showcase of real storefronts linking to their pages.
// Video only loads when the section scrolls into view (poster until then).
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CDN = 'https://res.cloudinary.com/yzpytwu5'
const FILM_SLUG = 'catlettsburg-catlettsburg-ky'
const FILM = `${CDN}/video/upload/w_1280,q_auto:eco/v1/clarks/stores/${FILM_SLUG}/drone.mp4`
const FILM_POSTER = `${CDN}/image/upload/f_auto,q_auto,w_1280/v1/clarks/stores/${FILM_SLUG}/poster.jpg`

const SHOWCASE: Array<{ slug: string; name: string; place: string; tag: string }> = [
  {
    slug: 'westwood-ashland-ky',
    name: 'Westwood',
    place: 'Ashland, KY',
    tag: 'Where it all started — 1976'
  },
  {
    slug: 'greenup-ave-ashland-ky',
    name: 'Greenup Ave',
    place: 'Ashland, KY',
    tag: 'Hometown flagship'
  },
  {
    slug: 'huntington-huntington-wv',
    name: 'Huntington',
    place: 'Huntington, WV',
    tag: 'West Virginia proud'
  },
  {
    slug: 'ironton-ironton-oh',
    name: 'Ironton',
    place: 'Ironton, OH',
    tag: 'Ohio proud'
  }
]

const heroUrl = (slug: string) =>
  `${CDN}/image/upload/f_auto,q_auto,w_800/v1/clarks/stores/${slug}/hero.jpg`

export default function HometownCinema() {
  const secRef = useRef<HTMLElement | null>(null)
  const [playFilm, setPlayFilm] = useState(false)

  useEffect(() => {
    const el = secRef.current
    if (!el) return
    const io = new IntersectionObserver(
      es => {
        if (es.some(e => e.isIntersecting)) {
          setPlayFilm(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={secRef}
      aria-label='Our hometowns'
      className='relative isolate overflow-hidden bg-black text-white'
    >
      {/* Film layer */}
      <div className='absolute inset-0'>
        {playFilm ? (
          <video
            className='h-full w-full object-cover opacity-60'
            autoPlay
            muted
            loop
            playsInline
            preload='none'
            poster={FILM_POSTER}
          >
            <source src={FILM} type='video/mp4' />
          </video>
        ) : (
          <img
            src={FILM_POSTER}
            alt=''
            aria-hidden
            className='h-full w-full object-cover opacity-60'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80' />
      </div>

      <div className='container relative z-[1] mx-auto px-6 py-20 md:px-10 md:py-28'>
        <div className="font-['Oswald'] text-xs uppercase tracking-[0.3em] text-white/70">
          Filmed over our own stores
        </div>
        <h2 className="mt-2 font-['Oswald'] text-4xl font-bold leading-tight md:text-6xl">
          Sixty-three hometowns.
          <br />
          One promise.
        </h2>
        <p className='mt-4 max-w-prose text-lg text-white/85'>
          Kentucky. Ohio. West Virginia. Every Clark’s has its own page —
          real photos, real video, live hours, and a map that knows how far
          away you are. Wherever you are in the Tri-State, you’re home.
        </p>

        {/* Showcase cards */}
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px]'>
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
  store: { slug: string; name: string; place: string; tag: string }
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
          src={heroUrl(store.slug)}
          alt={`Clark’s Pump-N-Shop — ${store.name}, ${store.place}`}
          loading='lazy'
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]'
        />
      </div>
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10'>
        <div className="font-['Oswald'] text-lg font-bold leading-tight">
          {store.name}
        </div>
        <div className='text-sm text-white/75'>{store.place}</div>
        <div className='mt-1 text-xs text-white/60'>{store.tag}</div>
      </div>
    </Link>
  )
}
