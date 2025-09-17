import React from "react";

// =====================================
//  Sponsorships Page (responsive, themed)
//  - Uses the same visual language as Charity page
//  - Drop-in file: src/pages/Sponsorships.tsx
//  - Replace placeholder data/images as they become available
// =====================================

// ---- Local helpers (mirrors Charity page patterns) ----
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm">
    <div className="text-3xl md:text-4xl font-bold text-brand">{value}</div>
    <div className="mt-1 text-sm text-black/60">{label}</div>
  </div>
);

const Card = ({
  eyebrow,
  title,
  children,
  cta,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  cta?: { href: string; label: string }[];
}) => (
  <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
    {eyebrow && (
      <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">{eyebrow}</p>
    )}
    <h3 className="mt-1 font-['Oswald'] text-2xl md:text-3xl font-bold">{title}</h3>
    <div className="prose prose-neutral mt-3 max-w-none text-black/80">{children}</div>
    {cta && (
      <div className="mt-5 flex flex-wrap gap-3">
        {cta.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 transition shadow-md"
          >
            {c.label}
          </a>
        ))}
      </div>
    )}
  </article>
);

// Generic gallery that gracefully handles missing images by rendering placeholders
const Gallery = ({
  images,
  columns = 4,
  caption,
}: {
  images: ({ src?: string; alt?: string } | null)[];
  columns?: 2 | 3 | 4;
  caption?: string;
}) => (
  <div>
    <ul
      className={
        "grid gap-3 sm:gap-4" +
        (columns === 2
          ? " grid-cols-2 md:grid-cols-3"
          : columns === 4
          ? " grid-cols-2 md:grid-cols-4"
          : " grid-cols-2 md:grid-cols-3")
      }
    >
      {images.map((img, i) => (
        <li key={i} className="overflow-hidden rounded-xl border border-black/10 bg-white">
          {img?.src ? (
            <img
              src={img.src}
              alt={img.alt || "Sponsorship photo"}
              loading={i < 6 ? "eager" : "lazy"}
              className="h-full w-full object-cover hover:opacity-95 transition"
            />
          ) : (
            <div className="aspect-[4/3] w-full bg-black/5 grid place-items-center text-black/40 text-xs">
              Image coming soon
            </div>
          )}
        </li>
      ))}
    </ul>
    {caption && (
      <p className="mt-3 text-xs text-black/50 text-center">{caption}</p>
    )}
  </div>
);

// ---- Placeholder data (swap with real content later) ----
const highSchoolSponsors = [
  {
    name: "Ashland Blazer High School",
    location: "Ashland, KY",
    sport: "Football / Basketball",
    blurb:
      "Supporting student-athletes on and off the field with uniforms, equipment, and community events.",
    images: new Array(8).fill(null) as ({ src?: string; alt?: string } | null)[],
    // When assets are ready, replace with imports like:
    // images: [{ src: hs1, alt: "Team photo" }, ...]
  },
  {
    name: "Boyd County High School",
    location: "Cannonsburg, KY",
    sport: "Cheer / Baseball",
    blurb:
      "Proud partners in school spirit—sideline signage, tournament travel, and youth clinics.",
    images: new Array(8).fill(null),
  },
  {
    name: "Fleming County High School",
    location: "Flemingsburg, KY",
    sport: "Track & Field",
    blurb:
      "Investing in upgraded training gear and meet sponsorships for growing programs.",
    images: new Array(8).fill(null),
  },
];

const youthLeagues = [
  {
    name: "Tri-State Youth Soccer",
    location: "Huntington-Ashland-Ironton",
    sport: "Soccer",
    blurb: "Scholarships for registration fees and equipment drives each spring.",
    images: new Array(6).fill(null),
  },
  {
    name: "Lexington Little League",
    location: "Lexington, KY",
    sport: "Baseball",
    blurb: "Field maintenance grants and All-Star weekend support.",
    images: new Array(6).fill(null),
  },
];

const communityEvents = [
  {
    name: "County Fair & Fall Festival",
    location: "Multiple Counties",
    blurb:
      "Booth sponsorships, prize donations, and volunteer hours to celebrate local traditions.",
    images: new Array(6).fill(null),
  },
  {
    name: "Holiday Food & Toy Drive",
    location: "Eastern & Central Kentucky",
    blurb:
      "Collection barrels at Clark's locations and company-matched donations.",
    images: new Array(6).fill(null),
  },
];

export default function SponsorshipsPage() {
  return (
    <main id="sponsorships" className="flex flex-col -mt-[16px]">
      {/* HERO */}
      <section className="relative isolate bg-brand text-white">
        <div className="container mx-auto grid md:grid-cols-12 gap-8 px-6 md:px-10 py-14 md:py-16 items-center">
          <div className="md:col-span-7">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-white/80">Community Sponsorships</p>
            <h1 className="mt-2 font-['Oswald'] text-3xl md:text-5xl font-bold leading-tight">
              Backing local schools, teams, and community events
            </h1>
            <p className="mt-3 text-white/90 max-w-prose">
              From high school athletics to youth leagues and hometown festivals, Clark’s Pump‑N‑Shop is
              proud to invest in the places our employees and customers call home.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#high-school" className="rounded-2xl px-5 py-2.5 bg-white text-brand hover:bg-white/90 shadow-md">High Schools</a>
              <a href="#youth" className="rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10">Youth Sports</a>
              <a href="#community" className="rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10">Community</a>
              <a href="#become-a-sponsor" className="rounded-2xl px-5 py-2.5 border border-white/40 text-white hover:bg-white/10">Become a Sponsor</a>
            </div>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-sm p-3">
              <div className="h-64 w-64 md:h-72 md:w-72 rounded-xl overflow-hidden grid place-items-center">
                {/* Swap with a real collage or logo when available */}
                <div className="text-center text-white/85 text-sm leading-relaxed px-4">
                  Sponsor photos
                  <br />
                  coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / IMPACT */}
      <section className="py-8 md:py-10 bg-white border-b border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="$250k+" label="Annual sponsorships" />
            <Stat value="60+" label="Schools & teams" />
            <Stat value="100+" label="Community events" />
            <Stat value="KY • OH" label="Regions served" />
          </div>
        </div>
      </section>

      {/* HIGH SCHOOL SPONSORS */}
      <section id="high-school" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">Varsity & JV</p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">High School Partnerships</h2>
            <p className="mt-3 text-black/70">
              Signage, uniforms, equipment, and travel support—customized for each athletic department’s needs.
            </p>
          </div>

          <div className="mt-8 md:mt-10 grid gap-6 md:gap-8">
            {highSchoolSponsors.map((s, idx) => (
              <Card key={idx} eyebrow={s.location} title={`${s.name} — ${s.sport}`}>
                <p>{s.blurb}</p>
                <div className="mt-5">
                  <Gallery images={s.images} columns={4} caption="Photos courtesy of school athletics." />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YOUTH LEAGUES */}
      <section id="youth" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">Ages 5–14</p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Youth Sports</h2>
            <p className="mt-3 text-black/70">
              Lowering barriers to play with registration scholarships, equipment drives, and field improvements.
            </p>
          </div>

          <div className="mt-8 md:mt-10 grid gap-6 md:gap-8">
            {youthLeagues.map((s, idx) => (
              <Card key={idx} eyebrow={s.location} title={`${s.name} — ${s.sport}`}>
                <p>{s.blurb}</p>
                <div className="mt-5">
                  <Gallery images={s.images} columns={4} caption="League snapshots" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY EVENTS */}
      <section id="community" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="font-['Oswald'] tracking-wide text-xs uppercase text-brand">Festivals & Drives</p>
            <h2 className="mt-1 font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Community Events</h2>
            <p className="mt-3 text-black/70">
              Partnering with chambers, nonprofits, and civic groups to bring people together and give back.
            </p>
          </div>

          <div className="mt-8 md:mt-10 grid gap-6 md:gap-8">
            {communityEvents.map((e, idx) => (
              <Card key={idx} eyebrow={e.location} title={e.name}>
                <p>{e.blurb}</p>
                <div className="mt-5">
                  <Gallery images={e.images} columns={4} caption="Event highlights" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Become a Sponsor */}
      <section id="become-a-sponsor" className="py-12 md:py-16 bg-white border-y border-black/10">
        <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-start justify-center text-center">
          <div className="lg:col-span-7">
            <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">Interested in a sponsorship?</h2>
            <p className="mt-3 text-black/70">
              Schools, coaches, boosters, and community organizers—tell us about your program and how we can help.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <a href="/sponsorships/apply" className="inline-flex rounded-2xl px-5 py-2.5 text-white bg-brand hover:bg-brand/90 shadow-md">Request Sponsorship</a>
              <a href="/contact" className="inline-flex rounded-2xl px-5 py-2.5 border border-brand/20 text-brand hover:bg-brand/5">Contact Our Team</a>
            </div>
          </div>

          <div className="lg:col-span-5 text-left lg:text-center">
            <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold text-black">Sponsorship guidelines</h3>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>• Priority for schools/organizations near Clark’s locations in KY & OH.</li>
              <li>• Preference for safety, education, and youth development programs.</li>
              <li>• Requests should be submitted 6–8 weeks before the event/season.</li>
              <li>• Include budget, audience size, and recognition opportunities.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK LINKS (optional) */}
      {/*
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-3">
            <a href="/charity" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">Clark Family Charity</a>
            <a href="/careers" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">Careers</a>
            <a href="/locations" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">Find a Location</a>
          </div>
        </div>
      </section>
      */}
    </main>
  );
}
