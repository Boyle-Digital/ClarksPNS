// src/pages/Food.tsx
import React from 'react'
import champsLogo from '@/assets/images/champschickenlogo.png'
import hangarLogo from '@/assets/images/Hangar54Logo_02-1.png'
import jacksLogo from '@/assets/images/jacksdelilogo.webp'
import cafeLogo from '@/assets/images/clarkscafelogo.webp'
import kkcLogo from '@/assets/images/krispykrunchychickenlogo.webp'

import foodHeroVideo from '@/assets/videos/30sFoodVideo_1080.mp4'

/** === Auto-import: sitewide food gallery === */
const ALL_GALLERY = Object.values(
  import.meta.glob('@/assets/food-gallery/**/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    as: 'url'
  })
) as string[]


/** === Auto-import: menus (PDFs + images) — merged sources === */

/** === Auto-import: menus (PDFs + images) — search ANY menus/ under /src/** === */

// 1) Alias-prefixed (covers @/)
const _MENU_PDFS_A = import.meta.glob('@/**/menus/**/*.{pdf}', {
  eager: true,
  as: 'url'
}) as Record<string, string>
const _MENU_IMAGES_A = import.meta.glob('@/**/menus/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  as: 'url'
}) as Record<string, string>

// 2) Absolute from project root (covers /src/**)
const _MENU_PDFS_B = import.meta.glob('/src/**/menus/**/*.{pdf}', {
  eager: true,
  as: 'url'
}) as Record<string, string>
const _MENU_IMAGES_B = import.meta.glob('/src/**/menus/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  as: 'url'
}) as Record<string, string>

// 3) Merge both
const MENU_PDFS: Record<string, string> = { ..._MENU_PDFS_A, ..._MENU_PDFS_B }
const MENU_IMAGES: Record<string, string> = { ..._MENU_IMAGES_A, ..._MENU_IMAGES_B }

// --- helpers (place right under MENU_IMAGES) ---
function brandFromPath (p: string) {
  // Normalize slashes for Windows/posix and lowercase
  const norm = p.replace(/\\/g, '/').toLowerCase()
  const marker = '/menus/'
  const at = norm.indexOf(marker)
  if (at === -1) return ''
  const after = norm.slice(at + marker.length)
  const brand = after.split('/')[0] || ''
  return brand
}

function pickByBrand<T extends Record<string, string>> (files: T, key: string) {
  const target = key.toLowerCase()
  return Object.entries(files)
    .filter(([path]) => brandFromPath(path) === target)
    .map(([, url]) => url)
}

// --- collectMenus (replace your existing one) ---
function collectMenus (brandKey: string) {
  const pdfs = pickByBrand(MENU_PDFS, brandKey)
  const images = pickByBrand(MENU_IMAGES, brandKey)
  return { pdfs, images }
}

export default function Food () {
  const [idx, setIdx] = React.useState(0)
  const [fading, setFading] = React.useState(false)
  const gallery = ALL_GALLERY.length ? ALL_GALLERY : []

  React.useEffect(() => {
    if (!gallery.length) return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 3) % Math.max(gallery.length, 1))
        setFading(false)
      }, 220)
    }, 4000)
    return () => clearInterval(timer)
  }, [gallery.length])

  const triplet = (start: number) =>
    [0, 1, 2]
      .map(k => gallery[(start + k) % Math.max(gallery.length, 1)])
      .filter(Boolean)

  const visible = triplet(idx)

  return (
    <main className='relative -mt-6 w-full overflow-x-clip bg-white'>
      {/* Hero */}
      {/* === Video Hero (no tint) – mobile & desktop === */}
      {/* === Video Hero (bottom-left content, tinted) === */}
      <section
        aria-label='Food at Clarks'
        className='relative isolate z-0 w-full -mt-[16px] md:-mt-[20px] bg-gradient-to-br from-white via-white to-neutral-50'
      >
        <div className='container mx-auto px-6 md:px-10 py-10 md:py-14'>
          <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10'>
            {/* Text (left) */}
            <div className='w-full lg:flex-1'>
              <div className='max-w-[900px]'>
                <h1 className="font-['Oswald'] font-bold text-black text-4xl md:text-6xl leading-tight">
                  Hot, fresh, and fast.
                  <br />
                  right inside select locations
                </h1>

                {/* Longer accent rule */}
                <div className='mt-4 h-1 w-56 rounded bg-brand' />

                <p className='mt-5 text-black/70 text-lg md:text-2xl max-w-prose'>
                  From crispy tenders and deli stacks to melty pizza and
                  breakfast favorites, our in-store kitchens serve up
                  crowd-pleasers every day.
                </p>
              </div>
            </div>

            {/* Video (right) — slightly larger box */}
            <div className='w-full lg:w-auto'>
              <div className='rounded-2xl overflow-hidden border border-black/10 shadow-lg max-w-[640px] mx-auto'>
                <video
                  className='block w-full h-auto' /* scales naturally */
                  autoPlay
                  playsInline
                  muted
                  loop
                >
                  <source src={foodHeroVideo} type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menus */}
      <BrandMenus />

      {/* DEV: show glob keys with ?debug=menus */}
<MenusDiagnostics />

      {/* Gallery */}
      <section
        aria-label='Food Gallery'
        className='py-12 md:py-20 bg-neutral-50 border-y border-black/10'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Food Gallery
            </h2>
          </div>
          <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-300 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {visible.length ? (
              visible.map(src => <GalleryImage key={src} src={src} />)
            ) : (
              <div className='sm:col-span-3'>
                <PlaceholderEmpty msg='Add images under src/assets/food-gallery to populate this gallery.' />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ========================
   Brand Menus Section
   ======================== */

function BrandMenus () {
  return (
    <section aria-label='Restaurant Menus' className='py-12 md:py-20 bg-white'>
      <div className='container mx-auto px-6 md:px-10'>
        <div className='max-w-3xl'>
          {/* <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Our In-Store Kitchens</h2> */}
        </div>
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <MenuBlock
            id='champs-chicken'
            brandKey='champs'
            logo={champsLogo}
            name='Champs Chicken'
            desc='Crispy tenders, signature sides, and sauces.'
          />
          <MenuBlock
            id='hangar-54-pizza'
            brandKey='hangar54'
            logo={hangarLogo}
            name='Hangar 54 Pizza'
            desc='Slices and whole pies—hot from the oven.'
          />
          <MenuBlock
            id='jacks-deli'
            brandKey='jacks-deli'
            logo={jacksLogo}
            name="Jack's Deli"
            desc='Stacked sandwiches, salads, and deli classics.'
          />
          <MenuBlock
            id='clarks-cafe'
            brandKey='clarks-cafe'
            logo={cafeLogo}
            name='Clarks Cafe'
            desc='Breakfast sandwiches, pastries, and coffee.'
          />
          <MenuBlock
            id='krispy-krunchy-chicken'
            brandKey='krispy-krunchy'
            logo={kkcLogo}
            name='Krispy Krunchy Chicken'
            desc='Louisiana-style chicken, biscuits, and sides.'
          />
          <MenuBlock
            id='coopers-chicken'
            brandKey='coopers'
            logo={kkcLogo} // or replace with a Coopers logo if you have one
            name="Cooper's Chicken"
            desc='Famous fried chicken and homestyle sides.'
          />
        </div>
      </div>
    </section>
  )
}

function MenusDiagnostics() {
  const [show, setShow] = React.useState(
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('debug') === 'menus'
  )

  if (!show) return null
  return (
    <section className="fixed bottom-3 right-3 z-[9999] max-w-[90vw] rounded-xl border border-black/20 bg-white/95 p-4 shadow-lg text-xs text-black">
      <div className="flex items-center justify-between gap-3">
        <strong>Menus Diagnostics</strong>
        <button
          onClick={() => setShow(false)}
          className="rounded-md px-2 py-1 bg-black text-white"
        >
          Close
        </button>
      </div>
      <div className="mt-2 grid gap-2">
        <div><b>MENU_IMAGES keys:</b> {Object.keys(MENU_IMAGES).length}</div>
        <div className="max-h-40 overflow-auto">
          <pre className="whitespace-pre-wrap break-all">
{JSON.stringify(Object.keys(MENU_IMAGES).slice(0, 30), null, 2)}
          </pre>
        </div>
        <div><b>MENU_PDFS keys:</b> {Object.keys(MENU_PDFS).length}</div>
        <div className="max-h-40 overflow-auto">
          <pre className="whitespace-pre-wrap break-all">
{JSON.stringify(Object.keys(MENU_PDFS).slice(0, 30), null, 2)}
          </pre>
        </div>
      </div>
    </section>
  )
}


function MenuBlock ({
  id,
  brandKey,
  logo,
  name,
  desc
}: {
  id: string
  brandKey: string
  logo: string
  name: string
  desc: string
}) {
  const { pdfs, images } = collectMenus(brandKey)
// TEMP DEBUG (use log, not debug)
console.log('[menus]', {
  brandKey,
  pdfsCount: pdfs.length,
  imagesCount: images.length,
  sampleImageKeys: Object.keys(MENU_IMAGES).slice(0, 5),
  samplePdfKeys: Object.keys(MENU_PDFS).slice(0, 5),
})
  const [lightbox, setLightbox] = React.useState<string | null>(null)

  // Accordion state (collapsed by default). Auto-open if URL hash matches this block's id.
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setOpen(true)
      // small scroll nudge so the opened content is visible under sticky headers, if any
      setTimeout(
        () =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        0
      )
    }
  }, [id])

  return (
    <article
      id={id}
      className='rounded-2xl border border-black/10 bg-neutral-50'
    >
      {/* Toggle header */}
      <button
        type='button'
        onClick={() => setOpen(v => !v)}
        className='flex w-full items-center gap-4 p-6 text-left'
        aria-expanded={open}
        aria-controls={`${id}-panel`}
      >
        <div className='h-12 shrink-0 flex items-center'>
          <img
            src={logo}
            alt={`${name} logo`}
            className='h-12 w-auto object-contain'
          />
        </div>
        <div className='min-w-0 grow'>
          <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold text-black">
            {name}
          </h3>
          <p className='mt-1 text-black/70 text-sm md:text-base line-clamp-2'>
            {desc}
          </p>
        </div>
        <Chevron open={open} className='text-brand' />
      </button>

      {/* Animated panel */}
      <div
        id={`${id}-panel`}
        className={`
          grid transition-[grid-template-rows] duration-300 ease-out
          ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className='overflow-hidden'>
          <div className='px-6 pb-6 space-y-4'>
            {/* PDFs */}
            {pdfs.length ? (
              <div className='flex flex-wrap gap-2'>
                {pdfs.map((url, i) => (
                  <a
                    key={url}
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center justify-center rounded-xl px-4 py-2 bg-brand text-white hover:bg-brand/90 transition-colors'
                  >
                    Open Menu PDF{i > 0 ? ` ${i + 1}` : ''}
                  </a>
                ))}
              </div>
            ) : (
              <p className='text-black/60 text-sm'>Menu PDF coming soon.</p>
            )}

            {/* Images */}
            {images.length ? (
              <div className='grid grid-cols-1 gap-3'>
                {images.map(src => (
                  <button
                    key={src}
                    onClick={() => setLightbox(src)}
                    className='group block w-full'
                    title={`${name} menu image`}
                  >
                    <div className='relative overflow-hidden rounded-xl border border-black/10 bg-white'>
                      <img
                        src={src}
                        alt={`${name} menu`}
                        loading='lazy'
                        className='w-full h-auto object-contain'
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className='text-black/60 text-sm'>Menu images coming soon.</p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox (unchanged) */}
      {lightbox && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center'>
          <div className='relative w-[90%] max-h-[90%]'>
            <button
              onClick={() => setLightbox(null)}
              className='absolute top-2 right-2 bg-brand text-white rounded-full px-3 py-1 shadow-lg'
              aria-label='Close image'
            >
              ✕
            </button>
            <img
              src={lightbox}
              alt='Menu full view'
              className='w-full h-auto max-h-[90vh] object-contain rounded-xl'
            />
          </div>
        </div>
      )}
    </article>
  )
}

/* Simple chevron icon that rotates when open */
function Chevron ({
  open,
  className = ''
}: {
  open: boolean
  className?: string
}) {
  return (
    <svg
      className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
        open ? 'rotate-180' : 'rotate-0'
      } ${className}`}
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z' />
    </svg>
  )
}

function GalleryImage ({ src }: { src: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className='group block w-full'>
        <div className='relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-white'>
          <img
            src={src}
            alt='Prepared food at Clarks'
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          />
        </div>
      </button>
      {open && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center'>
          <div className='relative w-[90%] max-h-[90%]'>
            <button
              onClick={() => setOpen(false)}
              className='absolute top-2 right-2 bg-brand text-white rounded-full px-3 py-1 shadow-lg'
            >
              ✕
            </button>
            <img
              src={src}
              alt='Food full view'
              className='w-full h-auto max-h-[90vh] object-contain rounded-xl'
            />
          </div>
        </div>
      )}
    </>
  )
}

function PlaceholderEmpty ({ msg }: { msg: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-black/20 bg-white p-6 text-center text-black/60'>
      {msg}
    </div>
  )
}
