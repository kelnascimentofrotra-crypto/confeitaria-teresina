import {
  Building2,
  ChartNoAxesColumnIncreasing,
  Gauge,
  LayoutDashboard,
  Layers,
  LayoutTemplate,
  MousePointerClick,
  PanelsTopLeft,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { m } from 'framer-motion'
import { Reveal, RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'

const benefitIcons: LucideIcon[] = [ChartNoAxesColumnIncreasing, Layers, ShieldCheck]
const serviceIcons: LucideIcon[] = [Building2, MousePointerClick, LayoutTemplate, Workflow, PanelsTopLeft, LayoutDashboard, Gauge]

/** Arte azul do banner: luz difusa, anel e lâminas de vidro verticais (feita em CSS). */
function BannerArt() {
  return (
    <div aria-hidden="true" className="relative h-56 w-full overflow-hidden sm:h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%] md:overflow-visible">
      <div className="absolute top-1/2 right-[8%] h-[130%] w-[80%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_45%_50%,#11c8ff_0%,#087aff_30%,#0a3fe0_55%,transparent_72%)] opacity-90 blur-2xl" />
      <m.div
        className="absolute top-1/2 right-[22%] h-[78%] w-[62%] -translate-y-1/2 rounded-[50%] border-[18px] border-[#1aa6ff]/50 blur-[6px]"
        initial={{ rotate: -18, opacity: 0 }}
        whileInView={{ rotate: -8, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-y-0 right-0 flex w-[62%]">
        {[0, 1, 2, 3, 4].map((i) => (
          <m.span
            key={i}
            className="slat h-full flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-[#f4f8ff] to-transparent md:hidden" />
    </div>
  )
}

export function Solutions() {
  const { t } = useI18n()
  const s = t.solutions

  return (
    <section id="solucoes" data-nav="diferenciais" aria-labelledby="solutions-title" className="solutions-bg relative overflow-hidden py-20 sm:py-28">
      <div className="container-x relative">
        <Reveal amount={0.15}>
          <div className="glass-white relative overflow-hidden rounded-[30px] sm:rounded-[36px]">
            <div className="relative z-10 max-w-xl px-6 pt-12 pb-2 sm:px-12 sm:pt-16 md:py-20 lg:px-16 lg:py-24">
              <h2 id="solutions-title" className="text-[clamp(2.1rem,5vw,4rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-[#0b1630]">
                <RevealLines lines={[...s.titleLines, <span className="text-gradient-blue">{s.highlight}</span>]} />
              </h2>
              <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed font-medium text-[#2a3756] sm:text-lg">{s.subtitle}</p>
              <span className="bar-accent mt-7" aria-hidden="true" />
            </div>
            <BannerArt />
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-3 lg:gap-7">
          {s.benefits.map((b, i) => {
            const Icon = benefitIcons[i]
            return (
              <li key={i}>
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="glass-card-blue group flex h-full items-center gap-5 rounded-[24px] p-5 sm:p-6">
                    <span className="icon-tile-light h-[4.2rem] w-[4.2rem] shrink-0 transition-transform duration-500 group-hover:scale-105">
                      <Icon size={30} strokeWidth={2} />
                    </span>
                    <span className="h-16 w-px shrink-0 bg-[#0b1630]/12" aria-hidden="true" />
                    <div>
                      <h3 className="text-[1.15rem] leading-tight font-extrabold tracking-tight text-[#0b1630] sm:text-[1.25rem]">{b.title}</h3>
                      <p className="mt-1.5 text-[0.93rem] leading-relaxed text-[#33405e]">{b.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        {/* Serviços */}
        <div className="mt-20 sm:mt-24">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold tracking-[0.22em] text-cyan uppercase">{s.servicesEyebrow}</p>
              <h3 className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-extrabold tracking-tight">{s.servicesTitle}</h3>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.services.map((sv, i) => {
              const Icon = serviceIcons[i]
              return (
                <li key={i} className={i === s.services.length - 1 ? 'sm:col-span-2 lg:col-span-1' : undefined}>
                  <Reveal delay={(i % 4) * 0.07} y={18} className="h-full">
                    <div className="service-card group h-full p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/12 text-white ring-1 ring-white/20 transition-[transform,background-color] duration-500 group-hover:-rotate-6 group-hover:bg-white/20">
                        <Icon size={22} />
                      </span>
                      <h4 className="mt-4 text-[1.08rem] font-extrabold tracking-tight">{sv.title}</h4>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/75">{sv.text}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
