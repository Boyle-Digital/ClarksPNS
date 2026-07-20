// The Beacon Map — a real Google Map in Clark's night styling. Every
// store is a glowing pin at its exact coordinates: green = open right
// now (computed from real hours), red = closed. Click a pin to open
// that store's page. Renders nothing if the Maps key is unavailable.
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { allStores, openNow } from '@/lib/stores'

const GOOGLE_KEY = (
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
)?.trim()

const LIBRARIES: 'places'[] = ['places']
const CENTER = { lat: 38.35, lng: -83.6 }

/** Clark's night styling — navy world, readable state and city labels. */
const NIGHT_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#101c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8fa0c9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b153a' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4a5a8f' }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#5b6ca6' }, { weight: 1.5 }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#b8c4e6' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1b2f7d' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2a3f8f' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b153a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#5b6ca6' }] }
]

export default function BeaconMap() {
  const navigate = useNavigate()

  if (!GOOGLE_KEY) return null
  return <BeaconMapInner onOpen={slug => navigate(`/locations/${slug}`)} />
}

function BeaconMapInner({ onOpen }: { onOpen: (slug: string) => void }) {
  const { isLoaded } = useJsApiLoader({
    id: 'clarks-maps',
    googleMapsApiKey: GOOGLE_KEY as string,
    libraries: LIBRARIES
  })

  const pins = useMemo(
    () =>
      allStores
        .filter(s => s.lat != null && s.lng != null)
        .map(s => ({ store: s, open: openNow(s).open !== false })),
    []
  )

  if (!isLoaded) {
    return (
      <div className='grid h-[420px] w-full place-items-center rounded-2xl border border-white/15 bg-white/5 text-sm text-white/60'>
        Lighting the beacons…
      </div>
    )
  }

  return (
    <div>
      <div className='overflow-hidden rounded-2xl border border-white/15'>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '420px' }}
          center={CENTER}
          zoom={7}
          options={{
            styles: NIGHT_STYLES,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'cooperative',
            backgroundColor: '#0b153a'
          }}
        >
          {pins.map(({ store, open }) => (
            <Marker
              key={store.slug}
              position={{ lat: store.lat as number, lng: store.lng as number }}
              title={`${store.name} — ${store.city}, ${(store.state || '').toUpperCase()} (${open ? 'open now' : 'closed'})`}
              onClick={() => onOpen(store.slug)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: open ? '#2fd06f' : '#ff4d4d',
                fillOpacity: 0.95,
                strokeColor: '#ffffff',
                strokeOpacity: 0.7,
                strokeWeight: 1.5
              }}
            />
          ))}
        </GoogleMap>
      </div>
      <div className='mt-2 text-center text-xs text-white/50'>
        Every pin is a real Clark’s — green means open right now. Tap one
        to visit that store.
      </div>
    </div>
  )
}
