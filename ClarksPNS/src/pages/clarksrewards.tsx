// src/pages/ClarksRewards.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/lib/seo'


// Reuse your existing components if they're part of the global layout.
import MobileHero from '@/components/site/MobileHero'
import { DesktopHero } from '@/components/site/DesktopHero'

// Assets
import rewardsPoster from '@/assets/images/clarkshero.png'
import rodneyRanger from '@/assets/images/RodneyTB.png'
import { IconPump, IconCoffee, IconGift } from '@/components/site/Icons'
import { track } from '@/lib/track'
import Tilt from '@/components/site/Tilt'
import rewardsVideo from '@/assets/videos/RewardsRangerVideo.mp4'
import appPhone from '@/assets/images/clarksrewards.jpg' // promo image of the app
import RewardsPageVideoAd from '@/assets/videos/ClarksRewardsPhoneAnimation1080pblack.mp4'
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
                  <h1 className="font-display font-bold text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] text-4xl md:text-6xl leading-tight">
                    Join Clarks Rewards
                  </h1>
                  <p className='text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] text-lg md:text-2xl max-w-prose'>
                    Earn on every fill-up and snack—then redeem for free fuel,
                    in-store savings, and members-only perks.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <Link
                      to='https://clarkspumpnshop.myguestaccount.com/en-us/guest/enroll?card-template=JTIldXJsLXBhcmFtLWFlcy1rZXklYzR0UXJrdXQzZmVRb1laWCU3WVNiTW1LeDN4TmhrRGdGV3dCMmxPMD0%3D&template=0'
                      onClick={() => track('rewards_join_click', { placement: 'hero' })}
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
              Perks you’ll actually use
            </h2>
            <p className='mt-2 text-black/70 text-base md:text-lg'>
              Stack points fast. Redeem at the pump or in store.
            </p>
          </div>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {BENEFITS.map(b => (
              <Tilt key={b.title}>
              <article
                className='rounded-2xl border border-black/10 brand-topline p-6 hover:shadow-md transition-shadow bg-white'
              >
                <div className='mb-4'>
                  <span
                    aria-hidden
                    className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10'
                  >
                    <b.icon className='h-6 w-6 text-brand' />
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-black">
                  {b.title}
                </h3>
                <p className='mt-2 text-black/70 text-sm leading-relaxed'>
                  {b.desc}
                </p>
              </article>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* === The math — real earn rates === */}
      <section aria-label='How points add up' className='py-12 md:py-20 bg-brand brand-stripes text-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              The math is simple.
            </h2>
            <p className='mt-2 text-white/85 text-base md:text-lg'>
              Every dollar and every gallon works for you — then trade points
              for cents-off fuel or free favorites like a sausage biscuit.
            </p>
          </div>
          <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl'>
            <RateCard n={10} unit='points' per='per $1 in store' />
            <RateCard n={20} unit='points' per='per gallon of fuel' />
            <RateCard n={0} unit='cost to join' per='free in the app, day one' isZero />
          </div>
          <PointsSim />
        </div>
      </section>

      {/* === Rodney, the Rewards Ranger === */}
      <section aria-label='Rodney the Rewards Ranger' className='relative overflow-hidden py-14 md:py-20 bg-white border-b border-black/10'>
        <div aria-hidden className='pointer-events-none absolute inset-y-0 left-[-10%] w-[70%] opacity-[0.05]'
          style={{ background: 'repeating-linear-gradient(90deg, #263B95 0 3px, transparent 3px 42px)' }} />
        <div className='container relative mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-10'>
            <div className='lg:col-span-5 order-2 lg:order-1'>
              <div className="font-display tracking-wide text-xs uppercase text-brand">Your points, protected</div>
              <h2 className="mt-1 font-display text-3xl md:text-4xl font-bold text-black">
                Ride with Rodney, the Rewards Ranger.
              </h2>
              <p className='mt-3 text-black/70 max-w-prose'>
                Rodney rides ahead so you never miss a boost — weekly point
                multipliers, members-only drops, and surprise perks at the
                pump. Saddle up in the app and he does the rest.
              </p>
              <Link
                to='https://clarkspumpnshop.myguestaccount.com/en-us/guest/enroll?card-template=JTIldXJsLXBhcmFtLWFlcy1rZXklYzR0UXJrdXQzZmVRb1laWCU3WVNiTW1LeDN4TmhrRGdGV3dCMmxPMD0%3D&template=0'
                className='mt-6 inline-flex items-center justify-center rounded-2xl bg-brand px-6 py-3 text-white hover:bg-brand/90 transition-colors'
              >
                Join the ride
              </Link>
            </div>
            <div className='lg:col-span-7 order-1 lg:order-2'>
              <div className='relative mx-auto max-w-[520px]'>
                <div aria-hidden className='absolute right-[62%] top-[38%] h-1.5 w-24 rounded-full bg-brand/25 rodney-line' />
                <div aria-hidden className='absolute right-[68%] top-[52%] h-1.5 w-36 rounded-full bg-brand/15 rodney-line rodney-line-2' />
                <div aria-hidden className='absolute right-[60%] top-[66%] h-1.5 w-16 rounded-full bg-brand/20 rodney-line rodney-line-3' />
                <img src={rodneyRanger} alt='Rodney, the Clark’s Rewards Ranger' className='relative w-full h-auto rodney-ride' loading='lazy' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Featured Video (between Perks and How it Works) === */}
      <section
        aria-label='Rewards Spotlight Video'
        className='band-night brand-stripes py-10 md:py-16 text-white'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='mx-auto w-full max-w-6xl rounded-2xl overflow-hidden border border-black/10 shadow-sm bg-black'>
            <div className='relative w-full aspect-video'>
              <video
                ref={videoRef}
                src={RewardsPageVideoAd}
                muted
                loop
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
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
                <h3 className="font-display text-xl font-bold text-black pl-8">
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
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
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
                <summary className="cursor-pointer list-none font-display text-lg font-bold text-black flex items-center justify-between">
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

function PointsSim () {
  const [gal, setGal] = useState(12)
  const [spend, setSpend] = useState(20)
  const yearly = Math.round((gal * 20 + spend * 10) * 52)
  return (
    <div className='mt-10 max-w-5xl rounded-2xl border border-white/15 bg-white/10 p-6 md:p-8'>
      <h3 className='font-display text-2xl md:text-3xl'>Your year in points</h3>
      <div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-3'>
        <label className='block'>
          <div className='flex items-baseline justify-between text-sm text-white/80'>
            <span>Gallons per week</span>
            <span className='font-display text-xl text-white tabular-nums'>{gal}</span>
          </div>
          <input type='range' min={0} max={40} value={gal} onChange={e => setGal(+e.target.value)} className='mt-2 w-full accent-white' />
        </label>
        <label className='block'>
          <div className='flex items-baseline justify-between text-sm text-white/80'>
            <span>In-store $ per week</span>
            <span className='font-display text-xl text-white tabular-nums'>${spend}</span>
          </div>
          <input type='range' min={0} max={100} value={spend} onChange={e => setSpend(+e.target.value)} className='mt-2 w-full accent-white' />
        </label>
        <div className='text-center md:text-right'>
          <div className='font-display text-5xl leading-none text-white tabular-nums md:text-6xl'>{yearly.toLocaleString()}</div>
          <div className='mt-1 text-sm text-white/75'>points a year — redeem for cents-off fuel and free favorites</div>
        </div>
      </div>
    </div>
  )
}

function RateCard ({ n, unit, per, isZero }: { n: number; unit: string; per: string; isZero?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return
      io.disconnect()
      if (reduced || isZero) { setVal(n); return }
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1200, 1)
        setVal(Math.round(n * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [n, isZero])
  return (
    <div ref={ref} className='rounded-2xl bg-white/10 border border-white/15 p-6'>
      <div className="font-display text-5xl font-bold tabular-nums">{isZero ? '$0' : val}</div>
      <div className='mt-1 font-medium'>{unit}</div>
      <div className='text-white/75 text-sm'>{per}</div>
    </div>
  )
}

const BENEFITS = [
  {
    icon: IconPump,
    title: 'Fuel savings',
    desc: 'Redeem points at the pump for instant cents-off per gallon.'
  },
  {
    icon: IconCoffee,
    title: 'Coffee & snacks',
    desc: 'Daily deals on hot coffee, fountain drinks, and fresh snacks.'
  },
  {
    icon: IconGift,
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
