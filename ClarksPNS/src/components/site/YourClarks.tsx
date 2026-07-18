import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { allStores, milesBetween, openNow, type Store } from '@/lib/stores'

// "Your Clark's" — homepage personalization band. Quietly asks for the
// visitor's location and shows their nearest store with live open/closed
// status and distance. Renders nothing until a location is available, so
// declining the prompt simply means no band.

type Nearest = { store: Store; miles: number }

export default function YourClarks() {
  const [nearest, setNearest] = useState<Nearest | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      pos => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        let best: Nearest | null = null
        for (const s of allStores) {
          if (s.lat == null || s.lng == null) continue
          const miles = milesBetween(here, { lat: s.lat, lng: s.lng })
          if (!best || miles < best.miles) best = { store: s, miles }
        }
        if (best) setNearest(best)
      },
      () => {},
      { timeout: 8000, maximumAge: 300000 }
    )
  }, [])

  if (!nearest) return null

  const { store, miles } = nearest
  const status = openNow(store)

  return (
    <section aria-label='Your nearest Clark’s' className='bg-brand text-white'>
      <div className='container mx-auto px-6 md:px-10'>
        <Link
          to={`/locations/${store.slug}`}
          className='group flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between'
        >
          <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
            <span className="font-display text-xs uppercase tracking-wide text-white/70">
              Your Clark’s
            </span>
            <span className="font-display text-lg font-bold md:text-xl">
              {store.name} · {store.city}, {store.state}
            </span>
            <span className='text-sm text-white/85'>
              {status.label} · {miles.toFixed(1)} mi away
            </span>
          </div>
          <span className='inline-flex shrink-0 items-center gap-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand transition-transform group-hover:translate-x-0.5'>
            View store →
          </span>
        </Link>
      </div>
    </section>
  )
}
