import handLogo from '../../assets/img/hand-logo.webp'
import { Reveal, RevealLines } from '../../components/Reveal'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '../../i18n'
import { Img } from '../../components/Img'

export function MobileMission() {
  const { t } = useI18n()
  const mm = t.mobile.mission
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Profundidade: a mão sobe um pouco mais devagar que a página e cresce 3% (só transform).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.97, 1.01, 1.03])

  return (
    <section data-nav="diferenciais" aria-labelledby="m-mission-title" className="relative overflow-hidden bg-black pt-16">
      <div className="m-wrap">
        <Reveal y={10}>
          <p className="m-eyebrow text-[#5cb2ff]">{mm.eyebrow}</p>
        </Reveal>
        <h2 id="m-mission-title" className="m-title mt-4 text-[clamp(2.1rem,10vw,2.6rem)]">
          <RevealLines lines={[...mm.lines, <span className="text-gradient-blue">{mm.highlight}</span>]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-white/80">{t.mission.text}</p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mx-auto mt-6 max-w-[34rem] overflow-hidden">
        <m.div style={{ y, scale }} className="will-change-transform">
        <Img
          src={handLogo}
          alt={t.mission.imageAlt}
          width={675}
          height={945}
          loading="lazy"
          decoding="async"
          className="ml-auto block w-[96%] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_80%,transparent_100%)]"
        />
        </m.div>
        <p className="m-wrap absolute inset-x-0 bottom-8 text-[0.88rem] leading-snug font-extrabold tracking-[0.06em] uppercase">
          {mm.taglineA} <span className="text-[#2b9bff]">{mm.taglineB}</span>
        </p>
      </div>
    </section>
  )
}
