// Stylized 3D forecourt model for a store page: canopy + store, plus a
// wash bay and diesel lane when the store actually has them. The canopy
// sign glows green while the store is open, red when closed — computed
// from real hours. Tilts toward the cursor.
import { useRef } from 'react'
import { openNow, type Store } from '@/lib/stores'

export default function Forecourt3D({ store }: { store: Store }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const status = openNow(store)
  const open = status.open !== false
  const glow = open ? '#2fd06f' : '#ff4d4d'

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 8}deg)`
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = ''
      }}
      className='mx-auto w-full max-w-[420px] transition-transform duration-200 [transform-style:preserve-3d]'
      aria-hidden
    >
      <svg viewBox='0 0 420 240'>
        {/* lot */}
        <ellipse cx='210' cy='218' rx='195' ry='16' fill='#0b153a' opacity='0.12' />
        <rect x='16' y='150' width='388' height='62' rx='8' fill='#e8ecf5' />
        {/* store */}
        <rect x='236' y='84' width='150' height='84' rx='6' fill='#f5f7fc' stroke='#c9d2e6' />
        <rect x='236' y='84' width='150' height='18' fill='#263B95' />
        <rect x='240' y='87' width='90' height='12' rx='3' fill='#ffffff' />
        <text x='285' y='97' textAnchor='middle' fill='#263B95' fontFamily='"Bebas Neue", Oswald, sans-serif' fontSize='11'>CLARK’S PUMP-N-SHOP</text>
        <rect x='252' y='116' width='34' height='52' fill='#9fb4de' />
        <rect x='294' y='116' width='34' height='42' fill='#bfd0ef' />
        <rect x='336' y='116' width='34' height='42' fill='#bfd0ef' />
        {/* canopy */}
        <rect x='30' y='58' width='180' height='16' rx='4' fill='#263B95' />
        <rect x='30' y='74' width='180' height='5' fill='#0084FF' />
        <rect x='48' y='79' width='7' height='76' fill='#1a2757' />
        <rect x='186' y='79' width='7' height='76' fill='#1a2757' />
        {/* status sign on canopy */}
        <rect x='92' y='40' width='56' height='22' rx='4' fill='#0b153a' />
        <circle cx='104' cy='51' r='4' fill={glow}>
          <animate attributeName='opacity' values='1;0.35;1' dur='2s' repeatCount='indefinite' />
        </circle>
        <text x='130' y='55' textAnchor='middle' fill='#ffffff' fontFamily='"Bebas Neue", Oswald, sans-serif' fontSize='11'>
          {open ? 'OPEN' : 'CLOSED'}
        </text>
        {/* pumps */}
        <g>
          <rect x='84' y='118' width='18' height='36' rx='3' fill='#1b2f7d' />
          <rect x='87' y='123' width='12' height='9' rx='2' fill='#0084FF' />
          <rect x='138' y='118' width='18' height='36' rx='3' fill='#1b2f7d' />
          <rect x='141' y='123' width='12' height='9' rx='2' fill='#0084FF' />
        </g>
        {/* diesel lane */}
        {store.amenities?.diesel && (
          <g>
            <rect x='30' y='186' width='120' height='18' rx='4' fill='#16224e' />
            <text x='90' y='199' textAnchor='middle' fill='#8be3ae' fontFamily='"Bebas Neue", Oswald, sans-serif' fontSize='11' letterSpacing='2'>DIESEL LANE</text>
          </g>
        )}
        {/* wash bay */}
        {store.amenities?.carWash && (
          <g>
            <rect x='250' y='178' width='96' height='30' rx='5' fill='#1b2f7d' />
            <rect x='262' y='184' width='72' height='18' rx='3' fill='#0b153a' />
            <text x='298' y='197' textAnchor='middle' fill='#7db8ff' fontFamily='"Bebas Neue", Oswald, sans-serif' fontSize='10' letterSpacing='1'>CAR WASH</text>
          </g>
        )}
      </svg>
    </div>
  )
}
