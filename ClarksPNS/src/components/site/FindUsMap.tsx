import { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { milesBetween, type Store } from '@/lib/stores'

// Real Google Map for a single store, sharing the exact loader config used by
// Locations.tsx (same id + libraries — required so both pages reuse one loader).
// Shows the precise pin from the store's geocoded lat/lng and, if the visitor
// grants location access, how many miles away they are.

const GOOGLE_KEY = (
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
)?.trim()

const LIBRARIES: 'places'[] = ['places']

function MapInner({ store }: { store: Store }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'clarks-maps',
    googleMapsApiKey: GOOGLE_KEY as string,
    libraries: LIBRARIES
  })

  if (loadError || !isLoaded) {
    return <MapFallback loading={!loadError} />
  }

  const center = { lat: store.lat as number, lng: store.lng as number }
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '240px' }}
      center={center}
      zoom={16}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        clickableIcons: false
      }}
    >
      <Marker position={center} title={`Clark’s Pump-N-Shop — ${store.name}`} />
    </GoogleMap>
  )
}

function MapFallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className='grid h-[240px] w-full place-items-center bg-[#eef1f7] text-sm text-black/50'>
      {loading ? 'Loading map…' : 'Map unavailable'}
    </div>
  )
}

export default function FindUsMap({ store }: { store: Store }) {
  const [miles, setMiles] = useState<number | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator) || store.lat == null || store.lng == null) return
    navigator.geolocation.getCurrentPosition(
      pos => {
        setMiles(
          milesBetween(
            { lat: pos.coords.latitude, lng: pos.coords.longitude },
            { lat: store.lat as number, lng: store.lng as number }
          )
        )
      },
      () => {}, // declined — just don't show distance
      { timeout: 8000 }
    )
  }, [store.lat, store.lng])

  const hasCoords = store.lat != null && store.lng != null

  return (
    <div>
      <div className='overflow-hidden rounded-xl border border-black/10'>
        {GOOGLE_KEY && hasCoords ? <MapInner store={store} /> : <MapFallback />}
      </div>
      {miles != null && (
        <div className='mt-3 text-sm text-black/70'>
          You’re about <span className='font-medium text-black'>{miles.toFixed(1)} miles</span> from this store.
        </div>
      )}
    </div>
  )
}
