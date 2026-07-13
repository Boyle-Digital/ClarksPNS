import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SEO } from '@/lib/seo'
import FindUsMap from '@/components/site/FindUsMap'
import StoreGallery from '@/components/site/StoreGallery'
import storeMedia from '@/content/store-media.json'
import {
  DAY_LABEL,
  DAY_ORDER,
  directionsHref,
  fullAddress,
  getStoreBySlug,
  namedKitchens,
  nearbyStores,
  openNow,
  priceCheckHref,
  storeJsonLd,
  todayKey,
  type Store
} from '@/lib/stores'

type Media = {
  image?: string
  video?: string
  poster?: string
  gallery?: string[]
  thumbs?: string[]
}
const MEDIA = storeMedia as Record<string, Media>

// Matches the site's eyebrow style: font-['Oswald'] tracking-wide text-xs uppercase text-brand
function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`font-['Oswald'] tracking-wide text-xs uppercase ${light ? 'text-white/80' : 'text-brand'}`}>
      {children}
    </div>
  )
}

function StatusText({ store }: { store: Store }) {
  const s = openNow(store)
  return <span className='text-sm text-black/60'>{s.label}</span>
}

function AmenityRow({ label }: { label: string }) {
  return (
    <li className='flex items-center gap-2 text-sm text-black/80'>
      <span className='grid h-7 w-7 flex-none place-items-center rounded-lg border border-black/10 bg-surface-alt text-brand'>
        <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <path d='M20 6L9 17l-5-5' />
        </svg>
      </span>
      {label}
    </li>
  )
}

function StoreMedia({ store }: { store: Store }) {
  const m = MEDIA[store.slug]
  const alt = `Clarks Pump-N-Shop in ${store.city}, ${store.state}`
  const cls = 'h-full w-full object-cover'
  if (m?.video) {
    return (
      <video className={cls} src={m.video} poster={m.poster} muted loop playsInline controls preload='none' aria-label={alt} />
    )
  }
  if (m?.image) {
    return <img className={cls} src={m.image} alt={alt} loading='lazy' decoding='async' />
  }
  return (
    <div className='grid h-full w-full place-items-center bg-gradient-to-br from-brand to-brand-blue text-white'>
      <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#fff' strokeWidth='1.1' opacity='0.85'>
        <rect x='3' y='7' width='12' height='12' rx='1' />
        <path d='M15 11h2.5L20 13.5V19h-5' /><circle cx='18' cy='19' r='1.6' /><circle cx='8' cy='19' r='1.6' /><path d='M6 7V5h6v2' />
      </svg>
      <span className='absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-xs'>
        Store photos coming soon.
      </span>
    </div>
  )
}

export default function StoreDetail() {
  const { slug } = useParams<{ slug: string }>()
  const store = getStoreBySlug(slug)

  if (!store) {
    return (
      <>
        <SEO title='Location not found — Clark’s Pump-N-Shop' robots='noindex,nofollow' />
        <main className='container mx-auto px-6 py-24 text-center md:px-10'>
          <h1 className="font-['Oswald'] text-4xl font-bold text-black">We can’t find that location</h1>
          <p className='mt-3 text-black/70'>Let’s get you back to the map.</p>
          <Link to='/locations' className='mt-6 inline-flex rounded-2xl bg-brand px-5 py-3 text-white hover:opacity-95'>
            Find a Location
          </Link>
        </main>
      </>
    )
  }

  const kitchens = namedKitchens(store)
  const amenities: string[] = [
    store.amenities.carWash && 'Car wash',
    store.amenities.diesel && 'Diesel & DEF',
    store.amenities.atm && 'ATM',
    store.amenities.beerCave && 'Beer cave',
    store.amenities.kerosene && 'Kerosene',
    store.amenities.e85 && 'E85',
    store.amenities.showers && 'Showers',
    store.amenities.rvDump && 'RV dump'
  ].filter((x): x is string => !!x)

  const today = todayKey()
  const nearby = nearbyStores(store, 3)

  return (
    <>
      <SEO
        title={`${store.name} — Clark’s Pump-N-Shop | ${store.city}, ${store.state}`}
        description={`Clark’s Pump-N-Shop in ${store.city}, ${store.state}: hours, fuel, ${
          kitchens.length ? kitchens.join(', ') + ', ' : ''
        }car wash, and directions. ${fullAddress(store)}.`}
        path={`/locations/${store.slug}`}
        jsonLd={[storeJsonLd(store)]}
      />

      <main className='w-full bg-white'>
        {/* Breadcrumb */}
        <div className='container mx-auto px-6 md:px-10'>
          <nav className='flex flex-wrap items-center gap-2 pt-6 text-sm text-black/50'>
            <Link to='/' className='hover:text-brand'>Home</Link><span>/</span>
            <Link to='/locations' className='hover:text-brand'>Locations</Link><span>/</span>
            <span>{store.state}</span><span>/</span>
            <span className='text-black/70'>{store.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 gap-8 py-8 lg:grid-cols-12 lg:py-10'>
            <div className='lg:col-span-7'>
              <Eyebrow>Store #{store.id} · {store.city}, {store.state}</Eyebrow>
              <h1 className="mt-2 font-['Oswald'] text-4xl font-bold leading-tight text-black md:text-6xl">
                {store.name}
              </h1>
              <p className='mt-3 text-lg text-black/70'>
                {store.address}, {store.city}, {store.state} {store.zip}
              </p>
              <div className='mt-3'><StatusText store={store} /></div>
              <div className='mt-6 flex flex-wrap gap-3'>
                <a
                  href={directionsHref(store)}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-base font-medium text-white transition-opacity hover:opacity-95'
                >
                  Get Directions
                </a>
                {store.phone && (
                  <a
                    href={`tel:${store.phone.replace(/[^0-9]/g, '')}`}
                    className='inline-flex items-center justify-center rounded-2xl border border-brand px-5 py-3 text-base font-medium text-brand transition-colors hover:bg-brand/5'
                  >
                    Call {store.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Store photo / video */}
            <div className='lg:col-span-5'>
              <div className='relative min-h-[240px] overflow-hidden rounded-2xl shadow-soft'>
                <StoreMedia store={store} />
              </div>
            </div>
          </div>
        </section>

        {/* Fuel — no published price */}
        <section className='container mx-auto px-6 md:px-10'>
          <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-soft'>
            <div>
              <Eyebrow>Fuel</Eyebrow>
              <div className='mt-1 text-black'>
                <span className='font-medium'>{store.fuelBrand ? `${store.fuelBrand} fuel` : 'Fuel available'}</span>
                <span className='text-black/60'>
                  {' '}— Regular · Plus · Premium{store.amenities.diesel ? ' · Diesel & DEF' : ''} on site.
                </span>
              </div>
            </div>
            <a
              href={priceCheckHref(store)}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center justify-center rounded-2xl border border-brand px-4 py-2.5 text-base font-medium text-brand transition-colors hover:bg-brand/5'
            >
              Check today’s price ↗
            </a>
          </div>
        </section>

        {/* Content columns */}
        <section className='container mx-auto px-6 py-10 md:px-10'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            <div className='space-y-6 lg:col-span-7'>
              {kitchens.length > 0 && (
                <div className='rounded-2xl border border-black/10 bg-white p-6 shadow-soft'>
                  <Eyebrow>In-store kitchens</Eyebrow>
                  <h2 className="mt-1 font-['Oswald'] text-2xl font-bold text-black md:text-3xl">Hot, fresh, and fast.</h2>
                  <p className='mt-1 text-black/70'>Made-to-order, right inside this location.</p>
                  <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    {kitchens.map(k => (
                      <div key={k} className='flex items-center gap-3 rounded-xl border border-black/10 bg-surface-alt p-3'>
                        <span className='grid h-11 w-11 flex-none place-items-center rounded-lg bg-brand text-sm font-bold text-white'>
                          {k.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                        <span className='font-medium text-black'>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {amenities.length > 0 && (
                <div className='rounded-2xl border border-black/10 bg-white p-6 shadow-soft'>
                  <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">At this location</h2>
                  <ul className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3'>
                    {amenities.map(a => <AmenityRow key={a} label={a} />)}
                  </ul>
                </div>
              )}

              <div className='rounded-2xl border border-black/10 bg-white p-6 shadow-soft'>
                <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">Store hours</h2>
                <table className='mt-3 w-full border-collapse'>
                  <tbody>
                    {DAY_ORDER.map(k => {
                      const h = store.hours[k]
                      const isToday = k === today
                      return (
                        <tr key={k} className='border-b border-black/5 last:border-0'>
                          <td className='py-2.5 text-[15px] text-black/60'>
                            {DAY_LABEL[k]}{isToday ? ' (today)' : ''}
                          </td>
                          <td className='py-2.5 text-right text-[15px] tabular-nums text-black/80'>
                            {h ? h.label : 'Call for hours'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Find us */}
            <div className='lg:col-span-5'>
              <div className='rounded-2xl border border-black/10 bg-white p-6 shadow-soft'>
                <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">Find us</h2>
                <div className='mt-3'>
                  <FindUsMap store={store} />
                </div>
                <div className='mt-4 space-y-2 text-[15px] text-black/80'>
                  <div>{fullAddress(store)}</div>
                  {store.phone && <div className='text-black/60'>{store.phone}</div>}
                  <a
                    href={directionsHref(store)}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-1 font-medium text-brand hover:underline'
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store gallery — every shot from this store's folder */}
        {(MEDIA[store.slug]?.gallery?.length ?? 0) > 0 && (
          <section className='container mx-auto px-6 pb-10 md:px-10'>
            <div className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">Store gallery</div>
            <h2 className="mt-1 font-['Oswald'] text-2xl font-bold text-black md:text-3xl">Take a look around.</h2>
            <StoreGallery
              images={MEDIA[store.slug]!.gallery!}
              thumbs={MEDIA[store.slug]!.thumbs}
              storeName={store.name}
            />
          </section>
        )}

        {/* Rewards — Clarks voice */}
        <section className='container mx-auto px-6 pb-10 md:px-10'>
          <div className='flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-gradient-to-r from-brand to-[#12205f] p-7 text-white shadow-soft'>
            <div>
              <Eyebrow light>Clarks Rewards</Eyebrow>
              <h2 className="mt-1 font-['Oswald'] text-2xl font-bold md:text-3xl">Earn on every fill-up and snack.</h2>
              <p className='mt-1 max-w-lg text-white/80'>
                Redeem for free fuel, in-store savings, and members-only perks—all in the app.
              </p>
            </div>
            <Link to='/clarks-rewards' className='inline-flex rounded-2xl bg-white px-5 py-3 font-medium text-brand hover:opacity-95'>
              Join Clarks Rewards
            </Link>
          </div>
        </section>

        {/* Nearby */}
        {nearby.length > 0 && (
          <section className='container mx-auto px-6 pb-16 md:px-10'>
            <h2 className="font-['Oswald'] text-2xl font-bold text-black md:text-3xl">Other Clarks nearby</h2>
            <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {nearby.map(n => (
                <Link
                  key={n.slug}
                  to={`/locations/${n.slug}`}
                  className='rounded-2xl border border-black/10 bg-white p-5 shadow-soft transition-transform hover:-translate-y-1'
                >
                  <div className='text-sm text-black/50'>#{n.id} · {n.miles.toFixed(1)} mi away</div>
                  <div className="mt-1 font-['Oswald'] text-xl font-bold text-black">{n.name}</div>
                  <div className='text-sm text-black/60'>{n.address} · {n.city}, {n.state}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
