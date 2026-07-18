// Beer Cave finder — every Clark's with a walk-in beer cave, from the same
// amenity data the store pages use.
import { Link } from 'react-router-dom'
import { SEO } from '@/lib/seo'
import { IconSnow } from '@/components/site/Icons'
import { allStores, openNow, type Store } from '@/lib/stores'

const CAVE_STORES = allStores.filter(s => s.amenities?.beerCave)

const BY_STATE: Array<{ state: string; label: string; stores: Store[] }> = [
  { state: 'KY', label: 'Kentucky' },
  { state: 'OH', label: 'Ohio' },
  { state: 'WV', label: 'West Virginia' }
].map(g => ({
  ...g,
  stores: CAVE_STORES.filter(
    s => (s.state || '').toUpperCase() === g.state
  ).sort((a, b) => (a.city || '').localeCompare(b.city || ''))
}))

export default function BeerCave() {
  return (
    <main className='w-full overflow-x-clip bg-white'>
      <SEO
        title='Beer Cave Finder — Clark’s Pump-N-Shop'
        description={`Walk-in beer caves at ${CAVE_STORES.length} Clark's Pump-N-Shop locations across Kentucky, Ohio & West Virginia. Ice cold, always stocked.`}
        path='/beer-cave'
      />

      {/* Frosty hero */}
      <section className='relative isolate -mt-[16px] overflow-hidden bg-gradient-to-b from-[#0b1f5e] via-brand to-[#0084FF] md:-mt-[20px]'>
        {/* frost streaks */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.12]'
          style={{
            background:
              'repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 26px)'
          }}
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 left-1/2 h-72 w-[130%] -translate-x-1/2 rounded-[100%] bg-white/10 blur-3xl'
        />
        <div className='container relative z-[1] mx-auto px-6 py-20 text-white md:px-10 md:py-28'>
          <div className="font-['Oswald'] text-xs uppercase tracking-[0.3em] text-white/70">
            The Beer Cave
          </div>
          <h1 className="mt-2 font-['Oswald'] text-5xl font-bold leading-none md:text-7xl">
            Ice cold.
            <br />
            Walk in.
          </h1>
          <p className='mt-5 max-w-prose text-lg text-white/85 md:text-xl'>
            {CAVE_STORES.length} Clark’s locations have a walk-in beer cave —
            a whole room kept freezing so your six-pack never sees a warm
            shelf.
          </p>
          <a
            href='#find'
            className='mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-brand shadow-lg transition-transform hover:-translate-y-0.5 md:text-lg'
          >
            Find a cave near you ↓
          </a>
        </div>
        <div className='h-8 w-full bg-gradient-to-b from-transparent to-white md:h-12' />
      </section>

      {/* Store grid by state */}
      <section id='find' className='container mx-auto px-6 py-12 md:px-10'>
        {BY_STATE.filter(g => g.stores.length).map(g => (
          <div key={g.state} className='mb-10'>
            <h2 className="font-['Oswald'] text-3xl font-bold text-black md:text-4xl">
              {g.label}
              <span className='ml-3 align-middle text-base font-normal text-black/50'>
                {g.stores.length} cave{g.stores.length === 1 ? '' : 's'}
              </span>
            </h2>
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {g.stores.map(s => (
                <CaveCard key={s.slug} store={s} />
              ))}
            </div>
          </div>
        ))}
        <p className='text-sm text-black/50'>
          Please drink responsibly. Valid ID required for all alcohol
          purchases; beer sales hours follow state and local law.
        </p>
      </section>
    </main>
  )
}

function CaveCard({ store }: { store: Store }) {
  const status = openNow(store)
  return (
    <Link
      to={`/locations/${store.slug}`}
      className='group rounded-2xl border border-black/10 bg-white p-5 shadow-soft transition-shadow hover:shadow-md'
    >
      <div className='flex items-center justify-between gap-3'>
        <div className="font-['Oswald'] text-lg font-bold text-black group-hover:text-brand">
          {store.name}
        </div>
        <span className='shrink-0 rounded-full bg-[#eaf3ff] px-2.5 py-1 text-xs font-semibold text-brand'>
          <IconSnow className='inline h-3.5 w-3.5 -mt-0.5 mr-1' /> Beer Cave
        </span>
      </div>
      <div className='mt-1 text-sm text-black/70'>
        {store.address}, {store.city}, {store.state}
      </div>
      <div className='mt-2 text-sm text-black/60'>{status.label}</div>
      <div className='mt-3 text-sm font-medium text-brand'>View store →</div>
    </Link>
  )
}
