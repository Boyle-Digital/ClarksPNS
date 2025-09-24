// src/pages/Careers.tsx
import React from 'react'

import staffImage from '@/assets/images/StaffImage.jpg'

const APPLY_URL = 'https://apply.jobappnetwork.com/clarkspns/en'

const PerkCard = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <article className='rounded-2xl border border-black/10 bg-white p-6 shadow-sm'>
    <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold text-black">
      {title}
    </h3>
    <div className='prose prose-neutral mt-2 max-w-none text-black/80'>
      {children}
    </div>
  </article>
)

const Testimonial = ({
  quote,
  name,
  role
}: {
  quote: string
  name: string
  role: string
}) => (
  <figure className='rounded-2xl border border-black/10 bg-white p-6 shadow-sm'>
    <blockquote className='text-black/80 italic'>“{quote}”</blockquote>
    <figcaption className='mt-3 text-sm text-black/60'>
      <span className='font-medium text-black'>{name}</span> • {role}
    </figcaption>
  </figure>
)

export default function Careers () {
  return (
    <main id='careers' className='flex flex-col -mt-[16px]'>
      {/* HERO */}
      <section className='relative isolate text-white bg-gradient-to-br from-brand to-sky-700'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.08]'
          style={{
            background:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.15) 0 2px, transparent 2px 22px)'
          }}
        />
        <div className='container mx-auto grid md:grid-cols-12 gap-8 px-6 md:px-10 py-14 md:py-16 items-center relative z-10'>
          <div className='md:col-span-8'>
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-white/80">
              Careers at Clark’s
            </p>
            <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
              Join the Clark’s family.
            </h1>
            <p className='mt-3 text-white/90 max-w-prose'>
              At Clark’s Pump-N-Shop, you’re more than a team member—you’re part
              of a community. We take pride in friendly service, honest work,
              and supporting the neighborhoods we call home. Ready to grow with
              us?
            </p>

            <div className='mt-6 flex flex-wrap gap-3'>
              <a
                href={APPLY_URL}
                target='_blank'
                rel='noreferrer'
                className='rounded-2xl px-5 py-2.5 bg-white text-brand hover:bg-white/90 shadow-md'
              >
                View Open Positions
              </a>
              <a
                href='#why-clarks'
                className='rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10'
              >
                Why Work Here
              </a>
            </div>
          </div>

          <div className='md:col-span-4 md:flex md:justify-end pr-6'>
            <div className='rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-sm p-3'>
              <div className='max-w-xs md:max-w-sm rounded-xl overflow-hidden'>
                <img
                  src={staffImage}
                  alt='Staff member'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CLARK'S */}
      <section id='why-clarks' className='py-12 md:py-16 bg-sky-50'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
              People First
            </p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Build a career you’re proud of
            </h2>
            <p className='mt-3 text-black/70'>
              We believe great service starts with taking care of our own. From
              day one, we invest in training, mentorship, and opportunities to
              move up—so you can grow with Clark’s.
            </p>
          </div>

          <div className='mt-8 md:mt-10 grid md:grid-cols-3 gap-6 md:gap-8'>
            <PerkCard title='Family Culture'>
              <p>
                Friendly teams, supportive managers, and a company that treats
                you with respect. We celebrate wins and show up for one another.
              </p>
            </PerkCard>
            <PerkCard title='Flexible Schedules'>
              <p>
                Full-time and part-time options, multiple shifts, and stores
                across Kentucky, Ohio, & West Virginia—work where and when it
                fits your life.
              </p>
            </PerkCard>
            <PerkCard title='Grow With Us'>
              <p>
                Clear paths into shift lead, assistant manager, and store
                manager roles—with training that helps you get there.
              </p>
            </PerkCard>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className='py-12 md:py-16 bg-white border-y border-sky-100'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='max-w-3xl'>
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">
              In Their Words
            </p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              What our team says
            </h2>
          </div>

          <div className='mt-8 grid md:grid-cols-3 gap-6 md:gap-8'>
            <Testimonial
              quote='My manager helped me grow from cashier to shift lead in under a year.'
              name='Tiana'
              role='Shift Lead, Lexington KY'
            />
            <Testimonial
              quote='Flexible hours made it easy to balance school and work.'
              name='Evan'
              role='Team Member, Ashland KY'
            />
            <Testimonial
              quote='It really does feel like family—we look out for each other and our guests.'
              name='Marcus'
              role='Store Manager, Ironton OH'
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='py-10 md:py-12 bg-sky-50'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='text-center'>
            <a
              href={APPLY_URL}
              target='_blank'
              rel='noreferrer'
              className='
                inline-flex items-center justify-center
                rounded-2xl px-8 py-3
                min-w-[200px] md:min-w-[260px]
                text-white bg-brand hover:bg-brand/90
                transition shadow-md text-lg font-medium
              '
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
