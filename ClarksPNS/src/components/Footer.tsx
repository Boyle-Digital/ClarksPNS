import React from "react";

// SVG imports via Vite + SVGR
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

const Footer: React.FC<FooterProps> = ({
  nav = defaultNav,
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="bg-brand text-text-onBrand">
      {/* Top sections */}
      <div className="container max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-text-onBrand/20">
          {/* INFO & LOCATION */}
          <section className="py-8 md:py-12 md:col-span-6 md:pr-12 text-left">
            <h3 className="text-h3 font-bold tracking-wide mb-4">
              INFO &amp; LOCATION
            </h3>
            <address className="not-italic space-y-2 text-text-onBrand/90 leading-relaxed">
              <p>
                <span className="font-semibold">Home Office:</span>{" "}
                101 Wheatley Rd, Ashland, KY 41101, United States
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:text-text-onBrand"
                  href="tel:16063258536"
                >
                  606-325-8536
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:text-text-onBrand"
                  href="mailto:contactus@clarkspns.com"
                >
                  contactus@clarkspns.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Office Hours:</span> Mon–Fri 8am
                – 5pm
              </p>
            </address>
          </section>

          {/* NAV LINKS */}
          <nav className="py-8 md:py-12 md:col-span-6 md:pl-12 text-left">
            <h3 className="text-h3 font-bold tracking-wide mb-4">Navigation</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-text-onBrand/90">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-text-onBrand transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-onBrand/20" />

      {/* Bottom bar */}
      <div className="container max-w-screen-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          {/* Socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.tiktok.com/@clarkspns"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
              className="group opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
            >
              <TikTokIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/clarkspns"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="group opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/@clarkspns"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="group opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
            >
              <YouTubeIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/clarkspns"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="group opacity-90 hover:opacity-100 transition-opacity [&_*]:fill-current [&_*]:stroke-current"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-onBrand/80 text-center md:text-right">
            © {year} Boyle Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
