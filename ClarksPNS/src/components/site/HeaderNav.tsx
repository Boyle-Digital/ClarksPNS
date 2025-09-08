// src/components/site/HeaderNav.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileMenuDrawer from "./MobileMenuDrawer";
import logoUrl from "@/assets/images/clarks-logo.png";
import HamburgerIcon from "@/assets/icons/hamburger.svg?react";

type HeaderNavProps = {
  showAccentBar?: boolean; // kept for compatibility
};

const LINKS = ["Clarks Rewards", "Locations", "Food", "Car Wash", "About Us"] as const;

function toPath(label: string) {
  return "/" + label.toLowerCase().replace(/\s+/g, "-");
}

export default function HeaderNav({ showAccentBar = true }: HeaderNavProps) {
  const [open, setOpen] = useState(false);

  // Drawer contains everything EXCEPT the center “Clarks Rewards” (visible on the mobile bar)
  const drawerLinks = ["Locations", "Food", "Car Wash", "About Us"].map((label) => ({
    label,
    href: toPath(label),
  }));

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
                            "py-2", // vertical rhythm for easy centering
                            isActive ? "text-brand" : "text-text hover:text-brand",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                          ].join(" ")
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
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
