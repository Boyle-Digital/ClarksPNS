// The Beacon Map — every store plotted at its REAL coordinates on a
// canvas nightscape. Beacons pulse (green open / red closed from live
// hours), hover names the store, click goes to its page.
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allStores, openNow, type Store } from '@/lib/stores'

type Plot = { store: Store; x: number; y: number; open: boolean; ph: number }

export default function BeaconMap() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const cvRef = useRef<HTMLCanvasElement | null>(null)
  const plotsRef = useRef<Plot[]>([])
  const [hover, setHover] = useState<Plot | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const cv = cvRef.current
    const wrap = wrapRef.current
    if (!cv || !wrap) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const stores = allStores.filter(
      s => s.lat != null && s.lng != null
    ) as Array<Store & { lat: number; lng: number }>

    let W = 0
    let H = 0
    const dpr = window.devicePixelRatio || 1

    const layout = () => {
      const r = wrap.getBoundingClientRect()
      W = cv.width = r.width * dpr
      H = cv.height = 420 * dpr
      cv.style.height = '420px'
      const lats = stores.map(s => s.lat)
      const lngs = stores.map(s => s.lng)
      const minLat = Math.min(...lats)
      const maxLat = Math.max(...lats)
      const minLng = Math.min(...lngs)
      const maxLng = Math.max(...lngs)
      const pad = 0.08
      plotsRef.current = stores.map((s, i) => ({
        store: s,
        x:
          ((s.lng - minLng) / (maxLng - minLng)) * W * (1 - 2 * pad) + W * pad,
        y:
          ((maxLat - s.lat) / (maxLat - minLat)) * H * (1 - 2 * pad) + H * pad,
        open: openNow(s).open !== false,
        ph: (i * 0.61) % (Math.PI * 2)
      }))
    }
    layout()
    window.addEventListener('resize', layout)

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      // faint highway web: connect each beacon to its nearest neighbor
      ctx.strokeStyle = 'rgba(0,132,255,0.14)'
      ctx.lineWidth = 1 * dpr
      const ps = plotsRef.current
      for (const p of ps) {
        let best: Plot | null = null
        let bd = Infinity
        for (const q of ps) {
          if (q === p) continue
          const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2
          if (d < bd) {
            bd = d
            best = q
          }
        }
        if (best) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(best.x, best.y)
          ctx.stroke()
        }
      }
      // beacons
      for (const p of ps) {
        const pulse = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t / 800 + p.ph)
        const col = p.open ? '47,208,111' : '255,77,77'
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14 * dpr)
        g.addColorStop(0, `rgba(${col},${0.5 * pulse})`)
        g.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, 14 * dpr, 0, 7)
        ctx.fill()
        ctx.fillStyle = `rgba(${col},1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3 * dpr, 0, 7)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    if (reduced) draw(0)
    else raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
    }
  }, [])

  const locate = (e: React.MouseEvent): Plot | null => {
    const cv = cvRef.current
    if (!cv) return null
    const r = cv.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const mx = (e.clientX - r.left) * dpr
    const my = (e.clientY - r.top) * dpr
    let best: Plot | null = null
    let bd = Infinity
    for (const p of plotsRef.current) {
      const d = (p.x - mx) ** 2 + (p.y - my) ** 2
      if (d < bd) {
        bd = d
        best = p
      }
    }
    return best && bd < (16 * dpr) ** 2 ? best : null
  }

  return (
    <div ref={wrapRef} className='relative'>
      <canvas
        ref={cvRef}
        className='block w-full cursor-pointer rounded-2xl border border-white/15'
        onMouseMove={e => setHover(locate(e))}
        onMouseLeave={() => setHover(null)}
        onClick={e => {
          const p = locate(e)
          if (p) navigate(`/locations/${p.store.slug}`)
        }}
        aria-label='Map of every Clark’s location — click a beacon to open its store page'
      />
      {hover && (
        <div className='pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-xl bg-[#0b153a] px-4 py-2 text-center shadow-lg ring-1 ring-white/20'>
          <div className='font-display text-lg leading-none text-white'>
            {hover.store.name}
          </div>
          <div className='text-xs text-white/70'>
            {hover.store.city}, {(hover.store.state || '').toUpperCase()} ·{' '}
            <span className={hover.open ? 'text-[#8be3ae]' : 'text-[#ff8a8a]'}>
              {hover.open ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      )}
      <div className='mt-2 text-center text-xs text-white/50'>
        Every beacon is a real Clark’s at its exact coordinates — green is
        open right now. Click one to visit the store.
      </div>
    </div>
  )
}
