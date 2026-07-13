import stores from '@/assets/data/stores.geocoded.json'
import { allStores } from '@/lib/stores'

const SLUG_BY_ID: Record<string, string> = Object.fromEntries(
  allStores.map(s => [s.id, s.slug])
)

// Generates a lightweight ItemList of LocalBusiness entries for the Locations page.
// Each item now links to that store's own page.
export function buildLocationsItemList(siteUrl = 'https://www.myclarkspns.com') {
  const items = Object.entries(stores).map(([id, s]: any, idx) => {
    const address = `${s.address}, ${s.city}, ${s.state} ${s.zip}`
    return {
      "@type": "ListItem",
      "position": idx + 1,
      "url": SLUG_BY_ID[id] ? `${siteUrl}/locations/${SLUG_BY_ID[id]}` : `${siteUrl}/locations`,
      "item": {
        "@type": ["ConvenienceStore","GasStation"],
        "name": `Clark’s Pump-N-Shop — ${s.name}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": s.address,
          "addressLocality": s.city,
          "addressRegion": s.state,
          "postalCode": s.zip,
          "addressCountry": "US"
        },
        "telephone": s.phone,
        ...(s.lat && s.lng ? { "geo": { "@type": "GeoCoordinates", "latitude": s.lat, "longitude": s.lng } } : {}),
        // Optional opening hours (transform "7-11" etc. to schema format if desired)
        // "openingHoursSpecification": [],
        "amenityFeature": Object.entries(s.amenities || {}).map(([k,v]: any) => ({
          "@type": "LocationFeatureSpecification",
          "name": k,
          "value": Boolean(v)
        }))
      }
    }
  })

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Clark’s Pump-N-Shop Locations",
    "itemListElement": items
  }
}
