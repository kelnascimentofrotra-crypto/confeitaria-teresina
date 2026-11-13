import wallet from '../assets/img/wallet.webp'
import wallet480 from '../assets/img/wallet-480.webp'
import { QuoteButton } from '../components/QuoteButton'
import { Reveal, RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'
import { Img } from '../components/Img'

function SideNote({ text, align = 'left' }: { text: string; align?: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'lg:text-left' : ''}>
      <span className="bar-accent mb-4 !w-14" aria-hidden="true" />
      <p className="text-[1.08rem] leading-snug font-semibold text-white/90 sm:text-[1.2rem]">{text}</p>
    </div>
  )
}

/** Marca "+" e linha vertical fina que emolduram a carteira, como na referência. */
function GuideLine({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 bottom-[12%] hidden w-6 lg:block ${side === 'left' ? 'left-[calc(50%-min(29vw,410px))]' : 'right-[calc(50%-min(29vw,410px))]'}`}
    >
      <span className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-white/80" />
      <span className="absolute top-3 left-0 h-px w-6 bg-white/80" />
      <span className="absolute top-3 bottom-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-white/60 via-white/25 to-transparent" />
    </div>
  )
}

export function SalesImpact() {
  const { t } = useI18n()
  const s = t.sales

  return (
    <section aria-labelledby="sales-title" data-nav="inicio" className="sales-bg relative overflow-hidden pt-20 pb-16 sm:pt-28 lg:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-b from-transparent to-[#02040b]" />
      <div className="container-x relative z-20">
        <GuideLine side="left" />
        <GuideLine side="right" />

        <h2
          id="sales-title"
          className="display relative mx-auto max-w-4xl text-center text-[clamp(1.9rem,4.2vw,3.5rem)] uppercase"
        >
          <RevealLines
            lines={[...s.titleLines, <span className="text-gradient-blue">{s.titleHighlight}</span>]}
          />
        </h2>

        <div className="relative mt-8 grid items-end gap-10 lg:mt-0 lg:grid-cols-[1fr_minmax(0,1.55fr)_1fr] lg:gap-6">
          <Reveal x={-24} y={0} className="order-2 lg:order-1 lg:mb-[28%]">
            <SideNote text={s.left} />
          </Reveal>

          <Reveal y={40} amount={0.15} fade={false} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[640px]">
              <div
                aria-hidden="true"
                className="absolute inset-x-[12%] top-[20%] bottom-[8%] rounded-full bg-brand/45 blur-[70px]"
              />
              <Img
                src={wallet}
                srcSet={`${wallet480} 480w, ${wallet} 814w`}
                sizes="(min-width: 1024px) 40vw, (min-width: 576px) 36rem, 112vw"
                alt={s.imageAlt}
                width={814}
                height={623}
                loading="lazy"
                decoding="async"
                className="fade-radial float-slow relative w-full"
              />
            </div>
          </Reveal>

          <Reveal x={24} y={0} className="order-3 lg:mb-[24%]">
            <SideNote text={s.right} align="right" />
            <div className="mt-6">
              <QuoteButton />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
