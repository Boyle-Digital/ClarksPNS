// src/pages/SponsorshipsFeatured.tsx
import React, { useEffect, useRef } from 'react'

// ---- Local helpers (same look/feel as your current page) ----
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className='rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm'>
    <div className='text-3xl md:text-4xl font-bold text-brand'>{value}</div>
    <div className='mt-1 text-sm text-black/60'>{label}</div>
  </div>
)

const Card = ({
  eyebrow,
  title,
  children,
  cta
}: {
  eyebrow?: string
  title: React.ReactNode
  children: React.ReactNode
  cta?: { href: string; label: string }[]
}) => (
  <article className='rounded-2xl border border-black/10 bg-white p-6 shadow-sm'>
    {eyebrow && (
      <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
        {eyebrow}
      </p>
    )}
    <h3 className="mt-1 font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
      {title}
    </h3>
    <div className='prose prose-neutral mt-3 max-w-none text-black/80'>
      {children}
    </div>
    {cta && (
      <div className='mt-5 flex flex-wrap gap-3'>
        {cta.map(c => (
          <a
            key={c.label}
            href={c.href}
            className='inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 transition shadow-md'
          >
            {c.label}
          </a>
        ))}
      </div>
    )}
  </article>
)

// ---- Assets (adjust paths if your alias differs) ----
import ukBaseballVideo from '@/assets/videos/UK_Baseball_1080.mp4'
import rowanFootballVideo from '@/assets/videos/Rowan_Football_1080.mp4'
import marshallFootballImg from "@/assets/images/Clark's - Marshall Football Magazine (1) (1).png"
import ashlandFootballImg from "@/assets/images/Ashland FB - Clark's football AD (8.75 × 11.125 in) (1).png"

function AutoPlayVideo ({
  src,
  className = 'w-full h-auto',
  poster,
  threshold = 0.5
}: {
  src: string
  className?: string
  poster?: string
  threshold?: number // portion of video in view required to play
}) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Must be muted to allow autoplay on most browsers (esp. mobile)
    el.muted = true
    el.playsInline = true

    const onIntersect: IntersectionObserverCallback = entries => {
      const [entry] = entries
      if (!el) return

      if (entry.isIntersecting) {
        el.play().catch(() => {
          /* ignore autoplay errors */
        })
      } else {
        el.pause()
      }
    }

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold
    })
    io.observe(el)

    // Pause when tab is hidden, resume when visible AND in view
    const onVis = () => {
      if (document.hidden) {
        el.pause()
      } else {
        // Check if still in view before resuming
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
        const vw = window.innerWidth || document.documentElement.clientWidth
        const inView =
          r.top < vh * (1 - (1 - threshold)) &&
          r.bottom > vh * (1 - threshold) &&
          r.left < vw &&
          r.right > 0
        if (inView) el.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVis)

    // Respect reduced motion by not auto-playing
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) el.pause()

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [threshold])

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      preload='metadata'
      controls
      muted // redundancy: also set via effect
      playsInline
      poster={poster}
    />
  )
}

export default function SponsorshipsFeatured () {
  return (
    <main id='sponsorships' className='flex flex-col -mt-[16px]'>
      {/* HERO */}
      <section className='relative isolate bg-brand text-white'>
        <div className='container mx-auto grid md:grid-cols-12 gap-8 px-6 md:px-10 py-14 md:py-16 items-center'>
          <div className='md:col-span-7'>
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-white/80">
              Community Sponsorships
            </p>
            <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
              Backing local schools, teams, and community events
            </h1>
            <p className='mt-3 text-white/90 max-w-prose'>
              From high school athletics to college programs and hometown
              football, Clark’s Pump-N-Shop is proud to invest in the places our
              employees and customers call home.
            </p>

            {/* Nav tabs to sections */}
            <div className='mt-6 flex flex-wrap gap-3'>
              <a
                href='#uk-baseball'
                className='rounded-2xl px-5 py-2.5 bg-white text-brand hover:bg-white/90 shadow-md'
              >
                UK Baseball
              </a>
              <a
                href='#rowan-football'
                className='rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10'
              >
                Ashland Football
              </a>
              <a
                href='#marshall-football'
                className='rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10'
              >
                Marshall Football
              </a>
              <a
                href='#ashland-football'
                className='rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10'
              >
                Ashland Football
              </a>
            </div>
          </div>

          {/* <div className='md:col-span-5 flex md:justify-end'>
            <div className='rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-sm p-3'>
              <div className='h-64 w-64 md:h-72 md:w-72 rounded-xl overflow-hidden grid place-items-center'>
                <div className='text-center text-white/85 text-sm leading-relaxed px-4'>
                  Featured partner highlights
                  <br />
                  below
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* STATS / IMPACT */}
      <section className='py-8 md:py-10 bg-white border-b border-black/10'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Stat value='$250k+' label='Annual sponsorships' />
            <Stat value='60+' label='Schools & teams' />
            <Stat value='100+' label='Community events' />
            <Stat value='KY • OH • WV' label='Regions served' />
          </div>
        </div>
      </section>

      {/* UK BASEBALL */}
      <section id='uk-baseball' className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <Card
            eyebrow='Lexington, KY'
            title={
              <span className='text-black'>
                University of Kentucky — Baseball
              </span>
            }
          >
            <p>
              Proud partners of UK Baseball—supporting game-day experiences and
              student-athletes with year-round initiatives.
            </p>
            <div className='mt-5 rounded-2xl overflow-hidden border border-black/10 bg-black'>
              <AutoPlayVideo src={ukBaseballVideo} />
            </div>
          </Card>
        </div>
      </section>

      {/* ROWAN COUNTY FOOTBALL */}
      <section id='rowan-football' className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <Card
            eyebrow='Ashland, KY'
            title={<span className='text-black'>Clark's Pump-N-Shop - Putnam Stadium</span>}
          >
            <p>
              Friday-night lights with Ashland Football—amplifying school spirit
              through facilities, signage, and events.
            </p>
            <div className='mt-5 rounded-2xl overflow-hidden border border-black/10 bg-black'>
              <AutoPlayVideo src={rowanFootballVideo} />
            </div>
          </Card>
        </div>
      </section>

      {/* MARSHALL FOOTBALL */}
      <section id='marshall-football' className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <Card
            eyebrow='Huntington, WV'
            title={<span className='text-black'>Marshall — Football</span>}
          >
            <p>
              Supporting Marshall Football with media placements and community
              engagement across the Tri-State.
            </p>
            <div className='mt-5 rounded-2xl overflow-hidden border border-black/10 bg-white'>
              <img
                src={marshallFootballImg}
                alt='Clark’s × Marshall Football feature'
                className='w-full h-auto object-contain'
                loading='eager'
              />
            </div>
          </Card>
        </div>
      </section>

      {/* ASHLAND FOOTBALL */}
      <section id='ashland-football' className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <Card
            eyebrow='Ashland, KY'
            title={<span className='text-black'>Ashland — Football</span>}
          >
            <p>
              Long-standing partners of Ashland Football—investing in athletes,
              fans, and the broader community.
            </p>
            <div className='mt-5 rounded-2xl overflow-hidden border border-black/10 bg-white'>
              <img
                src={ashlandFootballImg}
                alt='Clark’s × Ashland Football ad'
                className='w-full h-auto object-contain'
                loading='eager'
              />
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section
        id='become-a-sponsor'
        className='py-12 md:py-16 bg-white border-t border-black/10'
      >
        <div className='container mx-auto px-6 md:px-10 text-center'>
          <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
            Want to partner with Clark’s?
          </h2>
          <p className='mt-3 text-black/70'>
            Schools, coaches, boosters, and organizers—tell us about your
            program and how we can help.
          </p>
          <div className='mt-5 flex flex-wrap gap-3 justify-center'>
            <a
              href='/sponsorships/apply'
              className='inline-flex rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 shadow-md'
            >
              Request Sponsorship
            </a>
            <a
              href='/contact'
              className='inline-flex rounded-2xl px-6 py-3 border border-brand/20 text-brand hover:bg-brand/5'
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
