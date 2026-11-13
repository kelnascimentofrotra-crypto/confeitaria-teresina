import { m } from 'framer-motion'
import { ClipboardList, CodeXml, Layers, Presentation, Rocket, Settings, Target, type LucideIcon } from 'lucide-react'
import { Reveal, RevealLines } from '../components/Reveal'
import { SectionBadge } from '../components/SectionBadge'
import { useI18n } from '../i18n'

const icons: LucideIcon[] = [ClipboardList, Target, CodeXml, Presentation, Settings, Rocket]
const ease = [0.22, 1, 0.36, 1] as const

function StepCard({ index, title, text }: { index: number; title: string; text: string }) {
  const Icon = icons[index]
  return (
    <div className="group flex h-full items-start gap-4 rounded-[22px] border border-white bg-white/75 p-4 shadow-[0_24px_50px_-30px_rgba(8,40,110,0.4)] backdrop-blur transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(8,80,200,0.45)] sm:p-5">
      <span className="icon-tile-light h-16 w-16 shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 sm:h-[4.5rem] sm:w-[4.5rem]">
        <Icon size={30} strokeWidth={1.7} />
      </span>
      <div>
        <h3 className="text-[1.12rem] leading-tight font-extrabold tracking-tight text-[#0b1630] sm:text-[1.2rem]">{title}</h3>
        <p className="mt-1.5 text-[0.93rem] leading-relaxed text-[#3c4a66]">{text}</p>
      </div>
    </div>
  )
}

function Bubble({ n, delay }: { n: number; delay: number }) {
  return (
    <m.span
      className="step-bubble relative z-10"
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {n}
    </m.span>
  )
}

/** Linha horizontal que se desenha ao entrar na tela. */
function DrawLine({ className, delay = 0, origin = 'left' }: { className: string; delay?: number; origin?: 'left' | 'right' }) {
  return (
    <m.span
      aria-hidden="true"
      className={`step-line absolute h-[3px] rounded-full ${className}`}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, delay, ease }}
    />
  )
}

export function Process() {
  const { t } = useI18n()
  const p = t.process
  const steps = p.steps
  // Ordem visual no desktop: linha 1 = 1,2,3 | linha 2 = 6,5,4 (o caminho volta pela direita).
  const rowTop = [0, 1, 2]
  const rowBottom = [5, 4, 3]

  return (
    <section id="entrega" data-nav="entrega" aria-labelledby="process-title" className="process-bg relative z-10 overflow-hidden rounded-b-[2.5rem] py-24 shadow-[0_20px_50px_-12px_rgba(8,122,255,0.55)] sm:py-32">
      {/* Painéis de vidro decorativos (referência: canto superior direito) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-10 right-[-8%] hidden h-[520px] w-[440px] lg:block">
        <div className="absolute top-16 right-24 h-[380px] w-[240px] rotate-[8deg] rounded-[36px] border border-white/80 bg-linear-to-b from-white/70 to-[#cfe0fb]/40 shadow-[0_30px_60px_-30px_rgba(8,80,200,0.35)] backdrop-blur-md" />
        <div className="absolute top-36 right-0 h-[380px] w-[240px] rotate-[8deg] rounded-[36px] border border-white/70 bg-linear-to-br from-white/50 via-[#9cc4ff]/40 to-[#087aff]/50 shadow-[0_30px_60px_-30px_rgba(8,80,200,0.45)] backdrop-blur-md" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <SectionBadge icon={<Layers size={20} />}>{p.badge}</SectionBadge>
          </Reveal>
          <h2 id="process-title" className="mt-7 text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-[#0b1630]">
            <RevealLines lines={[p.title, <span className="text-[1.25em] text-brand">{p.highlight}</span>]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed font-medium text-[#3c4a66] sm:text-lg">{p.subtitle}</p>
            <span className="bar-accent mx-auto mt-7" aria-hidden="true" />
          </Reveal>
        </div>

        {/* Mobile e tablet: linha do tempo vertical, ordem 1 → 6 */}
        <ol className="relative mt-14 space-y-5 lg:hidden">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.55rem] w-[3px] rounded-full bg-linear-to-b from-[#087aff] via-[#11b4ff] to-[#087aff]/30" />
          {steps.map((s, i) => (
            <li key={i} className="relative grid grid-cols-[3.1rem_1fr] items-start gap-4">
              <Bubble n={i + 1} delay={0.05} />
              <Reveal x={20} y={0} amount={0.4}>
                <StepCard index={i} title={s.title} text={s.text} />
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Desktop: 1 → 2 → 3, curva à direita, 4 → 5 → 6 voltando */}
        <div className="relative mt-16 hidden lg:block">
          <ol className="sr-only">
            {steps.map((s, i) => (
              <li key={i}>
                {i + 1}. {s.title}: {s.text}
              </li>
            ))}
          </ol>

          <div aria-hidden="true" className="relative pr-10">
            {/* Linha superior e curva de retorno */}
            <DrawLine className="top-[1.5rem] left-[1.55rem] right-[4rem]" />
            <m.span
              className="absolute top-[1.5rem] right-[1.4rem] h-[calc(50%+1.5rem)] w-[4rem] rounded-r-[2.5rem] border-[3px] border-l-0 border-[#0f8cff] shadow-[6px_0_12px_-4px_rgba(8,122,255,0.6)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
            <div className="grid grid-cols-3 gap-7">
              {rowTop.map((i) => (
                <div key={i}>
                  <Bubble n={i + 1} delay={0.15 + i * 0.25} />
                  <Reveal delay={0.2 + i * 0.25} className="mt-5">
                    <StepCard index={i} title={steps[i].title} text={steps[i].text} />
                  </Reveal>
                </div>
              ))}
            </div>

            <div className="relative mt-12">
              <DrawLine className="top-[1.5rem] left-[1.55rem] right-[1.5rem]" origin="right" delay={1.1} />
              <div className="grid grid-cols-3 gap-7">
                {rowBottom.map((i) => (
                  <div key={i}>
                    <Bubble n={i + 1} delay={1.1 + (i - 3) * 0.25} />
                    <Reveal delay={1.15 + (i - 3) * 0.25} className="mt-5">
                      <StepCard index={i} title={steps[i].title} text={steps[i].text} />
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
