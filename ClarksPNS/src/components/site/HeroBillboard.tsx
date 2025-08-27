// src/components/HeroBillboard.tsx
import heroUrl from "@/assets/clarkshero.png";

export default function HeroBillboard() {
  return (
    <section
      aria-label="Hero"
      className="
        relative isolate
        -mt-[16px]        /* pulls hero slightly behind the header */
        w-full
        h-[78vh] md:h-[86vh]
        overflow-hidden
        rounded-b-none
      "
    >
      {/* Background image */}
      <img
        src={heroUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Blue tint overlay (brand token) */}
      <div className="absolute inset-0 bg-brand/50 pointer-events-none" />

      {/* Content frame */}
      <div className="relative z-[1] h-full flex items-center">
        <div className="container max-w-screen-2xl px-6 md:px-10">
          <div className="inline-flex flex-col gap-6 md:gap-9 w-full max-w-[560px]">
            {/* Headline */}
            <h1
              className="
                font-bold text-white leading-[1.05]
                text-5xl sm:text-6xl md:text-7xl xl:text-8xl
                tracking-tight
              "
            >
              Refresh.<br />
              Refuel.<br />
              Return.
            </h1>

            {/* White bar */}
            <div className="h-2.5 w-72 sm:w-80 md:w-96 bg-white rounded-[10px]" />

            {/* Subhead */}
            <p
              className="
                font-bold text-white
                text-xl sm:text-2xl md:text-3xl
              "
            >
              Your Trusted Shop for Fuel, Food, and Friendly Faces
            </p>

            {/* CTA */}
            <a
              href="#get-the-app"
              className="
                inline-flex items-center justify-center
                h-14 sm:h-16 md:h-20
                w-[min(100%,530px)]
                rounded-[62px] bg-white
                px-6 transition-shadow hover:shadow-lg
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              "
            >
              <span
                className="
                  font-bold text-brand
                  text-xl sm:text-2xl md:text-3xl
                  tracking-[0.6em] md:tracking-[0.63em]
                  uppercase
                "
              >
                Join Rewards
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
