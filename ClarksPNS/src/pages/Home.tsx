import React from 'react'
// import MobileHero from '@/components/site/MobileHero'
import { DesktopHero } from '@/components/site/DesktopHero'
import { SEO } from '@/lib/seo'

// MobileHero images (keep as-is)
import phone640 from '@/assets/images/phone-640.jpg'
import phone960 from '@/assets/images/phone-960.jpg'
import phone1440 from '@/assets/images/phone-1440.jpg'
import champsLogo from '@/assets/images/champschickenlogo.png'
import hangarLogo from '@/assets/images/Hangar54Logo_02-1.png'
import jacksLogo from '@/assets/images/jacksdelilogo.webp'
import cafeLogo from '@/assets/images/clarkscafelogo.webp'
import kkcLogo from '@/assets/images/krispykrunchychickenlogo.webp'
import fbIcon from '@/assets/icons/facebook.svg'
import igIcon from '@/assets/icons/instagram.svg'
import liIcon from '@/assets/icons/linkedin.svg'
import ttIcon from '@/assets/icons/tiktok.svg'

// Rewards phone animation video
import HomePageVideoAd from '@/assets/videos/Thanksgiving_Ad_1_CPNS.mp4'

// Rodney banner (full-bleed). Note: filename includes a typographic apostrophe.
import rodneyBanner from '@/assets/images/clarks-site-sample-9.png'

/** Auto-import Monthly Promotions from the provided folders */
const PromoImages = Object.values(
  import.meta.glob('@/assets/PromoImages/800x800/*.jpg', {
    eager: true,
    as: 'url'
  })
) as string[]

// Merge into a single pool for the carousel
const PROMO_IMAGES = [...PromoImages]

function MonthlyPromotions ({
  title,
  subtitle,
  images,
  intervalMs = 5000,
  autoPlay = true
}: {
  title: string
  subtitle?: string
  images: string[]
  intervalMs?: number
  autoPlay?: boolean
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const timerRef = React.useRef<number | null>(null)
  const userPausedRef = React.useRef(false)
  const [openSrc, setOpenSrc] = React.useState<string | null>(null)

  const clear = React.useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scrollStep = React.useCallback((dir: 1 | -1 = 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.9, 520)
    const atEnd =
      Math.round(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 2
    if (dir === 1 && atEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }
  }, [])

  const start = React.useCallback(() => {
    if (!autoPlay || openSrc) return
    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reduced || timerRef.current) return
    timerRef.current = window.setInterval(() => {
      if (!userPausedRef.current) scrollStep(1)
    }, intervalMs) as unknown as number
  }, [autoPlay, intervalMs, scrollStep, openSrc])

  React.useEffect(() => {
    start()
    return clear
  }, [start, clear])

  // Pause on hover/focus; resume on leave
  const onUserEnter = () => {
    userPausedRef.current = true
    clear()
  }
  const onUserLeave = () => {
    userPausedRef.current = false
    start()
  }

  // Close on ESC when lightbox is open
  React.useEffect(() => {
    if (!openSrc) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenSrc(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSrc])

  return (
    <>
      <SEO
  title="Clark’s Pump-N-Shop — Return. Refresh. Refuel."
  description="Fuel up fast, grab fresh food, and get on your way—Clark’s Pump-N-Shop has you covered."
  path="/"
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Clark’s Pump-N-Shop, Inc.",
      "url": "https://www.myclarkspns.com/",
      "logo": "https://www.myclarkspns.com/icons/icon-512.png",
      "image": "https://www.myclarkspns.com/og/og-default.jpg",
      "slogan": "Return. Refresh. Refuel.",
      "telephone": "+1-606-325-8536",
      "email": "mailto:contactus@clarkspns.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "101 Wheatley Rd",
        "addressLocality": "Ashland",
        "addressRegion": "KY",
        "postalCode": "41101",
        "addressCountry": "US"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+1-606-325-8536",
          "email": "mailto:contactus@clarkspns.com",
          "areaServed": "US",
          "availableLanguage": ["English"],
          "hoursAvailable": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "17:00"
            }
          ]
        }
      ],
      "sameAs": [
        "https://www.facebook.com/clarkspumpnshop",
        "https://www.instagram.com/clarkspumpnshop/?hl=en",
        "https://x.com/clarkspnsbti",
        "https://www.linkedin.com/company/clark%27s-pump-n-shop",
        "https://www.tiktok.com/@clarkspumpnshop"
      ],
      "description": "Family-run convenience stores offering fuel, fresh food programs, and friendly service throughout our communities. Return. Refresh. Refuel."
    }
  ]}
/>

      <section
        aria-label='Monthly Promotions'
        className='py-12 md:py-20 bg-neutral-50'
      >
        {/* Headings inside container */}
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              {title}
            </h2>
            {subtitle && (
              <p className='mt-2 text-black/70 text-base md:text-lg'>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Full-bleed rail with container-matched padding */}
        <div className='mt-8 relative overflow-visible'>
          <div
            ref={scrollerRef}
            onMouseEnter={onUserEnter}
            onMouseLeave={onUserLeave}
            onFocusCapture={onUserEnter}
            onBlurCapture={onUserLeave}
            className='
            flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
            pl-[max(1.5rem,calc((100vw-1280px)/2))]
            pr-[max(1.5rem,calc((100vw-1280px)/2))]
          '
            style={{
              scrollbarWidth: 'none',
              scrollbarGutter: 'stable both-edges'
            }}
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

            {images.map(src => (
              <button
                key={src}
                type='button'
                onClick={() => setOpenSrc(src)}
                className='group relative flex-none snap-center hide-scrollbar w-[82%] xs:w-[72%] sm:w-[58%] md:w-1/3'
                title='Open promotion'
                aria-label='Open promotion'
              >
                <div className='aspect-square overflow-hidden rounded-2xl border border-black/10 bg-white'>
                  <img
                    src={src}
                    alt='Monthly promotion'
                    loading='lazy'
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Prev/Next buttons (SVG chevrons, brand color, centered) */}
          <div className='pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block'>
            <button
              onClick={() => scrollStep(-1)}
              type='button'
              aria-label='Previous'
              className='pointer-events-auto absolute top-1/2 -translate-y-1/2 left-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 text-brand'
              >
                <path
                  fillRule='evenodd'
                  d='M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <button
              onClick={() => scrollStep(1)}
              type='button'
              aria-label='Next'
              className='pointer-events-auto absolute top-1/2 -translate-y-1/2 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6 text-brand'
              >
                <path
                  fillRule='evenodd'
                  d='M8.22 19.78a.75.75 0 010-1.06L14.94 12 8.22 5.28a.75.75 0 111.06-1.06l7.25 7.25a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* LIGHTBOX (fit to image size) */}
        {openSrc && (
          <div
            role='dialog'
            aria-modal='true'
            className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'
            onClick={e => {
              if (e.target === e.currentTarget) setOpenSrc(null) // click backdrop to close
            }}
          >
            <div className='relative'>
              <button
                onClick={() => setOpenSrc(null)}
                className='absolute -top-3 -right-3 bg-brand text-white rounded-full px-3 py-1 shadow-lg'
                aria-label='Close'
                type='button'
              >
                ✕
              </button>
              <img
                src={openSrc}
                alt='Promotion full view'
                className='max-w-[90vw] max-h-[90vh] object-contain rounded-xl bg-white'
              />
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default function Home () {
  // --- Simple rotating triplet for Promotions ---
  const [idx, setIdx] = React.useState(0)
  const [fading, setFading] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      // small fade out -> swap -> fade in
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 3) % Math.max(PROMO_IMAGES.length, 1))
        setFading(false)
      }, 220)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const triplet = (start: number) =>
    [0, 1, 2]
      .map(k => PROMO_IMAGES[(start + k) % PROMO_IMAGES.length])
      .filter(Boolean)

  const promoSet = triplet(idx)

  return (
    <main className='w-full overflow-x-clip'>
      {/* Mobile hero
      <MobileHero
        title='Get 1,500 Points Free'
        subtitle='When you join the Clarks Rewards app'
        ctaLabel='Join Rewards'
        ctaHref='/clarks-rewards#join'
        img={{
          src640: phone640,
          src960: phone960,
          src1440: phone1440,
          alt: 'Rewards App preview'
        }}
      /> */}

      {/* Desktop hero , now contains mobile responsive version as well */}
      <DesktopHero />

      {/* Rewards Phone Animation */}
      <section
        aria-label='Clarks Rewards Phone Demo'
        className='py-12 md:py-20 bg-white border-y border-black/10'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-10'>
            <div className='order-2 lg:order-1'>
              <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
                Watch points stack—right in the app
              </h2>
              <p className='mt-3 text-black/70 text-base md:text-lg max-w-prose'>
                Earn on every fill-up, coffee, and snack. Track your balance and
                redeem at the pump or register in a couple of taps.
              </p>
              <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-black/70'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />{' '}
                  Members-only weekly Boosts
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />{' '}
                  Redeem for fuel discounts
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />{' '}
                  Works at participating locations
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />{' '}
                  Manage everything in-app
                </li>
              </ul>
              <div className='mt-6 flex flex-col sm:flex-row gap-3'>
                <a
                  href='/clarks-rewards#join'
                  className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/20'
                >
                  Join Clarks Rewards
                </a>
                <a
                  href='/clarks-rewards#how-it-works'
                  className='inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-black/90 transition-all'
                >
                  How it works
                </a>
              </div>
            </div>

            <div className='order-1 lg:order-2'>
              <div className='relative mx-auto w-full max-w-[560px]'>
                <div className='rounded-[28px] border border-black/10 shadow-xl overflow-hidden bg-black'>
                  <video
                    className='w-full h-auto block'
                    autoPlay
                    playsInline
                    muted
                    loop
                  >
                    <source src={HomePageVideoAd} type='video/mp4' />
                  </video>
                </div>
                <div className='pointer-events-none absolute -inset-2 -z-10 rounded-[32px] bg-brand/10 blur-xl' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Promotions — Auto-rotating triple image */}
      <MonthlyPromotions
        title='October Promotions'
        // subtitle='A rotating peek at what’s new.'
        images={PROMO_IMAGES}
      />

      {/* Rodney the Rewards Ranger — Full-bleed banner */}
      <section
        aria-label='Rodney the Rewards Ranger'
        className='relative isolate'
      >
        <div className='relative h-[52vh] md:h-[64vh] w-full overflow-hidden'>
          <img
            src={rodneyBanner}
            alt='Rodney the Rewards Ranger'
            className='absolute inset-0 h-full w-full object-cover'
          />
          {/* Darken for white text legibility (no heavy color cast) */}
          <div className='absolute inset-0 bg-black/35' />

          <div className='relative z-[1] h-full'>
            <div className='container mx-auto h-full px-6 md:px-10'>
              <div className='flex h-full items-center'>
                <div className='inline-flex flex-col gap-4 md:gap-6 max-w-[720px]'>
                  <h2 className="font-['Oswald'] text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                    Rodney the Rewards Ranger
                  </h2>
                  <p className='text-white/95 text-base md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] max-w-prose'>
                    Spot Rodney in-store for members-only boosts, seasonal
                    surprises, and bonus points.
                  </p>

                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <a
                      href='/clarks-rewards#join'
                      className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-brand bg-white hover:bg-white/90 transition-all shadow-lg'
                    >
                      Join Clarks Rewards
                    </a>
                    <a
                      href='/locations'
                      className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand/80 hover:bg-brand transition-all shadow-lg'
                    >
                      Find a Location
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Smaller bottom fade to page (24 -> 16) */}
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white' />
        </div>
      </section>

      {/* Follow Clarks — expandable social cards (updated embeds) */}
      <section
        aria-label='Follow Clarks'
        className='py-12 md:py-20 bg-white'
        id='follow-clarks'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Follow Clarks
            </h2>
            <p className='mt-2 text-black text-base md:text-lg'>
              Deals, giveaways, and local highlights—tap a network to peek.
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-black'>
            {/* Facebook — embedded timeline (unchanged) */}
            <details className='group rounded-2xl border border-black/10 bg-white p-5 open:shadow-md'>
              <summary className='cursor-pointer list-none flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img src={fbIcon} alt='' className='h-6 w-6' />
                  <span className='font-semibold'>Facebook</span>
                </div>
                <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform'>
                  +
                </span>
              </summary>

              <div className='mt-4 space-y-3'>
                <div className='rounded-xl overflow-hidden border border-black/10'>
                  <RenderWhenDetailsOpen>
                    <iframe
                      title='Facebook Page'
                      loading='lazy'
                      className='w-full'
                      style={{ height: 520 }}
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                        'https://www.facebook.com/clarkspumpnshop'
                      )}&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                      scrolling='no'
                      frameBorder='0'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                    />
                  </RenderWhenDetailsOpen>
                </div>
                <SocialButton
                  href='https://www.facebook.com/clarkspumpnshop/'
                  icon={fbIcon}
                  label='Open Facebook'
                />
              </div>
            </details>

            {/* Instagram — single reel */}
            <details className='group rounded-2xl border border-black/10 bg-white p-5 open:shadow-md'>
              <summary className='cursor-pointer list-none flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img src={igIcon} alt='' className='h-6 w-6' />
                  <span className='font-semibold'>Instagram</span>
                </div>
                <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform'>
                  +
                </span>
              </summary>

              <div className='mt-4 space-y-3'>
                {/* Embed a specific reel/post */}
                <div className='rounded-xl overflow-hidden border border-black/10'>
                  <InstagramPost url='https://www.instagram.com/clarkspumpnshop/reel/DOv4VlbFZLj/' />
                </div>

                {/* Fallback/open button */}
                <SocialButton
                  href='https://www.instagram.com/clarkspumpnshop/'
                  icon={igIcon}
                  label='Open Instagram'
                />
              </div>
            </details>

            {/* TikTok — single video */}
            <details className='group rounded-2xl border border-black/10 bg-white p-5 open:shadow-md'>
              <summary className='cursor-pointer list-none flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img src={ttIcon} alt='' className='h-6 w-6' />
                  <span className='font-semibold'>TikTok</span>
                </div>
                <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform'>
                  +
                </span>
              </summary>

              <div className='mt-4 space-y-3'>
                <TikTokEmbed
                  videoUrl='https://www.tiktok.com/@clarkspumpnshop/video/7522153675645668621'
                  maxWidth={560}
                  minWidth={325}
                />
                <SocialButton
                  href='https://www.tiktok.com/@clarkspumpnshop'
                  icon={ttIcon}
                  label='Open TikTok'
                />
              </div>
            </details>

            {/* LinkedIn — single company post */}
            <details className='group rounded-2xl border border-black/10 bg-white p-5 open:shadow-md'>
              <summary className='cursor-pointer list-none flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img src={liIcon} alt='' className='h-6 w-6' />
                  <span className='font-semibold'>LinkedIn</span>
                </div>
                <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform'>
                  +
                </span>
              </summary>

              <div className='mt-4 space-y-3'>
                {/* Activity ID pulled from your URL: ...activity-7351075127880499200-... */}
                <RenderWhenDetailsOpen>
                  <LinkedInPost
                    activityUrn='urn:li:activity:7351075127880499200'
                    height={520}
                  />
                </RenderWhenDetailsOpen>
                <SocialButton
                  href="https://www.linkedin.com/company/clark's-pump-n-shop/"
                  icon={liIcon}
                  label='Open LinkedIn'
                />
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Food at Clarks */}
      <section
        aria-label='Food at Clarks'
        className='py-12 md:py-20 bg-neutral-50'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Fuel up. Eat well.
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              Hot, fresh, and fast—right inside select locations.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap justify-center gap-6'>
            {FOOD_PARTNERS.map(f => (
              <article
                key={f.name}
                className='rounded-2xl border border-black/10 bg-white p-6 hover:shadow-md transition-shadow w-full sm:w-[22rem] lg:w-[22rem]'
              >
                {/* Logo row */}
                <div className='mb-4 h-12 flex items-center'>
                  <img
                    src={f.logo}
                    alt={`${f.name} logo`}
                    className='h-full w-auto object-contain'
                  />
                </div>

                <h3 className="font-['Oswald'] text-xl font-bold text-black">
                  {f.name}
                </h3>
                <p className='mt-2 text-black/70 text-sm'>{f.desc}</p>
                <div className='mt-4'>
                  <a
                    href={f.href}
                    className='inline-flex items-center justify-center rounded-xl px-4 py-2 bg-brand text-white hover:bg-brand/90 transition-all'
                  >
                    {f.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function SocialButton ({
  href,
  icon,
  label
}: {
  href: string
  icon: string
  label: string
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-brand text-white hover:bg-brand/90 transition-colors'
    >
      {/* Icon rendered in black as requested */}
      <img src={icon} alt='' className='h-5 w-5' />
      <span className='font-semibold'>{label}</span>
    </a>
  )
}

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: '👍' },
  { name: 'Instagram', href: '#', icon: '📸' },
  { name: 'TikTok', href: '#', icon: '🎵' },
  { name: 'LinkedIn', href: '#', icon: '💼' }
]

const FOOD_PARTNERS = [
  {
    name: 'Clarks Cafe',
    desc: 'Breakfast sandwiches, pastries, and coffee.',
    href: '/locations?food=clarkscafe',
    cta: 'View Locations',
    logo: cafeLogo
  },
  {
    name: 'Krispy Krunchy Chicken',
    desc: 'Louisiana-style chicken + biscuits.',
    href: '/locations?food=krispykrunchy',
    cta: 'View Locations',
    logo: kkcLogo
  },
  {
    name: 'Champs Chicken',
    desc: 'Crispy tenders, sides, and sauces.',
    href: '/locations?food=champs',
    cta: 'View Locations',
    logo: champsLogo
  },
  {
    name: 'Hangar 54 Pizza',
    desc: 'Slices and whole pies—perfectly melty.',
    href: '/locations?food=hangar',
    cta: 'View Locations',
    logo: hangarLogo
  },
  {
    name: "Jack's Deli",
    desc: 'Stacked sandwiches and deli classics.',
    href: '/locations?food=jacks',
    cta: 'View Locations',
    logo: jacksLogo
  },
  {
    name: 'Grab-N-Go',
    desc: 'Quick bites, immediate satisfaction.',
    href: '/locations?food=grabngo',
    cta: 'View Locations',
    logo: kkcLogo
  }
]

// ——— Shared: load a script once, safely ———
function useScriptOnce (src: string) {
  React.useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) return
    const s = document.createElement('script')
    s.src = src
    s.async = true
    document.body.appendChild(s)
    return () => {
      // keep it for subsequent embeds; do not remove on unmount
    }
  }, [src])
}
function RenderWhenDetailsOpen ({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current?.closest('details')
    if (!el) return
    const onToggle = () => setOpen((el as HTMLDetailsElement).open)
    el.addEventListener('toggle', onToggle)
    setOpen((el as HTMLDetailsElement).open)
    return () => el.removeEventListener('toggle', onToggle)
  }, [])

  return <div ref={ref}>{open ? children : null}</div>
}

function InstagramPost ({ url }: { url: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  // Load IG script once
  useScriptOnce('https://www.instagram.com/embed.js')

  // Helper to (re)process embeds safely
  const process = React.useCallback(() => {
    window.instgrm?.Embeds?.process?.()
  }, [])

  React.useEffect(() => {
    if (!ref.current) return

    const permalink = url.endsWith('/') ? url : `${url}/`

    ref.current.innerHTML = `
      <blockquote
        class="instagram-media"
        data-instgrm-permalink="${permalink}"
        data-instgrm-version="14"
        style="margin:0 auto; max-width:540px; width:100%;"
      ></blockquote>
    `

    // Give DOM a tick, then process
    const id = window.setTimeout(process, 0)
    return () => window.clearTimeout(id)
  }, [url, process])

  // Re-process when the <details> containing this embed is opened
  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const details = el.closest('details')
    if (!details) return

    const onToggle = () => {
      if ((details as HTMLDetailsElement).open) {
        // run again when it becomes visible
        process()
      }
    }

    details.addEventListener('toggle', onToggle)
    return () => details.removeEventListener('toggle', onToggle)
  }, [process])

  // Re-process when the blockquote actually enters the viewport
  React.useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          process()
        }
      },
      { rootMargin: '200px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [process])

  return (
    <div className='rounded-xl overflow-hidden border border-black/10'>
      <div ref={ref} />
    </div>
  )
}

/** TikTok (single video) */
function TikTokEmbed ({
  videoUrl,
  maxWidth = 560,
  minWidth = 325
}: {
  videoUrl: string
  maxWidth?: number
  minWidth?: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  // Ensure TikTok embed.js is available
  useScriptOnce('https://www.tiktok.com/embed.js')

  React.useEffect(() => {
    if (!ref.current) return

    // Extract the numeric ID at the end of the URL
    const match = videoUrl.match(/video\/(\d+)/)
    const videoId = match?.[1]
    if (!videoId) {
      ref.current.innerHTML = `<div style="padding:16px;color:#b00;">Invalid TikTok URL</div>`
      return
    }

    ref.current.innerHTML = `
      <blockquote
        class="tiktok-embed"
        cite="${videoUrl}"
        data-video-id="${videoId}"
        style="max-width:${maxWidth}px; min-width:${minWidth}px; margin:0 auto;"
      >
        <section></section>
      </blockquote>
    `

    // The TikTok script auto-processes new blockquotes on insertion.
  }, [videoUrl, maxWidth, minWidth])

  return (
    <div className='rounded-xl overflow-hidden border border-black/10'>
      <div ref={ref} />
    </div>
  )
}

/** LinkedIn (single post by activity URN) */
function LinkedInPost ({
  activityUrn,
  height = 520
}: {
  activityUrn: string
  height?: number
}) {
  // LinkedIn supports iframe pointing to /embed/feed/update/ + URN
  const src = `https://www.linkedin.com/embed/feed/update/${encodeURIComponent(
    activityUrn
  )}`
  return (
    <div className='rounded-xl overflow-hidden border border-black/10'>
      <iframe
        src={src}
        height={height}
        width='100%'
        frameBorder={0}
        allowFullScreen
        title='LinkedIn Post'
      />
    </div>
  )
}
