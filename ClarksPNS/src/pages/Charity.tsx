import React from 'react'

// ---- Images (adjust paths if your alias differs) ----
// Brand / people
import clarkFamilyCharity from '@/assets/images/Charity/Clark_Family_Charity.png'
import rodneyClark from '@/assets/images/Charity/Rodney_Clark.jpg'

// --- Scramble video (new) ---
import scrambleVideo from '@/assets/videos/091125_clarks_golfscramble_1080p.mp4'

// ---- Helpers ----
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm">
    <div
      className="
        text-2xl sm:text-3xl md:text-4xl
        font-bold text-brand
        leading-tight tracking-tight
        break-words
      "
    >
      {value}
    </div>
    <div className="mt-1 text-sm text-black/60">{label}</div>
  </div>
)

const Card = ({
  eyebrow,
  title,
  children,
  cta
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
  cta?: { href: string; label: string }[]
}) => (
  <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
    {eyebrow && (
      <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
        {eyebrow}
      </p>
    )}
    <h3 className="mt-1 font-['Oswald'] text-2xl md:text-3xl font-bold">
      {title}
    </h3>
    <div className="prose prose-neutral mt-3 max-w-none text-black/80">
      {children}
    </div>
    {cta && (
      <div className="mt-5 flex flex-wrap gap-3">
        {cta.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 transition shadow-md"
          >
            {c.label}
          </a>
        ))}
      </div>
    )}
  </article>
)

const Gallery = ({
  images,
  columns = 3
}: {
  images: string[]
  columns?: 2 | 3 | 4
}) => (
  <ul
    className={
      'grid gap-3 sm:gap-4' +
      (columns === 2
        ? ' grid-cols-2 md:grid-cols-3'
        : columns === 4
        ? ' grid-cols-2 md:grid-cols-4'
        : ' grid-cols-2 md:grid-cols-3')
    }
  >
    {images.map((src, i) => (
      <li
        key={i}
        className="overflow-hidden rounded-xl border border-black/10 bg-white"
      >
        <img
          src={src}
          loading={i < 6 ? 'eager' : 'lazy'}
          alt="Clark Family Charity event"
          className="h-full w-full object-cover hover:opacity-95 transition"
        />
      </li>
    ))}
  </ul>
)

// --- Dynamic galleries ---
// Rodney Fall 2025 gallery
const rodneyFall25Imports = import.meta.glob<string>(
  '@/assets/images/Charity/Rodney Fall 2025 1080p/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
)

const rodneyFall25Images = Object.entries(rodneyFall25Imports)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

// Scholarship gallery (folder name kept as in your project: "scholorship")
const scholarshipImports = import.meta.glob<string>(
  '@/assets/images/Charity/scholorship/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
)
const scholarshipImages = Object.entries(scholarshipImports)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

export default function DonationsPage() {
  return (
    <main id="donations" className="flex flex-col -mt-[16px]">
      {/* HERO */}
      <section className="relative isolate bg-brand text-white">
        <div className="container mx-auto grid md:grid-cols-12 gap-8 px-6 md:px-10 py-14 md:py-16 items-center">
          <div className="md:col-span-7">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-white/80">
              Clark Family Charity
            </p>
            <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
              Investing in the communities that invest in us
            </h1>
            <p className="mt-3 text-white/90 max-w-prose">
              Over <strong className="text-white">$1,125,000</strong> donated to
              the communities who have supported Clark’s Pump-N-Shop and John W.
              Clark Oil Company, Inc. Our giving focuses on students continuing
              their education and honoring Rodney Clark’s legacy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#golf"
                className="rounded-2xl px-5 py-2.5 bg-white text-brand hover:bg-white/90 shadow-md"
              >
                Golf Outing
              </a>
              <a
                href="#scholarship"
                className="rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10"
              >
                Scholarships
              </a>
              <a
                href="#donate"
                className="rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10"
              >
                Donate
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-sm p-3">
              <div className="h-64 w-64 md:h-72 md:w-72 rounded-xl overflow-hidden">
                <img
                  src={rodneyClark}
                  alt="Rodney Clark"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8 md:py-10 bg-white border-b border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="$1.125M+" label="Total donated" />
            <Stat value="$2,000/yr" label="Scholarship award" />
            <Stat value="8 semesters" label="Renewable duration" />
            <Stat value="2016→Today" label="Honoring Rodney’s legacy" />
          </div>
        </div>
      </section>

      {/* RODNEY / ABOUT */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <article className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-6 md:p-8">
                <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
                  Our Why
                </p>
                <h3 className="mt-1 font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                  Rodney Clark Memorial Scholarship
                </h3>
                <div className="prose prose-neutral mt-3 max-w-none text-black/80">
                  <p>
                    On January 10, 2016, the Clark family lost a beloved brother
                    and son. To honor Rodney’s memory, a scholarship endowment
                    was created in partnership with Ashland Community & Technical
                    College for local high-school seniors.
                  </p>
                  <p>
                    In addition to accepting general donations, we host an annual
                    memorial golf outing — now also at Keene Trace Golf Club:
                    Champions Course — with proceeds supporting our endowment.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 bg-brand/10 flex items-center justify-center p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-black/10">
                <img
                  src={clarkFamilyCharity}
                  alt="Clark Family Charity"
                  className="max-h-24 md:max-h-28 w-auto object-contain"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* GOLF OUTING */}
      <section id="golf" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
              April 28, 2025 · Nicholasville, KY
            </p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Rodney Clark Memorial Golf Outing
            </h2>
            <div className="mt-3 text-black/70">
              <p>
                Join us at Keene Trace Golf Club — Champions Course. Check-in &
                breakfast at 8:00 AM, shotgun start at 9:00 AM. Lunch, awards,
                and silent auction to follow.
              </p>
              <p className="mt-2">
                Limited to the first 25 teams. Registration closes April 11,
                2025.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/charity/register-team"
                className="rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 shadow-md"
              >
                Register a Team
              </a>
              <a
                href="/charity/apply-rodney-scholarship"
                className="rounded-2xl px-5 py-2.5 border border-brand/20 text-brand hover:bg-brand/5"
              >
                Apply: Rodney Clark Scholarship
              </a>
            </div>
          </div>

          {/* NEW: Scramble video + dynamic photo gallery */}
          <div className="mt-8 md:mt-10 max-w-7xl mx-auto space-y-6">
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-black">
              <video
                src={scrambleVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto"
              />
            </div>

            <Gallery images={rodneyFall25Images} columns={4} />
            {/* <p className="mt-3 text-xs text-black/50 text-center">Moments from past outings</p> */}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section id="scholarship" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
              $2,000 yearly · Renewable up to 8 semesters
            </p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Clark Family Scholarship
            </h2>
            <div className="mt-3 text-black/70">
              <p>
                A $2,000 annual scholarship ($1,000/semester) awarded to students
                who show academic promise and plan to attend a 2–4 year college
                or university, trade school, or vocational school. Winners are
                eligible to renew annually for up to eight semesters.
              </p>
              <p className="mt-2">
                <strong>2024 recipients:</strong> Alayna Reynolds (West Carter HS)
                and Madilyn Smith (South Point HS).
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/charity/apply-scholarship-eastern"
                className="rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 shadow-md"
              >
                Apply (Eastern KY / OH)
              </a>
              <a
                href="/charity/apply-scholarship-central"
                className="rounded-2xl px-5 py-2.5 border border-brand/20 text-brand hover:bg-brand/5"
              >
                Apply (Central KY)
              </a>
            </div>
          </div>

          {/* Dynamic scholarship gallery */}
          <div className="mt-8 md:mt-10 max-w-7xl mx-auto">
            <Gallery images={scholarshipImages} columns={4} />
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="py-16 bg-white border-y border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="lg:flex lg:items-stretch lg:divide-x lg:divide-black/10">
            {/* Left / Donate */}
            <div className="lg:w-1/2 lg:pr-10 py-8">
              <div className="h-full flex flex-col justify-center text-center lg:text-left">
                <h2 className="font-['Oswald'] text-3xl font-bold text-black">
                  Make a Donation
                </h2>
                <p className="mt-4 text-black/70">
                  If you’d like to make a tax-deductible donation by mail, please
                  make checks payable to:
                </p>
                <p className="mt-3 inline-block rounded-md bg-black/[0.06] px-2.5 py-1 font-semibold text-black">
                  Clark Family Charity · P.O. Box 1433 · Ashland, KY 41105
                </p>
                <p className="mt-4 text-sm text-black/60">
                  Prefer online giving? Use the button below to donate securely.
                </p>
                <div className="mt-6">
                  <a
                    href="https://pages.donately.com/rodneyclarkscholarshipfund/campaigns"
                    className="inline-flex rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 shadow-md"
                  >
                    Make an Online Donation
                  </a>
                </div>
              </div>
            </div>

            {/* Right / Questions */}
            <div className="lg:w-1/2 lg:pl-10 py-8">
              <div className="h-full flex flex-col justify-center text-center lg:text-left">
                <h2 className="font-['Oswald'] text-3xl font-bold text-black">
                  Have questions?
                </h2>
                <p className="mt-4 text-black/70">
                  For sponsorships, in-kind donations, or event details, please
                  contact our team via the site contact form or your local Clark’s
                  Pump-N-Shop.
                </p>
                <div className="mt-6">
                  <a
                    href="#footer-contact"
                    className="inline-flex rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 shadow-md"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
