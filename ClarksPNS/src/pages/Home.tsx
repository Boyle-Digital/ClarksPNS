import React from 'react'
import MobileHero from '@/components/site/MobileHero'
import { DesktopHero } from '@/components/site/DesktopHero'

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
import rewardsPhoneVideo from "@/assets/videos/Clark's Rewards Phone Animation 1080.mp4"

// Rodney banner (full-bleed). Note: filename includes a typographic apostrophe.
import rodneyBanner from '@/assets/images/Clark’s Site Sample (9).png'

/** Auto-import Monthly Promotions from the provided folders */
const brandy800 = Object.values(
  import.meta.glob(
    '@/assets/WebImages-September2025/WebImages-September2025/Brandy/800x800/*.jpg',
    { eager: true, as: 'url' }
  )
) as string[]
const cody1035 = Object.values(
  import.meta.glob(
    '@/assets/WebImages-September2025/WebImages-September2025/Cody/1035x712/*.jpg',
    { eager: true, as: 'url' }
  )
) as string[]
const cody1080 = Object.values(
  import.meta.glob(
    '@/assets/WebImages-September2025/WebImages-September2025/Cody/1080x1920/*.jpg',
    { eager: true, as: 'url' }
  )
) as string[]
const gstv1600 = Object.values(
  import.meta.glob(
    '@/assets/WebImages-September2025/WebImages-September2025/GSTV/1600x1200/*.jpg',
    { eager: true, as: 'url' }
  )
) as string[]

// Merge into a single pool for the carousel
const PROMO_IMAGES = [...brandy800]

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
      {/* Mobile hero */}
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
      />

      {/* Desktop hero (with blue tint) */}
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
                    <source src={rewardsPhoneVideo} type='video/mp4' />
                  </video>
                </div>
                <div className='pointer-events-none absolute -inset-2 -z-10 rounded-[32px] bg-brand/10 blur-xl' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Promotions — Auto-rotating triple image */}
      <section
        aria-label='Monthly Promotions'
        className='py-12 md:py-20 bg-neutral-50'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              September Promotions
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              A rotating peek at what’s new.
            </p>
          </div>

          {/* Triple image stage (square tiles, no layout shift) */}
          <div
            className={`
    mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4
    transition-opacity duration-300
    ${fading ? 'opacity-0' : 'opacity-100'}
  `}
          >
            {promoSet.map(src => (
              <a
                key={src}
                href={src}
                target='_blank'
                rel='noreferrer'
                className='group block'
                title='Open full image'
              >
                {/* Square wrapper */}
                <div className='relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-white'>
                  <img
                    src={src}
                    alt='Monthly promotion'
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

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
                      Join Rewards
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

      {/* Follow Clarks — expandable social cards (black text, black icons on buttons) */}
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
            {/* Facebook — embedded timeline */}
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
                  <iframe
                    title='Facebook Page'
                    className='w-full'
                    style={{ height: 520 }}
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                      'https://www.facebook.com/clarkspumpnshop'
                    )}&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                    scrolling='no'
                    frameBorder='0'
                    allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                  />
                </div>
                <SocialButton
                  href='https://www.facebook.com/clarkspumpnshop'
                  icon={fbIcon}
                  label='Open Facebook'
                />
              </div>
            </details>

            {/* Instagram — no explanatory text; button only */}
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

              <div className='mt-4'>
                <SocialButton
                  href='https://www.instagram.com/clarkspumpnshop/?hl=en'
                  icon={igIcon}
                  label='Open Instagram'
                />
              </div>
            </details>

            {/* TikTok — button only */}
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

              <div className='mt-4'>
                <SocialButton
                  href='https://www.tiktok.com/@clarkspumpnshop'
                  icon={ttIcon}
                  label='Open TikTok'
                />
              </div>
            </details>

            {/* LinkedIn — button only (use company page, not admin link) */}
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

              <div className='mt-4'>
                <SocialButton
                  href='https://www.linkedin.com/company/10955109/'
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
    name: 'Champs Chicken',
    desc: 'Crispy tenders, sides, and sauces.',
    href: '/food#champs-chicken',
    cta: 'View Locations',
    logo: champsLogo
  },
  {
    name: 'Hangar 54 Pizza',
    desc: 'Slices and whole pies—perfectly melty.',
    href: '/food#hangar-54-pizza',
    cta: 'View Locations',
    logo: hangarLogo
  },
  {
    name: "Jack's Deli",
    desc: 'Stacked sandwiches and deli classics.',
    href: '/food#jacks-deli',
    cta: 'View Locations',
    logo: jacksLogo
  },
  {
    name: 'Clarks Cafe',
    desc: 'Breakfast sandwiches, pastries, and coffee.',
    href: '/food#clarks-cafe',
    cta: 'View Locations',
    logo: cafeLogo
  },
  {
    name: 'Krispy Krunchy Chicken',
    desc: 'Louisiana-style chicken + biscuits.',
    href: '/food#krispy-krunchy-chicken',
    cta: 'View Locations',
    logo: kkcLogo
  }
]
