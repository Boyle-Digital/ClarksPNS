// src/components/site/HeaderNav.tsx (grid section only)
const LINKS = ['Clarks Rewards', 'Locations', 'Food', 'Car Wash', 'About Us'] as const

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[160px] rounded-b-[20px] bg-white shadow-[0_12px_10px_rgba(0,0,0,0.25)]" />

        {/* Controls: edit once */}
        <div
          className="relative z-10 h-[160px] w-full"
          style={
            {
              '--targetCell': '240px',
              '--targetGutter': '48px',
              '--targetSidePad': '60px',
            } as React.CSSProperties
          }
        >
          {/* Center the whole row and cap its max width */}
          <div
            className="mx-auto flex h-full items-center px-[clamp(16px,4vw,var(--targetSidePad))]"
            style={{
              maxWidth:
                'calc(var(--targetSidePad)*2 + var(--targetCell)*6 + var(--targetGutter)*5)',
            }}
          >
            <div
              className="
                grid h-full w-full items-center
                grid-cols-6                           /* always fluid */
                gap-x-[clamp(16px,3vw,var(--targetGutter))]
              "
            >
              {/* Cell 1: logo */}
              <a className="flex h-full min-w-0 items-center justify-center" href="/">
                <img
                  src="/clarks-logo.png"
                  alt="Clark's Pump-N-Shop"
                  className="h-[96px] w-full max-w-[var(--targetCell)] object-contain"
                />
              </a>

              {/* Cells 2–6: labels (no wrapping, so they shrink smoothly) */}
              {LINKS.map((label) => (
                <a
                  key={label}
                  href={'#' + label.toLowerCase().replace(/\s+/g, '')}
                  className="
                    flex h-full min-w-0 items-center justify-center text-center whitespace-nowrap
                    font-oswald font-semibold leading-none text-black hover:text-black/70
                    text-[clamp(20px,2.2vw,32px)]
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
