// Shared 3D tilt wrapper — wrap any card in <Tilt> and it leans toward
// the cursor. Respects prefers-reduced-motion. Parent should carry
// [perspective:...] for the strongest effect (works standalone too).
import type { ReactNode, MouseEvent } from 'react'

export default function Tilt({
  children,
  className = '',
  max = 6
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max * 0.75}deg) translateZ(4px)`
  }
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
      }}
      className={`transition-transform duration-200 [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  )
}
