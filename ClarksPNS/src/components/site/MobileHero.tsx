import React from "react";


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
    img,
}: MobileHeroProps) {
    return (
        <section aria-label="Mobile Hero" className="relative overflow-hidden block md:hidden">
            <div className="mx-auto max-w-screen-xl px-4 py-8 grid grid-cols-1 items-center gap-6">
                {/* Media */}
                <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                        <img
                            src={img.src640}
                            srcSet={`${img.src640} 640w, ${img.src960} 960w, ${img.src1440} 1440w`}
                            sizes="(max-width: 768px) 92vw, 45vw"
                            alt={img.alt}
                            className="h-full w-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </div>


                {/* Text */}
                <div className="text-center space-y-3">
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
            </div>
        </section>
    );
}