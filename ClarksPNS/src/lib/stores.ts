// Typed access to the generated per-store index (src/content/stores.index.json).
// Regenerate that file with `pnpm stores` (scripts/build-stores.mjs).
import storesIndex from '@/content/stores.index.json'

export type DayKey = 'sun' | 'mon' | 'tues' | 'wed' | 'thur' | 'fri' | 'sat'

export type Kitchen = { code: string; name: string | null }
export type DayHours = { open: number | null; close: number | null; label: string }
export type StoreAmenities = {
  carWash: boolean; diesel: boolean; def: boolean; atm: boolean
  beerCave: boolean; kerosene: boolean; e85: boolean; showers: boolean; rvDump: boolean
}
export type Store = {
  id: string
  slug: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  fuelBrand: string
  foodRaw: string
  kitchens: Kitchen[]
  hours: Record<DayKey, DayHours>
  open24: boolean
  amenities: StoreAmenities
  lat: number | null
  lng: number | null
}

export const allStores: Store[] = storesIndex as Store[]

export function getAllStores(): Store[] {
  return allStores
}

export function getStoreBySlug(slug?: string): Store | undefined {
  if (!slug) return undefined
  return allStores.find(s => s.slug === slug)
}

export const DAY_ORDER: DayKey[] = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun']
export const DAY_LABEL: Record<DayKey, string> = {
  sun: 'Sunday', mon: 'Monday', tues: 'Tuesday', wed: 'Wednesday',
  thur: 'Thursday', fri: 'Friday', sat: 'Saturday'
}
const JS_DAY_TO_KEY: DayKey[] = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat']

export function todayKey(d = new Date()): DayKey {
  return JS_DAY_TO_KEY[d.getDay()]
}

export type OpenState = { open: boolean | null; label: string }

// Uses the visitor's local clock (stores are Eastern Time — good enough for a badge).
export function openNow(store: Store, now = new Date()): OpenState {
  if (store.open24) return { open: true, label: 'Open 24 hours' }
  const t = store.hours[todayKey(now)]
  if (!t || t.open == null || t.close == null) return { open: null, label: 'Hours vary' }
  const frac = now.getHours() + now.getMinutes() / 60
  const isOpen = frac >= t.open && frac < t.close
  if (isOpen) return { open: true, label: `Open now · until ${fmtHour(t.close)}` }
  return { open: false, label: `Closed · opens ${fmtHour(t.open)}` }
}

export function fmtHour(h: number): string {
  if (h >= 24 || h === 0) return '12:00 AM'
  const ap = h >= 12 ? 'PM' : 'AM'
  let hr = h % 12; if (hr === 0) hr = 12
  return `${hr}:00 ${ap}`
}

export function namedKitchens(store: Store): string[] {
  return store.kitchens.map(k => k.name).filter((n): n is string => !!n)
}

function toRad(x: number) { return (x * Math.PI) / 180 }
export function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 3958.8
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function nearbyStores(store: Store, count = 3): Array<Store & { miles: number }> {
  if (store.lat == null || store.lng == null) return []
  const origin = { lat: store.lat, lng: store.lng }
  return allStores
    .filter(s => s.slug !== store.slug && s.lat != null && s.lng != null)
    .map(s => ({ ...s, miles: milesBetween(origin, { lat: s.lat as number, lng: s.lng as number }) }))
    .sort((a, b) => a.miles - b.miles)
    .slice(0, count)
}

export function fullAddress(store: Store): string {
  return `${store.address}, ${store.city}, ${store.state} ${store.zip}`.trim()
}

export function directionsHref(store: Store): string {
  const q =
    store.lat != null && store.lng != null
      ? `${store.lat},${store.lng}`
      : encodeURIComponent(fullAddress(store))
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`
}

export function priceCheckHref(store: Store): string {
  // Outbound to a live crowd-sourced source — we never publish a price we can't verify.
  return `https://www.gasbuddy.com/home?search=${encodeURIComponent(store.zip || fullAddress(store))}`
}

// Per-store JSON-LD for the store page (replaces the site-wide ItemList on /locations).
export function storeJsonLd(store: Store, siteUrl = 'https://www.myclarkspns.com') {
  const url = `${siteUrl}/locations/${store.slug}`
  const spec = DAY_ORDER
    .map(k => {
      const h = store.hours[k]
      if (!h || h.open == null || h.close == null) return null
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DAY_LABEL[k]}`,
        opens: `${String(h.open).padStart(2, '0')}:00`,
        closes: `${String(Math.min(h.close, 23)).padStart(2, '0')}:00`
      }
    })
    .filter(Boolean)

  const amenity = Object.entries({
    'Car Wash': store.amenities.carWash,
    Diesel: store.amenities.diesel,
    ATM: store.amenities.atm,
    E85: store.amenities.e85
  })
    .filter(([, v]) => v)
    .map(([name]) => ({ '@type': 'LocationFeatureSpecification', name, value: true }))

  return {
    '@context': 'https://schema.org',
    '@type': ['GasStation', 'ConvenienceStore'],
    name: `Clark’s Pump-N-Shop — ${store.name}`,
    url,
    telephone: store.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.city,
      addressRegion: store.state,
      postalCode: store.zip,
      addressCountry: 'US'
    },
    ...(store.lat != null && store.lng != null
      ? { geo: { '@type': 'GeoCoordinates', latitude: store.lat, longitude: store.lng } }
      : {}),
    ...(store.open24
      ? { openingHours: 'Mo-Su 00:00-24:00' }
      : spec.length
        ? { openingHoursSpecification: spec }
        : {}),
    ...(amenity.length ? { amenityFeature: amenity } : {})
  }
}
