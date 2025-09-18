// src/pages/CarWash.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function CarWash() {
  return (
    <main className="w-full overflow-x-clip bg-white">
      {/* === Hero === */}
      <section
        aria-label="Clarks Car Wash"
        className="
          relative isolate z-0 w-full
          -mt-[16px] md:-mt-[20px]
          bg-gradient-to-br from-white via-white to-neutral-50
        "
      >
        {/* Decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "repeating-linear-gradient(135deg, #0ea5e9 0 2px, transparent 2px 24px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-40 rounded-[64px] blur-3xl bg-brand/10"
        />

        <div className="relative z-[1] pt-[16px] md:pt-[20px]">
          <div className="container mx-auto px-6 md:px-10">
            {/* ↓ reduced height here */}
            <div className="flex min-h-[40vh] md:min-h-[50vh] items-center">
              <div className="inline-flex flex-col gap-4 md:gap-6 max-w-[760px]">
                <h1 className="font-['Oswald'] font-bold text-black text-4xl md:text-6xl leading-tight">
                  Clarks Car Wash
                </h1>
                <p className="text-black/70 text-lg md:text-2xl max-w-prose">
                  Fast lanes. Gentle clean. Showroom shine—every time.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="#packages"
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 text-base md:text-lg"
                  >
                    View Packages
                  </a>
                  <Link
                    to="/locations?amenity=carwash"
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-black/90 bg-neutral-100 hover:bg-neutral-200 transition-all text-base md:text-lg"
                  >
                    Find a Car Wash Near You
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 md:h-14 w-full bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* === Keep It Clean Club (moved here, right after hero) === */}
      <section
        id="club"
        aria-label="Keep It Clean Club"
        className="py-12 md:py-20 bg-neutral-50 border-y border-black/10"
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            <div className="order-2 lg:order-1">
              <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
                Keep It Clean Club
              </h2>
              <p className="mt-3 text-black/70 text-base md:text-lg">
                Go unlimited, manage your plan, and keep that glossy finish—always.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="https://checkout.myclarkspns.com/checkout/9fe66ecf-bb7f-46a3-80e5-7098b22c3d76"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/25"
                >
                  Sign up
                </a>
                <a
                  href="https://checkout.myclarkspns.com/account/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-white border border-black/10 hover:bg-neutral-100 text-black/90 transition-all"
                >
                  Log in
                </a>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-black/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Wash as often as you like
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Manage plan online
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Fast lane access
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Cancel anytime
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-[520px]">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-black/10 h-32 bg-gradient-to-br from-white to-neutral-50"
                    >
                      <div className="h-full w-full rounded-2xl bg-brand/5" />
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[32px] bg-brand/10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Benefits === */}
      <section aria-label="Car Wash Benefits" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Why wash at Clarks
            </h2>
            <p className="mt-2 text-black/70 text-base md:text-lg">
              Pro formulas, soft-touch materials, and a spotless finish—fast.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-black/10 p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="mb-4">
                  <span
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10"
                  >
                    <b className="text-xl">{b.icon}</b>
                  </span>
                </div>
                <h3 className="font-['Oswald'] text-xl font-bold text-black">{b.title}</h3>
                <p className="mt-2 text-black/70 text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === Packages / Pricing === */}
      <section id="packages" aria-label="Wash Packages" className="py-12 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Pick your perfect wash
            </h2>
            <p className="mt-2 text-black/70 text-base md:text-lg">
              Pay per wash or go unlimited with a monthly plan.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <article
                key={p.name}
                className={`relative rounded-2xl border p-6 bg-white ${
                  p.featured
                    ? "border-brand ring-2 ring-brand/25 shadow-xl"
                    : "border-black/10 hover:shadow-md transition-shadow"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 right-4 rounded-lg bg-brand text-white text-xs font-semibold px-3 py-1 shadow-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="font-['Oswald'] text-2xl font-bold text-black">{p.name}</h3>
                <p className="mt-1 text-black/60 text-sm">{p.tagline}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-black">${p.price}</div>
                  <div className="text-black/60 text-sm">{p.freq}</div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-black/80">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#join"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white bg-brand hover:bg-brand/90 transition-all"
                  >
                    {p.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs text-black/60">
            * Unlimited plans billed monthly. Manage anytime in the app.
          </p>
        </div>
      </section>

      {/* === NEW: Gift Cards === */}
      <section id="giftcards" aria-label="Car Wash Gift Cards" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Gift cards
            </h2>
            <p className="mt-2 text-black/70 text-base md:text-lg">
              Give the gift of a showroom shine. Digital delivery through myclarkspns.com.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-black/10 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="font-['Oswald'] text-xl font-bold text-black">$50 Gift Card</h3>
              <p className="mt-2 text-sm text-black/70">Great for a few quick washes.</p>
              <a
                href="https://checkout.myclarkspns.com/checkout/buy/33396"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white bg-brand hover:bg-brand/90 transition-all"
              >
                Buy $50 Gift Card
              </a>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="font-['Oswald'] text-xl font-bold text-black">$150 Gift Card</h3>
              <p className="mt-2 text-sm text-black/70">Perfect for gifting a season of shine.</p>
              <a
                href="https://checkout.myclarkspns.com/checkout/buy/33397"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white bg-brand hover:bg-brand/90 transition-all"
              >
                Buy $150 Gift Card
              </a>
            </article>
          </div>

          <p className="mt-6 text-xs text-black/60">
            Gift cards are redeemable at participating locations and online where available.
          </p>
        </div>
      </section>

      

      {/* === Membership / Join CTA (kept from your original) === */}
      <section
        id="join"
        aria-label="Car Wash Membership"
        className="py-12 md:py-20 bg-neutral-50 border-b border-black/10"
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            <div className="order-2 lg:order-1">
              <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
                Go Unlimited. Go Shine.
              </h2>
              <p className="mt-3 text-black/70 text-base md:text-lg">
                Wash as often as you want, cancel anytime.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-lg shadow-brand/25"
                >
                  See Plans
                </a>
                <Link
                  to="/clarks-rewards#join"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-white border border-black/10 hover:bg-neutral-100 text-black/90 transition-all"
                >
                  Join Rewards
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-black/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  License plate recognition (at participating locations)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Towel &amp; vacuums available at select sites
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  Family plan add-ons
                </li>
              </ul>
            </div>

            {/* Visual-only column */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-[520px]">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-black/10 h-32 bg-gradient-to-br from-white to-neutral-50"
                    >
                      <div className="h-full w-full rounded-2xl bg-brand/5" />
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[32px] bg-brand/10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section aria-label="Car Wash FAQ" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-black/70 text-base md:text-lg">
              Quick answers about washes, memberships, and locations.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-white p-6 border border-black/10 open:shadow-md"
              >
                <summary className="cursor-pointer list-none font-['Oswald'] text-lg font-bold text-black flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-black/70 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const BENEFITS = [
  { icon: "✨", title: "Showroom shine", desc: "Poly sealant + spot-free rinse for a glossy, protected finish." },
  { icon: "🫧", title: "Gentle clean", desc: "Soft-touch materials and pH-balanced soaps safe for clear coat." },
  { icon: "⚡", title: "Fast lanes", desc: "In-and-out convenience designed for busy mornings and quick stops." },
  { icon: "💧", title: "Spot-free dry", desc: "Filtered water + high-velocity air for a streak-free result." },
];

const PACKAGES = [
  {
    name: "Basic",
    tagline: "Quick clean & dry",
    price: 8,
    freq: "per wash",
    features: ["Foam bath", "Soft-touch wash", "Spot-free rinse", "Power dry"],
    cta: "Get Basic",
  },
  {
    name: "Premium",
    tagline: "Shine + protect",
    price: 14,
    freq: "per wash",
    features: ["Everything in Basic", "Triple-foam polish", "Wheel clean", "Clear coat protectant"],
    cta: "Choose Premium",
    featured: true,
  },
  {
    name: "Ultimate",
    tagline: "Maximum gloss",
    price: 20,
    freq: "per wash",
    features: ["Everything in Premium", "Ceramic seal", "Undercarriage wash", "Tire shine"],
    cta: "Go Ultimate",
  },
];

// Keeping STEPS for potential future use
const STEPS = [
  { title: "Choose your wash", desc: "Pick at the kiosk or in the app—Rewards members save automatically." },
  { title: "Roll through", desc: "Follow the guide rails and neutral—our team handles the rest." },
  { title: "Shine & go", desc: "Spot-free dry, optional towel bays, and you’re on your way." },
];

const FAQS = [
  {
    q: "Do you offer unlimited plans?",
    a: "Yes. Choose any package and switch to unlimited monthly billing anytime in the app. Cancel anytime.",
  },
  {
    q: "Is the wash safe for my vehicle?",
    a: "Our equipment and soaps are designed for modern clear coats, with soft-touch materials and filtered water.",
  },
  {
    q: "Where are wash locations?",
    a: "Use the Locations page or the app to find participating car wash sites near you.",
  },
];
