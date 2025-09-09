// src/components/site/HeaderNav.tsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileMenuDrawer from "./MobileMenuDrawer";
import logoUrl from "@/assets/images/clarks-logo.png";
import HamburgerIcon from "@/assets/icons/hamburger.svg?react";

type HeaderNavProps = {
  showAccentBar?: boolean; // kept for compatibility
};

// Top-level links shown in the center of the desktop bar (About Us handled separately below)
const LINKS = ["Clarks Rewards", "Locations", "Food", "Car Wash"] as const;

function toPath(label: string) {
  return "/" + label.toLowerCase().replace(/\s+/g, "-");
}

export default function HeaderNav({ showAccentBar = true }: HeaderNavProps) {
  const [open, setOpen] = useState(false);

  // === ABOUT DROPDOWN (desktop) ===
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutBtnRef = useRef<HTMLButtonElement | null>(null);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);

  // Close About menu on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!aboutOpen) return;
      const t = e.target as Node;
      if (aboutBtnRef.current?.contains(t)) return;
      if (aboutMenuRef.current?.contains(t)) return;
      setAboutOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  // Drawer contains everything EXCEPT the center “Clarks Rewards” (visible on the mobile bar)
  // Replace single "About Us" with two explicit items for mobile: Our Story (existing About page) + Charity
  const drawerLinks = [
    { label: "Locations", href: toPath("Locations") },
    { label: "Food", href: toPath("Food") },
    { label: "Car Wash", href: toPath("Car Wash") },
    { label: "Our Story", href: toPath("About Us") },
    { label: "Charity", href: "/charity" },
  ];

  return (
    <header className="sticky top-0 z-header w-full">
      {/* White bar with rounded bottom (your original pill) */}
      <div className="bg-surface shadow-soft rounded-b-2xl">
        {/* --- MOBILE BAR (<= md) --- */}
        <div className="md:hidden h-16 grid grid-cols-[auto_1fr_auto] items-center px-3">
          {/* Left: Logo (flush to the left with small padding) */}
          <Link to="/" className="inline-flex items-center -ml-1" aria-label="Clarks Home">
            <img src={logoUrl} alt="Clark’s Pump-N-Shop" className="h-8 w-auto" />
          </Link>

          {/* Center: Clarks Rewards */}
          <NavLink
            to={toPath("Clarks Rewards")}
            className="justify-self-center truncate text-base font-semibold tracking-tight text-text"
          >
            Clarks Rewards
          </NavLink>

          {/* Right: Hamburger */}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="h-11 w-11 grid place-items-center rounded-md bg-transparent border-0 text-black hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <HamburgerIcon className="h-5 w-5" />
          </button>
        </div>

        {/* --- DESKTOP BAR (md+) — full-width 3-col grid to center links while pinning logo left --- */}
        <div className="hidden md:block">
          <div className="h-header grid items-center">
            {/* Use a full-width grid, not a centered .container, so the logo can sit against the window edge */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center h-header">
              {/* Col 1: Logo pinned to the far-left with a little breathing room */}
              <div className="pl-4">
                <Link to="/" className="inline-flex items-center" aria-label="Clarks Home">
                  <img src={logoUrl} alt="Clark’s Pump-N-Shop" className="h-9 w-auto" />
                </Link>
              </div>

              {/* Col 2: Nav perfectly centered in the bar */}
              <nav className="justify-self-center">
                <ul className="flex items-center gap-6 xl:gap-8">
                  {LINKS.map((label) => (
                    <li key={label}>
                      <NavLink
                        to={toPath(label)}
                        className={({ isActive }) =>
                          [
                            "inline-block text-nav text-center leading-none",
                            "py-2",
                            isActive ? "text-brand" : "text-text hover:text-brand",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                          ].join(" ")
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}

                  {/* About Us dropdown */}
                  <li className="relative">
                    <button
                      ref={aboutBtnRef}
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen((v) => !v)}
                      onMouseEnter={() => setAboutOpen(true)}
                      className="inline-flex items-center gap-1 py-2 text-nav leading-none text-text hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      About Us
                      <svg
                        aria-hidden
                        className={`h-3 w-3 transition-transform ${aboutOpen ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.172l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
                      </svg>
                    </button>

                    {/* Menu */}
                    <div
                      ref={aboutMenuRef}
                      onMouseLeave={() => setAboutOpen(false)}
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-lg ring-1 ring-black/5 transition-opacity ${
                        aboutOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                      role="menu"
                    >
                      <div className="py-1">
                        <NavLink
                          to={toPath("About Us")}
                          className={({ isActive }) =>
                            [
                              "block px-4 py-2 text-sm",
                              isActive ? "text-brand" : "text-black hover:bg-brand/5 hover:text-brand",
                            ].join(" ")
                          }
                          onClick={() => setAboutOpen(false)}
                          role="menuitem"
                        >
                          Our Story
                        </NavLink>
                        <NavLink
                          to="/charity"
                          className={({ isActive }) =>
                            [
                              "block px-4 py-2 text-sm",
                              isActive ? "text-brand" : "text-black hover:bg-brand/5 hover:text-brand",
                            ].join(" ")
                          }
                          onClick={() => setAboutOpen(false)}
                          role="menuitem"
                        >
                          Charity
                        </NavLink>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>

              {/* Col 3: Invisible logo clone as a dynamic spacer to keep the center truly centered */}
              <div className="pr-4 invisible select-none" aria-hidden="true">
                <img src={logoUrl} alt="" className="h-9 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer sheet */}
      <MobileMenuDrawer open={open} onClose={() => setOpen(false)} links={drawerLinks} />
    </header>
  );
}
