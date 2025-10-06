// src/pages/ClarksCafeBreakfast.tsx
import React, { useCallback, useState } from 'react'
import * as htmlToImage from 'html-to-image'

// ---- Images (swap/keep as you like) ----
import rewardsLogo from '@/assets/images/Clarks-PNS-Main-Rewards-Logo-Cropped.png'
import cafeLogo from '@/assets/images/clarkscafelogo.webp'
import cowboyMascot from '@/assets/images/RodneyTB.png'
import coffeeCups from '@/assets/images/food/Clarks-Coffee-Cappuccino-4.png'

// ---------------- Types ----------------
type MenuItem = { name: string; price: number; sub?: string }
type MenuSection = { id: string; title: string; items: MenuItem[] }

// ---------------- Data (merged) ----------------
const sections: MenuSection[] = [
  {
    id: 'cafe-specials',
    title: 'Café Specials',
    items: [
      { name: 'Café Special • 2 eggs + biscuit & gravy + sausage or 3 bacon', price: 5.99 },
      { name: 'Egg Breakfast • egg + meat + biscuit/toast', price: 3.99, sub: '2 eggs 4.99' },
      { name: 'Loaded Breakfast Burrito', price: 3.59 },
      { name: 'BLT on Toast • 3 bacon', price: 3.59 },
      { name: 'BLT on Toast • 6 bacon', price: 5.29 },
      { name: 'Omelet w/ Cheese', price: 2.99 },
      { name: 'Omelet w/ Meat & Cheese', price: 3.99 },
      { name: 'Biscuit & Gravy • 1 biscuit', price: 2.29 },
      { name: 'Biscuit & Gravy • 2 biscuits', price: 3.29 }
    ]
  },
  {
    id: 'biscuits-sandwiches',
    title: 'Biscuits & Sandwiches',
    items: [
      { name: 'Pork Tenderloin', price: 3.69, sub: '+egg 3.89 • +egg & cheese 4.29' },
      { name: 'Sausage', price: 2.59, sub: '+egg 3.09 • +egg & cheese 3.49' },
      { name: 'Bacon', price: 2.99, sub: '+egg 3.49 • +egg & cheese 3.89' },
      { name: 'Ham', price: 2.49, sub: '+egg 3.19 • +egg & cheese 3.59' },
      { name: 'Chicken Strip', price: 2.79, sub: '+egg 3.49 • +egg & cheese 3.89' },
      { name: 'Bologna', price: 2.99, sub: '+egg & cheese 3.79' },
      { name: 'Split Smoked Sausage', price: 2.99, sub: '+egg 3.69 • +egg & cheese 4.09' },
      { name: 'Breaded Beef Steak', price: 3.49, sub: '+egg 3.99 • +egg & cheese 4.39' },
      { name: 'Big T', price: 2.99 },
      { name: 'Egg Biscuit/Toast', price: 1.99 }
    ]
  },
  {
    id: 'sides-extras',
    title: 'Sides & Extras',
    items: [
      { name: 'Hashbrown', price: 1.49 },
      { name: 'Biscuit', price: 1.19 },
      { name: 'Toast', price: 0.99 },
      { name: 'Egg', price: 1.09 },
      { name: 'Gravy', price: 1.29 },
      { name: 'Sausage & Gravy Stuffed Hashbrown', price: 3.29 },
      { name: 'Cheese', price: 0.59 },
      { name: 'Ham', price: 1.99 },
      { name: 'Bacon', price: 1.99 },
      { name: 'Chicken', price: 1.99 },
      { name: 'Sausage', price: 1.99 },
      { name: 'Bologna', price: 1.99 },
      { name: 'Pork', price: 2.99 },
      { name: 'Split Smoked Sausage', price: 2.99 }
    ]
  }
]

// ---------------- Helpers ----------------
const fmt = (n: number) => `$${n.toFixed(2)}`
const BrandBlue = '#273790'
const Gold = '#f6c23e'

function PriceRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-baseline gap-2">
      <span className="text-[0.95rem] leading-tight text-neutral-900">
        {item.name}
        {item.sub && <span className="text-neutral-600"> — {item.sub}</span>}
      </span>
      <div className="mx-2 grow border-b border-dotted border-neutral-300/80" />
      <span className="shrink-0 tabular-nums font-extrabold tracking-tight">{fmt(item.price)}</span>
    </li>
  )
}

function OutlineBox({
  title,
  children,
  accent = BrandBlue
}: {
  title: string
  children: React.ReactNode
  accent?: string
}) {
  return (
    <section
      className="rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-black/5"
      style={{ border: `2px solid ${accent}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-5 w-1.5 rounded-sm"
          style={{ backgroundColor: Gold }}
          aria-hidden
        />
        <h3 className="text-xl font-extrabold tracking-wide" style={{ color: BrandBlue }}>
          {title}
        </h3>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: `${BrandBlue}22` }} />
      <div className="mt-2">{children}</div>
    </section>
  )
}

function ExportButtons() {
  const [busy, setBusy] = useState(false)
  const exportPng = useCallback(async () => {
    const node = document.getElementById('menu-canvas')
    if (!node) return
    try {
      setBusy(true)
      const prev = { width: node.style.width, height: node.style.height }
      node.style.width = '1280px'
      node.style.height = '720px'
      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff',
        filter: (el) => !el.classList?.contains('no-export'),
        width: 1280,
        height: 720
      })
      node.style.width = prev.width
      node.style.height = prev.height
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'clarks-cafe-breakfast.png'
      a.click()
    } finally {
      setBusy(false)
    }
  }, [])
  const printPdf = () => window.print()

  return (
    <div className="no-print no-export fixed bottom-4 right-4 z-[60] flex gap-2">
      <button
        onClick={exportPng}
        disabled={busy}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-white shadow hover:bg-neutral-800 disabled:opacity-60"
      >
        {busy ? 'Exporting…' : 'Export PNG'}
      </button>
      <button
        onClick={printPdf}
        className="rounded-lg bg-white/90 px-4 py-2 text-neutral-900 shadow ring-1 ring-black/10 hover:bg-white"
      >
        Print PDF
      </button>
    </div>
  )
}

// ---------------- Page ----------------
export default function ClarksCafeBreakfast() {
  const byId = Object.fromEntries(sections.map((s) => [s.id, s]))

  return (
    <main className="min-h-screen text-neutral-900 bg-neutral-100">
      <style>{`
        @page { size: 1280px 720px; margin: 0; }
        @media print {
          html, body { height: 720px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #menu-canvas { width: 1280px !important; height: 720px !important; overflow: visible !important; }
          .no-print { display: none !important; }
          header, nav, footer { display: none !important; }
        }
      `}</style>

      <div
        id="menu-canvas"
        className="mx-auto my-4 aspect-[16/9] w-full max-w-[1280px] overflow-hidden rounded-2xl bg-white shadow ring-1 ring-black/10 print:my-0 print:rounded-none print:shadow-none"
      >
        {/* subtle gradient wash like the sample */}
        <div className="relative h-full w-full">
          <div
            className="pointer-events-none absolute inset-y-0 right-[-15%] w-[55%] opacity-80"
            style={{
              background:
                'radial-gradient(60% 60% at 30% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)'
            }}
          />
          {/* header band */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-4">
            <div className="flex items-center gap-3">
              <img src={cafeLogo} alt="Clark's Cafe" className="h-14 w-14 rounded-full bg-white object-contain ring-1 ring-black/10" />
              <div>
                <div className="text-[13px] font-extrabold uppercase tracking-widest" style={{ color: Gold }}>
                  Fresh • Fast • Friendly
                </div>
                <div className="text-4xl md:text-[44px] leading-none font-black tracking-tight" style={{ color: BrandBlue }}>
                  CLARK’S <span className="text-neutral-900">BREAKFAST</span>
                </div>
              </div>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <img src={cowboyMascot} alt="Mascot" className="h-12 w-12" />
              <img src={rewardsLogo} alt="Rewards" className="h-7" />
            </div>
          </div>

          {/* split layout like poster: left/right columns */}
          <div className="relative z-10 grid h-[calc(100%-88px)] grid-cols-1 gap-6 px-6 pb-6 pt-4 md:grid-cols-2">
            {/* LEFT: Big headline + feature box + list */}
            <div className="flex flex-col">
              {/* Big left headline similar to "HAND-BREADED CHICKEN" */}
              <div className="mb-3 leading-none">
                <div className="text-sm font-extrabold uppercase tracking-[0.25em]" style={{ color: Gold }}>
                  Morning Favorites
                </div>
                <div className="text-[44px] md:text-[56px] font-black tracking-tight" style={{ color: BrandBlue }}>
                  CAFÉ SPECIALS
                </div>
              </div>

              {/* Feature outline box (pull a few items to spotlight like the “Krunch Box”) */}
              <OutlineBox title="Combo Plates" accent={BrandBlue}>
                <ul className="space-y-1.5">
                  {byId['cafe-specials'].items.slice(0, 3).map((it) => (
                    <PriceRow key={it.name} item={it} />
                  ))}
                </ul>
              </OutlineBox>

              {/* Secondary list under it */}
              <div className="mt-4">
                <h4 className="mb-2 text-lg font-extrabold tracking-wide" style={{ color: BrandBlue }}>
                  More Café Specials
                </h4>
                <ul className="space-y-1.5">
                  {byId['cafe-specials'].items.slice(3).map((it) => (
                    <PriceRow key={it.name} item={it} />
                  ))}
                </ul>
              </div>

              {/* round photo callout like sample */}
              <div className="mt-auto flex items-end gap-4 pt-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow">
                  <img src={coffeeCups} alt="Coffee" className="h-full w-full object-cover" />
                </div>
                <div
                  className="rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-wider"
                  style={{ color: BrandBlue, backgroundColor: `${Gold}33` }}
                >
                  Hot Coffee • Cappuccino
                </div>
              </div>
            </div>

            {/* RIGHT: Another big header + two boxes (like tenders area) */}
            <div className="flex flex-col">
              <div className="mb-3 leading-none">
                <div className="text-sm font-extrabold uppercase tracking-[0.25em]" style={{ color: Gold }}>
                  Handhelds & Sides
                </div>
                <div className="text-[44px] md:text-[56px] font-black tracking-tight text-neutral-900">
                  BISCUITS & SIDES
                </div>
              </div>

              <OutlineBox title="Biscuits & Sandwiches" accent={BrandBlue}>
                <ul className="space-y-1.5">
                  {byId['biscuits-sandwiches'].items.map((it) => (
                    <PriceRow key={it.name} item={it} />
                  ))}
                </ul>
              </OutlineBox>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-1">
                <OutlineBox title="Sides & Extras" accent={BrandBlue}>
                  <ul className="space-y-1.5">
                    {byId['sides-extras'].items.map((it) => (
                      <PriceRow key={it.name} item={it} />
                    ))}
                  </ul>
                </OutlineBox>
              </div>

              {/* small legal/note row to mimic poster footnotes */}
              <p className="mt-3 text-[11px] leading-snug text-neutral-600">
                Prices subject to change. Please inform us of any allergies. © Clark’s PNS Café.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ExportButtons />
    </main>
  )
}
