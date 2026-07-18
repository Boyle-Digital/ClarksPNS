// Brand icon set — drawn line icons, no emojis anywhere in the UI.
// 24x24 viewBox, stroke-based, inherit currentColor.
import type { SVGProps } from 'react'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true
}

type P = SVGProps<SVGSVGElement>

export function IconShine(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8' />
    </svg>
  )
}

export function IconFoam(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx='7' cy='14' r='3.4' />
      <circle cx='14.5' cy='10' r='4.6' />
      <circle cx='17.5' cy='17' r='2.6' />
    </svg>
  )
}

export function IconFast(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M13 3 5 13.5h5L11 21l8-10.5h-5L13 3z' />
    </svg>
  )
}

export function IconDrop(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M12 3.5c3.2 4.2 6 7.6 6 10.7a6 6 0 1 1-12 0c0-3.1 2.8-6.5 6-10.7z' />
      <path d='M9.5 14.5a2.8 2.8 0 0 0 2 2.6' />
    </svg>
  )
}

export function IconPump(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x='4' y='4' width='9' height='16.5' rx='1.5' />
      <rect x='6.4' y='6.5' width='4.2' height='4' rx='0.8' />
      <path d='M13 9h2.6a2 2 0 0 1 2 2v5.4a1.6 1.6 0 0 0 3.2 0V9.8L18.6 7' />
      <path d='M2.5 20.5h12' />
    </svg>
  )
}

export function IconCoffee(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M4 9h12v6.5A4.5 4.5 0 0 1 11.5 20h-3A4.5 4.5 0 0 1 4 15.5V9z' />
      <path d='M16 10.5h1.6a2.4 2.4 0 0 1 0 4.8H16' />
      <path d='M8 3.8c0 1-.9 1.2-.9 2.2M12 3.8c0 1-.9 1.2-.9 2.2' />
    </svg>
  )
}

export function IconGift(props: P) {
  return (
    <svg {...base} {...props}>
      <rect x='4' y='9' width='16' height='11.5' rx='1.5' />
      <path d='M12 9v11.5M4 13.5h16' />
      <path d='M12 9c-1.8 0-4.4-.6-4.4-2.7A2.2 2.2 0 0 1 12 5.6 2.2 2.2 0 0 1 16.4 6.3C16.4 8.4 13.8 9 12 9z' />
    </svg>
  )
}

export function IconSnow(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9' />
      <path d='M12 3l-2 2.2M12 3l2 2.2M12 21l-2-2.2M12 21l2-2.2' />
    </svg>
  )
}

export function IconClose(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M6 6l12 12M18 6L6 18' />
    </svg>
  )
}

export function IconTrophy(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M8 4h8v5a4 4 0 0 1-8 0V4z' />
      <path d='M8 5H5a3 3 0 0 0 3 4.5M16 5h3a3 3 0 0 1-3 4.5' />
      <path d='M12 13v3.5M8.5 20.5h7M10 16.5h4v4h-4z' />
    </svg>
  )
}

export function IconCap(props: P) {
  return (
    <svg {...base} {...props}>
      <path d='M12 5 2.5 9.5 12 14l9.5-4.5L12 5z' />
      <path d='M6.5 11.7V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.3' />
      <path d='M21.5 9.5V15' />
    </svg>
  )
}
