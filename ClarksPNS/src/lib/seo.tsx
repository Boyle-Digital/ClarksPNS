import React from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.myclarkspns.com' // canonical root
const DEFAULT_TITLE = "Clark’s Pump-N-Shop — Return. Refresh. Refuel."
const DEFAULT_DESC = "Fast fuel, fresh food, and friendly service. Return. Refresh. Refuel."
const DEFAULT_IMAGE = `${SITE_URL}/og/og-default.jpg`
const TWITTER_SITE = '@clarkspnsbti'

export type SEOProps = {
  title?: string
  description?: string
  path?: string            // e.g. '/locations'
  image?: string           // absolute URL preferred
  robots?: string          // e.g. 'noindex,nofollow'
  canonical?: string       // absolute canonical override
  jsonLd?: any[]           // array of JSON-LD objects to inject
}

export function SEO({
  title,
  description,
  path,
  image,
  robots,
  canonical,
  jsonLd = []
}: SEOProps) {
  const pageUrl = canonical || (path ? `${SITE_URL}${path}` : SITE_URL)
  const metaTitle = title || DEFAULT_TITLE
  const metaDesc = description || DEFAULT_DESC
  const metaImage = image || DEFAULT_IMAGE

  return (
    <Helmet prioritizeSeoTags>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={pageUrl} />
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Clark’s Pump-N-Shop" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
    </Helmet>
  )
}
