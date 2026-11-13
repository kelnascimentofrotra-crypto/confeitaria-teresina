import handLogo from '../assets/img/hand-logo.webp'
import { Reveal, RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'

export function Mission() {
  const { t } = useI18n()
  const mi = t.mission

  return (
    <section
      aria-labelledby="mission-title"
      data-nav="diferenciais"
      className="relative flex flex-col overflow-hidden bg-black lg:min-h-[clamp(600px,88svh,900px)] lg:flex-row lg:items-center"
    >
      {/* Imagem: no desktop ocupa a metade direita e sangra até a borda, como na referência */}
      <Reveal
        x={40}
        y={0}
        amount={0.15}
        className="relative ml-auto w-[min(100%,560px)] lg:absolute lg:inset-y-0 lg:right-0 lg:ml-0 lg:w-auto"
      >
        <img
          src={handLogo}
          alt={mi.imageAlt}
          width={675}
          height={945}
          loading="lazy"
          decoding="async"
          className="relative block h-auto w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_22%)] [mask-composite:intersect] lg:h-full lg:w-auto lg:max-w-none lg:[mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_24%)]"
        />
      </Reveal>

      <div className="container-x relative z-10 -mt-24 pb-20 sm:-mt-32 lg:mt-0 lg:py-24">
        <div className="max-w-[min(44rem,50vw)] max-lg:max-w-xl">
          <h2
            id="mission-title"
            className="text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white [text-shadow:0_0_24px_rgba(255,255,255,0.18)]"
          >
            <RevealLines lines={mi.titleLines} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed font-medium text-white/80 sm:text-[1.1rem]">{mi.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
