import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'

const ease = [0.22, 1, 0.36, 1] as const

function Steps({ start, steps }: { start: number; steps: Array<{ title: string; text: string }> }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  // A linha azul cresce de acordo com o quanto a lista já passou pela tela.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 62%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <ol ref={ref} start={start + 1} className="relative mt-9">
      {/* trilho claro + linha de progresso */}
      <span aria-hidden="true" className="absolute top-[1.65rem] bottom-10 left-[1.65rem] w-[3px] -translate-x-1/2 rounded-full bg-[#cfe0f7]" />
      <m.span
        aria-hidden="true"
        className="absolute top-[1.65rem] bottom-10 left-[1.65rem] w-[3px] -translate-x-1/2 origin-top rounded-full bg-linear-to-b from-[#087aff] to-[#3fa6ff] shadow-[0_0_10px_rgba(8,122,255,0.5)]"
        style={{ scaleY: reduce ? 1 : progress }}
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[3.3rem_1fr] gap-4 pb-6 last:pb-0">
          <div className="relative flex justify-center">
            <m.span
              className="step-bubble relative z-10 !h-[3.3rem] !w-[3.3rem] !text-[1.15rem]"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, ease }}
            >
              {String(start + i + 1).padStart(2, '0')}
            </m.span>
          </div>
          <Reveal x={18} y={0} amount={0.4}>
            <div className="m-card-light min-h-[9.5rem] p-6 transition-transform duration-300 active:scale-[0.99]">
              <h3 className="text-[1.3rem] font-bold tracking-[-0.02em] text-[#0b1630]">{s.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-[#5b6884]">{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export function MobileProcess() {
  const { t } = useI18n()
  const p = t.process
  const mp = t.mobile.process

  return (
    <section id="entrega" data-nav="entrega" aria-labelledby="m-process-title" className="relative z-10 rounded-b-[2rem] bg-snow py-16 text-[#0b1630] shadow-[0_18px_40px_-10px_rgba(8,122,255,0.55)]">
      <div className="m-wrap">
        <Reveal y={10}>
          <span className="m-badge m-badge-light">{p.badge}</span>
        </Reveal>
        <h2 id="m-process-title" className="m-title mt-5 text-[clamp(1.9rem,9vw,2.4rem)]">
          <RevealLines lines={[mp.title, <span className="text-brand">{mp.highlight}</span>]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-3 text-[0.98rem] text-[#5b6884]">{mp.subtitle}</p>
        </Reveal>
        <Steps start={0} steps={p.steps.slice(0, 3)} />

        <div className="mt-16">
          <Reveal y={10}>
            <span className="m-badge m-badge-light">{mp.midBadge}</span>
          </Reveal>
          <h3 className="m-title mt-5 text-[clamp(1.9rem,9vw,2.4rem)]">
            <RevealLines lines={[<>{mp.midTitle} <span className="text-brand">{mp.midHighlight}</span></>]} />
          </h3>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[0.98rem] text-[#5b6884]">{mp.midSubtitle}</p>
          </Reveal>
          <Steps start={3} steps={p.steps.slice(3)} />
        </div>

        <Reveal delay={0.1}>
          <p className="m-eyebrow mt-12 text-center leading-relaxed font-extrabold text-[#0a5bd6]">{mp.closing}</p>
        </Reveal>
      </div>
    </section>
  )
}
