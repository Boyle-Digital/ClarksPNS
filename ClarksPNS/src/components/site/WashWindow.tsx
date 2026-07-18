// Wash window — reads the real 5-day rain forecast for the Tri-State
// (Ashland home office coordinates) and suggests the best day to wash.
// Open-Meteo, free, no key. Renders nothing if the forecast is unavailable.
import { useEffect, useState } from 'react'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function WashWindow() {
  const [line, setLine] = useState<string | null>(null)

  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=38.4784&longitude=-82.6379' +
      '&daily=precipitation_probability_max&forecast_days=5&timezone=auto'
    fetch(url)
      .then(r => r.json())
      .then(d => {
        const probs: number[] = d?.daily?.precipitation_probability_max || []
        const dates: string[] = d?.daily?.time || []
        if (!probs.length) return
        let best = -1
        for (let i = 1; i < probs.length; i++) {
          if (probs[i] <= 30) {
            best = i
            break
          }
        }
        if (best === -1) return
        const day = DAYS[new Date(dates[best] + 'T12:00:00').getDay()]
        setLine(
          `Shine weather ${day} — only a ${probs[best]}% chance of rain in the Tri-State.`
        )
      })
      .catch(() => {})
  }, [])

  if (!line) return null

  return (
    <div className='bg-[#0b153a] py-2.5 text-center'>
      <span className='font-display text-sm tracking-[0.1em] text-[#8be3ae]'>
        {line.toUpperCase()}
      </span>
    </div>
  )
}
