import { m } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import photo from '../../assets/img/hero-photo.webp'
import photo2x from '../../assets/img/hero-photo-2x.webp'
import { CtaButton } from '../../components/CtaButton'
import { QuoteButton } from '../../components/QuoteButton'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'

const ease = [0.22, 1, 0.36, 1] as const

/** Telas 1 e 2 da referência mobile, unidas numa sequência contínua (a foto aparece uma única vez). */
export function MobileHero() {
  const { t } = useI18n()
  const h = t.mobile.hero
  const z = t.mobile.zero

  return (
    <section
      id="inicio"
      data-nav="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(90%_40%_at_50%_58%,rgba(8,90,230,0.55),transparent_70%),linear-gradient(180deg,#040916_0%,#030a1f_45%,#02040b_100%)] pt-[68px]"
    >
      <div className="m-wrap pt-9">
        <m.p
          className="m-eyebrow flex items-center gap-2.5 text-[#5cb2ff]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_#11c8ff]" aria-hidden="true" />
          {h.eyebrow}
        </m.p>
        <h1 id="hero-title" className="m-title mt-4 text-[clamp(1.85rem,8.6vw,2.4rem)] uppercase">
          <RevealLines
            animateOnMount
            delay={0.35}
            lines={[...h.lines, ...h.highlight.map((l) => <span className="text-[#2b8bff]">{l}</span>)]}
          />
        </h1>
        <m.p
          className="mt-5 max-w-[22rem] text-[1.02rem] leading-relaxed text-white/85"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
        >
          {h.lead}
        </m.p>
        <m.div
          className="mt-7 flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
        >
          <QuoteButton arrow="up-right" className="btn-compact" />
          <CtaButton href="#projetos" variant="ghost" className="btn-compact !border-[#4d8dff]/80">
            {h.secondary}
          </CtaButton>
        </m.div>
      </div>

      {/* Foto natural em moldura iluminada */}
      <div className="relative mt-9 px-3">
        <div aria-hidden="true" className="halo-pulse absolute inset-x-0 top-[8%] bottom-[20%] rounded-[40px] bg-brand/45 blur-[42px]" />
        <m.div
          className="relative overflow-hidden rounded-t-[30px]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
        >
          <img
            src={photo}
            srcSet={`${photo} 448w, ${photo2x} 896w`}
            sizes="100vw"
            width={448}
            height={573}
            alt={t.hero.portraitAlt}
            fetchPriority="high"
            decoding="async"
            className="block aspect-[448/573] w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_50px_rgba(8,122,255,0.55)]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-b from-transparent via-[#030a1f]/80 to-[#030a1f]" />
        </m.div>
        <a
          href="#feito-sob-medida"
          className="m-eyebrow absolute right-6 bottom-[34%] flex items-center gap-2 text-[0.68rem] text-white/85"
        >
          {h.scroll}
          <ArrowDown size={20} className="animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        </a>
      </div>

      {/* Tela 2: Projetos do zero */}
      <div id="feito-sob-medida" className="m-wrap relative -mt-[26%] scroll-mt-24 pb-20">
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
