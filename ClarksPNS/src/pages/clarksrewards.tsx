// src/pages/ClarksRewards.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/lib/seo'


// Reuse your existing components if they're part of the global layout.
import MobileHero from '@/components/site/MobileHero'
import { DesktopHero } from '@/components/site/DesktopHero'

// Assets
import rewardsPoster from '@/assets/images/clarkshero.png'
import rewardsVideo from '@/assets/videos/RewardsRangerVideo.mp4'
import appPhone from '@/assets/images/clarksrewards.jpg' // promo image of the app
import halloweenAd from '@/assets/videos/Halloween_Ad_1_CPNS.mp4'
// import qrCode from "@/assets/images/qr-clarks-rewards.png"; // optional QR for app link

// --- TUNABLES ---
// Lift the phone up without affecting the text block.
const PHONE_LIFT = ' translate-y-2 md:-translate-y-0 lg:-translate-y-2'
// How much the FAQ overlaps upward over the phone (negative margin).
const FAQ_OVERLAP = ' -mt-[5rem] lg:-mt-[24rem] xl:-mt-[28rem]'
// How tall the bottom mask is on the promo section (keeps text safe above the seam).
const MASK_HEIGHT = ' h-16 sm:h-20 md:h-24 lg:h-28'

export default function ClarksRewards () {
  // FAQ on-load fade/slide
  const [faqIn, setFaqIn] = useState(false)
  useEffect(() => setFaqIn(true), [])

  // Phone scroll-into-view animation
  const phoneRef = useRef<HTMLDivElement>(null)
  const [phoneIn, setPhoneIn] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) {
      setPhoneIn(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhoneIn(true)
          obs.disconnect() // animate once
        }
      },
      { threshold: 0.3, root: null, rootMargin: '0px 0px -10% 0px' }
    )
    if (phoneRef.current) obs.observe(phoneRef.current)
    return () => obs.disconnect()
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) {
      // Don’t autoplay if user prefers reduced motion
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 } // play when at least 50% visible
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <SEO
        title="Clark’s Rewards — Save on Fuel & Food"
        description="Join Clark’s Rewards for member-only pricing and perks. Return. Refresh. Refuel."
        path="/rewards"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Clark’s Pump-N-Shop",
            "operatingSystem": "iOS",
            "applicationCategory": "LifestyleApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/clarks-pump-n-shop/id1238295486"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Clark’s Rewards",
            "url": "https://www.myclarkspns.com/rewards",
            "isPartOf": { "@type": "WebSite", "name": "Clark’s Pump-N-Shop", "url": "https://www.myclarkspns.com/" }
          }
        ]}
      />
    <main className='w-full overflow-x-clip bg-white'>
      {/* === Video Hero (no tint) – mobile & desktop === */}
      <section
        aria-label='Clarks Rewards'
        className='relative isolate z-0 w-full -mt-[16px] md:-mt-[20px]' // <-- pull up under nav
      >
        <div className='relative h-[68vh] md:h-[86vh] w-full overflow-hidden pt-[16px] md:pt-[20px]'>
          {/*   ↑ counter the negative margin so layout height remains consistent */}
          <video
            className='absolute inset-0 h-full w-full object-cover'
            autoPlay
            playsInline
            muted
            loop
            poster={rewardsPoster}
          >
            <source src={rewardsVideo} type='video/mp4' />
          </video>

          {/* Content */}
          <div className='relative z-[1] h-full'>
            <div className='container mx-auto h-full px-6 md:px-10'>
              <div className='flex h-full items-center'>
                <div className='inline-flex flex-col gap-4 md:gap-6 max-w-[680px]'>
                  <h1 className="font-['Oswald'] font-bold text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] text-4xl md:text-6xl leading-tight">
                    Join Clarks Rewards
                  </h1>
                  <p className='text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] text-lg md:text-2xl max-w-prose'>
                    Earn on every fill-up and snack—then redeem for free fuel,
                    in-store savings, and members-only perks.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <Link
                      to='https://clarkspumpnshop.myguestaccount.com/en-us/guest/enroll?card-template=JTIldXJsLXBhcmFtLWFlcy1rZXklYzR0UXJrdXQzZmVRb1laWCU3WVNiTW1LeDN4TmhrRGdGV3dCMmxPMD0%3D&template=0'
                      className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-black/20 text-base md:text-lg'
                    >
                      Join Clarks Rewards
                    </Link>
                    <Link
                      to='/clarks-rewards#how-it-works'
                      className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-black/90 bg-white/90 hover:bg-white transition-all text-base md:text-lg'
                    >
                      How it works
                    </Link>
                  </div>
                  <p className='text-white/90 text-sm md:text-base'>
                    New members only. Terms apply.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* subtle bottom fade to white to transition into page */}
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white' />
        </div>
      </section>

      {/* === Benefits Grid === */}
      <section
        aria-label='Rewards Benefits'
        className='py-12 md:py-20 bg-white'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Perks you’ll actually use
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              Stack points fast. Redeem at the pump or in store.
            </p>
          </div>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {BENEFITS.map(b => (
              <article
                key={b.title}
                className='rounded-2xl border border-black/10 p-6 hover:shadow-md transition-shadow bg-white'
              >
                <div className='mb-4'>
                  <span
                    aria-hidden
                    className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10'
                  >
                    <b className='text-xl'>{b.icon}</b>
                  </span>
                </div>
                <h3 className="font-['Oswald'] text-xl font-bold text-black">
                  {b.title}
                </h3>
                <p className='mt-2 text-black/70 text-sm leading-relaxed'>
                  {b.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === Featured Video (between Perks and How it Works) === */}
      <section
        aria-label='Rewards Spotlight Video'
        className='py-10 md:py-16 bg-neutral-50 border-y border-black/10'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='mx-auto w-full max-w-6xl rounded-2xl overflow-hidden border border-black/10 shadow-sm bg-black'>
            <div className='relative w-full aspect-video'>
              <video
                ref={videoRef}
                src={halloweenAd}
                muted
                playsInline
                preload='metadata'
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* === How it works === */}
      <section
        id='how-it-works'
        aria-label='How Clarks Rewards Works'
        className='py-12 md:py-20 bg-neutral-50'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              How it works
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              Three quick steps to start saving.
            </p>
          </div>

          <ol className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className='relative rounded-2xl bg-white p-6 border border-black/10'
              >
                <div className='absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-bold'>
                  {i + 1}
                </div>
                <h3 className="font-['Oswald'] text-xl font-bold text-black pl-8">
                  {s.title}
                </h3>
                <p className='mt-2 text-black/70 text-sm leading-relaxed pl-8'>
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === App Promo / Join CTA === */}
      <section
        aria-label='Get the App'
        className='relative bg-white border-y border-black/10'
      >
        {/* Bottom mask (lighter; just softens the seam) */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-neutral-50${MASK_HEIGHT}`}
        />

        <div className='container mx-auto px-6 md:px-10 pt-6 md:pt-8 pb-12 md:pb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:min-h-[560px] items-start'>
            {/* LEFT: Text — positioned lower as requested */}
            <div className='order-2 lg:order-1 relative z-20 flex items-start'>
              <div className='max-w-lg mt-16 md:mt-24 lg:mt-32 pb-16 md:pb-20 lg:pb-28'>
                <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
                  The Clarks Rewards App
                </h2>
                <p className='mt-3 text-black/70 text-base md:text-lg'>
                  Track points, find nearby locations, and redeem at checkout.
                  Activate limited-time Boosts for extra earnings on coffee,
                  snacks, and fuel.
                </p>

                <div className='mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                  <a
                    href='https://clarkspumpnshop.myguestaccount.com/en-us/guest/enroll?card-template=JTIldXJsLXBhcmFtLWFlcy1rZXklYzR0UXJrdXQzZmVRb1laWCU3WVNiTW1LeDN4TmhrRGdGV3dCMmxPMD0%3D&template=0'
                    className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/25'
                  >
                    Join Clarks Rewards
                  </a>
                </div>

                <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-black/70'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />
                    Redeem at pump &amp; register
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />
                    Members-only weekly deals
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />
                    Birthday bonus points
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Phone — LIFTED & slides up on scroll */}
            <div className='order-1 lg:order-2 relative z-0 flex items-center justify-center'>
              <div
                ref={phoneRef}
                className={`relative mx-auto w-full max-w-[520px] ${PHONE_LIFT}`}
              >
                <div
                  className={`transition-all duration-1500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                              ${
                                phoneIn
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-6'
                              }`}
                >
                  <img
                    src={appPhone}
                    alt='Clarks Rewards app preview'
                    className='w-full h-auto object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section
        aria-label='Rewards FAQ'
        // Pull the entire FAQ *up* with negative margin so it covers the lifted phone.
        className={`relative bg-neutral-50 py-12 md:py-20 z-20 shadow-[0_-12px_24px_-12px_rgba(0,0,0,0.15)]${FAQ_OVERLAP}
              transition-all duration-700 ease-out
              ${
                faqIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Frequently asked questions
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              Quick answers about points, redemptions, and your account.
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {FAQS.map(f => (
              <details
                key={f.q}
                className='group rounded-2xl bg-white p-6 border border-black/10 open:shadow-md'
              >
                <summary className="cursor-pointer list-none font-['Oswald'] text-lg font-bold text-black flex items-center justify-between">
                  {f.q}
                  <span className='ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform'>
                    +
                  </span>
                </summary>
                <p className='mt-3 text-black/70 text-sm leading-relaxed'>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

const BENEFITS = [
  {
    icon: '⛽',
    title: 'Fuel savings',
    desc: 'Redeem points at the pump for instant cents-off per gallon.'
  },
  {
    icon: '☕',
    title: 'Coffee & snacks',
    desc: 'Daily deals on hot coffee, fountain drinks, and fresh snacks.'
  },
  {
    icon: '🎁',
    title: 'Bonus boosts',
    desc: 'Multiply earnings during weekly Boosts and seasonal events.'
  }
]

const STEPS = [
  {
    title: 'Create your account',
    desc: 'Use your phone number or email—takes less than a minute.'
  },
  {
    title: 'Earn points fast',
    desc: 'Enter your number at checkout or activate in-app to earn on every purchase.'
  },
  {
    title: 'Redeem & save',
    desc: 'Cash in for in-store items or fuel discounts right at the pump.'
  }
]

const FAQS = [
  {
    q: 'How do I earn points?',
    a: 'Enter your phone number at checkout, scan your app barcode, or link at the pump. Points post within minutes.'
  },
  {
    q: 'Where can I redeem?',
    a: 'Use points in store on eligible items or for fuel discounts at participating Clarks locations.'
  },
  {
    q: 'How many points do I earn per purchase?',
    a: 'You earn 10 points for every $1 spent in-store and 20 points for every gallon of fuel purchased.'
  },
  {
    q: 'Can I combine with other offers?',
    a: 'Yes—sitewide promos and weekly Boosts stack unless otherwise noted in the offer details.'
  }
]
