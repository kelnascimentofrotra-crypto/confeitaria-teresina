import { ArrowUpRight, Building2, Check, Diamond, Gauge, LayoutDashboard, LayoutTemplate, MousePointerClick, PanelsTopLeft, Workflow, type LucideIcon } from 'lucide-react'
import { m } from 'framer-motion'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'

const benefitIcons: LucideIcon[] = [ArrowUpRight, Diamond, Check]
const serviceIcons: LucideIcon[] = [Building2, MousePointerClick, LayoutTemplate, Workflow, PanelsTopLeft, LayoutDashboard, Gauge]

export function MobileSolutions() {
  const { t } = useI18n()
  const s = t.solutions
  const ms = t.mobile.solutions

  return (
    <section id="solucoes" data-nav="diferenciais" aria-labelledby="m-solutions-title" className="glow-band relative my-3 rounded-[2rem] py-12 text-[#0b1630]">
      <div className="m-wrap">
        <Reveal amount={0.15}>
          <div className="relative min-h-[25rem] overflow-hidden rounded-[1.8rem] bg-white shadow-[0_30px_60px_-30px_rgba(8,40,110,0.45)]">
            {/* Lâminas azuis em diagonal, como na referência */}
            <m.div
              aria-hidden="true"
              className="absolute inset-y-[-10%] right-[-14%] w-[52%] origin-bottom -skew-x-[8deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,#bfe0ff_25%,#3fa0ff_60%,#0b55d6_100%)]"
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="m-slats absolute inset-y-0 right-0 left-[22%] opacity-80" />
            </m.div>
            <div className="relative p-6 pt-9 pr-[12%] min-[380px]:p-8 min-[380px]:pt-10 min-[380px]:pr-[16%]">
              <p className="m-eyebrow font-medium text-[#5b6884]">{ms.eyebrow}</p>
              <h2 id="m-solutions-title" className="m-title mt-5 text-[clamp(1.55rem,8.2vw,2.4rem)]">
                <RevealLines lines={[ms.title, <span className="text-brand">{ms.highlight}</span>]} />
              </h2>
              <p className="mt-5 max-w-[15rem] text-[0.98rem] leading-relaxed text-[#5b6884]">{ms.subtitle}</p>
            </div>
          </div>
        </Reveal>

        <ul className="mt-5 space-y-4">
          {s.benefits.map((b, i) => {
            const Icon = benefitIcons[i]
            return (
              <li key={b.title}>
                <Reveal delay={i * 0.08} y={20}>
                  <div className="m-card-light flex items-center gap-5 p-5">
                    <span className="grid h-[4.4rem] w-[4.4rem] shrink-0 place-items-center rounded-2xl border border-[#bcdcff] bg-[#e9f4ff] text-brand">
                      <Icon size={30} strokeWidth={2.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] font-bold tracking-[-0.02em]">{b.title}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-[#5b6884]">{b.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-14">
          <Reveal y={10}>
            <p className="m-eyebrow text-brand">{s.servicesEyebrow}</p>
            <h3 className="m-title mt-2 text-[1.8rem]">{s.servicesTitle}</h3>
          </Reveal>
          <ul className="mt-6 grid gap-3">
            {s.services.map((sv, i) => {
              const Icon = serviceIcons[i]
              return (
                <li key={sv.title}>
                  <Reveal delay={(i % 3) * 0.05} y={14}>
                    <div className="flex gap-4 rounded-2xl border border-[#dbe7fa] bg-white/80 p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-bold">{sv.title}</h4>
                        <p className="mt-0.5 text-[0.9rem] leading-relaxed text-[#5b6884]">{sv.text}</p>
                      </div>
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
