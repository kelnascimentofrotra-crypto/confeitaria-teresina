import { Sparkles } from 'lucide-react'
import earthCard from '../../assets/img/earth-card.webp'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'
import { Img } from '../../components/Img'

export function MobileDifferentials() {
  const { t } = useI18n()
  const d = t.differentials

  return (
    <section
      id="diferenciais"
      data-nav="diferenciais"
      aria-labelledby="m-diff-title"
      className="relative overflow-hidden bg-[radial-gradient(90%_30%_at_50%_100%,rgba(8,100,240,0.45),transparent_70%),linear-gradient(180deg,#02040b_0%,#040b20_100%)] pt-16 pb-24"
    >
      <div className="m-wrap">
        <div className="text-center">
          <Reveal y={10}>
            <span className="m-badge m-badge-dark">
              <Sparkles size={14} className="text-cyan" aria-hidden="true" /> {d.badge}
            </span>
          </Reveal>
          <h2 id="m-diff-title" className="m-title mt-5 text-[clamp(1.85rem,8.6vw,2.3rem)]">
            <RevealLines lines={[t.mobile.differentials.title, <span className="text-gradient-blue">{d.highlight}</span>]} />
          </h2>
        </div>

        <ul className="mt-9 space-y-5">
          {d.cards.map((c, i) => (
            <li key={c.b}>
              <Reveal delay={i * 0.08} y={24} amount={0.25}>
                <div className="m-diff-card min-h-[13rem] p-7 pb-16">
                  <span className="text-[0.8rem] font-semibold tracking-[0.12em] text-[#5cb2ff]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-[1.3rem] font-bold tracking-[-0.02em]">
                    {c.a} {c.b}
                  </h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-white/80">{c.text}</p>
                  <Img
                    src={earthCard}
                    alt=""
                    width={460}
                    height={138}
                    loading="lazy"
                    decoding="async"
                    className="absolute right-0 bottom-0 h-[4.6rem] w-[66%] object-cover object-[60%_0%] [mask-image:linear-gradient(to_right,transparent,#000_40%),linear-gradient(to_bottom,transparent,#000_45%)] [mask-composite:intersect]"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
