// src/pages/Locations.tsx
import React from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import storesJson from "@/assets/data/stores.json";

// ---------- Types for stores.json ----------
export type Amenities = {
  atm: boolean;
  beerCave: boolean;
  beerSales: boolean; // Beer Sales without a cave
  e85: boolean;
  diesel: boolean;
  kerosene: boolean;
  open24Hours: boolean;
  showers: boolean;
  rvDump: boolean;
  fuel: boolean;
};

export type StoreHours = {
  total_hours?: string | null;
  hours?: Partial<Record<"sun" | "mon" | "tues" | "wed" | "thur" | "fri" | "sat", string>>;
};

export type StoreEntry = {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string | number;
  phone?: string;
  store_hours?: StoreHours;
  alt_hours?: StoreHours;
  amenities?: Amenities;
};

export type StoresMap = Record<string, StoreEntry>;

// (optional, for Marker icon typing later)
declare global { interface Window { google: any } }

// Safe default used when a store has no amenities in JSON
const DEFAULT_AMENITIES: Amenities = {
  atm: true, // per your rules
  beerCave: false,
  beerSales: false,
  e85: false,
  diesel: false,
  kerosene: false,
  open24Hours: false,
  showers: false,
  rvDump: false,
  fuel: false,
};

// ---------- Component ----------
type LatLng = { lat: number; lng: number };
const GOOGLE_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim();

const mapContainerStyle = { width: "100%", height: "100%" };
const initialCenter: LatLng = { lat: 39.5, lng: -98.35 }; // US fallback

// --- utilities ---
function fullAddress(s: StoreEntry): string {
  const parts = [s.address, s.city, s.state, s.zip].filter(Boolean);
  return parts.join(", ");
}
function haversineMiles(a: LatLng, b: LatLng): number {
  const R = 3958.8;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}
function directionsLink(addr: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;
}
function encodeCacheKey(label: string) {
  return `geo:${label.trim().toLowerCase()}`;
}
async function geocodeAddress(address: string, key: string): Promise<LatLng | null> {
  try {
    const k = encodeCacheKey(address);
    const cached = localStorage.getItem(k);
    if (cached) return JSON.parse(cached);
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`
    );
    const data = await resp.json();
    if (data.status === "OK" && data.results?.[0]?.geometry?.location) {
      const { lat, lng } = data.results[0].geometry.location;
      const out = { lat: Number(lat), lng: Number(lng) };
      localStorage.setItem(k, JSON.stringify(out));
      return out;
    }
    return null;
  } catch {
    return null;
  }
}

export default function Locations() {
  const stores: StoresMap = storesJson as StoresMap;

  const [address, setAddress] = React.useState("");
  const [radius, setRadius] = React.useState<number>(25);
  const [userPoint, setUserPoint] = React.useState<LatLng | null>(null);
  const [markers, setMarkers] = React.useState<Record<string, LatLng>>({});
  const [selectedStore, setSelectedStore] = React.useState<string | null>(null);
  const [isGeocodingAll, setIsGeocodingAll] = React.useState(false);

  // Geocode all stores (cached)
  React.useEffect(() => {
    if (!GOOGLE_KEY || isGeocodingAll) return;
    let cancelled = false;
    (async () => {
      setIsGeocodingAll(true);
      const acc: Record<string, LatLng> = {};
      const entries = Object.entries(stores);
      for (let i = 0; i < entries.length; i++) {
        const [id, s] = entries[i];
        const addr = fullAddress(s);
        if (addr) {
          const loc = await geocodeAddress(addr, GOOGLE_KEY);
          if (cancelled) return;
          if (loc) acc[id] = loc;
        }
        if (i % 5 === 4) await new Promise((r) => setTimeout(r, 1000)); // gentle rate-limit
      }
      if (!cancelled) setMarkers((m) => ({ ...m, ...acc }));
      setIsGeocodingAll(false);
    })();
    return () => { cancelled = true; };
  }, [stores]);

  // Geocode user input
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!GOOGLE_KEY || !address.trim()) return;
    const loc = await geocodeAddress(address.trim(), GOOGLE_KEY);
    if (loc) setUserPoint(loc);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPoint({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // nearby results
  const results = React.useMemo(() => {
    if (!userPoint) return [];
    const arr = Object.entries(stores)
      .map(([id, s]) => {
        const addr = fullAddress(s);
        const ll = markers[id];
        if (!ll) return null;
        return { id, entry: s, latlng: ll, distance: haversineMiles(userPoint, ll), addr };
      })
      .filter(Boolean) as Array<{ id: string; entry: StoreEntry; latlng: LatLng; distance: number; addr: string }>;
    return arr.filter((r) => r.distance <= radius).sort((a, b) => a.distance - b.distance).slice(0, 30);
  }, [userPoint, radius, markers, stores]);

  const mapCenter = userPoint || results[0]?.latlng || initialCenter;

  return (
    <main className="w-full overflow-x-clip bg-white">
      {/* Header / Search */}
      <section className="relative isolate w-full bg-gradient-to-br from-white via-white to-neutral-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ background: "repeating-linear-gradient(135deg, var(--tw-gradient-to) 0 2px, transparent 2px 22px)" }}
        />
        <div className="container mx-auto px-6 md:px-10">
          <div className="py-10 md:py-16">
            <h1 className="font-['Oswald'] text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Find a Clarks near you
            </h1>
            <p className="mt-2 text-black/70 text-lg md:text-xl max-w-prose">
              Enter an address to see the closest locations and what they offer.
            </p>

            <form onSubmit={handleSearch} className="mt-6 rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, ST or ZIP"
                  className="flex-1 rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="rounded-xl border border-black/10 px-3 py-3"
                    aria-label="Search radius"
                  >
                    {[10, 25, 50, 100].map((mi) => (
                      <option key={mi} value={mi}>{mi} miles</option>
                    ))}
                  </select>
                  <button type="submit" className="rounded-xl bg-brand text-white px-5 py-3 hover:bg-brand/90 transition-colors">
                    Search
                  </button>
                  <button type="button" onClick={handleUseMyLocation} className="rounded-xl bg-neutral-100 text-black px-4 py-3 hover:bg-neutral-200">
                    Use my location
                  </button>
                </div>
              </div>
              {!GOOGLE_KEY && (
                <p className="mt-3 text-sm text-red-600">
                  Missing Google Maps key. Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in your .env.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map + results */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Results list */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between">
                <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">Nearby stores</h2>
                <span className="text-black/60 text-sm">
                  {userPoint ? `${results.length} within ${radius} mi` : "Enter an address"}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {results.map((r) => {
                  const { id, entry, distance, addr } = r;
                  const a: Amenities = { ...DEFAULT_AMENITIES, ...(entry.amenities ?? {}) };
                  return (
                    <article key={id} className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-['Oswald'] font-bold text-lg text-black">
                            {entry.name || `Store #${id}`}
                          </div>
                          <div className="text-sm text-black/70">{addr}</div>
                          {entry.phone && <div className="text-sm text-black/70 mt-1">{entry.phone}</div>}
                          <div className="mt-2 text-xs text-black/60">{distance.toFixed(1)} mi away</div>
                        </div>
                        <div className="text-right">
                          <a
                            className="inline-flex items-center justify-center rounded-xl px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-sm"
                            href={directionsLink(addr)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Directions
                          </a>
                        </div>
                      </div>

                      {/* Amenities */}
                      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-black/80">
                        <Amenity label="ATM" on={a.atm} />
                        <Amenity label="Beer cave" on={a.beerCave} />
                        <Amenity label="Beer sales" on={a.beerSales} />
                        <Amenity label="E85" on={a.e85} />
                        <Amenity label="Diesel" on={a.diesel} />
                        <Amenity label="Kerosene" on={a.kerosene} />
                        <Amenity label="24 hours" on={a.open24Hours} />
                        <Amenity label="Showers" on={a.showers} />
                        <Amenity label="RV dump" on={a.rvDump} />
                        <Amenity label="Fuel" on={a.fuel} />
                      </ul>

                      {/* Hours */}
                      {(entry.store_hours || entry.alt_hours) && (
                        <details className="mt-3 group">
                          <summary className="cursor-pointer list-none text-sm font-semibold text-brand">View hours</summary>
                          <div className="mt-2 text-sm text-black/80">
                            {entry.store_hours?.hours && (
                              <HoursBlock title="Hours" hours={entry.store_hours.hours} />
                            )}
                            {entry.alt_hours?.hours && (
                              <HoursBlock title="Alt Hours" hours={entry.alt_hours.hours} />
                            )}
                          </div>
                        </details>
                      )}

                      <div className="mt-3">
                        <button onClick={() => setSelectedStore(id)} className="text-sm underline underline-offset-2">
                          Show on map
                        </button>
                      </div>
                    </article>
                  );
                })}

                {userPoint && results.length === 0 && (
                  <div className="rounded-xl border border-black/10 p-5 text-black/70">
                    No stores within {radius} miles. Try a larger radius.
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-7">
              <div className="h-[520px] md:h-[640px] rounded-2xl overflow-hidden border border-black/10 bg-neutral-100">
                {GOOGLE_KEY ? (
                  <MapCanvas
                    apiKey={GOOGLE_KEY}
                    center={mapCenter}
                    userPoint={userPoint}
                    markers={markers}
                    results={results}
                    stores={stores}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-black/60 p-6 text-center">
                    Missing Google Maps key. Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in your .env.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ——— subcomponents ———
function MapCanvas({
  apiKey,
  center,
  userPoint,
  markers,
  results,
  stores,
  selectedStore,
  setSelectedStore,
}: {
  apiKey: string;
  center: { lat: number; lng: number };
  userPoint: { lat: number; lng: number } | null;
  markers: Record<string, { lat: number; lng: number }>;
  results: Array<{ id: string }>;
  stores: StoresMap;
  selectedStore: string | null;
  setSelectedStore: (id: string | null) => void;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "clarks-maps",
    googleMapsApiKey: apiKey, // <-- guaranteed non-empty
    libraries: ["places"],
  });

  if (loadError) {
    return (
      <div className="h-full w-full grid place-items-center text-red-600">
        Map failed to load. Check API restrictions.
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="h-full w-full grid place-items-center text-black/60">
        Loading map…
      </div>
    );
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={userPoint ? 9 : 5}>
      {/* User pin */}
      {userPoint && (
        <Marker
          position={userPoint}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#1e90ff",
            fillOpacity: 1,
            scale: 6,
            strokeColor: "white",
            strokeWeight: 2,
          } as any}
          title="You"
        />
      )}

      {/* Store pins */}
      {Object.entries(markers).map(([id, pos]) => {
        const highlighted = !userPoint || results.some((r) => r.id === id);
        return (
          <Marker
            key={id}
            position={pos}
            onClick={() => setSelectedStore(id)}
            opacity={highlighted ? 1 : 0.45}
            title={stores[id]?.name || `Store #${id}`}
          />
        );
      })}

      {/* InfoWindow */}
      {selectedStore && markers[selectedStore] && (
        <InfoWindow position={markers[selectedStore]} onCloseClick={() => setSelectedStore(null)}>
          <div className="max-w-[220px]">
            <div className="font-semibold">
              {stores[selectedStore]?.name || `Store #${selectedStore}`}
            </div>
            <div className="text-xs text-black/70">
              {fullAddress(stores[selectedStore] || {})}
            </div>
            <a
              href={directionsLink(fullAddress(stores[selectedStore] || {}))}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs text-brand underline"
            >
              Directions
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function HoursBlock({ title, hours }: { title: string; hours: Record<string, string | undefined> }) {
  const order = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"] as const;
  const label: Record<(typeof order)[number], string> = { sun: "Sun", mon: "Mon", tues: "Tue", wed: "Wed", thur: "Thu", fri: "Fri", sat: "Sat" };
  return (
    <div className="mt-1">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 grid grid-cols-2 gap-y-1 text-xs">
        {order.map((d) =>
          hours[d] ? (
            <div key={d} className="flex justify-between pr-3">
              <span className="text-black/60">{label[d]}</span>
              <span className="text-black/90">{hours[d]}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function Amenity({ label, on }: { label: string; on: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 rounded-full ${on ? "bg-brand" : "bg-neutral-300"}`}
        aria-hidden
      />
      <span className={on ? "text-black/90" : "text-black/50"}>{label}</span>
    </li>
  );
}
