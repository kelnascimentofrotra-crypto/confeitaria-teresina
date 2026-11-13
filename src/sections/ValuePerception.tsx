import { QuoteButton } from '../components/QuoteButton'
import { Reveal, RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'

export function ValuePerception() {
  const { t } = useI18n()
  const v = t.value

  return (
    <section id="percepcao" data-nav="inicio" aria-labelledby="value-title" className="relative bg-ink py-16 sm:py-24">
      <div className="glow-band mx-auto w-[calc(100%-1rem)] max-w-[1640px] rounded-[26px] sm:w-[calc(100%-2.5rem)] sm:rounded-[34px]">
        <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <Reveal y={12}>
              <span className="inline-block border-y border-[#c9d3e6] py-1.5 text-[0.72rem] font-extrabold tracking-[0.2em] text-[#6b7891] uppercase">
                {v.eyebrow}
              </span>
            </Reveal>
            <h2
              id="value-title"
              className="mt-6 text-[clamp(2.1rem,4.3vw,3.7rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-[#0b1630]"
            >
              <RevealLines
                lines={[...v.titleLines, <>{v.titleLast} <span className="text-brand">{v.titleHighlight}</span></>]}
              />
            </h2>
          </div>

          <Reveal delay={0.15} className="lg:pt-10">
            <p className="text-[1.08rem] leading-relaxed font-medium text-[#13203d] sm:text-[1.2rem]">{v.body}</p>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-slate-ink">{v.mission}</p>
            <div className="mt-8">
              <QuoteButton variant="dark" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
