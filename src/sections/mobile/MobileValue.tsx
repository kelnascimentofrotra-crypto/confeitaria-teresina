import { QuoteButton } from '../../components/QuoteButton'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'

export function MobileValue() {
  const { t } = useI18n()
  const v = t.mobile.value

  return (
    <section id="percepcao" data-nav="inicio" aria-labelledby="m-value-title" className="glow-band relative my-3 overflow-hidden rounded-[2rem] py-16 text-[#0b1630]">
      {/* Arco azul decorativo (canto inferior direito) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[35%] -bottom-[18%] aspect-square w-[95%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#e7f1ff_45%,#cfe3ff_70%,transparent_72%)] shadow-[-10px_-10px_40px_rgba(120,180,255,0.35)]"
      />
      <div className="m-wrap relative">
        <Reveal y={10}>
          <p className="m-eyebrow text-[#6b7891]">{t.value.eyebrow}</p>
        </Reveal>
        <h2 id="m-value-title" className="m-title mt-5 text-[clamp(2.15rem,10.4vw,2.75rem)]">
          <RevealLines lines={[...v.lines, <span className="text-brand">{v.highlight}</span>]} />
        </h2>
        <Reveal delay={0.1}>
          <span className="bar-accent mt-8 !w-[5.5rem]" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.15} className="relative mt-10">
          <blockquote className="m-card-light relative p-7 pr-12 text-[1.08rem] leading-relaxed text-[#1c2a47]">
            <span aria-hidden="true" className="absolute top-1 right-4 font-serif text-[4.5rem] leading-none text-[#c9dcf7]">
              &rdquo;
            </span>
            <p className="relative">{v.quote}</p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-7 px-1 text-[1rem] leading-relaxed text-[#5b6884]">{v.text}</p>
          <div className="mt-8">
            <QuoteButton variant="dark" arrow="up-right" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
