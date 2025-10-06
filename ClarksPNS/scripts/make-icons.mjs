import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import toIco from 'png-to-ico'

const SRC = 'src/assets/icons/clarks-favicon.png' // source logo
const OUT = 'public/icons'

// include 16 & 32 so we can build a proper favicon.ico
const PNG_SIZES = [16, 32, 48, 72, 96, 144, 192, 256, 512]

fs.mkdirSync(OUT, { recursive: true })

for (const size of PNG_SIZES) {
  const out = path.join(OUT, `icon-${size}.png`)
  await sharp(SRC).resize(size, size, { fit: 'cover' }).png().toFile(out)
  console.log('made', out)
}

// Apple touch icon (iOS home screen)
await sharp(SRC).resize(180, 180, { fit: 'cover' })
  .png().toFile(path.join(OUT, 'apple-touch-icon.png'))
console.log('made', path.join(OUT, 'apple-touch-icon.png'))

// Safari pinned tab — placeholder monochrome; replace with your real SVG when ready
const maskPath = path.join(OUT, 'safari-pinned-tab.svg')
if (!fs.existsSync(maskPath)) {
  fs.writeFileSync(maskPath,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="16" />
</svg>`)
  console.log('made', maskPath)
}

// Build favicon.ico from 16px + 32px PNGs
const icoBuf = await toIco([
  path.join(OUT, 'icon-16.png'),
  path.join(OUT, 'icon-32.png')
])
const icoPath = path.join(OUT, 'favicon.ico')
fs.writeFileSync(icoPath, icoBuf)
console.log('made', icoPath)

console.log('✅ icons ready in public/icons')
