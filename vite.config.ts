import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Injeta as tags que dependem do domínio final (canonical, og:url, og:image absoluta)
 * e gera robots.txt / sitemap.xml. Sem SITE_URL, nada que dependa de domínio é inventado.
 */
function seo(siteUrl: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '')
  return {
    name: 'nexaweb-seo',
    transformIndexHtml(html) {
      if (!url) return html
      return html
        .replace('content="/og-image.jpg"', `content="${url}/og-image.jpg"`)
        .replace(
          '<!-- seo:domain -->',
          `<link rel="canonical" href="${url}/" />\n    <meta property="og:url" content="${url}/" />`,
        )
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', url ? `Sitemap: ${url}/sitemap.xml` : '']
        .filter(Boolean)
        .join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots + '\n' })
      if (url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL ?? '')],
    build: { target: 'es2020', cssCodeSplit: false },
  }
})
