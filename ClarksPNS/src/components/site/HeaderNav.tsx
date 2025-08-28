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
          {/* Left: Logo */}
          <Link to="/" className="inline-flex items-center" aria-label="Clarks Home">
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
            className="
    h-11 w-11            /* 44×44 tap target */
    grid place-items-center
    rounded-md
    bg-transparent border-0  /* <— remove the box */
    text-black
    hover:opacity-80
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-black/30
    focus-visible:ring-offset-2 focus-visible:ring-offset-white
  "
          >
            <HamburgerIcon className="h-5 w-5" />
          </button>
        </div>

        {/* --- DESKTOP BAR (md+) — restored 6 equal columns --- */}
        <div className="hidden md:block">
          <div className="h-header grid items-center">
            <div className="container max-w-screen-2xl">
              <div className="grid grid-cols-6 place-items-center gap-2">
                {/* Col 1: Logo */}
                <Link to="/" className="inline-flex items-center" aria-label="Clarks Home">
                  <img src={logoUrl} alt="Clark’s Pump-N-Shop" className="h-9 w-auto" />
                </Link>

                {/* Cols 2..6: Nav links */}
                {LINKS.map((label) => (
                  <NavLink
                    key={label}
                    to={toPath(label)}
                    className={({ isActive }) =>
                      [
                        "inline-block text-nav text-center",
                        "py-2", // vertical rhythm
                        isActive ? "text-brand" : "text-text hover:text-brand",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      ].join(" ")
                    }
                  >
                    {label}
                  </NavLink>
                ))}
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
