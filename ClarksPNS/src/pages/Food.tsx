// src/pages/Food.tsx
import React from "react";
import champsLogo from "@/assets/images/champschickenlogo.png";
import hangarLogo from "@/assets/images/Hangar54Logo_02-1.png";
import jacksLogo from "@/assets/images/jacksdelilogo.webp";
import cafeLogo from "@/assets/images/clarkscafelogo.webp";
import kkcLogo from "@/assets/images/krispykrunchychickenlogo.webp";

/** === Auto-import: sitewide food gallery === */
const ALL_GALLERY = Object.values(
  import.meta.glob("@/assets/food-gallery/**/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    as: "url",
  })
) as string[];

/** === Auto-import: menus (PDFs + images) === */
const MENU_PDFS = import.meta.glob("@/assets/menus/**/*.{pdf}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const MENU_IMAGES = import.meta.glob("@/assets/menus/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

function collectMenus(brandKey: string) {
  const pdfs = Object.entries(MENU_PDFS)
    .filter(([path]) => path.includes(`/menus/${brandKey}/`))
    .map(([, url]) => url);
  const images = Object.entries(MENU_IMAGES)
    .filter(([path]) => path.includes(`/menus/${brandKey}/`))
    .map(([, url]) => url);
  return { pdfs, images };
}

export default function Food() {
  const [idx, setIdx] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  const gallery = ALL_GALLERY.length ? ALL_GALLERY : [];

  React.useEffect(() => {
    if (!gallery.length) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 3) % Math.max(gallery.length, 1));
        setFading(false);
      }, 220);
    }, 4000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  const triplet = (start: number) =>
    [0, 1, 2].map((k) => gallery[(start + k) % Math.max(gallery.length, 1)]).filter(Boolean);

  const visible = triplet(idx);

  return (
    <main className="relative -mt-6 w-full overflow-x-clip bg-white">
      {/* Hero */}
      <section
        aria-label="Food at Clarks"
        className="relative isolate w-full bg-gradient-to-br from-white via-white to-neutral-50"
      >
        <div className="relative mx-auto container px-6 md:px-10 py-14 md:py-20">
          <h1 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-black">
            Hot, fresh, and fast—right inside select locations
          </h1>
          <p className="mt-3 text-black/70 text-base md:text-lg max-w-prose">
            From crispy tenders and deli stacks to melty pizza and breakfast favorites, our in-store
            kitchens serve up crowd-pleasers every day.
          </p>
        </div>
      </section>

      {/* Menus */}
      <BrandMenus />

      {/* Gallery */}
      <section aria-label="Food Gallery" className="py-12 md:py-20 bg-neutral-50 border-y border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Food Gallery</h2>
          </div>
          <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-300 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.length ? (
              visible.map((src) => <GalleryImage key={src} src={src} />)
            ) : (
              <div className="sm:col-span-3">
                <PlaceholderEmpty msg="Add images under src/assets/food-gallery to populate this gallery." />
              </div>
            )}
          </div>
        </div>
      </section>

      
    </main>
  );
}

/* ========================
   Brand Menus Section
   ======================== */

function BrandMenus() {
  return (
    <section aria-label="Restaurant Menus" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          {/* <h2 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-black">Our In-Store Kitchens</h2> */}
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MenuBlock id="champs-chicken" brandKey="champs" logo={champsLogo} name="Champs Chicken" desc="Crispy tenders, signature sides, and sauces." />
          <MenuBlock id="hangar-54-pizza" brandKey="hangar54" logo={hangarLogo} name="Hangar 54 Pizza" desc="Slices and whole pies—hot from the oven." />
          <MenuBlock id="jacks-deli" brandKey="jacks-deli" logo={jacksLogo} name="Jack's Deli" desc="Stacked sandwiches, salads, and deli classics." />
          <MenuBlock id="clarks-cafe" brandKey="clarks-cafe" logo={cafeLogo} name="Clarks Cafe" desc="Breakfast sandwiches, pastries, and coffee." />
          <MenuBlock id="krispy-krunchy-chicken" brandKey="krispy-krunchy" logo={kkcLogo} name="Krispy Krunchy Chicken" desc="Louisiana-style chicken, biscuits, and sides." />
        </div>
      </div>
    </section>
  );
}

function MenuBlock({ id, brandKey, logo, name, desc }: { id: string; brandKey: string; logo: string; name: string; desc: string }) {
  const { pdfs, images } = collectMenus(brandKey);
  const [lightbox, setLightbox] = React.useState<string | null>(null);

  return (
    <article id={id} className="rounded-2xl border border-black/10 bg-neutral-50 p-6">
      <div className="mb-4 h-12 flex items-center">
        <img src={logo} alt={`${name} logo`} className="h-full w-auto object-contain" />
      </div>
      <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold text-black">{name}</h3>
      <p className="mt-1 text-black/70 text-sm md:text-base">{desc}</p>

      <div className="mt-4 space-y-4">
        {pdfs.length ? (
          <div className="flex flex-wrap gap-2">
            {pdfs.map((url, i) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-brand text-white hover:bg-brand/90 transition-colors">
                Open Menu PDF{i > 0 ? ` ${i + 1}` : ""}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-black/60 text-sm">Menu PDF coming soon.</p>
        )}

        {images.length ? (
          <div className="grid grid-cols-1 gap-3">
            {images.map((src) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                className="group block w-full"
                title={`${name} menu image`}
              >
                <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white">
                  <img src={src} alt={`${name} menu`} loading="lazy" className="w-full h-auto object-contain" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-black/60 text-sm">Menu images coming soon.</p>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative w-[90%] max-h-[90%]">
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 bg-brand text-white rounded-full px-3 py-1 shadow-lg"
            >
              ✕
            </button>
            <img src={lightbox} alt="Menu full view" className="w-full h-auto max-h-[90vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </article>
  );
}

function GalleryImage({ src }: { src: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="group block w-full">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-white">
          <img src={src} alt="Prepared food at Clarks" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative w-[90%] max-h-[90%]">
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 bg-brand text-white rounded-full px-3 py-1 shadow-lg">✕</button>
            <img src={src} alt="Food full view" className="w-full h-auto max-h-[90vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </>
  );
}

function PlaceholderEmpty({ msg }: { msg: string }) {
  return <div className="rounded-2xl border border-dashed border-black/20 bg-white p-6 text-center text-black/60">{msg}</div>;
}
