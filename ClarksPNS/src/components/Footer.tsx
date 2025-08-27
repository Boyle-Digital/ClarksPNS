// src/components/Footer.tsx
import React from "react";

// src/components/Footer.tsx (top)
import FacebookIcon from "@/assets/icons/facebook.svg?react";
import InstagramIcon from "@/assets/icons/instagram.svg?react";
import TikTokIcon from "@/assets/icons/tiktok.svg?react";
import YouTubeIcon from "@/assets/icons/youtube.svg?react";

type NavLink = { label: string; href: string };

const defaultNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Rewards", href: "/rewards" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

interface FooterProps {
  nav?: NavLink[];
  year?: number;
}

const Footer: React.FC<FooterProps> = ({ nav = defaultNav, year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-blue-900 text-white">
      {/* Top sections */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-col grid w/ vertical divider */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:divide-x md:divide-white/20 divide-y divide-white/20">
          {/* INFO & LOCATION — flush to the left edge of the screen */}
          <section
            className="
              py-8 md:py-10 md:col-span-6
              md:pr-[6%]
              items-start text-left
              /* pull left to cancel outer container padding */
              ml-0 sm:ml-0 md:ml-0
              -ml-4 sm:-ml-6 lg:-ml-8
              pl-4 sm:pl-6 lg:pl-8
            "
          >
            <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide mb-4">
              INFO &amp; LOCATION
            </h3>
            <address className="not-italic space-y-2 text-white/90 leading-relaxed">
              <p>
                <span className="font-semibold">Home Office:</span>{" "}
                101 Wheatley Rd, Ashland, KY 41101, United States
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a className="underline underline-offset-4 hover:text-white" href="tel:16063258536">
                  606-325-8536
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="mailto:brian.unrue@clarkspns.com"
                >
                  brian.unrue@clarkspns.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Office Hours:</span> Mon–Fri 8am – 5pm
              </p>
            </address>
          </section>

          {/* NAV LINKS — stays aligned in its half */}
          <nav
            className="
              py-8 md:py-10 md:col-span-6
              md:pl-[5%] md:pr-[6%]
              items-start text-left
            "
          >
            <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-white/90">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                    title={item.label}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Thin divider */}
      <div className="border-t border-white/20" />

      {/* Bottom bar: socials + copyright */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          {/* Socials */}
          <div className="flex items-center gap-5">
            {/* Force inner paths to use currentColor (white) */}
            <a
              href="https://www.tiktok.com/@clarkspns"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
              className="group text-white opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
              title="TikTok"
            >
              <TikTokIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/clarkspns"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="group text-white opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
              title="Instagram"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/@clarkspns"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="group text-white opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
              title="YouTube"
            >
              <YouTubeIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/clarkspns"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="group text-white opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
              title="Facebook"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/80 text-center md:text-right">
            © {year} Clark’s Pump-N-Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
