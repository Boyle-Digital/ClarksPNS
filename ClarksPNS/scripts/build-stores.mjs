// Generates src/content/stores.index.json (one record per real store, with a
// stable URL slug) and public/sitemap.xml (static pages + every store page).
// Source of truth: src/assets/data/stores.geocoded.json
// Run: node scripts/build-stores.mjs   (also exposed as `pnpm stores`)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE = 'https://www.myclarkspns.com'

const raw = JSON.parse(
  readFileSync(resolve(ROOT, 'src/assets/data/stores.geocoded.json'), 'utf8')
)

// Recognized in-house food brands. Unknown codes (e.g. GG, IC) are kept in
// `foodRaw` but not shown as a named kitchen until Clark's confirms them.
const FOOD_MAP = {
  KK: 'Krispy Krunchy Chicken',
  H54: 'Hangar 54',
  'Café': "Clark's Café",
  Cafe: "Clark's Café",
  Champs: 'Champs Pizza',
  Coopers: 'Coopers'
}

const kebab = s =>
  String(s || '')
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const parseFood = fp =>
  String(fp || '')
    .split('/')
    .map(t => t.trim())
    .filter(Boolean)
    .map(code => ({ code, name: FOOD_MAP[code] || null }))

// "5-11" => open 05:00, close 23:00 ; "7-11" => 07:00-23:00
function parseHours(hoursObj, open24) {
  const days = ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat']
  const out = {}
  for (const d of days) {
    if (open24) { out[d] = { open: 0, close: 24, label: 'Open 24 hours' }; continue }
    const v = String((hoursObj && hoursObj[d]) || '').trim()
    const m = v.match(/^(\d{1,2})\s*-\s*(\d{1,2})$/)
    if (!m) { out[d] = { open: null, close: null, label: v || 'Call for hours' }; continue }
    let o = parseInt(m[1], 10)
    let c = parseInt(m[2], 10)
    if (c === o) { out[d] = { open: 0, close: 24, label: 'Open 24 hours' }; continue }
    const c24 = c <= 12 ? (c === 12 ? 12 : c + 12) : c // 11 -> 23
    out[d] = { open: o, close: c24, label: `${fmt(o)} – ${fmt(c24)}` }
  }
  return out
}
function fmt(h) {
  if (h === 24 || h === 0) return h === 0 ? '12:00 AM' : '12:00 AM'
  const ap = h >= 12 ? 'PM' : 'AM'
  let hr = h % 12; if (hr === 0) hr = 12
  return `${hr}:00 ${ap}`
}

const entries = Object.entries(raw)
const seen = new Map()
const stores = []

// Source data has inconsistent phone formats ("606)393-1164.", "(304) 803.7257");
// normalize to (XXX) XXX-XXXX so tel: links and display are always valid.
function formatPhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')
  if (digits.length !== 10) return String(raw || '').trim()
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

for (const [id, s] of entries) {
  if (!s || !s.name || !s.address || !s.city || !s.state) continue // skip bulk plants / blank rows
  let slug = kebab(`${s.name}-${s.city}-${s.state}`)
  if (seen.has(slug)) slug = `${slug}-${id}` // guarantee uniqueness, stays stable per id
  seen.set(slug, true)

  const amen = s.amenities || {}
  stores.push({
    id,
    slug,
    name: s.name,
    address: s.address,
    city: s.city,
    state: s.state,
    zip: s.zip || '',
    phone: formatPhone(s.phone),
    fuelBrand: s.brand || '',
    foodRaw: s.food_programs || '',
    kitchens: parseFood(s.food_programs),
    hours: parseHours(s.store_hours && s.store_hours.hours, !!amen.open24Hours),
    open24: !!amen.open24Hours,
    amenities: {
      carWash: !!amen.carWash || !!amen.carwash,
      diesel: !!amen.diesel,
      def: !!amen.def,
      atm: !!amen.atm,
      beerCave: !!amen.beerCave,
      kerosene: !!amen.kerosene,
      e85: !!amen.e85,
      showers: !!amen.showers,
      rvDump: !!amen.rvDump
    },
    lat: typeof s.lat === 'number' ? s.lat : null,
    lng: typeof s.lng === 'number' ? s.lng : null
  })
}

mkdirSync(resolve(ROOT, 'src/content'), { recursive: true })
writeFileSync(
  resolve(ROOT, 'src/content/stores.index.json'),
  JSON.stringify(stores, null, 2) + '\n'
)

// ---- sitemap ----
const staticUrls = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/food', changefreq: 'weekly' },
  { loc: '/clarks-rewards', changefreq: 'monthly' },
  { loc: '/car-wash', changefreq: 'monthly' },
  { loc: '/locations', changefreq: 'daily' },
  { loc: '/about-us', changefreq: 'monthly' },
  { loc: '/careers', changefreq: 'weekly' }
]
const urlXml = ({ loc, changefreq, priority }) =>
  `  <url><loc>${SITE}${loc}</loc>` +
  (changefreq ? `<changefreq>${changefreq}</changefreq>` : '') +
  (priority ? `<priority>${priority}</priority>` : '') +
  `</url>`
const storeXml = st =>
  `  <url><loc>${SITE}/locations/${st.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  staticUrls.map(urlXml).join('\n') + '\n' +
  stores.map(storeXml).join('\n') + '\n' +
  `</urlset>\n`
writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap)

console.log(`✓ ${stores.length} stores → src/content/stores.index.json`)
console.log(`✓ sitemap.xml with ${staticUrls.length + stores.length} urls`)
const dupes = stores.length - new Set(stores.map(s => s.slug)).size
console.log(dupes === 0 ? '✓ all slugs unique' : `✗ ${dupes} duplicate slugs`)
