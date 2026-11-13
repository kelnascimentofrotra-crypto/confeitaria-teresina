import wallet from '../../assets/img/wallet.webp'
import wallet480 from '../../assets/img/wallet-480.webp'
import { QuoteButton } from '../../components/QuoteButton'
import { Reveal, RevealLines } from '../../components/Reveal'
import type { CSSProperties } from 'react'
import { useI18n } from '../../i18n'
import { Img } from '../../components/Img'

export function MobileSales() {
  const { t } = useI18n()
  const s = t.sales
  const ms = t.mobile.sales
  const chars = Math.max(...[...s.titleLines, s.titleHighlight].map((l) => l.length))

  return (
    <section
      data-nav="inicio"
      aria-labelledby="m-sales-title"
      className="relative overflow-hidden bg-[radial-gradient(80%_35%_at_50%_45%,rgba(8,100,240,0.55),transparent_70%),linear-gradient(180deg,#040916_0%,#071a45_50%,#02040b_100%)] pt-16 pb-20"
    >
      <div className="m-wrap">
        <Reveal y={10}>
          <p className="m-eyebrow text-[#5cb2ff]">{ms.eyebrow}</p>
        </Reveal>
        <h2
          id="m-sales-title"
          className="m-title fit-lines mt-4 uppercase"
          style={{ '--chars': chars, '--fit-max': '2.45rem' } as CSSProperties}
        >
          <RevealLines lines={[...s.titleLines, <span className="text-[#2b9bff]">{s.titleHighlight}</span>]} />
        </h2>
      </div>

      <Reveal y={40} amount={0.2} fade={false} className="relative mx-auto mt-6 w-[112%] max-w-[36rem] -translate-x-[5.4%] min-[520px]:w-full min-[520px]:translate-x-0">
        <Img
          src={wallet}
          srcSet={`${wallet480} 480w, ${wallet} 814w`}
          sizes="(min-width: 1024px) 40vw, (min-width: 576px) 36rem, 112vw"
          alt={s.imageAlt}
          width={814}
          height={623}
          loading="lazy"
          decoding="async"
          className="float-slow block w-full [mask-image:radial-gradient(closest-side,#000_70%,transparent_100%)]"
        />
      </Reveal>

      <div className="m-wrap relative -mt-4 space-y-7">
        {ms.items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1} x={-16} y={0}>
            <div className="border-l-[3px] border-brand pl-5">
              <h3 className="text-[1.2rem] font-bold">{it.title}</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-white/80">{it.text}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <QuoteButton arrow="up-right" />
        </Reveal>
      </div>
    </section>
  )
}
