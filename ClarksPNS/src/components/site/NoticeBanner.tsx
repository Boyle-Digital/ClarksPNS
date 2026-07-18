// Sitewide notice — controlled by /notice.json in the repo. Flip
// "active" to true, write the message, deploy (or edit via the GitHub
// API — see ATLAS-INTEGRATION.md) and every page shows the banner.
import { useEffect, useState } from 'react'

type Notice = {
  active: boolean
  message: string
  link?: string
  linkLabel?: string
  tone?: 'info' | 'alert'
}

export default function NoticeBanner() {
  const [notice, setNotice] = useState<Notice | null>(null)

  useEffect(() => {
    fetch('/notice.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(n => {
        if (n && n.active && n.message) setNotice(n)
      })
      .catch(() => {})
  }, [])

  if (!notice) return null

  const alert = notice.tone === 'alert'
  return (
    <div
      role='status'
      className={`${alert ? 'bg-[#a3261e]' : 'bg-brand-blue'} px-4 py-2 text-center text-white`}
    >
      <span className='text-sm font-medium'>{notice.message}</span>
      {notice.link && (
        <a
          href={notice.link}
          className='ml-3 text-sm font-semibold underline underline-offset-2'
        >
          {notice.linkLabel || 'Details'}
        </a>
      )}
    </div>
  )
}
