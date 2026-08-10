// The Rodney Clark legacy — scholarships and the memorial golf outing.
// Also reclaims /scholarship, a URL Google still indexes from the old site.
import { SEO } from '@/lib/seo'
import Tilt from '@/components/site/Tilt'

import rodneyPhoto from '@/assets/images/Charity/Rodney_Clark.jpg'
import scrambleLogo from '@/assets/images/Charity/scramble/scrambleLogo.png'
import golfPdf from '@/assets/files/Rodney Clark Memorial Golf Outing 2026 - Bellefonte.pdf'
import appPdf from '@/assets/files/2026 Scholarship Application (Central) (01226829x9F876) (1).PDF'

export default function Scholarship() {
  return (
    <main className='w-full overflow-x-clip bg-white'>
      <SEO
        title='Scholarships — Clark’s Pump-N-Shop'
        description='The Clark Family Scholarship and the Rodney Clark Memorial Scholarship — investing in students across Kentucky, Ohio, and West Virginia.'
        path='/scholarship'
      />

      {/* Hero */}
      <section className='relative isolate -mt-[16px] bg-gradient-to-br from-white via-white to-neutral-50 md:-mt-[20px]'>
        <div className='container mx-auto grid grid-cols-1 items-center gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-brand">
              The Clark legacy
            </div>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-black md:text-6xl">
              For Rodney.
              <br />
              For the next generation.
            </h1>
            <p className='mt-4 max-w-prose text-lg text-black/70'>
              When Rodney Clark passed in 2016, his family turned grief into
              a promise: help the young people of this region build their
              future. Today that promise funds real degrees, real trades,
              and real starts.
            </p>
          </div>
          <div className='lg:col-span-5'>
            <figure className='mx-auto max-w-[380px]'>
              <img
                src={rodneyPhoto}
                alt='Rodney Clark'
                className='w-full rounded-2xl border border-black/10 object-cover shadow-soft'
              />
              <figcaption className='mt-2 text-center text-sm text-black/50'>
                Rodney Clark · 1966–2016
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The two scholarships */}
      <section className='bg-surface-alt brand-stripes-light py-12'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <Tilt max={4}>
            <div className='rounded-2xl border border-black/10 brand-topline bg-white p-8 shadow-soft'>
              <h2 className="font-display text-2xl font-bold text-black md:text-3xl">
                Clark Family Scholarship
              </h2>
              <p className='mt-3 text-black/70'>
                $2,000 a year — $1,000 each semester, renewable for up to
                eight semesters — for students enrolled in a two- to
                four-year college, university, trade school, or vocational
                program. Built for the region we serve, and designed to
                support students through their entire academic journey.
              </p>
              <a
                href={appPdf}
                target='_blank'
                rel='noreferrer'
                className='mt-5 inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-white transition-colors hover:bg-brand/90'
              >
                Download the application
              </a>
            </div>
            </Tilt>
            <Tilt max={4}>
            <div className='rounded-2xl border border-black/10 brand-topline bg-white p-8 shadow-soft'>
              <h2 className="font-display text-2xl font-bold text-black md:text-3xl">
                Rodney Clark Memorial Scholarship
              </h2>
              <p className='mt-3 text-black/70'>
                In partnership with Ashland Community and Technical College,
                Rodney’s scholarship carries his name forward — an endowment
                built by his family, our stores, and this community, funding
                students year after year.
              </p>
              <p className='mt-3 text-black/70'>
                General donations are welcomed, and the annual memorial golf
                outing raises funds in his honor.
              </p>
            </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Golf outing */}
      <section className='bg-brand brand-stripes py-12 text-white'>
        <div className='container mx-auto px-6 md:px-10'>
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <img
              src={scrambleLogo}
              alt='Rodney Clark Memorial Golf Outing'
              className='mx-auto w-full max-w-[300px]'
              loading='lazy'
            />
          </div>
          <div className='lg:col-span-8'>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              The Rodney Clark Memorial Golf Outing
            </h2>
            <p className='mt-3 max-w-prose text-white/85'>
              The region shows up, tees off, and funds the next class of
              scholarships. The fall 2026 outing is Monday, September 14 at
              Bellefonte Country Club in Ashland — breakfast and
              registration at 8:00 AM, shotgun start at 9:00 AM, with
              lunch, awards, and the silent auction to follow. Limited to
              the first 25 teams; registration closes September 4.
            </p>
            <p className='mt-3 max-w-prose text-white/85'>
              Sponsorships: Platinum $5,000 · Gold $3,500 · Silver $2,500 ·
              Hole Sponsor $500. Checks payable to Clark Family Charity —
              registration and details in the packet below, or contact Wes
              Crawford at wes.crawford@clarkspns.com.
            </p>
            <a
              href={golfPdf}
              target='_blank'
              rel='noreferrer'
              className='mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-brand transition-transform hover:-translate-y-0.5'
            >
              Registration packet (PDF)
            </a>
          </div>
        </div>
        </div>
      </section>
    </main>
  )
}
