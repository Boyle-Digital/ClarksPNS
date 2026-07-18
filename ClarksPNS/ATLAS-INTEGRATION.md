# ATLAS Integration Guide — Clark's Pump-N-Shop site

How the ATLAS agency OS can read from and operate this site. Everything
below is live in production (myclarkspns.com) once deployed.

## Repository

- GitHub: `Boyle-Digital/ClarksPNS` (app lives in the `ClarksPNS/` subdirectory)
- Deploys: push to `main` -> Vercel builds and ships production automatically
- Local working clone: `~/Downloads/ClarksPNS`

## 1. Sitewide notice banner (operable from ATLAS)

`ClarksPNS/public/notice.json` controls a banner shown under the live
ticker on every page:

```json
{
  "active": true,
  "message": "Route 5 store closed for repaving until Friday.",
  "link": "/locations/route-5-store-slug",
  "linkLabel": "Details",
  "tone": "info"
}
```

- `tone`: `"info"` (Medium Blue) or `"alert"` (red)
- Flip via the GitHub Contents API (commit to `main`; Vercel redeploys):
  `PUT /repos/Boyle-Digital/ClarksPNS/contents/ClarksPNS/public/notice.json`
- The banner is fetched with `cache: no-store`, so it takes effect on the
  next page load after deploy.

## 2. Data files (source of truth)

| File | What it is |
| --- | --- |
| `ClarksPNS/src/assets/data/stores.geocoded.json` | Raw store data (names, addresses, hours, amenities, lat/lng). Edit here first. |
| `ClarksPNS/src/content/stores.index.json` | Generated index used by the site. Regenerate with `pnpm stores` after editing the raw file. |
| `ClarksPNS/src/content/store-media.json` | Cloudinary URLs per store (hero, video, poster, gallery, thumbs). |
| `ClarksPNS/src/content/menus.ts` | Typed kitchen menus (transcribed from printed boards). |
| `ClarksPNS/public/sitemap.xml` | Generated with `pnpm stores` (81 URLs). |

## 3. Media pipeline (Cloudinary)

- Cloud name `yzpytwu5`; all assets under `clarks/stores/<slug>/...`
- Delivery pattern:
  `https://res.cloudinary.com/yzpytwu5/image/upload/f_auto,q_auto/v1/clarks/stores/<slug>/hero.jpg`
- Videos: `/video/upload/w_1280,q_auto:eco/v1/clarks/stores/<slug>/drone.mp4`
- Share cards are composed on the fly (see `ogImageUrl` in
  `src/lib/stores.ts`) — no pre-rendering needed.
- Upload credentials: local env file at
  `~/Downloads/clarks-store-pages/.cloudinary.env` (never committed).
- Master local media: `~/Downloads/clarks-media-web/<slug>/`.

## 4. Conversion events (Vercel Analytics)

Custom events ATLAS can report on from the Vercel dashboard/API:

| Event | Fired when | Props |
| --- | --- | --- |
| `directions_click` | Get Directions on a store page | `store` |
| `call_click` | Tap-to-call on a store page | `store` |
| `rewards_join_click` | Join button on Rewards hero | `placement` |
| `fleet_card_click` | Marathon fleet card CTA | `placement` |
| `road_trip` | Road Trip search on Locations | `from`, `to`, `found` |

## 5. Live behavior with no backend

- Ticker + open/closed states compute client-side from store hours.
- Weather touches (Car Wash wash-window, kerosene cold-snap notes) call
  Open-Meteo directly — free, keyless, fails silently.
- Search, Beacon Map, Road Trip are all client-side over the store index.

## 6. Standing content rules

- No fuel prices anywhere until Clark's provides a real pricing feed
  (ticker items have a reserved `price` slot).
- No emojis in UI; icons come from `src/components/site/Icons.tsx`.
- Display face: Bebas Neue (`font-display`); body: Inter.
- Anniversary/year-count claims are off-limits per client.

## Open items awaiting Clark's

Wash-location list, dog-park stores, flagship store number, GBP manager
access (Website deep-links + reviews), app store links, fleet rate table,
food codes GG/IC.
