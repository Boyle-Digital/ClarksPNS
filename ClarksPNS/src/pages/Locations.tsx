// src/pages/Locations.tsx
import React from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader
} from '@react-google-maps/api'
// ⬇️ use the precomputed file
import storesJson from '@/assets/data/stores.geocoded.json'

// --- URL helpers for shareable filters ---
type FilterState = Record<string, boolean>

type AmenityKey = typeof AMENITY_KEYS[number]
type AmenityFilterKey = typeof AMENITY_FILTER_KEYS[number]

// Encode checked keys to comma lists: ?amenity=atm,diesel&food=clarkscafe&fuel=marathon
function encodeFiltersToSearch (
  amenity: FilterState,
  food: FilterState,
  fuel: FilterState
): string {
  const params = new URLSearchParams(window.location.search)

  const toCsv = (o: FilterState) =>
    Object.keys(o)
      .filter(k => o[k])
      .join(',')

  const aCsv = toCsv(amenity)
  const fCsv = toCsv(food)
  const fpCsv = toCsv(fuel)

  if (aCsv) params.set('amenity', aCsv)
  else params.delete('amenity')
  if (fCsv) params.set('food', fCsv)
  else params.delete('food')
  if (fpCsv) params.set('fuel', fpCsv)
  else params.delete('fuel')

  return params.toString()
}

function decodeFiltersFromSearch (): {
  amenity: FilterState
  food: FilterState
  fuel: FilterState
} {
  const params = new URLSearchParams(window.location.search)
  const toState = (csv: string | null) =>
    (csv || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .reduce<FilterState>((acc, k) => {
        acc[k] = true
        return acc
      }, {})

  return {
    amenity: toState(params.get('amenity')),
    food: toState(params.get('food')),
    fuel: toState(params.get('fuel'))
  }
}

// ---------- Types for stores.json ----------
export type Amenities = {
  atm: boolean
  beerCave: boolean
  beerSales: boolean // Beer Sales without a cave
  e85: boolean
  diesel: boolean
  kerosene: boolean
  open24Hours: boolean
  showers: boolean
  rvDump: boolean
  fuel: boolean
  carwash: boolean // NEW
}

export type FoodPrograms = {
  clarkscafe: boolean
  krispykrunchy: boolean
  champs: boolean
  hangar: boolean
  jacks: boolean
  grabngo?: boolean // seen in your JSON
}

export type FuelProviders = {
  marathon: boolean
  arco: boolean
  BP: boolean
}

export type StoreHours = {
  total_hours?: string | null
  hours?: Partial<
    Record<'sun' | 'mon' | 'tues' | 'wed' | 'thur' | 'fri' | 'sat', string>
  >
}

export type StoreEntry = {
  name?: string
  address?: string
  city?: string
  state?: string
  zip?: string | number
  phone?: string
  store_hours?: StoreHours
  alt_hours?: StoreHours
  amenities?: Amenities
  food?: FoodPrograms // NEW
  fuel?: FuelProviders // NEW
  // ⬇️ new: precomputed coordinates from your build script
  lat?: number
  lng?: number
  __addr?: string // internal marker written by the script (safe to ignore in UI)
}

export type StoresMap = Record<string, StoreEntry>

// (optional, for Marker icon typing later)
declare global {
  interface Window {
    google: any
  }
}

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
  carwash: false
}

// Default “shapes” for optional blocks
const DEFAULT_FOOD: FoodPrograms = {
  clarkscafe: false,
  krispykrunchy: false,
  champs: false,
  hangar: false,
  jacks: false,
  grabngo: false
}

const DEFAULT_FUEL: FuelProviders = {
  marathon: true, // your requested defaults
  arco: false,
  BP: false
}

function isStoreKey (k: string) {
  return /^\d+$/.test(k)
}

function normalizeStores (raw: Record<string, any>): StoresMap {
  const out: StoresMap = {}
  for (const key of Object.keys(raw)) {
    if (!isStoreKey(key)) continue // ignore non-numeric keys if any
    const e = raw[key] ?? {}
    out[key] = {
      ...e,
      amenities: { ...DEFAULT_AMENITIES, ...(e.amenities ?? {}) },
      food: { ...DEFAULT_FOOD, ...(e.food ?? {}) },
      fuel: { ...DEFAULT_FUEL, ...(e.fuel ?? {}) }
    }
  }
  return out
}

// Keys for filters + display labels
const AMENITY_KEYS = [
  'atm',
  'beerCave',
  'beerSales',
  'e85',
  'diesel',
  'kerosene',
  'open24Hours',
  'showers',
  'rvDump',
  'fuel',
  'carwash'
] as const

// Use this for the FILTER UI only (excludes the plain "fuel" amenity)
const AMENITY_FILTER_KEYS = [
  'atm',
  'beerCave',
  'beerSales',
  'e85',
  'diesel',
  'kerosene',
  'open24Hours',
  'showers',
  'rvDump',
  'carwash'
] as const

const AMENITY_LABEL: Record<typeof AMENITY_KEYS[number], string> = {
  atm: 'ATM',
  beerCave: 'Beer cave',
  beerSales: 'Beer sales',
  e85: 'E85',
  diesel: 'Diesel',
  kerosene: 'Kerosene',
  open24Hours: '24 hours',
  showers: 'Showers',
  rvDump: 'RV dump',
  fuel: 'Fuel',
  carwash: 'Car wash'
}

const FOOD_KEYS = [
  'clarkscafe',
  'krispykrunchy',
  'champs',
  'hangar',
  'jacks',
  'grabngo'
] as const

const FOOD_LABEL: Record<typeof FOOD_KEYS[number], string> = {
  clarkscafe: "Clark's Cafe",
  krispykrunchy: 'Krispy Krunchy',
  champs: 'Champs',
  hangar: 'Hangar 54',
  jacks: "Jack's Deli",
  grabngo: 'Grab & Go'
}

const FUEL_KEYS = ['marathon', 'arco', 'BP'] as const
const FUEL_LABEL: Record<typeof FUEL_KEYS[number], string> = {
  marathon: 'Marathon',
  arco: 'ARCO',
  BP: 'BP',
}

// ---------- Component ----------
type LatLng = { lat: number; lng: number }
const GOOGLE_KEY = (
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
)?.trim()

const mapContainerStyle = { width: '100%', height: '100%' } as const
const initialCenter: LatLng = { lat: 39.5, lng: -98.35 } // US fallback

// --- utilities ---
function fullAddress (s: StoreEntry): string {
  const parts = [s.address, s.city, s.state, s.zip].filter(Boolean)
  return parts.join(', ')
}
function haversineMiles (a: LatLng, b: LatLng): number {
  const R = 3958.8
  const toRad = (x: number) => (x * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(h))
}
function directionsLink (addr: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    addr
  )}`
}

// Keep a tiny geocoder ONLY for the user's search input
function encodeCacheKey (label: string) {
  return `geo:${label.trim().toLowerCase()}`
}
async function geocodeAddress (
  address: string,
  key: string
): Promise<LatLng | null> {
  try {
    const k = encodeCacheKey(address)
    const cached = localStorage.getItem(k)
    if (cached) return JSON.parse(cached)
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${key}`
    )
    const data = await resp.json()
    if (data.status === 'OK' && data.results?.[0]?.geometry?.location) {
      const { lat, lng } = data.results[0].geometry.location
      const out = { lat: Number(lat), lng: Number(lng) }
      localStorage.setItem(k, JSON.stringify(out))
      return out
    }
    return null
  } catch {
    return null
  }
}

export default function Locations () {
  const stores: StoresMap = React.useMemo(
    () => normalizeStores(storesJson as Record<string, any>),
    []
  )
  const [address, setAddress] = React.useState('')
  const [radius, setRadius] = React.useState<number>(25)
  const [userPoint, setUserPoint] = React.useState<LatLng | null>(null)
  const [markers, setMarkers] = React.useState<Record<string, LatLng>>({})
  const [selectedStore, setSelectedStore] = React.useState<string | null>(null)
  // collapsed by default
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  // Filter state (multi-select via checkbox)
  const [amenityFilter, setAmenityFilter] = React.useState<
    Record<string, boolean>
  >({})
  const [foodFilter, setFoodFilter] = React.useState<Record<string, boolean>>(
    {}
  )
  const [fuelFilter, setFuelFilter] = React.useState<Record<string, boolean>>(
    {}
  )

  const clearFilters = () => {
    setAmenityFilter({})
    setFoodFilter({})
    setFuelFilter({})
  }

  // Helper: does store satisfy all selected filters?
  function matchesFilters (s: StoreEntry): boolean {
    const a = { ...DEFAULT_AMENITIES, ...(s.amenities ?? {}) }
    const f = { ...DEFAULT_FOOD, ...(s.food ?? {}) }
    const fp = { ...DEFAULT_FUEL, ...(s.fuel ?? {}) }

    // if any amenity is checked, the store must have all checked ones true
    for (const k of AMENITY_FILTER_KEYS as readonly AmenityFilterKey[]) {
      if (amenityFilter[k] && !a[k as keyof Amenities]) return false
    }
    for (const k of Object.keys(foodFilter)) {
      if (foodFilter[k] && !f[k as keyof FoodPrograms]) return false
    }
    for (const k of Object.keys(fuelFilter)) {
      if (fuelFilter[k] && !fp[k as keyof FuelProviders]) return false
    }
    return true
  }

  React.useEffect(() => {
    const acc: Record<string, LatLng> = {}
    for (const [id, s] of Object.entries(stores)) {
      if (typeof s.lat === 'number' && typeof s.lng === 'number') {
        acc[id] = { lat: s.lat, lng: s.lng }
      }
    }
    setMarkers(acc)
  }, [stores])

  // On mount: read filters from URL
  React.useEffect(() => {
    const { amenity, food, fuel } = decodeFiltersFromSearch()
    if (Object.keys(amenity).length) setAmenityFilter(amenity)
    if (Object.keys(food).length) setFoodFilter(food)
    if (Object.keys(fuel).length) setFuelFilter(fuel)
    // If any filters are preselected, open the panel
    if (
      Object.keys(amenity).length ||
      Object.keys(food).length ||
      Object.keys(fuel).length
    ) {
      setFiltersOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Whenever filters change, write them to the URL (without reloading)
  React.useEffect(() => {
    const qs = encodeFiltersToSearch(amenityFilter, foodFilter, fuelFilter)
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname
    window.history.replaceState(null, '', newUrl)
  }, [amenityFilter, foodFilter, fuelFilter])

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!GOOGLE_KEY || !address.trim()) return
    const loc = await geocodeAddress(address.trim(), GOOGLE_KEY)
    if (loc) setUserPoint(loc)
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos =>
        setUserPoint({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const results = React.useMemo(() => {
    if (!userPoint)
      return [] as Array<{
        id: string
        entry: StoreEntry
        latlng: LatLng
        distance: number
        addr: string
      }>
    const arr = Object.entries(stores)
      .map(([id, s]) => {
        const addr = fullAddress(s)
        const ll = markers[id]
        if (!ll) return null
        return {
          id,
          entry: s,
          latlng: ll,
          distance: haversineMiles(userPoint, ll),
          addr
        }
      })
      .filter(Boolean) as Array<{
      id: string
      entry: StoreEntry
      latlng: LatLng
      distance: number
      addr: string
    }>
    return arr
      .filter(r => r.distance <= radius)
      .filter(r => matchesFilters(r.entry))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 30)
  }, [
    userPoint,
    radius,
    markers,
    stores,
    amenityFilter,
    foodFilter,
    fuelFilter
  ])

  const mapCenter = userPoint || results[0]?.latlng || initialCenter

  return (
    <main className='w-full overflow-x-clip bg-white -mt-5'>
      {/* Header / Search */}
      <section className='relative isolate w-full bg-gradient-to-br from-white via-white to-neutral-50'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.07]'
          style={{
            background:
              'repeating-linear-gradient(135deg, var(--tw-gradient-to) 0 2px, transparent 2px 22px)'
          }}
        />
        <div className='container mx-auto px-6 md:px-10'>
          <div className='py-10 md:py-16'>
            <h1 className="font-['Oswald'] text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Find a Clarks near you
            </h1>
            <p className='mt-2 text-black/70 text-lg md:text-xl max-w-prose'>
              To see nearby locations and available amenities, enter an address
              or select “Use My Location.”
            </p>

            <form
              onSubmit={handleSearch}
              className='mt-6 rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-sm'
            >
              <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                <input
                  type='text'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder='123 Main St, City, ST or ZIP'
                  className='flex-1 rounded-xl border border-black/10 px-4 py-3 text-black placeholder-black/50 outline-none focus:ring-2 focus:ring-brand'
                />
                <div className='flex items-center gap-2'>
                  <select
                    value={radius}
                    onChange={e => setRadius(Number(e.target.value))}
                    className='rounded-xl border border-black/10 px-3 py-3 text-black bg-white'
                    aria-label='Search radius'
                  >
                    {[10, 25, 50, 100].map(mi => (
                      <option key={mi} value={mi} className='text-black'>
                        {mi} miles
                      </option>
                    ))}
                  </select>
                  <button
                    type='submit'
                    className='rounded-xl bg-brand text-white px-5 py-3 hover:bg-brand/90 transition-colors'
                  >
                    Search
                  </button>
                  <button
                    type='button'
                    onClick={handleUseMyLocation}
                    className='rounded-xl bg-neutral-100 text-black px-4 py-3 hover:bg-neutral-200'
                  >
                    Use my location
                  </button>
                </div>
              </div>
              {!GOOGLE_KEY && (
                <p className='mt-3 text-sm text-red-600'>
                  Missing Google Maps key. Set{' '}
                  <code>VITE_GOOGLE_MAPS_API_KEY</code> in your .env.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map + results */}
      <section className='py-8 md:py-12 bg-white text-black'>
        <div className='container mx-auto px-6 md:px-10'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            {/* Results list (mobile after map) */}
            <div className='lg:col-span-5 order-2 lg:order-1'>
              <div className='flex items-center justify-between'>
                <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold text-black">
                  Nearby stores
                </h2>
                <div className='flex items-center gap-3'>
                  {userPoint && (
                    <span className='text-black/60 text-sm hidden sm:inline'>
                      {results.length} within {radius} mi
                    </span>
                  )}
                  <button
                    type='button'
                    onClick={() => setFiltersOpen(o => !o)}
                    className='text-sm rounded-xl border border-black/10 bg-white px-3 py-2 hover:bg-neutral-100'
                    aria-expanded={filtersOpen}
                    aria-controls='filters-panel'
                  >
                    {filtersOpen ? 'Hide filters' : 'Filters'}
                  </button>
                </div>
              </div>

              {/* Filters */}
              {filtersOpen && (
                <div
                  id='filters-panel'
                  className='mt-3 rounded-2xl border border-black/10 bg-white p-4'
                >
                  <FilterPanel
                    amenityFilter={amenityFilter}
                    setAmenityFilter={setAmenityFilter}
                    foodFilter={foodFilter}
                    setFoodFilter={setFoodFilter}
                    fuelFilter={fuelFilter}
                    setFuelFilter={setFuelFilter}
                    clearFilters={() => {
                      clearFilters()
                      // also clear URL immediately
                      window.history.replaceState(
                        null,
                        '',
                        window.location.pathname
                      )
                    }}
                  />
                </div>
              )}

              {/* Results */}
              <div className='mt-4 space-y-4'>
                {results.map(r => {
                  const { id, entry, distance, addr } = r
                  const a = { ...DEFAULT_AMENITIES, ...(entry.amenities ?? {}) }
                  const f = { ...DEFAULT_FOOD, ...(entry.food ?? {}) }
                  const fp = { ...DEFAULT_FUEL, ...(entry.fuel ?? {}) }

                  const amenityOn: AmenityKey[] = (
                    AMENITY_KEYS as readonly AmenityKey[]
                  ).filter(k => !!a[k as keyof Amenities])

                  return (
                    <article
                      key={id}
                      className='rounded-2xl border border-black/10 bg-white p-5 hover:shadow-md transition-shadow'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <div className="font-['Oswald'] font-bold text-lg text-black">
                            {entry.name || `Store #${id}`}
                          </div>
                          <div className='text-sm text-black/70'>{addr}</div>
                          {entry.phone && (
                            <div className='text-sm text-black/70 mt-1'>
                              {entry.phone}
                            </div>
                          )}
                          <div className='mt-2 text-xs text-black/60'>
                            {distance.toFixed(1)} mi away
                          </div>
                        </div>
                        <div className='text-right'>
                          <a
                            className='inline-flex items-center justify-center rounded-xl px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-sm'
                            href={directionsLink(addr)}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Directions
                          </a>
                        </div>
                      </div>

                      {/* Amenities (truthy only, dynamic) */}
                      {amenityOn.length > 0 && (
                        <ul className='mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-black/80'>
                          {amenityOn.map(k => (
                            <Amenity
                              key={k}
                              label={AMENITY_LABEL[k]}
                              on={true}
                            />
                          ))}
                        </ul>
                      )}

                      {/* Food (truthy only) */}
                      {FOOD_KEYS.filter(k => f[k]).length > 0 && (
                        <ul className='mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-black/80'>
                          {FOOD_KEYS.filter(k => f[k]).map(k => (
                            <Amenity key={k} label={FOOD_LABEL[k]} on={true} />
                          ))}
                        </ul>
                      )}

                      {/* Fuel Providers (truthy only) */}
                      {FUEL_KEYS.filter(k => fp[k]).length > 0 && (
                        <ul className='mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-black/80'>
                          {FUEL_KEYS.filter(k => fp[k]).map(k => (
                            <Amenity key={k} label={FUEL_LABEL[k]} on={true} />
                          ))}
                        </ul>
                      )}

                      {/* Hours */}
                      {(entry.store_hours || entry.alt_hours) && (
                        <details className='mt-3 group'>
                          <summary className='cursor-pointer list-none text-sm font-semibold text-brand'>
                            View hours
                          </summary>
                          <div className='mt-2 text-sm text-black/80'>
                            {entry.store_hours?.hours && (
                              <HoursBlock
                                title='Hours'
                                hours={entry.store_hours.hours}
                              />
                            )}
                            {entry.alt_hours?.hours && (
                              <HoursBlock
                                title='Alt Hours'
                                hours={entry.alt_hours.hours}
                              />
                            )}
                          </div>
                        </details>
                      )}

                      <div className='mt-3'>
                        <button
                          onClick={() => setSelectedStore(id)}
                          className='text-sm underline underline-offset-2'
                        >
                          Show on map
                        </button>
                      </div>
                    </article>
                  )
                })}

                {userPoint && results.length === 0 && (
                  <div className='rounded-xl border border-black/10 p-5 text-black/70'>
                    No stores within {radius} miles. Try a larger radius or
                    adjust filters.
                  </div>
                )}
              </div>
            </div>

            {/* Map (mobile before results) */}
            <div className='lg:col-span-7 order-1 lg:order-2'>
              <div className='h-[520px] md:h-[640px] rounded-2xl overflow-hidden border border-black/10 bg-neutral-100'>
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
                  <div className='h-full w-full grid place-items-center text-black/60 p-6 text-center'>
                    Missing Google Maps key. Set{' '}
                    <code>VITE_GOOGLE_MAPS_API_KEY</code> in your .env.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// ——— subcomponents ———
function MapCanvas ({
  apiKey,
  center,
  userPoint,
  markers,
  results,
  stores,
  selectedStore,
  setSelectedStore
}: {
  apiKey: string
  center: { lat: number; lng: number }
  userPoint: { lat: number; lng: number } | null
  markers: Record<string, { lat: number; lng: number }>
  results: Array<{ id: string }>
  stores: StoresMap
  selectedStore: string | null
  setSelectedStore: (id: string | null) => void
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'clarks-maps',
    googleMapsApiKey: apiKey, // <-- guaranteed non-empty
    libraries: ['places']
  })

  if (loadError) {
    return (
      <div className='h-full w-full grid place-items-center text-red-600'>
        Map failed to load. Check API restrictions.
      </div>
    )
  }
  if (!isLoaded) {
    return (
      <div className='h-full w-full grid place-items-center text-black/60'>
        Loading map…
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={userPoint ? 9 : 5}
    >
      {/* User pin */}
      {userPoint && (
        <Marker
          position={userPoint}
          icon={
            {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#1e90ff',
              fillOpacity: 1,
              scale: 6,
              strokeColor: 'white',
              strokeWeight: 2
            } as any
          }
          title='You'
        />
      )}

      {/* Store pins */}
      {Object.entries(markers).map(([id, pos]) => {
        const highlighted = !userPoint || results.some(r => r.id === id)
        return (
          <Marker
            key={id}
            position={pos}
            onClick={() => setSelectedStore(id)}
            opacity={highlighted ? 1 : 0.45}
            title={stores[id]?.name || `Store #${id}`}
          />
        )
      })}

      {/* InfoWindow */}
      {selectedStore && markers[selectedStore] && (
        <InfoWindow
          position={markers[selectedStore]}
          onCloseClick={() => setSelectedStore(null)}
        >
          <div className='max-w-[220px] text-black'>
            <div className='font-semibold'>
              {stores[selectedStore]?.name || `Store #${selectedStore}`}
            </div>
            <div className='text-xs text-black/70'>
              {fullAddress(stores[selectedStore] || {})}
            </div>
            <a
              href={directionsLink(fullAddress(stores[selectedStore] || {}))}
              target='_blank'
              rel='noreferrer'
              className='mt-2 inline-block text-xs text-brand underline'
            >
              Directions
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

function HoursBlock ({
  title,
  hours
}: {
  title: string
  hours: Record<string, string | undefined>
}) {
  const order = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'] as const
  const label: Record<typeof order[number], string> = {
    sun: 'Sun',
    mon: 'Mon',
    tues: 'Tue',
    wed: 'Wed',
    thur: 'Thu',
    fri: 'Fri',
    sat: 'Sat'
  }
  return (
    <div className='mt-1'>
      <div className='font-semibold'>{title}</div>
      <div className='mt-1 grid grid-cols-2 gap-y-1 text-xs'>
        {order.map(d =>
          hours[d] ? (
            <div key={d} className='flex justify-between pr-3'>
              <span className='text-black/60'>{label[d]}</span>
              <span className='text-black/90'>{hours[d]}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

function Amenity ({ label, on }: { label: string; on: boolean }) {
  return (
    <li className='flex items-center gap-2'>
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          on ? 'bg-brand' : 'bg-neutral-300'
        }`}
        aria-hidden
      />
      <span className={on ? 'text-black/90' : 'text-black/50'}>{label}</span>
    </li>
  )
}

function FilterPanel ({
  amenityFilter,
  setAmenityFilter,
  foodFilter,
  setFoodFilter,
  fuelFilter,
  setFuelFilter,
  clearFilters
}: {
  amenityFilter: Record<string, boolean>
  setAmenityFilter: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
  foodFilter: Record<string, boolean>
  setFoodFilter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  fuelFilter: Record<string, boolean>
  setFuelFilter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  clearFilters: () => void
}) {
  const toggle =
    (set: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) =>
    (key: string) =>
      set(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <div className="font-['Oswald'] text-lg font-bold">Filter</div>
        <button
          type='button'
          onClick={clearFilters}
          className='text-sm underline underline-offset-2 text-black/70 hover:text-black'
        >
          Clear all
        </button>
      </div>

      {/* Amenities */}
      <fieldset>
        <legend className='text-sm font-semibold text-black/80'>
          Amenities
        </legend>
        <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-2'>
          {AMENITY_FILTER_KEYS.map(k => (
            <label key={k} className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={!!amenityFilter[k]}
                onChange={() => toggle(setAmenityFilter)(k)}
              />
              <span>{AMENITY_LABEL[k]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Food */}
      <fieldset>
        <legend className='text-sm font-semibold text-black/80'>Food</legend>
        <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-2'>
          {FOOD_KEYS.map(k => (
            <label key={k} className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={!!foodFilter[k]}
                onChange={() => toggle(setFoodFilter)(k)}
              />
              <span>{FOOD_LABEL[k]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Fuel Providers */}
      <fieldset>
        <legend className='text-sm font-semibold text-black/80'>Fuel</legend>
        <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-2'>
          {FUEL_KEYS.map(k => (
            <label key={k} className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={!!fuelFilter[k]}
                onChange={() => toggle(setFuelFilter)(k)}
              />
              <span>{FUEL_LABEL[k]}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
