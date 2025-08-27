// Hero.tsx
export default function HeroBillboard() {
    return (
        <section
            className="
        relative isolate -mt-[16px]  /* pulls hero up ~5–6px behind header */
        w-full
        h-[78vh] md:h-[86vh]        /* responsive height; tweak if needed */
        overflow-hidden
        rounded-b-none
      "
            aria-label="Hero"
        >
            {/* Background image */}
            <img
                src="/clarkshero.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Blue tint overlay */}
            <div className="absolute inset-0 bg-[#263B95]/50 pointer-events-none" />

            {/* Content frame */}
            <div
                className="
          relative z-[1]
          mx-auto max-w-[1280px]
          px-6 md:px-10
          h-full
          flex items-center
        "
            >
                <div className="inline-flex flex-col gap-6 md:gap-9 w-full max-w-[560px]">
                    {/* Big headline */}
                    <h1
                        className="
              font-['Oswald'] font-bold text-white
              leading-[1.05]
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
              font-['Oswald'] font-bold text-white
              text-xl sm:text-2xl md:text-3xl
            "
                    >
                        Your Trusted Shop for Fuel, Food, and Friendly Faces
                    </p>

                    {/* CTA */}
                    <button
                        className="
              inline-flex items-center justify-center
              h-14 sm:h-16 md:h-20
              w-[min(100%,530px)]
              rounded-[62px] bg-white
              px-6
              transition-shadow
              hover:shadow-lg
              focus:outline-none focus:ring-4 focus:ring-white/40
            "
                    >
                        <span
                            className="
                font-['Oswald'] font-bold text-blue-900
                text-xl sm:text-2xl md:text-3xl
                tracking-[0.6em] md:tracking-[0.63em]
                uppercase
              "
                        >
                            Join Rewards
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
