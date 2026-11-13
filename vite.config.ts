import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Injeta as tags que dependem do domínio final (canonical, og:url, og:image absoluta)
 * e gera robots.txt / sitemap.xml. Sem SITE_URL, nada que dependa de domínio é inventado.
 */
function seo(siteUrl: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '')
  let base = '/'
  return {
    name: 'nexaweb-seo',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(html, ctx) {
      // A foto do hero começa a baixar antes do JavaScript (melhora o LCP).
      // No build de arquivo único as imagens já vão embutidas, então não há o que pré-carregar.
      if (ctx.bundle && !singleFile) {
        const find = (re: RegExp) => Object.keys(ctx.bundle!).find((f) => re.test(f))
        const cut = find(/hero-portrait-(?!2x)[\w-]+\.webp$/)
        const cut2x = find(/hero-portrait-2x-[\w-]+\.webp$/)
        const tags: string[] = []
        if (cut && cut2x)
          tags.push(
            `<link rel="preload" as="image" fetchpriority="high" media="(max-width: 767px)" href="${base}${cut}" imagesrcset="${base}${cut} 448w, ${base}${cut2x} 896w" imagesizes="(max-width: 480px) 76vw, 340px" />`,
          )
        if (cut && cut2x)
          tags.push(
            `<link rel="preload" as="image" fetchpriority="high" media="(min-width: 768px)" href="${base}${cut}" imagesrcset="${base}${cut} 448w, ${base}${cut2x} 896w" imagesizes="70vh" />`,
          )
        html = html.replace('<!-- seo:domain -->', `${tags.join('\n    ')}\n    <!-- seo:domain -->`)
      }
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

/** SINGLEFILE=1: build com imagens e fontes embutidas (para hospedagens que só aceitam um HTML). */
const singleFile = process.env.SINGLEFILE === '1'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL ?? '')],
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      ...(singleFile && {
        assetsInlineLimit: () => true,
        modulePreload: false,
        rollupOptions: { output: { inlineDynamicImports: true } },
      }),
    },
  }
})
