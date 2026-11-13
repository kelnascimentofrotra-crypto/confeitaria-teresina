# NEXAWEB — Portfólio institucional

Site one-page da NEXAWEB, construído a partir do guia de design aprovado (telas, logo e foto originais).

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS 4 · Framer Motion · Manrope (self-hosted)

## Rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # build de produção em dist/
npm run preview    # serve o build
npm run lint       # ESLint
```

## O que configurar antes de publicar

| O quê | Onde |
| --- | --- |
| WhatsApp, e-mail e Instagram reais | `src/config/site.ts` |
| Projetos reais (print, nome, ano, link) | `src/data/projects.ts` |
| Domínio (Open Graph, canonical, sitemap) | padrão `https://nexawebagency.vercel.app`; troque com a variável `SITE_URL` |

Nada disso foi inventado. Enquanto estiverem vazios:
- **Solicitar orçamento** leva à seção de contato (com WhatsApp preenchido, abre o WhatsApp com mensagem pronta);
- canais de contato não aparecem; o formulário valida, mas avisa que o envio ainda não está configurado;
- o portfólio mostra ilustrações dos formatos de projeto, marcadas como "Ilustração".

## Estrutura

```
src/
  config/site.ts        contatos
  data/projects.ts      projetos reais
  i18n/                 textos PT/EN (pt.ts, en.ts) + provider com localStorage
  components/           Header, MenuDrawer, botões, Reveal, ContactForm, ilustrações
  sections/             as 10 seções na ordem do guia + Footer
  assets/img/           imagens otimizadas (WebP)
brand/                  logo, ícone e foto originais (fonte)
docs/referencias-aprovadas/   as 9 telas aprovadas usadas como direção de arte
```

## Origem das imagens

- **Retrato do hero:** foto real fornecida (`brand/FOTO_HERO_CASACO.png`), apenas com o fundo removido e uma luz azul adicionada *atrás* da silhueta. Rosto sem retoque.
- **Logo:** extraído do arquivo original sobre preto, sem redesenho.
- **Carteira, Terra, mão com o logo e nuvens:** recortados das telas aprovadas (`docs/referencias-aprovadas/`).
- Os prints de Instagram de terceiros do guia **não** foram incluídos no projeto.

## Prévia de compartilhamento (Open Graph)

- Imagem: `public/og-image.jpg` (1200×630), gerada por `scripts/make-og-image.py`.
- Metatags no `index.html` (HTML inicial, lido pelos robôs sem JavaScript). `__SITE_URL__` é trocado no build
  pela URL absoluta do site.
- Depois de publicar, teste em https://developers.facebook.com/tools/debug/ (botão "Scrape Again" limpa o cache).
