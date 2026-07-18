// Conversion tracking — named events into Vercel Analytics.
import { track as vercelTrack } from '@vercel/analytics'

export function track(event: string, data?: Record<string, string | number>) {
  try {
    vercelTrack(event, data)
  } catch {
    // analytics must never break the site
  }
}
