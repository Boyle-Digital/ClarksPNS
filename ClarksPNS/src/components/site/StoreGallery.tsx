import { useCallback, useEffect, useRef, useState } from 'react'

// Zillow-style store gallery: lazy thumbnail grid + full-screen lightbox.
// Thumbs use loading="lazy" so a 20+ photo gallery costs almost nothing
// until the visitor actually scrolls to it.

type Props = {
  images: string[]          // full-size (1600w) image URLs, in order
  thumbs?: string[]         // optional small versions; falls back to images
  storeName: string
}

export default function StoreGallery({ images, thumbs, storeName }: Props) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const touchX = useRef<number | null>(null)

  const show = (i: number) => { setIdx(i); setOpen(true) }
  const close = useCallback(() => setOpen(false), [])
  const step = useCallback(
    (d: number) => setIdx(i => (i + d + images.length) % images.length),
    [images.length]
  )

  // Keyboard: arrows navigate, Esc closes. Lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

  if (!images.length) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
        {images.map((src, i) => (
          <button
            key={src}
            type='button'
            onClick={() => show(i)}
            className='group relative aspect-[3/2] overflow-hidden rounded-xl border border-black/10 bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand'
            aria-label={`Photo ${i + 1} of ${images.length} — ${storeName}`}
          >
            <img
              src={(thumbs && thumbs[i]) || src}
              alt={`${storeName} — photo ${i + 1}`}
              loading='lazy'
              decoding='async'
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]'
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className='fixed inset-0 z-modal flex flex-col bg-black/90'
          role='dialog'
          aria-modal='true'
          aria-label={`${storeName} photo viewer`}
          onClick={close}
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <div className='flex items-center justify-between p-4 text-white/90' onClick={e => e.stopPropagation()}>
            <span className='text-sm tabular-nums'>{idx + 1} / {images.length}</span>
            <button
              type='button'
              onClick={close}
              className='grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
              aria-label='Close photo viewer'
            >
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M18 6L6 18M6 6l12 12' /></svg>
            </button>
          </div>

          <div className='relative flex flex-1 items-center justify-center px-14 pb-6' onClick={e => e.stopPropagation()}>
            <button
              type='button'
              onClick={() => step(-1)}
              className='absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
              aria-label='Previous photo'
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M15 18l-6-6 6-6' /></svg>
            </button>
            <img
              src={images[idx]}
              alt={`${storeName} — photo ${idx + 1} of ${images.length}`}
              className='max-h-full max-w-full rounded-lg object-contain'
            />
            <button
              type='button'
              onClick={() => step(1)}
              className='absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
              aria-label='Next photo'
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M9 6l6 6-6 6' /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
