// Sports & Community — the statewide sponsorships nobody could see on the
// old site: Official Fuel of the KHSAA, title sponsor of the Girls' Sweet 16,
// baseball, softball, and track & field, plus hometown support.
import { Link } from 'react-router-dom'
import { SEO } from '@/lib/seo'
import { IconTrophy, IconPump, IconCap } from '@/components/site/Icons'

import footballAd from "@/assets/images/Ashland FB - Clark's football AD (8.75 × 11.125 in) (1).png"
import marshallAd from "@/assets/images/Clark's - Marshall Football Magazine (1) (1).png"

const TITLES = [
  {
    name: 'Girls’ Basketball Sweet 16',
    note: 'Title sponsor — it’s officially the Clark’s Pump-N-Shop Girls’ Sweet 16.'
  },
  { name: 'KHSAA Baseball', note: 'Title sponsor of the state championship.' },
  { name: 'KHSAA Softball', note: 'Title sponsor of the state championship.' },
  {
    name: 'Track & Field',
    note: 'Title sponsor of the state and region meets.'
  }
]

export default function Community() {
  return (
    <main className='w-full overflow-x-clip bg-white'>
      <SEO
        title='Sports & Community — Clark’s Pump-N-Shop'
        description='Official Fuel of the KHSAA. Title sponsor of the Girls’ Sweet 16, baseball, softball, and track & field. Backing hometown teams across the Tri-State.'
        path='/community'
      />

      {/* Hero */}
      <section className='relative isolate -mt-[16px] overflow-hidden bg-brand md:-mt-[20px]'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.1]'
          style={{
            background:
              'repeating-linear-gradient(0deg, #fff 0 2px, transparent 2px 56px), repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 56px)'
          }}
        />
        <div className='container relative z-[1] mx-auto px-6 py-16 text-white md:px-10 md:py-24'>
          <div className="font-['Oswald'] text-xs uppercase tracking-[0.3em] text-white/70">
            Sports & Community
          </div>
          <h1 className="mt-2 font-['Oswald'] text-4xl font-bold leading-tight md:text-6xl">
            The Official Fuel of the KHSAA.
          </h1>
          <p className='mt-4 max-w-prose text-lg text-white/90 md:text-xl'>
            Every high school in Kentucky plays under the same banner we fill
            up under. From the Sweet 16 hardwood to the state track meet,
            Clark’s backs the kids and the communities that raised us.
          </p>
        </div>
        <div className='h-8 w-full bg-gradient-to-b from-transparent to-white md:h-12' />
      </section>

      {/* Title sponsorships */}
      <section className='container mx-auto px-6 py-12 md:px-10'>
        <div className='flex items-center gap-3'>
          <IconTrophy className='h-8 w-8 text-brand' />
          <h2 className="font-['Oswald'] text-3xl font-bold text-black md:text-4xl">
            Our name is on the trophy.
          </h2>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {TITLES.map(t => (
            <div
              key={t.name}
              className='rounded-2xl border border-black/10 bg-surface-alt p-6'
            >
              <div className="font-['Oswald'] text-xl font-bold text-black">
                {t.name}
              </div>
              <p className='mt-1 text-black/70'>{t.note}</p>
            </div>
          ))}
        </div>
        <p className='mt-6 max-w-prose text-black/70'>
          As the Official Fuel Sponsor of the Kentucky High School Athletic
          Association, Clark’s has a presence at every KHSAA state
          championship event — and we like it that way. If your kid plays,
          we’re already in the stands.
        </p>
      </section>

      {/* Hometown creative */}
      <section className='bg-surface-alt py-12'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='flex items-center gap-3'>
            <IconCap className='h-8 w-8 text-brand' />
            <h2 className="font-['Oswald'] text-3xl font-bold text-black md:text-4xl">
              Hometown colors
            </h2>
          </div>
          <p className='mt-2 max-w-prose text-black/70'>
            Game programs, stadium boards, and matchday spreads — a sample of
            how Clark’s shows up for the teams closest to home, from Ashland
            football to Marshall gameday.
          </p>
          <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {[footballAd, marshallAd].map((src, i) => (
              <div
                key={i}
                className='overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft'
              >
                <img
                  src={src}
                  alt={
                    i === 0
                      ? 'Clark’s Pump-N-Shop Ashland football program ad'
                      : 'Clark’s Pump-N-Shop Marshall football magazine ad'
                  }
                  loading='lazy'
                  className='h-auto w-full object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the field */}
      <section className='container mx-auto px-6 py-12 md:px-10'>
        <div className='flex items-center gap-3'>
          <IconPump className='h-8 w-8 text-brand' />
          <h2 className="font-['Oswald'] text-3xl font-bold text-black md:text-4xl">
            Beyond the field
          </h2>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-2xl border border-black/10 p-6'>
            <div className="font-['Oswald'] text-lg font-bold text-black">
              The arts
            </div>
            <p className='mt-1 text-sm text-black/70'>
              Proud supporter of the Paramount Arts Center and organizations
              across the Ashland area.
            </p>
          </div>
          <div className='rounded-2xl border border-black/10 p-6'>
            <div className="font-['Oswald'] text-lg font-bold text-black">
              Scholarships
            </div>
            <p className='mt-1 text-sm text-black/70'>
              The Clark Family Scholarship and the Rodney Clark Memorial
              Scholarship invest in students across the region.
            </p>
            <Link
              to='/scholarship'
              className='mt-3 inline-block text-sm font-medium text-brand'
            >
              About the scholarships →
            </Link>
          </div>
          <div className='rounded-2xl border border-black/10 p-6'>
            <div className="font-['Oswald'] text-lg font-bold text-black">
              Your cause
            </div>
            <p className='mt-1 text-sm text-black/70'>
              Local team, league, or event? Tell us how we can help.
            </p>
            <Link
              to='/charity'
              className='mt-3 inline-block text-sm font-medium text-brand'
            >
              Request a donation →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
