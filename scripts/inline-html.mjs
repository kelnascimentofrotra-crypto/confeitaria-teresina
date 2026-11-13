// Junta o build em um único index.html (JS e CSS inline; imagens e fontes já embutidas pelo Vite).
// Uso: SINGLEFILE=1 vite build --outDir <dir> && node scripts/inline-html.mjs <dir>
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2] ?? 'dist-single'
let html = readFileSync(join(dir, 'index.html'), 'utf8')

html = html.replace(/<link rel="stylesheet"[^>]*href="\.?\/?([^"]+\.css)"[^>]*>/g, (_, href) => {
  const css = readFileSync(join(dir, href), 'utf8')
  return `<style>${css}</style>`
})
html = html.replace(/<script type="module"[^>]*src="\.?\/?([^"]+\.js)"[^>]*><\/script>/g, (_, src) => {
  const js = readFileSync(join(dir, src), 'utf8').replace(/<\/script/gi, '<\\/script')
  return `<script type="module">${js}</script>`
})
// O script precisa rodar depois do #root existir
const scripts = html.match(/<script type="module">[\s\S]*?<\/script>/g) ?? []
for (const s of scripts) html = html.replace(s, '')
html = html.replace('</body>', `${scripts.join('\n')}\n</body>`)
// Ícones externos não existem no arquivo único
html = html.replace(/\s*<link rel="(icon|apple-touch-icon|manifest)"[^>]*>/g, '')

writeFileSync(join(dir, 'index.html'), html)
console.log(`index.html único: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`)
