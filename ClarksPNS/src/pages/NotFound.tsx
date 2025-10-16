// src/pages/NotFound.tsx
import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="relative -mt-[20px] flex min-h-screen flex-col items-center justify-center bg-white text-center">
      {/* Soft brand glow background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-brand/20 blur-[120px]" />
      </div>

      {/* Main content */}
      <h1 className="text-8xl font-extrabold text-black drop-shadow-sm">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-black/80">
        Oops! Page not found.
      </h2>
      <p className="mt-3 max-w-md text-black/60">
        The page you’re looking for doesn’t exist, was moved, or might be taking a quick coffee break.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:scale-[1.03] hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        Return Home
      </Link>

      <p className="mt-8 text-sm text-black/40">
        Clark’s Pump-N-Shop — Return. Refresh. Refuel.
      </p>
    </main>
  )
}
