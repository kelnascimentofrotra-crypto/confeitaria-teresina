import { ChartNoAxesColumnIncreasing, CodeXml, MonitorSmartphone, MousePointerClick, Palette, Target, Zap, type LucideIcon } from 'lucide-react'
import earthCard from '../assets/img/earth-card.webp'
import earthHorizon from '../assets/img/earth-horizon.webp'
import { Reveal, RevealLines } from '../components/Reveal'
import { SectionBadge } from '../components/SectionBadge'
import { useI18n } from '../i18n'

const cardIcons: LucideIcon[] = [CodeXml, Target, ChartNoAxesColumnIncreasing]
const extraIcons: LucideIcon[] = [Palette, MonitorSmartphone, MousePointerClick, Target]

export function Differentials() {
  const { t } = useI18n()
  const d = t.differentials

  return (
    <section id="diferenciais" data-nav="diferenciais" aria-labelledby="diff-title" className="diff-bg relative overflow-hidden pt-24 sm:pt-32">
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <SectionBadge icon={<Zap size={18} className="text-cyan" fill="currentColor" />}>{d.badge}</SectionBadge>
          </Reveal>
          <h2 id="diff-title" className="mt-7 text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
            <RevealLines lines={[d.title, <span className="text-gradient-blue">{d.highlight}</span>]} />
          </h2>
          <Reveal delay={0.1}>
            <span className="bar-accent mx-auto mt-7" aria-hidden="true" />
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
          {d.cards.map((c, i) => {
            const Icon = cardIcons[i]
            return (
              <li key={i} className="h-full">
                <Reveal delay={i * 0.12} amount={0.2} className="h-full">
                <div className="diff-card group flex h-full flex-col overflow-hidden">
                  <div className="flex flex-1 flex-col items-center px-6 pt-7 text-center sm:px-7">
                    <span className="icon-tile-dark h-[4.4rem] w-[4.4rem] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                      <Icon size={32} strokeWidth={2} />
                    </span>
                    <h3 className="mt-6 text-[1.45rem] leading-tight font-extrabold tracking-tight sm:text-[1.55rem] md:text-[1.3rem] lg:text-[1.6rem]">
                      {c.a} <span className="text-[#2c9bff]">{c.b}</span>
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed font-medium text-white/80">{c.text}</p>
                  </div>
                  <div className="relative mt-6 h-36 sm:h-40">
                    <img
                      src={earthCard}
                      alt=""
                      width={460}
                      height={138}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-top transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:brightness-125"
                    />
                    <div className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-[#06102c] to-transparent" />
                  </div>
                </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.extras.map((e, i) => {
            const Icon = extraIcons[i]
            return (
              <li key={i}>
                <Reveal delay={i * 0.08} y={16} className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors duration-300 hover:border-brand/50 hover:bg-white/[0.06]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-cyan">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="font-bold">{e.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/65">{e.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Horizonte da Terra na base da seção */}
      <div aria-hidden="true" className="relative mt-12 sm:mt-16">
        <div className="absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(8,122,255,0.35),transparent_70%)]" />
        <img
          src={earthHorizon}
          alt=""
          width={1672}
          height={123}
          loading="lazy"
          decoding="async"
          className="relative h-[90px] w-full object-cover object-top sm:h-auto"
        />
      </div>
    </section>
  )
}
