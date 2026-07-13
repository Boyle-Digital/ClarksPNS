// Per-kitchen menu page: /food/:slug
// Real typed menu (from src/content/menus.ts) + the printed menu boards in a
// lightbox + every store that carries this kitchen, linked to its store page.
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { SEO } from '@/lib/seo'
import { getBrandBySlug, FOOD_BRANDS } from '@/content/menus'
import { allStores, namedKitchens, type Store } from '@/lib/stores'

import champsLogo from '@/assets/images/champschickenlogo.png'
import hangarLogo from '@/assets/images/Hangar54Logo_02-1.png'
import cafeLogo from '@/assets/images/clarkscafelogo.webp'
import kkcLogo from '@/assets/images/krispykrunchychickenlogo.webp'
import coopersLogo from '@/assets/images/CoopersExpressLogo.png'

const LOGO: Record<string, string> = {
  'krispy-krunchy': kkcLogo,
  'hangar-54': hangarLogo,
  'clarks-cafe': cafeLogo,
  champs: champsLogo,
  coopers: coopersLogo
}

// Menu-board photos, keyed by brand folder (same assets the Food page uses)
const MENU_BOARD_IMAGES = import.meta.glob(
  '@/assets/images/menus/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, as: 'url' }
) as Record<string, string>

function boardsFor(assetKey: string): string[] {
  return Object.entries(MENU_BOARD_IMAGES)
    .filter(([path]) => path.toLowerCase().includes(`/menus/${assetKey}/`))
    .map(([, url]) => url)
    .sort()
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
      {children}
    </div>
  )
}

export default function FoodBrand() {
  const { slug } = useParams<{ slug: string }>()
  const brand = getBrandBySlug(slug)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!brand) {
    return (
      <main className='w-full bg-white'>
        <SEO title='Menu not found — Clark’s Pump-N-Shop' robots='noindex,nofollow' />
        <div className='container mx-auto px-6 py-24 text-center md:px-10'>
          <h1 className="font-['Oswald'] text-4xl font-bold text-black">
            Menu not found
          </h1>
          <p className='mt-3 text-black/70'>
            That kitchen isn’t on our menu board.
          </p>
          <Link
            to='/food'
            className='mt-6 inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-white hover:bg-brand/90'
          >
            See all food
          </Link>
        </div>
      </main>
    )
  }

  const stores = allStores.filter(s =>
    namedKitchens(s).includes(brand.kitchenName)
  )
  const boards = boardsFor(brand.menuAssetKey)
  const logo = LOGO[brand.slug]

  return (
    <main className='w-full overflow-x-clip bg-white'>
      <SEO
        title={`${brand.name} Menu — Clark’s Pump-N-Shop`}
        description={`${brand.blurb} Available inside ${stores.length} Clark’s Pump-N-Shop location${stores.length === 1 ? '' : 's'}.`}
        path={`/food/${brand.slug}`}
      />

      {/* Header */}
      <section className='bg-gradient-to-br from-white via-white to-neutral-50'>
        <div className='container mx-auto px-6 pt-8 md:px-10'>
          <nav className='text-sm text-black/60'>
            <Link to='/' className='hover:text-brand'>Home</Link>
            <span className='px-2'>/</span>
            <Link to='/food' className='hover:text-brand'>Food</Link>
            <span className='px-2'>/</span>
            <span className='text-black'>{brand.name}</span>
          </nav>

          <div className='flex flex-col items-start gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12'>
            <div>
              <Eyebrow>In-store kitchen</Eyebrow>
              <h1 className="mt-1 font-['Oswald'] text-4xl font-bold leading-tight text-black md:text-6xl">
                {brand.name}
              </h1>
              <div className='mt-4 h-1 w-40 rounded bg-brand' />
              <p className='mt-4 max-w-prose text-lg text-black/70 md:text-xl'>
                {brand.blurb}
              </p>
            </div>
            {logo && (
              <img
                src={logo}
                alt={`${brand.name} logo`}
                className='h-20 w-auto object-contain md:h-28'
              />
            )}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className='container mx-auto px-6 py-10 md:px-10'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {brand.sections.map(section => (
            <div
              key={section.title}
              className='rounded-2xl border border-black/10 bg-white p-6 shadow-soft'
            >
              <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">
                {section.title}
              </h2>
              {section.note && (
                <p className='mt-1 text-sm text-black/60'>{section.note}</p>
              )}
              <ul className='mt-4 divide-y divide-black/5'>
                {section.items.map(item => (
                  <li
                    key={item.name}
                    className='flex items-baseline justify-between gap-4 py-2.5'
                  >
                    <div className='min-w-0'>
                      <span className='font-medium text-black'>{item.name}</span>
                      {item.note && (
                        <span className='block text-sm text-black/60'>
                          {item.note}
                        </span>
                      )}
                    </div>
                    {item.price && (
                      <span className='shrink-0 font-semibold text-black'>
                        {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className='mt-6 text-sm text-black/50'>
          Prices and availability may vary by location. Nutrition information
          available in store.
        </p>
      </section>

      {/* Menu boards */}
      {boards.length > 0 && <MenuBoards name={brand.name} boards={boards} />}

      {/* Stores with this kitchen */}
      <section className='bg-surface-alt py-12'>
        <div className='container mx-auto px-6 md:px-10'>
          <Eyebrow>Find it near you</Eyebrow>
          <h2 className="mt-1 font-['Oswald'] text-3xl font-bold text-black md:text-4xl">
            {brand.name} is inside {stores.length} Clark’s location
            {stores.length === 1 ? '' : 's'}.
          </h2>
          <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {stores.map(s => (
              <StoreCard key={s.slug} store={s} />
            ))}
          </div>
          <div className='mt-8'>
            <Link
              to='/locations'
              className='inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-white transition-colors hover:bg-brand/90'
            >
              See all locations
            </Link>
          </div>
        </div>
      </section>

      {/* Other kitchens */}
      <section className='container mx-auto px-6 py-12 md:px-10'>
        <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">
          More from our kitchens
        </h2>
        <div className='mt-4 flex flex-wrap gap-3'>
          {FOOD_BRANDS.filter(b => b.slug !== brand.slug).map(b => (
            <Link
              key={b.slug}
              to={`/food/${b.slug}`}
              className='rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-medium text-black transition-colors hover:border-brand hover:text-brand'
            >
              {b.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function StoreCard({ store }: { store: Store }) {
  return (
    <Link
      to={`/locations/${store.slug}`}
      className='group rounded-2xl border border-black/10 bg-white p-5 shadow-soft transition-shadow hover:shadow-md'
    >
      <div className="font-['Oswald'] text-lg font-bold text-black group-hover:text-brand">
        {store.name}
      </div>
      <div className='mt-1 text-sm text-black/70'>
        {store.address}, {store.city}, {store.state}
      </div>
      <div className='mt-3 text-sm font-medium text-brand'>View store →</div>
    </Link>
  )
}

function MenuBoards({ name, boards }: { name: string; boards: string[] }) {
  const [lightbox, setLightbox] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section className='container mx-auto px-6 pb-4 md:px-10'>
      <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">
        The menu board
      </h2>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {boards.map(src => (
          <button
            key={src}
            type='button'
            onClick={() => setLightbox(src)}
            className='overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow hover:shadow-md'
            title={`${name} menu board`}
          >
            <img
              src={src}
              alt={`${name} menu board`}
              loading='lazy'
              className='h-auto w-full object-contain'
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt={`${name} menu board — full view`}
            className='max-h-[92vh] w-auto max-w-full rounded-xl object-contain'
          />
          <button
            type='button'
            onClick={() => setLightbox(null)}
            className='absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-white shadow-lg'
            aria-label='Close menu board'
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
