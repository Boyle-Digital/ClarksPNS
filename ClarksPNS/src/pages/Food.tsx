// Food at Clark's — fully dynamic. No accordions, no hidden menus:
// every kitchen shows its menu highlights, its store count, and the
// actual stores that carry it, always visible, in 3D-tilt cards.
import React from 'react'
import { Link } from 'react-router-dom'
import Tilt from '@/components/site/Tilt'
import { IconClose } from '@/components/site/Icons'
import { FOOD_BRANDS } from '@/content/menus'
import { allStores, namedKitchens, type Store } from '@/lib/stores'

import champsLogo from '@/assets/images/champschickenlogo.png'
import hangarLogo from '@/assets/images/Hangar54Logo_02-1.png'
import cafeLogo from '@/assets/images/clarkscafelogo.webp'
import kkcLogo from '@/assets/images/krispykrunchychickenlogo.webp'
import coopersLogo from '@/assets/images/CoopersExpressLogo.png'
import jacksLogo from '@/assets/images/jacksdelilogo.webp'

import foodHeroVideo from '@/assets/videos/30sFoodVideo_1080.mp4'

const LOGO: Record<string, string> = {
  'krispy-krunchy': kkcLogo,
  'hangar-54': hangarLogo,
  'clarks-cafe': cafeLogo,
  champs: champsLogo,
  coopers: coopersLogo
}

/** Sitewide food gallery (unchanged asset source) */
const ALL_GALLERY = Object.values(
  import.meta.glob('@/assets/food-gallery/**/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    as: 'url'
  })
) as string[]

/** Stores carrying each kitchen, precomputed once. */
const STORES_BY_KITCHEN: Record<string, Store[]> = {}
for (const st of allStores) {
  for (const k of namedKitchens(st)) {
    ;(STORES_BY_KITCHEN[k] ||= []).push(st)
  }
}

const IS_BREAKFAST = new Date().getHours() + new Date().getMinutes() / 60 < 10.5
const BRANDS_ORDERED = IS_BREAKFAST
  ? [...FOOD_BRANDS].sort((a, b) => (a.slug === 'clarks-cafe' ? -1 : b.slug === 'clarks-cafe' ? 1 : 0))
  : FOOD_BRANDS

export default function Food () {
  const [idx, setIdx] = React.useState(0)
  const [fading, setFading] = React.useState(false)
  const gallery = ALL_GALLERY

  React.useEffect(() => {
    if (!gallery.length) return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 3) % Math.max(gallery.length, 1))
        setFading(false)
      }, 220)
    }, 4000)
    return () => clearInterval(timer)
  }, [gallery.length])

  const visible = [0, 1, 2]
    .map(k => gallery[(idx + k) % Math.max(gallery.length, 1)])
    .filter(Boolean)

  return (
    <main className='relative -mt-6 w-full overflow-x-clip bg-white'>
      {/* === Hero === */}
      <section
        aria-label='Food at Clarks'
        className='relative isolate z-0 w-full -mt-[16px] md:-mt-[20px] bg-surface-alt brand-stripes-light'
      >
        <div className='container mx-auto px-6 md:px-10 py-10 md:py-14'>
          <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10'>
            <div className='w-full lg:flex-1'>
              <div className='max-w-[900px]'>
                <h1 className='font-display text-black text-5xl md:text-7xl leading-none'>
                  Hot, fresh, and fast.
                </h1>
                <div className='mt-4 h-1 w-56 rounded bg-brand' />
                <p className='mt-5 text-black/70 text-lg md:text-2xl max-w-prose'>
                  Five real kitchens inside our stores — crispy tenders, deli
                  stacks, melty pizza, and scratch breakfast. Every menu below,
                  every store that serves it.
                </p>
              </div>
            </div>
            <div className='w-full lg:w-auto'>
              <div className='rounded-2xl overflow-hidden border border-black/10 shadow-lg max-w-[640px] mx-auto'>
                <video className='block w-full h-auto' autoPlay playsInline muted loop>
                  <source src={foodHeroVideo} type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Kitchens — always open, always dynamic === */}
      <section aria-label='Our kitchens' className='band-night brand-stripes relative py-14 text-white md:py-20'>
        <div aria-hidden className='ghost-word ghost-word--light text-center'>KITCHENS</div>
        <div className='container relative mx-auto px-6 md:px-10'>
          <h2 className='font-display text-4xl md:text-6xl'>Pick your kitchen.</h2>
          <p className='mt-2 max-w-prose text-white/80'>
            Menus straight from the boards in store — prices and availability
            may vary by location.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 [perspective:1600px]'>
            {BRANDS_ORDERED.map(brand => {
              const stores = STORES_BY_KITCHEN[brand.kitchenName] || []
              const highlights = brand.sections[0]?.items.slice(0, 3) || []
              return (
                <Tilt key={brand.slug} max={4}>
                  <article className='h-full rounded-2xl border border-white/15 bg-white p-7 text-black shadow-xl'>
                    <div className='flex items-center justify-between gap-4'>
                      <img
                        src={LOGO[brand.slug]}
                        alt={`${brand.name} logo`}
                        className='h-12 w-auto object-contain'
                      />
                      <span className='shrink-0 rounded-full bg-brand/10 px-3 py-1 font-display text-sm tracking-[0.08em] text-brand'>
                        {IS_BREAKFAST && brand.slug === 'clarks-cafe'
                          ? 'BREAKFAST IS ON'
                          : `${stores.length} STORES`}
                      </span>
                    </div>
                    <h3 className='mt-4 font-display text-3xl text-black'>{brand.name}</h3>
                    <p className='mt-1 text-sm text-black/60'>{brand.tagline}</p>

                    {/* Menu highlights */}
                    <ul className='mt-4 divide-y divide-black/5 border-y border-black/5'>
                      {highlights.map(item => (
                        <li key={item.name} className='flex items-baseline justify-between gap-3 py-2 text-sm'>
                          <span className='font-medium'>{item.name}</span>
                          {item.price && (
                            <span className='shrink-0 font-semibold tabular-nums'>{item.price}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Stores carrying it */}
                    <div className='mt-4 flex flex-wrap gap-1.5'>
                      {stores.slice(0, 4).map(s => (
                        <Link
                          key={s.slug}
                          to={`/locations/${s.slug}`}
                          className='rounded-full border border-black/10 bg-surface-alt px-3 py-1 text-xs text-black/70 transition-colors hover:border-brand hover:text-brand'
                        >
                          {s.name} · {(s.state || '').toUpperCase()}
                        </Link>
                      ))}
                      {stores.length > 4 && (
                        <Link
                          to={`/food/${brand.slug}#find`}
                          className='rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand'
                        >
                          +{stores.length - 4} more stores
                        </Link>
                      )}
                    </div>

                    <div className='mt-5 flex flex-wrap gap-2'>
                      <Link
                        to={`/food/${brand.slug}`}
                        className='inline-flex items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-white transition-colors hover:bg-brand/90'
                      >
                        Full menu
                      </Link>
                      <Link
                        to={`/food/${brand.slug}#find`}
                        className='inline-flex items-center justify-center rounded-xl border border-brand/40 px-5 py-2.5 text-brand transition-colors hover:bg-brand/5'
                      >
                        All {stores.length} stores
                      </Link>
                    </div>
                  </article>
                </Tilt>
              )
            })}

            {/* Jack's Deli — no published menu yet */}
            <Tilt max={4}>
              <article className='h-full rounded-2xl border border-white/15 bg-white/10 p-7 text-white'>
                <img src={jacksLogo} alt="Jack's Deli logo" className='h-12 w-auto object-contain' />
                <h3 className='mt-4 font-display text-3xl'>Jack’s Deli</h3>
                <p className='mt-1 text-sm text-white/70'>
                  Stacked sandwiches, salads, and deli classics — menu board
                  coming to the site soon.
                </p>
                <Link
                  to='/locations'
                  className='mt-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 font-semibold text-brand transition-transform hover:-translate-y-0.5'
                >
                  Find a location
                </Link>
              </article>
            </Tilt>
          </div>
        </div>
      </section>

      {/* === Gallery === */}
      <section aria-label='Food Gallery' className='band-night brand-stripes relative border-t border-white/10 py-12 text-white md:py-20'>
        <div className='container mx-auto px-6 md:px-10'>
          <h2 className='font-display text-3xl md:text-4xl'>Hot out of our kitchens</h2>
          <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-300 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {visible.map(src => (
              <GalleryImage key={src} src={src} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function GalleryImage ({ src }: { src: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className='group block w-full'>
        <div className='relative aspect-square overflow-hidden rounded-2xl border border-white/15'>
          <img
            src={src}
            alt='Prepared food at Clarks'
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          />
        </div>
      </button>
      {open && (
        <div
          className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center'
          onClick={() => setOpen(false)}
        >
          <div className='relative w-[90%] max-h-[90%]'>
            <button
              onClick={() => setOpen(false)}
              className='absolute -top-3 -right-3 z-[1] grid h-9 w-9 place-items-center rounded-full bg-brand text-white shadow-lg'
              aria-label='Close image'
            >
              <IconClose className='h-4 w-4' />
            </button>
            <img
              src={src}
              alt='Food full view'
              className='w-full h-auto max-h-[90vh] object-contain rounded-xl'
            />
          </div>
        </div>
      )}
    </>
  )
}
