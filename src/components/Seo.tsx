import { useEffect } from 'react'
import { SEO_PAGES } from '../seoPages'

const MARKETING_ORIGIN = 'https://www.empireoflightcollective.com'
const APP_ORIGIN = 'https://app.empireoflightcollective.com'
const SITE_NAME = 'Empire of Light'

type SeoProps = {
  path: string
  /** Defaults to the entry for `path` in SEO_PAGES (src/seoPages.ts), which is also what the build bakes into each page's HTML. */
  title?: string
  description?: string
  /** Path to a 1200x630 share image under the site root. Defaults to the entry's image, then /og-image.png. */
  image?: string
  noindex?: boolean
  /** Which deployment this page lives on — marketing site (www) or the app (app.*). Defaults to marketing. */
  origin?: 'marketing' | 'app'
}

function setMetaByAttr(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title, meta description/robots, canonical link, and Open Graph/Twitter tags on route change.
 * These client-side updates cover Google/Bing and the browser tab. Link-preview bots (iMessage, Slack, LinkedIn...)
 * don't run JS, so the Vite build also writes each page's HTML with the same tags already in place (see vite.config.ts).
 */
export function Seo({ path, title: titleProp, description: descriptionProp, image, noindex: noindexProp, origin = 'marketing' }: SeoProps) {
  const page = SEO_PAGES[path]
  const title = titleProp ?? page?.title ?? SITE_NAME
  const description = descriptionProp ?? page?.description ?? ''
  const noindex = noindexProp ?? page?.noindex ?? false
  const imageUrl = `${MARKETING_ORIGIN}${image ?? page?.image ?? '/og-image.png'}`

  useEffect(() => {
    document.title = title
    setMetaByAttr('name', 'description', description)
    setMetaByAttr('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    const url = `${origin === 'app' ? APP_ORIGIN : MARKETING_ORIGIN}${path}`
    setLink('canonical', url)

    setMetaByAttr('property', 'og:title', title)
    setMetaByAttr('property', 'og:description', description)
    setMetaByAttr('property', 'og:url', url)
    setMetaByAttr('property', 'og:type', 'website')
    setMetaByAttr('property', 'og:site_name', SITE_NAME)
    setMetaByAttr('property', 'og:image', imageUrl)

    setMetaByAttr('name', 'twitter:card', 'summary_large_image')
    setMetaByAttr('name', 'twitter:title', title)
    setMetaByAttr('name', 'twitter:description', description)
    setMetaByAttr('name', 'twitter:image', imageUrl)
  }, [title, description, path, noindex, origin, imageUrl])

  return null
}
