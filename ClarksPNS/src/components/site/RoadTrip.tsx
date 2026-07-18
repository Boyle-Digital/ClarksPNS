// Road Trip mode — geocode a start and end, then list every Clark's
// within ~4 miles of the straight-line corridor, ordered along the
// route. Uses the same Google geocoder as the Locations search.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allStores, namedKitchens, type Store } from '@/lib/stores'
import { track } from '@/lib/track'

const GOOGLE_KEY = (
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
)?.trim()

type LatLng = { lat: number; lng: number }
type RouteHit = { store: Store; t: number; off: number }

async function geocode(q: string): Promise<LatLng | null> {
  if (!GOOGLE_KEY) return null
  const r = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      q + ', USA'
    )}&key=${GOOGLE_KEY}`
  )
  const d = await r.json()
  const loc = d?.results?.[0]?.geometry?.location
  return loc ? { lat: loc.lat, lng: loc.lng } : null
}

/** Distance (miles) from point P to segment AB + progress t along it,
 *  using an equirectangular projection (fine at Tri-State scale). */
function corridor(a: LatLng, b: LatLng, p: LatLng) {
  const kx = Math.cos((((a.lat + b.lat) / 2) * Math.PI) / 180) * 69.172
  const ky = 69.055
  const ax = a.lng * kx
  const ay = a.lat * ky
  const bx = b.lng * kx
  const by = b.lat * ky
  const px = p.lng * kx
  const py = p.lat * ky
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy || 1
  let t = ((px - ax) * dx + (py - ay) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const cx = ax + t * dx
  const cy = ay + t * dy
  return { off: Math.hypot(px - cx, py - cy), t }
}

export default function RoadTrip() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [hits, setHits] = useState<RouteHit[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const go = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!from.trim() || !to.trim()) return
    setBusy(true)
    setErr('')
    try {
      const [A, B] = await Promise.all([geocode(from), geocode(to)])
      if (!A || !B) {
        setErr('Could not find one of those places — try a city and state.')
        setHits(null)
        return
      }
      const out: RouteHit[] = []
      for (const s of allStores) {
        if (s.lat == null || s.lng == null) continue
        const { off, t } = corridor(A, B, { lat: s.lat, lng: s.lng })
        if (off <= 4) out.push({ store: s, t, off })
      }
      out.sort((x, y) => x.t - y.t)
      setHits(out)
      track('road_trip', { from, to, found: out.length })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className='mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6'>
      <h2 className='font-display text-2xl md:text-3xl'>Road trip?</h2>
      <p className='mt-1 text-sm text-white/70'>
        Tell us where you’re headed — we’ll line up every Clark’s along the
        way.
      </p>
      <form onSubmit={go} className='mt-4 flex flex-col gap-3 sm:flex-row'>
        <input
          value={from}
          onChange={e => setFrom(e.target.value)}
          placeholder='From — e.g. Ashland KY'
          className='h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-brand-blue'
        />
        <input
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder='To — e.g. Lexington KY'
          className='h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-brand-blue'
        />
        <button
          type='submit'
          disabled={busy || !GOOGLE_KEY}
          className='h-12 shrink-0 rounded-xl bg-white px-6 font-semibold text-brand transition-transform hover:-translate-y-0.5 disabled:opacity-50'
        >
          {busy ? 'Routing…' : 'Line them up'}
        </button>
      </form>
      {err && <p className='mt-3 text-sm text-[#ff8a8a]'>{err}</p>}
      {hits && (
        <div className='mt-5'>
          <div className='font-display text-lg tracking-[0.06em] text-[#8be3ae]'>
            {hits.length} CLARK’S ON YOUR ROUTE
          </div>
          <ol className='mt-3 space-y-2'>
            {hits.map(h => (
              <li key={h.store.slug}>
                <Link
                  to={`/locations/${h.store.slug}`}
                  className='group flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-colors hover:border-white/40'
                >
                  <span className='font-display text-lg text-white group-hover:text-[#7db8ff]'>
                    {h.store.name}
                  </span>
                  <span className='text-sm text-white/60'>
                    {h.store.city}, {(h.store.state || '').toUpperCase()} ·{' '}
                    {h.off.toFixed(1)} mi off route
                  </span>
                  {namedKitchens(h.store).length > 0 && (
                    <span className='text-xs text-[#8be3ae]'>
                      {namedKitchens(h.store).join(' · ')}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
