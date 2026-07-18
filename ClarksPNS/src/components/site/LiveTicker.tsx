// LIVE ticker — ESPN-style feed across the top of every page.
// Scrolls all 63 stores with real-time open/closed status computed from
// each store's actual hours. Built price-ready: when Clark's pricing
// feed comes online, add `price` to TickerItem and it renders in-line.
// No fabricated data, ever.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allStores, openNow, type Store } from '@/lib/stores'

type TickerItem = {
  store: Store
  open: boolean | null
  label: string
  // price?: string  <- reserved for Clark's live price feed
}

function buildItems(): TickerItem[] {
  return allStores
    .filter(s => s.lat != null)
    .map(store => {
      const st = openNow(store)
      return { store, open: st.open, label: st.label }
    })
}

const SPEED = 0.55 // px per frame

export default function LiveTicker() {
  const [items, setItems] = useState<TickerItem[]>(buildItems)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  // Recompute open/closed every minute so the feed stays truthful.
  useEffect(() => {
    const t = window.setInterval(() => setItems(buildItems()), 60_000)
    return () => window.clearInterval(t)
  }, [])

  // Continuous marquee (content rendered twice, wraps at half width).
  useEffect(() => {
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches
    if (reduced) return
    const tick = () => {
      const el = scrollerRef.current
      if (el && !pausedRef.current) {
        if (Math.abs(el.scrollLeft - posRef.current) > 2) {
          posRef.current = el.scrollLeft
        }
        const half = el.scrollWidth / 2
        let next = posRef.current + SPEED
        if (half > 0 && next >= half) next -= half
        posRef.current = next
        el.scrollLeft = next
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-label='Live store status feed'
      className='flex h-9 items-stretch overflow-hidden bg-[#0b153a] text-white'
    >
      {/* LIVE badge */}
      <div className='z-[1] flex shrink-0 items-center gap-2 bg-brand px-3 shadow-[4px_0_12px_rgba(0,0,0,0.4)]'>
        <span className='relative flex h-2 w-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d4d] opacity-75' />
          <span className='relative inline-flex h-2 w-2 rounded-full bg-[#ff4d4d]' />
        </span>
        <span className='font-display text-sm tracking-[0.2em]'>LIVE</span>
        <span className='hidden font-display text-sm tracking-[0.12em] text-white/60 sm:inline'>
          ALL CLARK’S PNS LOCATIONS
        </span>
      </div>

      {/* Feed */}
      <div
        ref={scrollerRef}
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
        className='flex items-center gap-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      >
        {[...items, ...items].map((it, i) => (
          <Link
            key={`${it.store.slug}-${i}`}
            to={`/locations/${it.store.slug}`}
            tabIndex={i >= items.length ? -1 : undefined}
            aria-hidden={i >= items.length || undefined}
            className='group flex shrink-0 items-center gap-2 border-r border-white/10 px-4 text-[0.72rem] leading-none'
          >
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                it.open === false ? 'bg-[#ff4d4d]' : 'bg-[#2fd06f]'
              }`}
            />
            <span className='font-display text-sm tracking-[0.08em] text-white group-hover:text-[#7db8ff]'>
              {it.store.name.toUpperCase()}
            </span>
            <span className='text-white/50'>
              {it.store.city}, {(it.store.state || '').toUpperCase()}
            </span>
            <span
              className={
                it.open === false ? 'text-[#ff8a8a]' : 'text-[#8be3ae]'
              }
            >
              {it.label.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
