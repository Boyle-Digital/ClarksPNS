// Cold-snap kerosene note — only renders on stores that actually carry
// kerosene, and only when the 3-day forecast at that store's coordinates
// dips below freezing. Weather from Open-Meteo (free, no key).
import { useEffect, useState } from 'react'
import type { Store } from '@/lib/stores'

export default function ColdSnapNote({ store }: { store: Store }) {
  const [cold, setCold] = useState(false)

  useEffect(() => {
    if (store.lat == null || store.lng == null) return
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${store.lat}&longitude=${store.lng}` +
      `&daily=temperature_2m_min&temperature_unit=fahrenheit&forecast_days=3&timezone=auto`
    fetch(url)
      .then(r => r.json())
      .then(d => {
        const mins: number[] = d?.daily?.temperature_2m_min || []
        if (mins.some(m => m <= 32)) setCold(true)
      })
      .catch(() => {})
  }, [store.lat, store.lng])

  if (!cold) return null

  return (
    <p className='mt-3 text-sm text-black/70'>
      Freezing temperatures in the forecast — this store carries kerosene.
    </p>
  )
}
