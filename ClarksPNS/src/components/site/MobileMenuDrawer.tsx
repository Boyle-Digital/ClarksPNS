// src/components/site/MobileMenuDrawer.tsx
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import rewardsLogoUrl from "@/assets/images/Clarks-PNS-Main-Rewards-Logo.png";

type FlatLink = { label: string; href: string };
type Group =
  | { type: "link"; label: string; href: string }
  | { type: "group"; label: string; items: FlatLink[] };

type MobileMenuDrawerProps = {
  open: boolean;
  onClose: () => void;
  links?: FlatLink[];
  groups?: Group[];
};

export default function MobileMenuDrawer({
  open,
  onClose,
  links,
  groups,
}: MobileMenuDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const location = useLocation();
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, onClose]);

  const toggle = (key: string) =>
    setExpanded((s) => ({ ...s, [key]: !s[key] }));

  const content: Group[] =
    groups ??
    (links
      ? ([
          ...links.map((l) => ({ type: "link", label: l.label, href: l.href })),
        ] as Group[])
      : []);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[999] transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Scrim */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute inset-y-0 right-0 w-[75%] max-w-xs bg-white shadow-2xl transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
          {/* Spacer to balance close button */}
          <div className="w-10" />

          {/* Rewards logo centered */}
          <img
            src={rewardsLogoUrl}
            alt="Clarks Rewards"
            className="h-8 w-auto mx-auto"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="h-10 w-10 grid place-items-center rounded-md hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <nav className="px-2 py-2">
          <ul className="flex flex-col">
            {content.map((item, idx) => {
              if (item.type === "link") {
                return (
                  <li key={`link-${idx}`}>
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "block px-3 py-3 text-base rounded-md",
                          isActive ? "text-brand" : "text-black hover:bg-black/5 hover:text-brand",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              } else {
                const key = `group-${item.label}`;
                const isOpen = !!expanded[key];

                return (
                  <li key={key} className="mt-1">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-3 text-base rounded-md hover:bg-black/5"
                      aria-expanded={isOpen}
                      aria-controls={`${key}-panel`}
                      onClick={() => toggle(key)}
                    >
                      <span className="text-black">{item.label}</span>
                      <svg
                        className={`h-4 w-4 text-black transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.172l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
                      </svg>
                    </button>

                    <div
                      id={`${key}-panel`}
                      role="region"
                      aria-label={item.label}
                      className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-3 pr-2">
                        {item.items.map((sub, sIdx) => (
                          <li key={`${key}-item-${sIdx}`}>
                            <NavLink
                              to={sub.href}
                              onClick={onClose}
                              className={({ isActive }) =>
                                [
                                  "block px-3 py-2 text-[0.95rem] rounded-md",
                                  isActive ? "text-brand" : "text-black/80 hover:bg-black/5 hover:text-brand",
                                ].join(" ")
                              }
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
