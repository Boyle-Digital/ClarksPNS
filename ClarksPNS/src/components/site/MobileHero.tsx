import React from "react";
import bgVideo from "@/assets/videos/051425_clarkssecret_30_v1 (1).mp4";

export type MobileHeroProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  img: {
    src640: string;
    src960: string;
    src1440: string;
    alt: string;
  };
};

export default function MobileHero({
  title,
  subtitle,
  ctaLabel = "Join Rewards",
  ctaHref = "/rewards",
}: MobileHeroProps) {
  return (
    <section aria-label="Mobile Hero" className="relative overflow-hidden block md:hidden">
      {/* Background video */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Blue overlay if needed */}
        <div className="absolute inset-0 bg-brand/40" />
      </div>

      {/* Text */}
      <div className="text-center space-y-3 mt-6 px-4">
        <h1 className="font-['Oswald'] font-bold leading-tight text-[clamp(1.5rem,1.1rem+2.2vw,2rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[clamp(1rem,0.9rem+1vw,1.25rem)]">{subtitle}</p>
        )}
        {ctaLabel && (
          <div className="flex justify-center">
            <a
              href={ctaHref}
              className="min-h-[44px] px-5 py-3 rounded-xl bg-black text-white font-medium"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
