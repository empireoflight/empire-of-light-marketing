import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SEO_PAGES } from './src/seoPages.ts'
import type { PageSeo } from './src/seoPages.ts'

const ORIGIN = 'https://www.empireoflightcollective.com'

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Rewrites the title, description, canonical, Open Graph, and Twitter tags in index.html for one page. Throws if a tag is missing, so a change to index.html can't silently skip a page. */
function withPageTags(html: string, path: string, page: PageSeo): string {
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  const url = `${ORIGIN}${path}`
  const image = `${ORIGIN}${page.image ?? '/og-image.png'}`
  const robots = page.noindex ? 'noindex, nofollow' : 'index, follow'
  const replacements: [RegExp, string][] = [
    [/<title>[\s\S]*?<\/title>/, `<title>${page.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>`],
    [/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`],
    [/<meta\s+name="robots"[\s\S]*?\/>/, `<meta name="robots" content="${robots}" />`],
    [/<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${url}" />`],
    [/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${title}" />`],
    [/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${description}" />`],
    [/<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`],
    [/<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${image}" />`],
    [/<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${title}" />`],
    [/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${description}" />`],
    [/<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${image}" />`],
  ]
  return replacements.reduce((out, [pattern, replacement]) => {
    if (!pattern.test(out)) throw new Error(`page-meta: ${pattern} not found in index.html while building ${path}`)
    return out.replace(pattern, () => replacement)
  }, html)
}

/**
 * Link-preview bots (iMessage, Slack, LinkedIn, Facebook...) don't run JavaScript, so a client-side <Seo> alone shows
 * every page with the home page's tags. This writes one copy of index.html per page (dist/<path>/index.html) with that
 * page's own tags baked in. Vercel serves a real file before the SPA rewrite, and React takes over as usual once loaded.
 * The tags come from SEO_PAGES in src/seoPages.ts.
 */
function pageMeta(): Plugin {
  return {
    name: 'page-meta',
    apply: 'build',
    enforce: 'post',
    // Runs after Vite's own HTML plugin has emitted index.html into the bundle.
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html']
        if (!index || index.type !== 'asset') throw new Error(`page-meta: index.html asset not found (bundle has: ${Object.keys(bundle).join(', ')})`)
        const template = typeof index.source === 'string' ? index.source : new TextDecoder().decode(index.source)
        for (const [path, page] of Object.entries(SEO_PAGES)) {
          const html = withPageTags(template, path, page)
          if (path === '/') index.source = html
          else this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: html })
        }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), pageMeta()],
  server: { port: 5174, strictPort: true },
})
