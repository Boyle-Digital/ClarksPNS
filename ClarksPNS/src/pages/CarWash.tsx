// Clarks Car Wash — night-mode rebuild. Real wash photos, the Keep It
// Clean Club, 3D gift cards, and zero flat-white sections.
import { Link } from 'react-router-dom'
import { IconShine, IconFoam, IconFast, IconDrop } from '@/components/site/Icons'
import Tilt from '@/components/site/Tilt'

import img1 from '@/assets/images/carwashphotos/DJI_0019.jpg'
import img2 from '@/assets/images/carwashphotos/DSC02583.jpg'
import img3 from '@/assets/images/carwashphotos/DSC03955.jpg'
import img4 from '@/assets/images/carwashphotos/DSC04072.jpg'
import whiteLogo from '@/assets/images/Clarks PNS Logo Updated all white.png'

const JOIN = 'https://checkout.myclarkspns.com/checkout/buy/33394'
const LOGIN = 'https://checkout.myclarkspns.com/account/auth/login'

export default function CarWash () {
  return (
    <main className='w-full overflow-x-clip bg-white'>
      {/* === Night hero over a real wash === */}
      <section className='relative isolate -mt-[16px] overflow-hidden md:-mt-[20px]'>
        <img
          src={img4}
          alt=''
          aria-hidden
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 band-night opacity-[0.86]' />
        <div aria-hidden className='water-sheen pointer-events-none absolute inset-0' />
        <div aria-hidden className='ghost-word ghost-word--light text-center'>WASH</div>

        <div className='container relative z-[1] mx-auto px-6 py-24 text-white md:px-10 md:py-32'>
          <div className='font-display text-xs uppercase tracking-[0.3em] text-white/70'>
            Clarks Car Wash
          </div>
          <h1 className='mt-2 font-display text-5xl leading-none md:text-8xl'>
            Roll in dusty.
            <br />
            Roll out showroom.
          </h1>
          <p className='mt-5 max-w-prose text-lg text-white/90 md:text-xl'>
            Fast lanes, gentle materials, spot-free shine — at Clark’s washes
            across the Tri-State.
          </p>
          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <a
              href='#club'
              className='inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-brand transition-transform hover:-translate-y-0.5 md:text-lg'
            >
              Join the Keep It Clean Club
            </a>
            <Link
              to='/locations?amenity=carwash'
              className='inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10 md:text-lg'
            >
              Find a wash near you
            </Link>
          </div>
        </div>
      </section>

      {/* === Keep It Clean Club — brand band === */}
      <section
        id='club'
        aria-label='Keep It Clean Club'
        className='relative overflow-hidden bg-brand brand-stripes py-14 text-white md:py-20'
      >
        <img
          src={whiteLogo}
          alt=''
          aria-hidden
          className='pointer-events-none absolute -right-16 -top-10 w-[420px] rotate-[-8deg] opacity-[0.06]'
        />
        <div className='container relative mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
            <div>
              <h2 className='font-display text-4xl md:text-5xl'>
                Keep It Clean Club
              </h2>
              <p className='mt-3 max-w-prose text-lg text-white/85'>
                Unlimited washes, one flat month — manage everything online
                and keep that glossy finish always.
              </p>
              <div className='mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
                <a
                  href={JOIN}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-brand transition-transform hover:-translate-y-0.5'
                >
                  Sign up
                </a>
                <a
                  href={LOGIN}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10'
                >
                  Log in
                </a>
              </div>
              <ul className='mt-6 grid grid-cols-1 gap-3 text-sm text-white/85 sm:grid-cols-2'>
                {['Wash as often as you like', 'Manage plan online', 'Fast lane access', 'Cancel anytime'].map(f => (
                  <li key={f} className='flex items-start gap-2'>
                    <span className='mt-1 inline-block h-2 w-2 rounded-full bg-white' />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className='grid grid-cols-2 gap-4 [perspective:1200px]'>
              {[img1, img2, img3, img4].map((src, i) => (
                <Tilt key={i} max={8}>
                  <div className='overflow-hidden rounded-2xl border border-white/20 shadow-lg'>
                    <img
                      src={src}
                      alt={`Clark’s car wash ${i + 1}`}
                      loading='lazy'
                      className='h-36 w-full object-cover md:h-40'
                    />
                  </div>
                </Tilt>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === Benefits — paper mode === */}
      <section aria-label='Car Wash Benefits' className='relative bg-surface-alt brand-stripes-light py-14 md:py-20'>
        <div aria-hidden className='ghost-word ghost-word--blue text-center'>SHINE</div>
        <div className='container relative mx-auto px-6 md:px-10'>
          <h2 className='font-display text-4xl text-black md:text-5xl'>
            Why wash at Clarks
          </h2>
          <p className='mt-2 max-w-prose text-black/70'>
            Pro formulas, soft-touch materials, and a spotless finish — fast.
          </p>
          <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {BENEFITS.map(b => (
              <Tilt key={b.title}>
                <article className='rounded-2xl border border-black/10 brand-topline bg-white p-6'>
                  <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10'>
                    <b.icon className='h-6 w-6 text-brand' />
                  </span>
                  <h3 className='mt-4 font-display text-2xl text-black'>{b.title}</h3>
                  <p className='mt-2 text-sm leading-relaxed text-black/70'>{b.desc}</p>
                </article>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* === How it works — night mode === */}
      <section aria-label='How it works' className='band-night brand-stripes py-14 text-white md:py-20'>
        <div className='container mx-auto px-6 md:px-10'>
          <h2 className='font-display text-4xl md:text-5xl'>Three steps to shine</h2>
          <ol className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
            {STEPS.map((s, i) => (
              <li key={s.title} className='relative rounded-2xl border border-white/15 bg-white/5 p-6'>
                <span className='absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-xl bg-white font-display text-lg text-brand shadow-md'>
                  {i + 1}
                </span>
                <h3 className='mt-2 font-display text-2xl'>{s.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-white/75'>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === Gift cards — 3D plastic === */}
      <section id='giftcards' aria-label='Car Wash Gift Cards' className='relative overflow-hidden bg-surface-alt brand-stripes-light py-14 md:py-20'>
        <div aria-hidden className='ghost-word ghost-word--blue text-center'>GIFT</div>
        <div className='container relative mx-auto px-6 md:px-10'>
          <h2 className='font-display text-4xl text-black md:text-5xl'>Give the shine</h2>
          <p className='mt-2 max-w-prose text-black/70'>
            Digital gift cards, delivered instantly through myclarkspns.com.
          </p>
          <div className='mt-10 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 [perspective:1400px]'>
            <GiftCard value='$50' note='Great for a few quick washes.' href='https://checkout.myclarkspns.com/checkout/buy/33396' />
            <GiftCard value='$150' note='A whole season of shine.' href='https://checkout.myclarkspns.com/checkout/buy/33397' />
          </div>
          <p className='mt-6 text-xs text-black/60'>
            Gift cards are redeemable at participating locations and online where available.
          </p>
        </div>
      </section>

      {/* === FAQ === */}
      <section aria-label='Car Wash FAQ' className='bg-white py-14 md:py-20'>
        <div className='container mx-auto px-6 md:px-10'>
          <h2 className='font-display text-4xl text-black md:text-5xl'>Quick answers</h2>
          <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {FAQS.map(f => (
              <details key={f.q} className='group rounded-2xl border border-black/10 brand-topline bg-white p-6 open:shadow-md'>
                <summary className='flex cursor-pointer list-none items-center justify-between font-display text-xl text-black'>
                  {f.q}
                  <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 transition-transform group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='mt-3 text-sm leading-relaxed text-black/70'>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/** A branded plastic gift card in 3D. */
function GiftCard ({ value, note, href }: { value: string; note: string; href: string }) {
  return (
    <div>
      <Tilt max={10}>
        <div className='band-night brand-stripes relative aspect-[1.586] overflow-hidden rounded-2xl shadow-xl'>
          <img
            src={whiteLogo}
            alt='Clark’s Pump-N-Shop'
            className='absolute left-5 top-5 h-9 w-auto'
          />
          <div className='absolute bottom-5 left-5 font-display text-5xl text-white'>
            {value}
          </div>
          <div className='absolute bottom-6 right-5 text-right text-[0.6rem] uppercase tracking-[0.25em] text-white/60'>
            Car wash
            <br />
            gift card
          </div>
          <div aria-hidden className='absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#0084FF]/25 blur-2xl' />
        </div>
      </Tilt>
      <p className='mt-3 text-sm text-black/70'>{note}</p>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='mt-2 inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-2.5 text-white transition-colors hover:bg-brand/90'
      >
        Buy the {value} card
      </a>
    </div>
  )
}

const BENEFITS = [
  { icon: IconShine, title: 'Showroom shine', desc: 'Poly sealant + spot-free rinse for a glossy, protected finish.' },
  { icon: IconFoam, title: 'Gentle clean', desc: 'Soft-touch materials and pH-balanced soaps safe for clear coat.' },
  { icon: IconFast, title: 'Fast lanes', desc: 'In-and-out convenience designed for busy mornings and quick stops.' },
  { icon: IconDrop, title: 'Spot-free dry', desc: 'Filtered water + high-velocity air for a streak-free result.' }
]

const STEPS = [
  { title: 'Choose your wash', desc: 'Pick at the kiosk or in the app — Rewards members save automatically.' },
  { title: 'Roll through', desc: 'Follow the guide rails and shift to neutral — our equipment handles the rest.' },
  { title: 'Shine & go', desc: 'Spot-free dry, optional towel bays, and you are on your way.' }
]

const FAQS = [
  { q: 'Do you offer unlimited plans?', a: 'Yes. The Keep It Clean Club is unlimited monthly washing — sign up online and cancel anytime.' },
  { q: 'Is the wash safe for my vehicle?', a: 'Our equipment and soaps are designed for modern clear coats, with soft-touch materials and filtered water.' },
  { q: 'Where are wash locations?', a: 'Use the Locations page to find participating car wash sites near you.' }
]
