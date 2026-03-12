import React from 'react'

export default function Privacy() {
  return (
    <main className='flex flex-col -mt-[16px]'>
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
            Clark&apos;s Rewards
          </p>

          <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
            Privacy Policy
          </h1>

          <p className='mt-3 text-white/90 max-w-3xl'>
            Please review the privacy policy for the Clark&apos;s Rewards loyalty program.
          </p>
        </div>
      </section>

      <section className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-4xl space-y-10 text-black/80'>
            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                1. Information We Collect
              </h2>
              <p className='mt-3 leading-7'>
                Through Clark&apos;s Rewards, Paytronix, and the Rovertown mobile application,
                we may collect:
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Name, email address, and mobile phone number</li>
                <li>Account login and verification information</li>
                <li>Transaction and purchase history</li>
                <li>Loyalty activity, including visits, dollars spent, points, and rewards</li>
                <li>Location data, if enabled through the app</li>
                <li>Device and app usage data</li>
              </ul>
              <p className='mt-3 leading-7'>
                If you use multiple engagement channels, such as app, SMS, email, Apple Wallet,
                or Google Wallet, we may link those identifiers to a single loyalty profile.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                2. How We Use Your Information
              </h2>
              <p className='mt-3 leading-7'>
                We use your information to:
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Operate and administer the Clark&apos;s Rewards program</li>
                <li>Track purchases, points, visits, and rewards</li>
                <li>Deliver rewards, offers, and promotions</li>
                <li>Send transactional and marketing communications, including email, SMS, and app notifications</li>
                <li>Improve our services, marketing, and customer experience</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                3. How We Share Information
              </h2>
              <p className='mt-3 leading-7'>
                We may share limited loyalty transaction data with manufacturers, brand partners,
                or reporting platforms in connection with promotional reimbursement, incentive
                programs, or regulatory reporting obligations, subject to applicable law.
              </p>
              <p className='mt-3 leading-7'>
                We may share information with:
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Service providers such as Paytronix, the loyalty platform, and Rovertown, the mobile app provider</li>
                <li>Messaging, analytics, and marketing partners</li>
                <li>Legal or regulatory authorities when required by law</li>
              </ul>
              <p className='mt-3 leading-7 font-semibold text-black'>
                We do not sell personal information.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                4. Marketing & SMS Communications
              </h2>
              <p className='mt-3 leading-7'>
                By providing your mobile number and opting in, you confirm that you are the
                authorized user of the mobile number provided and that you consent to receive
                recurring automated marketing messages at that number.
              </p>
              <p className='mt-3 leading-7'>
                You may opt out of marketing messages at any time using the instructions
                provided in those messages. Transactional or account-related messages may
                still be sent.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                5. Data Security
              </h2>
              <p className='mt-3 leading-7'>
                We take reasonable administrative, technical, and physical measures to protect
                your information. However, no system can be guaranteed to be 100% secure and
                by registering as a member you acknowledge that Clark&apos;s is not responsible
                for any loss or damages as the result of your information being compromised at
                any time and you release Clark&apos;s of all responsibilities or losses of any kind.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                6. Data Retention
              </h2>
              <p className='mt-3 leading-7'>
                We retain personal information as long as necessary to operate the Program,
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                7. Your Rights & Choices
              </h2>
              <p className='mt-3 leading-7'>
                Depending on applicable law, you may have the right to:
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Access or update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Limit certain data uses</li>
              </ul>
              <p className='mt-3 leading-7'>
                To request any additional privacy rights, you may contact us at
                {' '}contactus@clarkspns.com. However, we may take reasonable steps to verify
                your identity before fulfilling your request and may not be able to accommodate
                your request depending upon the request.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                8. Children&apos;s Privacy
              </h2>
              <p className='mt-3 leading-7'>
                The Program is not intended for children and no person under 18 years of age
                may participate. We do not knowingly collect personal information from any
                person under 18 years of age.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                9. Changes to This Policy
              </h2>
              <p className='mt-3 leading-7'>
                We may update this Privacy Policy from time to time. Updates will be posted
                with a new &ldquo;Last Updated&rdquo; date.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                10. Contact Us
              </h2>
              <p className='mt-3 leading-7'>
                Clark&apos;s Pump-N-Shop
                <br />
                Email: contactus@clarkspns.com
                <br />
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
