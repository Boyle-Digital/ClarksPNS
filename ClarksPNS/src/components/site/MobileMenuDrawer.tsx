// src/components/site/MobileMenuDrawer.tsx
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

type DrawerLink = { label: string; href: string };

export default function MobileMenuDrawer({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: DrawerLink[];
}) {
  const firstRef = useRef<HTMLAnchorElement>(null);

  // Lock scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus first link when opening
  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] md:hidden isolate"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="drawer-overlay" />

      {/* Panel */}
      <aside
        className="drawer-panel text-text" // tokens: bg-surface + text-text in your CSS layer
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="icon-btn text-text"
          >
            {/* keep your x.svg as <img> or SVGR component */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-text">
          {links.map((l, i) => (
            <NavLink
              key={l.label}
              to={l.href}
              ref={i === 0 ? firstRef : undefined}
              onClick={onClose}
              className={({ isActive }: { isActive: boolean }) =>
                ["drawer-link", isActive ? "!text-brand" : "!text-text"].join(" ")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
