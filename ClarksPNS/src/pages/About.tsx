// src/pages/About.tsx
import React from 'react'

// --- About.tsx (imports to add) ---
import brentImg from "@/assets/images/staff/Brent_Clark_270_270.webp";
import brianImg from "@/assets/images/staff/Brian_Unrue_Director_of_Operations_270_270.webp";
import michelleImg from "@/assets/images/staff/Michelle_Gibson_Human_Resources_270_270.webp";
import markImg from "@/assets/images/staff/Mark_McCarty_Category_Manager_270_270.webp";
import jessicaImg from "@/assets/images/staff/Jessica_Russell_District_Supervisor_270_270.webp";
import justinImg from "@/assets/images/staff/Justin_Gibson_Pricing_and_Environmental_270_270.webp";
import rickImg from "@/assets/images/staff/Rick_Clark.webp"
import mikeImg from "@/assets/images/staff/Mike_McCann.webp"


// Founder / historic context & hero bg options
import johnConstruction from "@/assets/images/staff/John+W+Clark+in+from+of+construction+at+the+new+Clark's+Pump-N-Shop+in+Jackson,+OH.webp";
import foundersGroup from "@/assets/images/staff/Rick+Clark+John+W+Clark+and+Brent+Clark+in+29th+Street+Marathon+in+Ashland+KY.webp";
import westwoodHero from "@/assets/images/staff/Original+Clark's+Pump-N-Shop+location+in+Westwood,+KY_.webp";


type Person = {
  name: string
  title?: string
  img?: string // optional headshot (URL or imported asset)
}

// Founders box
const FOUNDERS: Person[] = [
  { name: "John W. Clark", title: "Founder", img: johnConstruction }, // contextual founder image
  { name: "Rick Clark", title: "Owner" , img: rickImg},
  { name: "Brent Clark", title: "Owner", img: brentImg }
];

// Leadership grid
const LEADERSHIP: Person[] = [
  { name: "Brent Clark", title: "Owner", img: brentImg },
  { name: "Rick Clark", title: "Owner" , img: rickImg},
  { name: "Brian Unrue", title: "Director of Operations", img: brianImg },
  { name: "Michelle Gibson", title: "Director of Human Resources", img: michelleImg },
  { name: "Mark McCarty", title: "Director of Category Management", img: markImg },
  { name: "Mike McCann", title: "CFO" , img: mikeImg},
  // Your file says “District Supervisor”, your copy says “Director of Food Service”.
  // Keeping the page title; feel free to change to match HR’s official title.
  { name: "Jessica Russell", title: "Director of Food Service", img: jessicaImg },
  { name: "Justin Gibson", title: "Fuel Pricing", img: justinImg }
];

export default function About() {
  return (
    <main className="w-full overflow-x-clip">
      {/* HERO — brand-forward, readable */}
      {/* HERO — historic Westwood image background */}
<section
  aria-label="About Clark’s Pump-N-Shop"
  className="relative isolate -mt-[16px] md:-mt-[20px]"
>  <div className="relative w-full overflow-hidden">
    {/* Background image */}
    <img
  src={westwoodHero}
  alt="Original Clark’s Pump-N-Shop location in Westwood, KY"
  className="absolute inset-0 h-full w-full object-cover"
  style={{ objectPosition: '50% 80%' }} // X% Y%  ← lower Y = pan up, higher Y = pan down
/>

    {/* Overlay for legibility */}
    <div className="absolute inset-0 bg-black/40" />

    <div className="relative z-[1]">
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 text-white">
        <div className="max-w-3xl">
          <p className="uppercase tracking-widest text-white/80 text-xs md:text-sm">About</p>
          <h1 className="font-['Oswald'] text-4xl md:text-5xl font-bold leading-tight">
            Family owned. Community focused. Since 1976.
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            What began as one store in Westwood, Kentucky has grown into a regional network
            serving communities across Kentucky, Ohio, and West Virginia—still run by the Clark family.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {[
              { href: '#story', label: 'Our Story' },
              { href: '#leadership', label: 'Leadership' },
              { href: '#footprint', label: 'Our Footprint' },
              { href: '#careers', label: 'Careers' },
              { href: '#community', label: 'Community' }
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* QUICK STATS — bring color into a light section */}
      <section aria-label="Fast facts" className="bg-neutral-50 py-10 md:py-14 border-y border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard k="67+" v="Stores" />
            <StatCard k="700+" v="Team Members" />
            <StatCard k="4" v="States" />
            <StatCard k="1976" v="Founded" />
          </ul>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Our Story</h2>
            <div className="prose prose-neutral max-w-none mt-4 text-black/80">
              <p>
                Clark&apos;s Pump-N-Shop, Inc. was established in 1976 by John W.
                Clark with one convenience store in his hometown of Westwood, KY.
              </p>
              <p>
                In the 1990s, the company—by then at 18 locations—was purchased by John’s
                three sons: Rick, Rodney, and Brent Clark. The footprint expanded through
                group acquisitions in central Kentucky and new-store construction across the
                Tri-State area.
              </p>
              <p>
                Fast forward to 2019: Clark’s Pump-N-Shop operates 67 convenience stores
                in Kentucky, Ohio, and West Virginia, supported by more than 700
                team members and a home office in Ashland, KY. Today the company is owned
                and operated by Rick and Brent Clark.
              </p>
              <p>
                As a family-owned business, we take great pride in delivering clean,
                well-lit, fully stocked stores—and an experience that invites customers to
                <strong> Return, Refresh, and Refuel.</strong>
              </p>
            </div>
          </div>

          {/* Founders panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-brand/5 p-6">
              <h3 className="font-['Oswald'] text-xl font-bold text-black">Family Owned &amp; Operated</h3>
              <ul className="mt-4 space-y-3">
                {FOUNDERS.map((p) => (
                  <li key={p.name} className="flex items-center gap-3">
                    <Avatar name={p.name} img={p.img} />
                    <div>
                      <p className="font-medium text-black">{p.name}</p>
                      {p.title && <p className="text-sm text-black/60">{p.title}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-black/70">
                John W. Clark also founded John W. Clark Oil Company, J&amp;R Diesel Repair,
                John W. Clark Transport, and John W. Clark Maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTPRINT */}
      <section id="footprint" className="py-14 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Where we are</h2>
            <p className="mt-2 text-black/70">
              You’ll find us across four states—and always close to your next stop.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Kentucky', 'Ohio', 'West Virginia'].map((s) => (
              <span
                key={s}
                className="rounded-full bg-white border border-black/10 px-4 py-2 text-sm text-black"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-md"
            >
              Find a Location
            </a>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Leadership &amp; Management</h2>
            <p className="mt-2 text-black/70">
              Meet the team guiding Clark’s Pump-N-Shop forward.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Avatar name={p.name} img={p.img} />
                  <div>
                    <p className="font-semibold text-black">{p.name}</p>
                    {p.title && <p className="text-sm text-black/60">{p.title}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Office & Teams callouts (text-only blocks you can swap for photos later)
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="font-medium">Home Office Teams</p>
              <p className="text-sm text-black/70 mt-1">
                Clark’s Pump-N-Shop • John W. Clark Oil • Bulk Plants, Inc.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="font-medium">Pricebook Management</p>
              <p className="text-sm text-black/70 mt-1">
                Nikki Beek &amp; Heather Douglas with Mark McCarty, Michelle Gibson, and Brian Unrue
              </p>
            </div>
          </div> */}
        </div>
      </section>

      {/* CAREERS */}
<section id="careers" className="relative py-16 md:py-24 bg-gradient-to-r from-brand/90 to-brand text-white">
  {/* subtle pattern or overlay could go here if desired */}
  <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
    {/* Left copy */}
    <div className="lg:col-span-7">
      <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold">Careers at Clark’s</h2>
      <p className="mt-3 text-white/90 max-w-prose">
        Join a people-first team with local roots and room to grow—whether you’re
        serving guests in store, keeping operations running, or leading a district.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href="/careers"
          className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-white text-brand font-semibold hover:bg-neutral-100 transition-all shadow-md"
        >
          Explore Careers
        </a>
        <a
          href="/apply"
          className="inline-flex items-center justify-center rounded-2xl px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-all"
        >
          Apply Now
        </a>
      </div>
    </div>

    {/* Right panel */}
    <div className="lg:col-span-5">
      <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
        <h3 className="font-semibold">Helpful Links</h3>
        <ul className="mt-3 grid gap-2 text-sm">
          <li><a className="hover:underline" href="/manager-login">Manager Log In</a></li>
          <li><a className="hover:underline" href="/keep-it-clean-login">Keep It Clean Log In</a></li>
          <li><a className="hover:underline" href="/in-house-charge">In-House Charge</a></li>
          <li><a className="hover:underline" href="/download-application">Download Application</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* COMMUNITY */}
      <section id="community" className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Community &amp; Giving</h2>
            <p className="mt-2 text-black/70">
              We’re proud to support the neighborhoods we serve—on the road and beyond the pump.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6 justify-center">
            <CommunityCard
              title="Request a Donation"
              desc="Tell us how we can help your local cause or event."
              href="/charity"
            />
            <CommunityCard
              title="Scholarship"
              desc="Investing locally in students and their goals."
              href="/charity"
            />
            {/* <CommunityCard
              title="Submit a Review"
              desc="Share your experience—what we got right and how we can improve."
              href="/review"
            /> */}
          </div>

          {/* <div className="mt-8">
            <a
              href="https://www.instagram.com/clarkspumpnshop/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-white bg-brand hover:bg-brand/90 transition-all shadow-md"
            >
              Follow us on Instagram
            </a>
          </div> */}
        </div>
      </section>

      {/* POLICY LINKS
      <section className="py-10 md:py-12 bg-neutral-50 border-t border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <ul className="flex flex-wrap gap-3 text-sm text-black/70">
            <li><a className="hover:underline" href="/privacy">Privacy Policy</a></li>
            <li><a className="hover:underline" href="/contact">Contact Us</a></li>
            <li><a className="hover:underline" href="/clarks-rewards">Clark’s Rewards</a></li>
            <li><a className="hover:underline" href="/clarks-cafe">Clark’s Cafe</a></li>
            <li><a className="hover:underline" href="/car-wash">Car Wash Programs</a></li>
            <li><a className="hover:underline" href="/winning-numbers">Winning Numbers</a></li>
          </ul>
          <p className="mt-4 text-xs text-black/50">
            © Clark’s Pump-N-Shop, Inc. 2023 • Site created and maintained by Local Brand Reach
          </p>
        </div>
      </section> */}
    </main>
  )
}

/* ——— UI Bits ——— */

function StatCard({ k, v }: { k: string; v: string }) {
  return (
    <li className="rounded-2xl border border-black/10 bg-white px-5 py-6">
      <p className="font-['Oswald'] text-3xl font-bold text-brand leading-none">{k}</p>
      <p className="mt-1 text-black/70">{v}</p>
    </li>
  )
}

function CommunityCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-6 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm text-black/70">{desc}</p>
      <div className="mt-4">
        <a
          href={href}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-brand text-white hover:bg-brand/90 transition-all"
        >
          Learn more
        </a>
      </div>
    </article>
  )
}

function Avatar({ name, img, size = "md" }: { name: string; img?: string; size?: "md" | "lg" }) {
  const classes =
    size === "lg"
      ? "h-24 w-24 rounded-2xl" // 96×96px
      : "h-20 w-20 rounded-xl"; // 80×80px (default)

  if (img) {
    return (
      <img
        src={img}
        alt={name}
        className={`${classes} object-cover object-top border border-black/10`}
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2);

  return (
    <div
      className={`${classes} bg-brand/15 text-brand flex items-center justify-center font-semibold border border-black/10`}
    >
      {initials}
    </div>
  );
}

