// Site search — press the search button (or "/") and type anything:
// a town, a store, "beer cave", "diesel", "pizza". Results come from
// the real store index and the site's pages. Client-side, instant.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allStores, namedKitchens } from '@/lib/stores'
import { IconClose } from '@/components/site/Icons'

type Hit = { label: string; sub: string; href: string }

const PAGES: Hit[] = [
  { label: 'All locations', sub: 'Find a Clark’s near you', href: '/locations' },
  { label: 'Food & menus', sub: 'Five in-store kitchens', href: '/food' },
  { label: 'Krispy Krunchy Chicken', sub: 'Menu & stores', href: '/food/krispy-krunchy' },
  { label: 'Hangar 54 Pizza', sub: 'Menu & stores', href: '/food/hangar-54' },
  { label: 'Clark’s Café', sub: 'Breakfast menu & stores', href: '/food/clarks-cafe' },
  { label: 'Champs Chicken', sub: 'Menu & stores', href: '/food/champs' },
  { label: 'Cooper’s Express', sub: 'Menu & stores', href: '/food/coopers' },
  { label: 'Clarks Rewards', sub: '10 pts per $1 · 20 pts per gallon', href: '/clarks-rewards' },
  { label: 'Car wash', sub: 'Keep It Clean Club & gift cards', href: '/car-wash' },
  { label: 'Beer Cave finder', sub: '47 walk-in caves', href: '/beer-cave' },
  { label: 'Fleet & diesel', sub: 'Diesel, kerosene, fleet card', href: '/fleet' },
  { label: 'Sports & community', sub: 'Official Fuel of the KHSAA', href: '/community' },
  { label: 'Scholarships', sub: 'Clark Family & Rodney Clark Memorial', href: '/scholarship' },
  { label: 'Charity', sub: 'Request a donation', href: '/charity' },
  { label: 'Careers', sub: 'Join the Clark’s team', href: '/careers' },
  { label: 'Our story', sub: 'One family, three generations', href: '/about-us' }
]

const AMENITY_WORDS: Array<[string, (s: (typeof allStores)[number]) => boolean]> = [
  ['beer cave', s => !!s.amenities?.beerCave],
  ['diesel', s => !!s.amenities?.diesel],
  ['kerosene', s => !!s.amenities?.kerosene],
  ['atm', s => !!s.amenities?.atm],
  ['24 hours', s => !!s.open24],
  ['open 24', s => !!s.open24]
]

export default function SearchOverlay({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const hits = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return PAGES.slice(0, 8)
    const out: Hit[] = []

    // pages
    for (const p of PAGES) {
      if ((p.label + ' ' + p.sub).toLowerCase().includes(needle)) out.push(p)
    }
    // amenity terms -> matching stores
    const amenity = AMENITY_WORDS.find(([w]) => needle.includes(w))
    // stores by name/city/state/kitchen
    for (const s of allStores) {
      if (out.length > 14) break
      const hay = `${s.name} ${s.city} ${s.state} ${namedKitchens(s).join(' ')}`.toLowerCase()
      const amenityHit = amenity && amenity[1](s)
      const restNeedle = amenity ? needle.replace(amenity[0], '').trim() : needle
      if (
        (amenityHit && (!restNeedle || hay.includes(restNeedle))) ||
        (!amenity && hay.includes(needle))
      ) {
        out.push({
          label: s.name,
          sub: `${s.city}, ${(s.state || '').toUpperCase()}${amenityHit ? ` · ${amenity![0]}` : ''}`,
          href: `/locations/${s.slug}`
        })
      }
    }
    return out.slice(0, 14)
  }, [q])

  if (!open) return null

  return (
    <div
      className='fixed inset-0 z-modal flex items-start justify-center bg-[#060b1e]/80 p-4 pt-[12vh] backdrop-blur-sm'
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
      role='dialog'
      aria-modal='true'
      aria-label='Search Clark’s'
    >
      <div className='w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center gap-3 border-b border-black/10 px-5'>
          <span className='font-display text-sm tracking-[0.2em] text-brand'>
            SEARCH
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder='Try “beer cave lexington”, “diesel”, “pizza”, “huntington”…'
            className='h-14 w-full bg-transparent text-base text-black outline-none placeholder:text-black/40'
          />
          <button
            type='button'
            onClick={onClose}
            aria-label='Close search'
            className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neutral-100 text-black hover:bg-neutral-200'
          >
            <IconClose className='h-4 w-4' />
          </button>
        </div>
        <ul className='max-h-[50vh] overflow-y-auto py-2'>
          {hits.map(h => (
            <li key={h.href + h.label}>
              <Link
                to={h.href}
                onClick={onClose}
                className='flex items-baseline justify-between gap-4 px-5 py-2.5 hover:bg-brand/5'
              >
                <span className='font-medium text-black'>{h.label}</span>
                <span className='shrink-0 text-xs text-black/50'>{h.sub}</span>
              </Link>
            </li>
          ))}
          {hits.length === 0 && (
            <li className='px-5 py-6 text-sm text-black/50'>
              Nothing matched — try a town, a store name, or a food brand.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
