// src/pages/ClarksRewards.tsx
import React from 'react'
import { Link } from 'react-router-dom'

// Reuse your existing components if they're part of the global layout.
// If Header/Footer are layout-level, you don't need to import them here.
import MobileHero from '@/components/site/MobileHero'
import { DesktopHero } from '@/components/site/DesktopHero'

// Assets (swap these with your actual files)
import rewardsPoster from '@/assets/images/clarkshero.png'
import rewardsVideo from '@/assets/videos/Ray Ward Introduction - CPNS.mp4'

import appPhone from '@/assets/images/clarksrewards.jpg' // promo image of the app
// import qrCode from "@/assets/images/qr-clarks-rewards.png"; // optional QR for app link

export default function ClarksRewards () {
  return (
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
              Earn on every fill-up, snack, and car wash—then redeem for
              free fuel, in-store savings, and members-only perks.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <Link
                to='/clarks-rewards#join'
                className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-black/20 text-base md:text-lg'
              >
                Get 1,500 Points Free
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

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {BENEFITS.map(b => (
              <article
                key={b.title}
                className='rounded-2xl border border-black/10 p-6 hover:shadow-md transition-shadow bg-white'
              >
                {/* Simple inline icon shape to avoid external libs */}
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
        className='py-12 md:py-20 bg-white border-y border-black/10'
      >
        <div className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-10'>
            <div className='order-2 lg:order-1'>
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
                  href='/rewards/signup'
                  className='inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/25'
                >
                  Join &amp; Get 1,500 Points
                </a>

                {/* <div className="flex items-center gap-4">
                  <img
                    src={qrCode}
                    alt="Scan to download the Clarks Rewards app"
                    className="h-20 w-20 rounded-md border border-black/10"
                  />
                  <div className="text-xs text-black/60">
                    Scan to get the app <br />
                    or visit the app store.
                  </div>
                </div> */}
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
                  Car Wash discounts
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 inline-block h-2 w-2 rounded-full bg-brand' />
                  Birthday bonus points
                </li>
              </ul>
            </div>

            <div className='order-1 lg:order-2'>
              <div className='relative mx-auto w-full max-w-[520px]'>
                <div className='rounded-[28px] border border-black/10 shadow-xl overflow-hidden bg-white'>
                  <img
                    src={appPhone}
                    alt='Clarks Rewards app preview'
                    className='w-full h-auto object-contain'
                  />
                </div>
                <div className='pointer-events-none absolute -inset-2 -z-10 rounded-[32px] bg-brand/10 blur-xl' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section
        aria-label='Rewards FAQ'
        className='py-12 md:py-20 bg-neutral-50'
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
    icon: '🧼',
    title: 'Car wash perks',
    desc: 'Members get discounted washes and occasional free-wash promos.'
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
    q: 'Do points expire?',
    a: 'Points remain active as long as you make a qualifying purchase every 6 months. We’ll remind you before anything expires.'
  },
  {
    q: 'Can I combine with other offers?',
    a: 'Yes—sitewide promos and weekly Boosts stack unless otherwise noted in the offer details.'
  }
]
