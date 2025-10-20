// src/components/site/DesktopHero.tsx
import React from 'react'
import bgVideo from '@/assets/videos/clarkssecret_1080.mp4'

export function DesktopHero () {
  return (
    <section
      aria-label='Hero'
      className='
relative isolate
-mt-[16px]
w-full
h-[68vh] sm:h-[76vh] md:h-[86vh]
overflow-hidden
rounded-b-none
block   /* <-- was "hidden md:block"; now renders on mobile too */
'
    >
      {/* Background video */}
      <video
        className='absolute inset-0 h-full w-full object-cover'
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Blue tint overlay (back again) */}
      <div className='absolute inset-0 bg-brand/50 pointer-events-none' />

      {/* Subtle bottom gradient for legibility */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black/20' />

      {/* Content */}
      <div className='relative z-[1] h-full flex items-center'>
        <div className='container max-w-screen-2xl px-6 md:px-10'>
          <div className='inline-flex flex-col gap-6 md:gap-8 w-full max-w-[720px]'>
            <h1
              className="
font-['Oswald'] font-extrabold text-white leading-[1.03]
text-4xl sm:text-5xl md:text-7xl xl:text-8xl tracking-tight
drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]
"
            >
              Return.
              <br />
              Refresh.
              <br />
              Refuel.
            </h1>

            {/* Accent rule */}
            <div className='h-2 w-48 sm:w-64 md:w-80 bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.25)]' />

            <p
              className="
font-['Oswald'] font-semibold text-white/95
text-lg sm:text-xl md:text-3xl
drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]
"
            >
              Your trusted stop for fuel, food, and friendly faces.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <a
                href='/clarks-rewards#join'
                className='
inline-flex items-center justify-center
h-12 sm:h-14 md:h-16
rounded-[56px] bg-white text-brand font-bold
px-6 md:px-8 text-base sm:text-lg md:text-xl tracking-[0.18em] uppercase
transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
'
              >
                Join Clarks Rewards
              </a>
              <a
                href='/locations'
                className='
inline-flex items-center justify-center
h-12 sm:h-14 md:h-16
rounded-[56px] bg-white/90 text-black/90 font-semibold
px-6 md:px-8 text-base sm:text-lg md:text-xl
backdrop-blur-[2px] transition-all hover:bg-white
'
              >
                Find Nearest Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
