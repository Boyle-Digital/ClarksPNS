import React from 'react'

export default function Terms() {
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
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Last Updated: 3/24/2026
          </p>
          <p className='mt-3 text-white/90 max-w-3xl'>
            Please review the official terms & conditions for the Clark&apos;s Rewards program.
          </p>
        </div>
      </section>

      <section className='py-12 md:py-16 bg-white'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-4xl space-y-10 text-black/80'>
            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                1. Program Overview
              </h2>
              <p className='mt-3 leading-7'>
                The Clark&apos;s Rewards loyalty program (&ldquo;Program&rdquo;) is operated by Clark&apos;s
                Pump-N-Shop (&ldquo;Clark&apos;s,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) and powered by
                Paytronix Systems, Inc., with mobile access provided through the Rovertown
                mobile application. By enrolling in or participating in the Program, you, the
                &ldquo;member&rdquo;, agree to these Terms & Conditions, which may be amended from
                time to time by Clark&apos;s with or without prior notice.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                2. Membership Eligibility
              </h2>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Must be at least 18 years old, or the minimum age required by law.</li>
                <li>Must provide a valid mobile phone number and/or email address.</li>
                <li>One account per individual.</li>
                <li>Program is available at participating Clark&apos;s locations only.</li>
                <li>
                  Clark&apos;s reserves the right to refuse, suspend, or terminate accounts for
                  misuse, fraud, abuse, or if the Program is terminated for any reason.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                3. Enrollment
              </h2>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Enrollment is free unless otherwise amended.</li>
                <li>
                  Members may enroll via the Clark&apos;s Rewards website, Rovertown mobile app,
                  or other channels approved by Clark&apos;s.
                </li>
                <li>
                  You are responsible for maintaining accurate and current account
                  information at all times.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                4. Earning & Tracking Activity
              </h2>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">4.1 Visits</h3>
              <p className='mt-2 leading-7'>
                Any time a member uses their loyalty account in-store or online, the member
                will accrue one (1) visit in a wallet labeled &ldquo;Visits&rdquo; at checkout and close.
                Members cannot accrue more than one (1) visit within a 60-minute period.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">4.2 Dollars Spent</h3>
              <p className='mt-2 leading-7'>
                Any time a member makes a purchase, the pre-tax amount spent will be added
                to a wallet labeled &ldquo;Dollars Spent.&rdquo; This value is used to calculate points
                earned for that transaction.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">4.3 Points</h3>
              <p className='mt-2 leading-7'>
                Points may be awarded based on visits, dollars spent, or other promotional
                rules established by Clark&apos;s from time to time. Points have no cash value,
                are not property, and cannot be transferred, sold, or exchanged for cash.
              </p>
              <p className='mt-2 leading-7 font-semibold text-black'>Point Accrual Ratio:</p>
              <ul className='mt-2 space-y-2 leading-7 list-disc pl-6'>
                <li>Members earn 20 points for every $1.00 spent on qualifying purchases, pre-tax.</li>
                <li>
                  Members earn 10 points for every gallon of fuel purchased, where applicable
                  and as configured in the Program.
                </li>
              </ul>
              <p className='mt-2 leading-7'>
                Points are not earned on purchases of alcohol, tobacco, lottery tickets, or
                gift cards. Clark&apos;s may exclude additional items, categories, or transactions
                from earning points at its discretion.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">4.4 Rewards</h3>
              <p className='mt-2 leading-7'>
                Any reward redeemed on the account will be tracked in the member&apos;s account.
                Rewards are subject to availability and may be changed, substituted, or
                removed at any time at Clark&apos;s discretion.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">4.5 Fuel Reward Limitations</h3>
              <p className='mt-2 leading-7'>
                Fuel discounts may be subject to per-transaction gallon limits, per-day usage
                limits, or other operational restrictions, which will be disclosed at the time
                of the offer or redemption. Fuel rewards may not be combined with other fuel
                promotions unless expressly permitted. Discounts apply only to eligible fuel
                grades at participating locations and have no cash value.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                5. Registration Reward (Fuel Discount Ladder)
              </h2>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>
                  One-time $0.10 off per gallon, up to 25 gallons for the first visit upon
                  registration. Offer expires in 14 days from registration.
                </li>
                <li>
                  After initial use of the $0.10 discount or its expiration, a one-time $0.15
                  off per gallon, up to 25 gallons. Offer expires in 14 days from eligibility.
                </li>
                <li>
                  After use of the $0.15 off per gallon or its expiration, members receive
                  $0.20 off per gallon, up to 25 gallons. Offer expires in 14 days from eligibility.
                </li>
                <li>
                  After the above uses or expiration, members receive the everyday $0.05 off
                  per gallon, up to 25 gallons at each transaction.
                </li>
              </ul>
              <p className='mt-3 leading-7'>
                All fuel rewards are subject to participating locations, system availability,
                and any additional restrictions disclosed at the time of offer or as may be
                imposed by Clark&apos;s from time to time, in its sole discretion.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                6. Bankable Points & Reward Redemption
              </h2>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Once a reward or catalog item is redeemed, the member has 30 days to use it before it expires.</li>
                <li>
                  All in-store coupons, catalog items, and gas discounts are subject to
                  expiration, availability, and additional terms disclosed at the time of
                  redemption or imposed by Clark&apos;s from time to time.
                </li>
                <li>Rewards cannot be transferred, substituted, or redeemed for cash.</li>
                <li>Additional restrictions may apply to specific offers.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                7. Points Balance Cap
              </h2>
              <p className='mt-3 leading-7'>
                Clark&apos;s Rewards accounts are subject to a maximum points balance cap of
                30,000 points per account.
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>Members may not hold more than 30,000 points in their account at any time.</li>
                <li>
                  If an account balance exceeds 30,000 points for any reason, Clark&apos;s will
                  automatically reduce the balance to 30,000 points without compensation.
                </li>
                <li>
                  Once the cap is reached, additional points may not be credited or claimed
                  until the balance is reduced below the cap through redemption or expiration.
                </li>
                <li>Clark&apos;s may enforce this cap on existing and future accounts.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                8. Points Expiration Based on Inactivity
              </h2>
              <p className='mt-3 leading-7'>
                Points do not expire based on the date they are earned. Instead, points are
                subject to inactivity-based expiration.
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>
                  If a member&apos;s account shows no qualifying activity for a continuous period
                  of 12 months (365 days), all points in that account shall be forfeited and expire.
                </li>
                <li>
                  &ldquo;Activity&rdquo; includes, but is not limited to, making a qualifying purchase,
                  earning points, or redeeming a reward using the loyalty account.
                </li>
                <li>Expiration due to inactivity shall be processed automatically on a recurring basis.</li>
                <li>Once points expire for any reason, they cannot and will not be reinstated.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                9. Exclusions & Limitations
              </h2>
              <p className='mt-3 leading-7'>
                Points are not earned on purchases of alcohol, tobacco, lottery tickets, or
                gift cards. Certain items, categories, or transactions may be excluded from
                earning points or redeeming rewards based on applicable law, promotion rules,
                or Clark&apos;s discretion. Exclusions may vary by location or offer.
              </p>
              <ul className='mt-3 space-y-2 leading-7 list-disc pl-6'>
                <li>
                  Rewards, points, and offers are subject to availability, system limitations,
                  and any additional terms disclosed at the time of the offer or redemption or
                  imposed by Clark&apos;s in its sole discretion.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                10. Account Misuse & Adjustments
              </h2>
              <p className='mt-3 leading-7'>
                Clark&apos;s reserves the right to suspend or terminate any account, adjust point
                balances, or revoke rewards in the event of suspected fraud, abuse, misuse,
                system errors, or violations of these Terms & Conditions.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                11. Program Changes or Termination
              </h2>
              <p className='mt-3 leading-7'>
                Clark&apos;s reserves the right to modify, suspend, or terminate the Program, in
                whole or in part, at any time and for any reason, including but not limited to
                changes to earning rates, reward structures, expiration policies, eligibility
                requirements, balance caps, participation rules, or any other reason in its
                sole and exclusive discretion.
              </p>
              <p className='mt-3 leading-7'>
                Clark&apos;s may modify messaging frequency or program features based on
                operational, technical, or vendor platform requirements.
              </p>
              <p className='mt-3 leading-7'>
                Clark&apos;s may provide notice of material changes where reasonably practicable,
                including by posting updated Terms & Conditions on the Program website or
                mobile application and updating the last updated date. Continued participation
                after such changes constitutes acceptance of the revised Terms & Conditions.
              </p>
              <p className='mt-3 leading-7'>
                If the Program is terminated, any unredeemed points, rewards, or benefits
                shall be automatically forfeited without compensation, except as may otherwise
                be required by applicable law.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                12. SMS Text Messaging Terms
              </h2>
              <p className='mt-3 leading-7'>
                Members can opt in for SMS messages from Clark&apos;s Pump-N-Shop as part of
                the loyalty registration process.
              </p>
              <p className='mt-3 leading-7'>
                By providing your mobile number and opting in, you provide prior express
                written consent to receive recurring automated promotional and personalized
                marketing text messages from Clark&apos;s Pump-N-Shop to the mobile number
                provided when signing up. Messages may pertain to promotional programs,
                new menu items, and related marketing communications.
              </p>
              <p className='mt-3 leading-7'>
                Messages for this program will be sent from 47136 and begin with
                Clarks Rewards. Consent to receive automated marketing messages is not a
                condition of any purchase. Message frequency varies. Message and data rates may apply.
              </p>
              <p className='mt-3 leading-7'>
                To opt out, text STOP to 47136. After texting STOP, you will receive one
                additional message confirming that your request has been processed. For more
                information, text HELP to 47136 for customer care information.
              </p>
              <p className='mt-3 leading-7'>
                You can also contact Clark&apos;s at contactus@clarkspns.com or call
                (606) 327-2775 for additional assistance.
              </p>
              <p className='mt-3 leading-7'>
                Messaging services are provided through Paytronix Systems, Inc., and are
                subject to applicable Paytronix messaging tool terms of use.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                13. Disclaimer of Warranties; Limitation of Liability
              </h2>
              <p className='mt-3 leading-7'>
                The Program and all related services are provided on an &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; basis without warranties of any kind, either express or
                implied, including but not limited to implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </p>
              <p className='mt-3 leading-7'>
                The Program relies on third-party technology platforms and integrations.
                Clark&apos;s is not responsible for delays, outages, data transmission errors,
                or failures caused by third-party systems, including Paytronix or point-of-sale providers.
              </p>
              <p className='mt-3 leading-7'>
                To the fullest extent permitted by law, Clark&apos;s Pump-N-Shop, its affiliates,
                officers, employees, agents, and service providers, including Paytronix and
                Rovertown, shall not be liable for any indirect, incidental, consequential,
                special, exemplary, or punitive damages arising out of or related to the Program.
              </p>
              <p className='mt-3 leading-7'>
                To the fullest extent permitted by law, Clark&apos;s total aggregate liability
                arising out of or relating to the Program shall not exceed the lesser of
                the value of rewards earned but not yet redeemed by the member or $10.00
                to any one member.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                14. Governing Law
              </h2>
              <p className='mt-3 leading-7'>
                These Terms & Conditions are governed by the laws of the Commonwealth of
                Kentucky, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                15. Dispute Resolution; Exclusive Venue; Class Action Waiver
              </h2>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">15.1 Exclusive Venue</h3>
              <p className='mt-2 leading-7'>
                Except where prohibited by law, any dispute, claim, or controversy arising out
                of or relating to the Program, these Terms & Conditions, or your participation
                in the Program shall be brought exclusively in the state courts located in
                Boyd County, Kentucky, and you consent to the personal jurisdiction of such courts.
              </p>
              <p className='mt-2 leading-7'>
                To the extent federal jurisdiction exists, you agree that such dispute shall
                be brought exclusively in the United States District Court with jurisdiction
                over Boyd County, Kentucky.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">15.2 Waiver of Class Actions</h3>
              <p className='mt-2 leading-7'>
                You agree that any dispute shall be brought solely in your individual capacity
                and not as a class action, consolidated action, or representative action.
                You waive any right to participate in a class action lawsuit.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">15.3 Waiver of Jury Trial</h3>
              <p className='mt-2 leading-7'>
                To the fullest extent permitted by law, you waive any right to a jury trial in
                any dispute arising out of or relating to the Program.
              </p>

              <h3 className="mt-4 font-['Oswald'] text-xl font-bold text-black">15.4 Severability</h3>
              <p className='mt-2 leading-7'>
                If any portion of this dispute resolution provision is found unenforceable, the
                remaining portions shall remain in full force and effect to the fullest extent
                permitted by law.
              </p>
            </div>

            <div>
              <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                16. Contact Information
              </h2>
              <p className='mt-3 leading-7'>
                Clark&apos;s Pump-N-Shop
                <br />
                Email: contactus@clarkspns.com
                <br />
                Phone: (606) 327-2775
              </p>
            </div>

          
          </div>
        </div>
      </section>
    </main>
  )
}
