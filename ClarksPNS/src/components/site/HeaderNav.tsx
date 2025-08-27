// src/components/site/HeaderNav.tsx
const LINKS = ['Clarks Rewards', 'Locations', 'Food', 'Car Wash', 'About Us'] as const

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip">
      {/* Define all sizing vars here so absolute bg can see them */}
      <div
        className="relative"
        style={
          {
            '--headerH': '80px',              // ← adjust this knob
            '--targetCell': '240px',
            '--targetGutter': '48px',
            '--targetSidePad': '60px',
            '--logoW': '180px',
            '--logoH': '60px',                // keep logo comfortably inside an 80px bar
          } as React.CSSProperties
        }
      >
        {/* Background bar */}
        <div
          className="absolute inset-x-0 top-0 rounded-b-[20px] bg-white shadow-[0_12px_10px_rgba(0,0,0,0.25)]"
          style={{ height: 'var(--headerH, 160px)' }}
        />

        {/* Foreground content */}
        <div className="relative z-10 w-full">
          <div
            className="mx-auto flex items-center px-[clamp(16px,4vw,var(--targetSidePad))]"
            style={{
              height: 'var(--headerH)',
              maxWidth:
                'calc(var(--targetSidePad)*2 + var(--targetCell)*6 + var(--targetGutter)*5)',
            }}
          >
            <div
              className="
                grid w-full
                grid-cols-[auto_repeat(5,minmax(0,1fr))]
                gap-x-[clamp(16px,3vw,var(--targetGutter))]
                items-center
              "
              style={{ height: '100%' }}
            >
              {/* Logo cell */}
              <a
                href="/"
                className="self-center inline-flex h-[var(--headerH)] items-center justify-center min-w-[var(--logoW)]"
              >
                <img
                  src="/clarks-logo.png"
                  alt="Clark's Pump-N-Shop"
                  className="w-[var(--logoW)] h-[var(--logoH)] object-contain"
                />
              </a>

              {/* Links */}
              {LINKS.map((label) => (
                <a
                  key={label}
                  href={'#' + label.toLowerCase().replace(/\s+/g, '')}
                  className="
                    self-center inline-flex h-[var(--headerH)] min-w-0
                    items-center justify-center px-2 text-center
                    font-oswald font-semibold text-black hover:text-black/70
                    text-2xl leading-[1.2]
                    whitespace-normal break-words [text-wrap:balance]
                  "
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
