// Footer — night-mode rebuild. Ghost wordmark, four link columns,
// Tri-State pride line, socials, and the fine print.
import { Link } from 'react-router-dom'

import FacebookIcon from '@/assets/icons/facebook.svg?react'
import InstagramIcon from '@/assets/icons/instagram.svg?react'
import TikTokIcon from '@/assets/icons/tiktok.svg?react'
import YouTubeIcon from '@/assets/icons/youtube.svg?react'
import logoWhite from '@/assets/images/Clarks PNS Logo Updated all white.png'

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Find us',
    links: [
      { label: 'All locations', href: '/locations' },
      { label: 'Beer Cave finder', href: '/beer-cave' },
      { label: 'Fleet & diesel', href: '/fleet' },
      { label: 'Car wash', href: '/car-wash' }
    ]
  },
  {
    title: 'Food',
    links: [
      { label: 'All kitchens', href: '/food' },
      { label: 'Krispy Krunchy', href: '/food/krispy-krunchy' },
      { label: 'Hangar 54 Pizza', href: '/food/hangar-54' },
      { label: 'Clark’s Café', href: '/food/clarks-cafe' }
    ]
  },
  {
    title: 'Rewards',
    links: [
      { label: 'Clarks Rewards', href: '/clarks-rewards' },
      { label: 'Keep It Clean Club', href: '/car-wash#club' },
      { label: 'Gift cards', href: '/car-wash#giftcards' },
      {
        label: 'Fleet card',
        href: 'https://www.marathonfleetcard.com/associations/?cc=M00528'
      }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Our story', href: '/about-us' },
      { label: 'Sports & community', href: '/community' },
      { label: 'Scholarships', href: '/scholarship' },
      { label: 'Charity', href: '/charity' },
      { label: 'Careers', href: '/careers' }
    ]
  }
]

const SOCIALS = [
  { Icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@clarkspns' },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/clarkspns' },
  { Icon: YouTubeIcon, label: 'YouTube', href: 'https://www.youtube.com/@clarkspns' },
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/clarkspns' }
]

export default function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer id='footer-contact' className='band-night brand-stripes relative overflow-hidden text-white'>
      <div aria-hidden className='ghost-word ghost-word--light text-center'>
        CLARK’S
      </div>

      <div className='container relative mx-auto px-6 pt-14 md:px-10 md:pt-20'>
        {/* Top: logo + promise */}
        <div className='flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end'>
          <div>
            <img src={logoWhite} alt="Clark's Pump-N-Shop" className='h-12 w-auto md:h-14' />
            <p className='mt-4 font-display text-3xl leading-none md:text-4xl'>
              Return. Refresh. Refuel.
            </p>
            <p className='mt-2 text-white/70'>
              Family owned since 1976 — at home across Kentucky, Ohio &
              West Virginia.
            </p>
          </div>
          <div className='flex items-center gap-5'>
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target='_blank'
                rel='noreferrer'
                className='grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 transition-colors hover:border-white/40 hover:bg-white/10 [&_*]:fill-current [&_*]:stroke-current'
              >
                <Icon className='h-5 w-5' />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns + office */}
        <div className='grid grid-cols-2 gap-10 py-10 md:grid-cols-5'>
          {COLUMNS.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className='font-display text-lg tracking-[0.08em] text-white'>
                {col.title.toUpperCase()}
              </h3>
              <ul className='mt-3 space-y-2 text-sm text-white/70'>
                {col.links.map(l => (
                  <li key={l.href}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} target='_blank' rel='noreferrer' className='transition-colors hover:text-white'>
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.href} className='transition-colors hover:text-white'>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className='col-span-2 not-italic md:col-span-1'>
            <h3 className='font-display text-lg tracking-[0.08em] text-white'>
              HOME OFFICE
            </h3>
            <div className='mt-3 space-y-2 text-sm text-white/70'>
              <p>
                101 Wheatley Rd
                <br />
                Ashland, KY 41101
              </p>
              <p>
                <a href='tel:16063272775' className='transition-colors hover:text-white'>
                  606-327-2775
                </a>
              </p>
              <p>
                <a href='mailto:contactus@clarkspns.com' className='transition-colors hover:text-white'>
                  contactus@clarkspns.com
                </a>
              </p>
              <p>Mon–Fri 8am–5pm</p>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='relative border-t border-white/10 bg-[#0b153a]/60'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/60 md:flex-row md:px-10'>
          <p className='font-display text-sm tracking-[0.25em] text-white/50'>
            KY · OH · WV
          </p>
          <p className='text-center md:text-right'>
            © {year} Clark’s Pump-N-Shop. All rights reserved ·{' '}
            <a href='/terms' className='underline transition-colors hover:text-white'>
              Terms
            </a>{' '}
            ·{' '}
            <a href='/privacy' className='underline transition-colors hover:text-white'>
              Privacy
            </a>{' '}
            · Website by{' '}
            <a
              href='https://www.boyledigital.com'
              target='_blank'
              rel='noopener noreferrer'
              className='underline transition-colors hover:text-white'
            >
              Boyle Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
