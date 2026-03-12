import React from 'react'

export default function Privacy() {
  return (
    <main className='flex flex-col -mt-[16px]'>

      {/* Hero */}
      <section className='relative isolate text-white bg-gradient-to-br from-brand to-sky-700'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.08]'
          style={{
            background:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.15) 0 2px, transparent 2px 22px)',
          }}
        />

        <div className='container mx-auto px-6 md:px-10 py-14 md:py-16 relative z-10'>
          <p className="font-['Oswald'] tracking-wide text-xs uppercase text-white/80">
            Clark's Rewards
          </p>

          <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
            Privacy Policy
          </h1>

          <p className='mt-3 text-white/90 max-w-3xl'>
            Please review the privacy policy for the Clark's Rewards loyalty program.
          </p>
        </div>
      </section>


      {/* Content */}
      <section className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-4xl space-y-10 text-black/80'>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Information We Collect
              </h2>
              <p className='mt-3 leading-7'>
                Through Clark's Rewards, Paytronix, and the Rovertown mobile application we may collect
                information such as your name, email address, mobile phone number, account login
                information, purchase history, loyalty activity, and device or application usage data.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                How We Use Your Information
              </h2>
              <p className='mt-3 leading-7'>
                Your information may be used to administer the Clark's Rewards program, track purchases
                and points, deliver promotions and rewards, send communications, improve services,
                and comply with legal or regulatory requirements.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                How We Share Information
              </h2>
              <p className='mt-3 leading-7'>
                We may share limited information with service providers including Paytronix and
                Rovertown, messaging or marketing partners, and legal authorities when required by law.
                Clark's Pump-N-Shop does not sell personal information.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Marketing & SMS Communications
              </h2>
              <p className='mt-3 leading-7'>
                By providing your mobile number and opting in, you consent to receive marketing
                and transactional communications. Message frequency may vary and message
                and data rates may apply. You may opt out at any time by following instructions
                included in messages.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Data Security
              </h2>
              <p className='mt-3 leading-7'>
                Clark's Pump-N-Shop takes reasonable administrative, technical, and physical
                measures to protect your information. However, no system can be guaranteed
                to be completely secure.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Data Retention
              </h2>
              <p className='mt-3 leading-7'>
                We retain personal information as long as necessary to operate the loyalty program,
                comply with legal obligations, resolve disputes, and enforce agreements.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Your Rights & Choices
              </h2>
              <p className='mt-3 leading-7'>
                Depending on applicable law you may have the right to access, update,
                or request deletion of your information. Requests may be submitted
                by contacting Clark's Pump-N-Shop.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Children's Privacy
              </h2>
              <p className='mt-3 leading-7'>
                The Clark's Rewards program is not intended for individuals under the age of 18,
                and we do not knowingly collect personal information from minors.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Changes to This Policy
              </h2>
              <p className='mt-3 leading-7'>
                Clark's Pump-N-Shop may update this Privacy Policy periodically.
                Updates will be posted with a revised effective date.
              </p>
            </div>


            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                Contact Information
              </h2>

              <p className='mt-3 leading-7'>
                Clark's Pump-N-Shop<br/>
                Email: contactus@clarkspns.com<br/>
                Phone: (606) 327-2775
              </p>
            </div>


            <div className='pt-6'>
              <a
                href='/privacy.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-brand transition-colors'
              >
                Download PDF Version
              </a>
            </div>


          </div>
        </div>
      </section>

    </main>
  )
}
