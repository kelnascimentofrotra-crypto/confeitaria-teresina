import handLogo from '../../assets/img/hand-logo.webp'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'

export function MobileMission() {
  const { t } = useI18n()
  const mm = t.mobile.mission

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

      <Reveal y={30} amount={0.15} className="relative mt-6">
        <img
          src={handLogo}
          alt={t.mission.imageAlt}
          width={675}
          height={945}
          loading="lazy"
          decoding="async"
          className="ml-auto block w-[96%] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_80%,transparent_100%)]"
        />
        <p className="m-wrap absolute inset-x-0 bottom-8 text-[0.88rem] leading-snug font-extrabold tracking-[0.06em] uppercase">
          {mm.taglineA} <span className="text-[#2b9bff]">{mm.taglineB}</span>
        </p>
      </Reveal>
    </section>
  )
}
