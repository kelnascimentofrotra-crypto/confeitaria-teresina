import { m } from 'framer-motion'
import { ArrowRight, ChevronDown, CodeXml, Layers, Rocket } from 'lucide-react'
import type { CSSProperties } from 'react'
import portrait from '../../assets/img/hero-portrait.webp'
import portrait2x from '../../assets/img/hero-portrait-2x.webp'
import markLg from '../../assets/img/logo-mark-lg.webp'
import portraitMid from '../../assets/img/hero-mid.webp'
import { Img } from '../../components/Img'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'
import { isExternal, quoteHref } from '../../lib/contact'

const ease = [0.22, 1, 0.36, 1] as const

export function MobileHero() {
  const { t } = useI18n()
  const h = t.mobile.hero
  const z = t.mobile.zero
  const quote = quoteHref(t.cta.quoteMessage)
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <section
      id="inicio"
      data-nav="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(85%_32%_at_50%_26%,rgba(8,95,235,0.5),transparent_72%),linear-gradient(180deg,#030918_0%,#030a1f_55%,#02040b_100%)]"
    >
      <div className="relative flex flex-col pt-[68px]">
        {/* Foto real recortada, com o "N" oficial iluminado atrás */}
        <div className="relative mx-auto h-[clamp(220px,42.5svh,430px)] w-full max-w-[30rem]" aria-hidden="false">
          <m.div
            aria-hidden="true"
            className="absolute top-[6%] -right-[16%] w-[66%]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            {/* "N" oficial (imagem pequena) + brilho azul em CSS com a mesma silhueta, desenhado uma única vez */}
            <span className="relative block aspect-[247/228] w-full" style={{ '--n': `url(${markLg})` } as CSSProperties}>
              <span className="hero-n-halo">
                <span />
              </span>
              <span className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'var(--n)' }} />
            </span>
          </m.div>
          <m.div
            aria-hidden="true"
            className="halo-pulse absolute top-[12%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(17,130,255,0.55),transparent_65%)] blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease }}
          />
          {/* A foto começa visível (sem opacidade 0): só um leve movimento de entrada */}
          <m.div
            className="absolute inset-x-0 bottom-0 flex h-full justify-center"
            initial={{ y: 22, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
          >
            <Img
              src={portrait}
              srcSet={`${portrait} 448w, ${portraitMid} 640w, ${portrait2x} 896w`}
              sizes="(max-width: 480px) 76vw, 340px"
              width={448}
              height={573}
              alt={t.hero.portraitAlt}
              fetchPriority="high"
              decoding="async"
              className="m-hero-portrait h-full w-auto max-w-none"
            />
          </m.div>
        </div>

        <div className="m-wrap relative z-10 -mt-5 flex flex-col items-center pb-2 text-center">
          <m.span
            {...fade(0.3)}
            className="inline-flex items-center gap-2 rounded-full border border-[#3a86ff]/70 bg-[#061433]/85 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-[#a8d0ff] uppercase shadow-[0_0_18px_rgba(8,122,255,0.35)] backdrop-blur"
          >
            <CodeXml size={14} className="text-[#4da3ff]" aria-hidden="true" />
            {h.badge}
          </m.span>

          <h1
            id="hero-title"
            className="m-hero-title mt-3.5"
            style={{ '--chars': Math.max(...[...h.titleLines, h.titleHighlight].map((l) => l.length)) } as CSSProperties}
          >
            <RevealLines
              animateOnMount
              delay={0.38}
              lines={[
                ...h.titleLines,
                <span className="m-hero-underline text-[#2b8bff]">{h.titleHighlight}</span>,
              ]}
            />
          </h1>

          <m.p {...fade(0.7)} className="mt-3 max-w-[21rem] text-[0.97rem] leading-relaxed text-white/72">
            {h.intro}
          </m.p>

          <m.div {...fade(0.85)} className="mt-6 flex w-full max-w-[24rem] flex-col gap-3">
            <a
              href={quote}
              {...(isExternal(quote) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="m-hero-primary group flex h-14 w-full items-center justify-center gap-3 rounded-full text-[1.02rem] font-bold text-white"
            >
              <Rocket size={19} aria-hidden="true" className="transition-transform duration-300 group-active:-translate-y-0.5" />
              {t.cta.quote}
              <ArrowRight size={19} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              {isExternal(quote) && <span className="sr-only">{t.a11y.newTab}</span>}
            </a>
            <a
              href="#projetos"
              className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border border-white/28 bg-white/[0.03] text-[1rem] font-semibold text-white transition-[background-color,transform] duration-200 active:scale-[0.98] active:bg-white/10"
            >
              <Layers size={18} aria-hidden="true" />
              {h.projects}
            </a>
          </m.div>

          <m.a
            {...fade(1.05)}
            href="#feito-sob-medida"
            aria-label={h.scrollLabel}
            className="chev-float mt-4 flex min-h-12 min-w-12 flex-col items-center justify-center pt-4 text-[#2b8bff]"
          >
            <ChevronDown size={26} strokeWidth={2.6} className="drop-shadow-[0_0_8px_rgba(17,140,255,0.9)]" aria-hidden="true" />
            <ChevronDown size={26} strokeWidth={2.6} className="-mt-4 opacity-70 drop-shadow-[0_0_8px_rgba(17,140,255,0.9)]" aria-hidden="true" />
          </m.a>
        </div>
      </div>

      {/* Tela 2: Projetos do zero */}
      <div id="feito-sob-medida" className="m-wrap relative scroll-mt-24 pt-14 pb-20">
        <Reveal y={16}>
          <p className="m-eyebrow font-medium text-[#6fa8e6]">{z.eyebrow}</p>
        </Reveal>
        <h2 className="m-title mt-3 text-[clamp(3rem,15vw,4.1rem)] leading-[0.95] uppercase">
          <RevealLines
            lines={[
              <span className="bg-linear-to-r from-white via-white to-[#a9c5ef] bg-clip-text text-transparent">{z.title}</span>,
              <span className="text-gradient-blue">{z.highlight}</span>,
            ]}
          />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-white/85">{t.hero.sideText}</p>
          <span className="bar-accent mt-8 !w-[5.5rem]" aria-hidden="true" />
        </Reveal>
        <ol className="mt-10 grid grid-cols-3 gap-3">
          {z.stats.map((s, i) => (
            <li key={s} className="border-t border-white/20 pt-4">
              <Reveal delay={0.1 + i * 0.1} y={14}>
                <span className="block text-[1.85rem] leading-none font-extrabold text-[#3aa2ff]">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-2 block text-[0.92rem] text-white/85">{s}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
