import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Domínio público do site. Pode ser trocado no build com a variável SITE_URL (ex.: domínio próprio). */
const DEFAULT_SITE_URL = 'https://nexawebagency1.vercel.app'

/**
 * SEO no HTML inicial (lido pelos robôs de WhatsApp, Facebook, LinkedIn etc., que não executam JavaScript):
 * troca __SITE_URL__ pela URL absoluta em todas as metatags, pré-carrega a foto do hero
 * e gera robots.txt e sitemap.xml.
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
        const mid = find(/hero-mid-[\w-]+\.webp$/)
        const tags: string[] = []
        if (cut && cut2x && mid) {
          const set = `${base}${cut} 448w, ${base}${mid} 640w, ${base}${cut2x} 896w`
          tags.push(
            `<link rel="preload" as="image" fetchpriority="high" media="(max-width: 767px)" href="${base}${cut}" imagesrcset="${set}" imagesizes="(max-width: 480px) 76vw, 340px" />`,
            `<link rel="preload" as="image" fetchpriority="high" media="(min-width: 768px)" href="${base}${cut}" imagesrcset="${set}" imagesizes="70vh" />`,
          )
        }
        html = html.replace('<link rel="canonical"', `${tags.join('\n    ')}\n    <link rel="canonical"`)
      }
      return html.replaceAll('__SITE_URL__', url)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
      })
    },
  }
}

/** SINGLEFILE=1: build com imagens e fontes embutidas (para hospedagens que só aceitam um HTML). */
const singleFile = process.env.SINGLEFILE === '1'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL || DEFAULT_SITE_URL)],
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
