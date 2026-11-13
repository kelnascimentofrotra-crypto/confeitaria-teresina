import { m } from 'framer-motion'
import portrait from '../assets/img/hero-portrait.webp'
import portrait2x from '../assets/img/hero-portrait-2x.webp'
import portraitMid from '../assets/img/hero-mid.webp'
import { CtaButton } from '../components/CtaButton'
import { QuoteButton } from '../components/QuoteButton'
import { RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'
import { Img } from '../components/Img'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="inicio" data-nav="inicio" aria-labelledby="hero-title" className="hero hero-bg">
      <div className="hero-figure" aria-hidden="false">
        <m.div
          className="hero-halo halo-pulse"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <m.div
          className="hero-figure-inner"
          // a foto já nasce visível (só se move): não depende da animação para aparecer nem atrasa o LCP
          initial={{ y: 40, scale: 1.04 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.1, ease }}
        >
          <Img
            src={portrait}
            srcSet={`${portrait} 448w, ${portraitMid} 640w, ${portrait2x} 896w`}
            sizes="(min-width: 768px) 70vh, 44vh"
            width={448}
            height={573}
            alt={t.hero.portraitAlt}
            fetchPriority="high"
            decoding="async"
            className="hero-portrait"
          />
        </m.div>
      </div>

      <div className="hero-shade pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-content-inner container-wide grid gap-10">
          <div className="hero-main">
            <h1 id="hero-title" className="hero-headline">
              <RevealLines lines={t.hero.titleLines} animateOnMount delay={0.35} />
            </h1>
            <m.p
              className="hero-lead mt-5 max-w-md text-[1.02rem] leading-relaxed font-medium text-white/85 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
            >
              {t.hero.lead}
            </m.p>
            <m.div
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
            >
              <QuoteButton />
              <CtaButton href="#projetos" variant="ghost">
                {t.hero.secondary}
              </CtaButton>
            </m.div>
          </div>

          <m.div
            className="hero-side border-l-2 border-brand/70 pl-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
          >
            <p className="hero-side-title" aria-hidden="false">
              <span className="block">{t.hero.sideTitle[0]}</span>
              <span className="block">{t.hero.sideTitle[1]}</span>
            </p>
            <p className="hero-side-text mt-4 max-w-md text-[0.98rem] leading-relaxed font-medium text-white/85">
              {t.hero.sideText}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  )
}
