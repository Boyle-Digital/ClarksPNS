// src/components/site/HeaderNav.tsx
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import MobileMenuDrawer from './MobileMenuDrawer'
import logoUrl from '@/assets/images/clarks-logo.png'
import rewardsLogoUrl from '@/assets/images/Clarks-PNS-Main-Rewards-Logo-Cropped.png'
import HamburgerIcon from '@/assets/icons/hamburger.svg?react'

type HeaderNavProps = {
  showAccentBar?: boolean
}

function toPath (label: string) {
  return '/' + label.toLowerCase().replace(/\s+/g, '-')
}

export default function HeaderNav ({ showAccentBar = true }: HeaderNavProps) {
  const [open, setOpen] = useState(false)

  // === ABOUT DROPDOWN (desktop) ===
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutBtnRef = useRef<HTMLButtonElement | null>(null)
  const aboutMenuRef = useRef<HTMLDivElement | null>(null)

  // === LOCATIONS DROPDOWN (desktop) ===
  const [locOpen, setLocOpen] = useState(false)
  const locBtnRef = useRef<HTMLButtonElement | null>(null)
  const locMenuRef = useRef<HTMLDivElement | null>(null)

  // Debounced close
  const closeTimers = useRef<{
    about: number | ReturnType<typeof setTimeout> | null
    loc: number | ReturnType<typeof setTimeout> | null
  }>({
    about: null,
    loc: null
  })
  const CLOSE_DELAY = 200
  const cancelClose = (w: 'about' | 'loc') => {
    const t = closeTimers.current[w]
    if (t) {
      clearTimeout(t as number)
      closeTimers.current[w] = null
    }
  }
  const scheduleClose = (w: 'about' | 'loc') => {
    cancelClose(w)
    closeTimers.current[w] = setTimeout(() => {
      if (w === 'about') setAboutOpen(false)
      else setLocOpen(false)
      closeTimers.current[w] = null
    }, CLOSE_DELAY)
  }

  // Outside click / ESC
  useEffect(() => {
    function onDocClick (e: MouseEvent) {
      const t = e.target as Node
      if (aboutOpen) {
        if (
          !aboutBtnRef.current?.contains(t) &&
          !aboutMenuRef.current?.contains(t)
        )
          setAboutOpen(false)
      }
      if (locOpen) {
        if (!locBtnRef.current?.contains(t) && !locMenuRef.current?.contains(t))
          setLocOpen(false)
      }
    }
    function onKey (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAboutOpen(false)
        setLocOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [aboutOpen, locOpen])

  const location = useLocation()
  useEffect(() => {
    setAboutOpen(false)
    setLocOpen(false)
  }, [location.pathname])

  const mobileGroups = [
    {
      type: 'link' as const,
      label: 'Clarks Rewards',
      href: toPath('Clarks Rewards')
    },
    {
      type: 'group' as const,
      label: 'Locations',
      items: [
        { label: 'All Locations', href: toPath('Locations') },
        { label: 'Car Wash', href: toPath('Car Wash') }
      ]
    },
    { type: 'link' as const, label: 'Food', href: toPath('Food') },
    { type: 'link' as const, label: 'Careers', href: toPath('Careers') },
    {
      type: 'group' as const,
      label: 'About Us',
      items: [
        { label: 'Our Story', href: toPath('About Us') },
        { label: 'Clarks Charity', href: '/charity' },
        { label: 'Sponsorships', href: '/sponsorship' }
      ]
    }
  ]

  return (
    <header className='sticky top-0 z-header w-full'>
      <div className='bg-surface shadow-soft rounded-b-2xl'>
        {/* --- MOBILE BAR (<= md) --- */}
        <div className='md:hidden h-16 grid grid-cols-[auto_1fr_auto] items-center px-3'>
          {/* Logo on left */}
          <Link
            to='/'
            className='inline-flex items-center -ml-1'
            aria-label='Clarks Home'
          >
            <img
              src={logoUrl}
              alt='Clark’s Pump-N-Shop'
              className='h-9 w-auto'
            />
          </Link>
          {/* empty center cell */}
          <div />
          {/* hamburger on right */}
          <button
            aria-label='Open menu'
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className='h-11 w-11 grid place-items-center rounded-md bg-transparent border-0 text-black hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
          >
            <HamburgerIcon className='h-5 w-5' />
          </button>
        </div>

        {/* --- DESKTOP BAR (md+) --- */}
        <div className='hidden md:block'>
          <div className='h-header grid items-center'>
            <div className='grid grid-cols-[auto_1fr_auto] items-center h-header'>
              {/* Left logo larger */}
              <div className='pl-8'>
                <Link
                  to='/'
                  className='inline-flex items-center'
                  aria-label='Clarks Home'
                >
                  <img
                    src={logoUrl}
                    alt='Clark’s Pump-N-Shop'
                    className='h-11 w-auto'
                  />
                </Link>
              </div>

              {/* Center nav — Rewards → Locations▼ → Food → Careers → About▼ */}
              <nav className='justify-self-center'>
                <ul className='flex items-center gap-6 xl:gap-8'>
                  <li>
                    <NavLink
                      to={toPath('Clarks Rewards')}
                      className={({ isActive }) =>
                        [
                          'inline-block text-nav text-center leading-none py-2',
                          isActive
                            ? 'text-brand'
                            : 'text-text hover:text-brand',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                        ].join(' ')
                      }
                    >
                      Clarks Rewards
                    </NavLink>
                  </li>

                  {/* Locations dropdown */}
                  <li
                    className='relative'
                    onMouseEnter={() => {
                      cancelClose('loc')
                      setLocOpen(true)
                    }}
                    onMouseLeave={() => scheduleClose('loc')}
                  >
                    <button
                      ref={locBtnRef}
                      type='button'
                      aria-haspopup='menu'
                      aria-expanded={locOpen}
                      onClick={() => setLocOpen(v => !v)}
                      className='inline-flex items-center gap-1 py-2 text-nav leading-none text-text hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                      onFocus={() => {
                        cancelClose('loc')
                        setLocOpen(true)
                      }}
                      onBlur={() => scheduleClose('loc')}
                    >
                      Locations
                      <svg
                        aria-hidden
                        className={`h-3 w-3 transition-transform ${
                          locOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M5.23 7.21a.75.75 0 011.06.02L10 11.172l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z' />
                      </svg>
                    </button>

                    <div
                      ref={locMenuRef}
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5 transition-[opacity,transform] duration-100 ${
                        locOpen
                          ? 'opacity-100 pointer-events-auto'
                          : 'opacity-0 pointer-events-none'
                      }`}
                      role='menu'
                      onMouseEnter={() => {
                        cancelClose('loc')
                        setLocOpen(true)
                      }}
                      onMouseLeave={() => scheduleClose('loc')}
                    >
                      <div className='py-1'>
                        <NavLink
                          to={toPath('Locations')}
                          className={({ isActive }) =>
                            [
                              'block px-4 py-2 text-sm',
                              isActive
                                ? 'text-brand'
                                : 'text-black hover:bg-brand/5 hover:text-brand'
                            ].join(' ')
                          }
                          onClick={() => setLocOpen(false)}
                          role='menuitem'
                        >
                          All Locations
                        </NavLink>
                        <NavLink
                          to={toPath('Car Wash')}
                          className={({ isActive }) =>
                            [
                              'block px-4 py-2 text-sm',
                              isActive
                                ? 'text-brand'
                                : 'text-black hover:bg-brand/5 hover:text-brand'
                            ].join(' ')
                          }
                          onClick={() => setLocOpen(false)}
                          role='menuitem'
                        >
                          Car Wash
                        </NavLink>
                      </div>
                    </div>
                  </li>

                  <li>
                    <NavLink
                      to={toPath('Food')}
                      className={({ isActive }) =>
                        [
                          'inline-block text-nav text-center leading-none py-2',
                          isActive
                            ? 'text-brand'
                            : 'text-text hover:text-brand',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                        ].join(' ')
                      }
                    >
                      Food
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={toPath('Careers')}
                      className={({ isActive }) =>
                        [
                          'inline-block text-nav text-center leading-none py-2',
                          isActive
                            ? 'text-brand'
                            : 'text-text hover:text-brand',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                        ].join(' ')
                      }
                    >
                      Careers
                    </NavLink>
                  </li>

                  {/* About dropdown */}
                  <li
                    className='relative'
                    onMouseEnter={() => {
                      cancelClose('about')
                      setAboutOpen(true)
                    }}
                    onMouseLeave={() => scheduleClose('about')}
                  >
                    <button
                      ref={aboutBtnRef}
                      type='button'
                      aria-haspopup='menu'
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen(v => !v)}
                      className='inline-flex items-center gap-1 py-2 text-nav leading-none text-text hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                      onFocus={() => {
                        cancelClose('about')
                        setAboutOpen(true)
                      }}
                      onBlur={() => scheduleClose('about')}
                    >
                      About Us
                      <svg
                        aria-hidden
                        className={`h-3 w-3 transition-transform ${
                          aboutOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M5.23 7.21a.75.75 0 011.06.02L10 11.172l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z' />
                      </svg>
                    </button>

                    <div
                      ref={aboutMenuRef}
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5 transition-[opacity,transform] duration-100 ${
                        aboutOpen
                          ? 'opacity-100 pointer-events-auto'
                          : 'opacity-0 pointer-events-none'
                      }`}
                      role='menu'
                      onMouseEnter={() => {
                        cancelClose('about')
                        setAboutOpen(true)
                      }}
                      onMouseLeave={() => scheduleClose('about')}
                    >
                      <div className='py-1'>
                        <NavLink
                          to={toPath('About Us')}
                          className={({ isActive }) =>
                            [
                              'block px-4 py-2 text-sm',
                              isActive
                                ? 'text-brand'
                                : 'text-black hover:bg-brand/5 hover:text-brand'
                            ].join(' ')
                          }
                          onClick={() => setAboutOpen(false)}
                          role='menuitem'
                        >
                          Our Story
                        </NavLink>
                        <NavLink
                          to='/charity'
                          className={({ isActive }) =>
                            [
                              'block px-4 py-2 text-sm',
                              isActive
                                ? 'text-brand'
                                : 'text-black hover:bg-brand/5 hover:text-brand'
                            ].join(' ')
                          }
                          onClick={() => setAboutOpen(false)}
                          role='menuitem'
                        >
                          Clarks Charity
                        </NavLink>
                        <NavLink
                          to='/sponsorship'
                          className={({ isActive }) =>
                            [
                              'block px-4 py-2 text-sm',
                              isActive
                                ? 'text-brand'
                                : 'text-black hover:bg-brand/5 hover:text-brand'
                            ].join(' ')
                          }
                          onClick={() => setAboutOpen(false)}
                          role='menuitem'
                        >
                          Sponsorship
                        </NavLink>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>

              {/* Right Rewards logo + Sign In/Up */}
              <div className='pr-10'>
                <div className='inline-flex flex-col items-start'>
                  <Link
                    to={toPath('Clarks Rewards')}
                    className='inline-flex items-center ml-1'
                    aria-label='Clarks Rewards'
                  >
                    <img
                      src={rewardsLogoUrl}
                      alt='Clarks Rewards'
                      className='h-8 w-auto' // slightly smaller
                    />
                  </Link>
                  <a
                    href='https://clarkspumpnshop.myguestaccount.com/en-us/guest/enroll?card-template=JTIldXJsLXBhcmFtLWFlcy1rZXklYzR0UXJrdXQzZmVRb1laWCU3WVNiTW1LeDN4TmhrRGdGV3dCMmxPMD0%3D&template=0'
                    className='mt-0.5 text-xs font-semibold text-text underline underline-offset-2 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded ml-12'
                  >
                    Sign In / Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileMenuDrawer
        open={open}
        onClose={() => setOpen(false)}
        groups={mobileGroups}
      />
    </header>
  )
}
