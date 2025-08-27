import { Link, NavLink } from "react-router-dom";
import logoUrl from "@/assets/clarks-logo.png";

type HeaderNavProps = {
  showAccentBar?: boolean;
};

const LINKS = ["Clarks Rewards", "Locations", "Food", "Car Wash", "About Us"] as const;

function toPath(label: string) {
  return "/" + label.toLowerCase().replace(/\s+/g, "-");
}

export default function HeaderNav({ showAccentBar = true }: HeaderNavProps) {
  return (
    <header className="sticky top-0 z-header w-full">
      {/* White bar with rounded bottom */}
      <div className="bg-surface shadow-soft rounded-b-2xl">
        {/* Use the header height token and center items */}
        <div className="h-header grid items-center">
          <div className="container max-w-screen-2xl">
            {/* 6 equal columns — each cell centers its content */}
            <div className="grid grid-cols-6 place-items-center gap-2">
              {/* Col 1: Logo */}
              <Link to="/" className="inline-flex items-center">
                <img src={logoUrl} alt="Clark’s Pump-N-Shop" className="h-8 md:h-9 w-auto" />
              </Link>

              {/* Cols 2..6: Nav links */}
              {LINKS.map((label) => (
                <NavLink
                  key={label}
                  to={toPath(label)}
                  className={({ isActive }) =>
                    [
                      "inline-block text-nav text-center",
                      "py-2", // vertical rhythm
                      isActive ? "text-brand" : "text-text hover:text-brand",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
