import {
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import portrait2x from '../assets/img/hero-portrait-2x.webp'
import portrait from '../assets/img/hero-portrait.webp'
import { ParticleField } from '../components/founder/ParticleField'
import { ScrubText } from '../components/founder/ScrubText'
import { Signature } from '../components/founder/Signature'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useI18n } from '../i18n'

const ease = [0.22, 1, 0.36, 1] as const
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/**
 * Sequência de entrada (segundos após a seção aparecer):
 * 0.0 pontos azuis · 0.35 feixe de luz · 0.8 NEXAWEB · 1.4 "The mind behind" ·
 * 1.75 fotografia (máscara + varredura) · 2.3 título · 2.6 elementos · 3.1 "Prazer, sou Miguel."
 */
const T = { beam: 0.35, word: 0.8, label: 1.4, photo: 1.75, hud: 2.35, title: 2.3, float: 2.6, hello: 3.1 }

function Words({ text, delay, state, className }: { text: string; delay: number; state: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i, arr) => (
        <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <m.span
            className={`inline-block ${className ?? ''}`}
            initial="hidden"
            animate={state}
            variants={{
              hidden: { y: '112%' },
              show: { y: '0%', transition: { duration: 0.85, delay: delay + i * 0.06, ease } },
            }}
          >
            {w}
          </m.span>
          {/* espaço real entre as palavras (leitores de tela e seleção de texto) */}
          {i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </>
  )
}

/** Encerramento: "À ALTURA." cresce em altura conforme a rolagem e conduz à próxima seção. */
function Closing() {
  const { t } = useI18n()
  const f = t.founder
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'center 0.55'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const scaleY = useTransform(p, [0, 1], reduce ? [1, 1] : [0.38, 1])
  const lift = useTransform(p, [0, 1], reduce ? [0, 0] : [36, 0])
  const glow = useTransform(p, [0.35, 1], [0, 1])

  return (
    <div ref={ref} className="founder-closing">
      <m.span className="founder-closing-beam" style={{ scaleY: p }} aria-hidden="true" />
      <m.div className="founder-closing-glow" style={{ opacity: glow }} aria-hidden="true" />
      <p className="relative">
        <m.span
          className="founder-closing-lead"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease }}
        >
          {f.closingA}
        </m.span>{' '}
        <m.span className="founder-altura" style={{ scaleY, y: lift }}>
          {f.closingB.toUpperCase()}
        </m.span>
      </p>
      <a href="#faq" className="founder-next group" aria-label={f.next}>
        <span className="founder-next-line" aria-hidden="true" />
        <span className="founder-next-btn">
          <ArrowDown size={20} strokeWidth={2.4} aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}

export function Founder() {
  const { t } = useI18n()
  const f = t.founder
  const reduce = useReducedMotion() ?? false
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isFine = useMediaQuery('(hover: hover) and (pointer: fine)')

  const actRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const started = useInView(stageRef, { once: true, amount: 0.3 })
  const state = started ? 'show' : 'hidden'

  // ---- Ponteiro (mouse ou toque), normalizado dentro do palco ----
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.36)
  const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.6 })
  const track = (e: PointerEvent<HTMLElement>) => {
    const r = stageRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(clamp01((e.clientX - r.left) / r.width))
    my.set(clamp01((e.clientY - r.top) / r.height))
  }
  const release = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    mx.set(0.5)
    my.set(0.36)
  }

  // ---- Rolagem ----
  const { scrollYProgress: act } = useScroll({ target: actRef, offset: ['start start', 'end end'] })
  const { scrollYProgress: pass } = useScroll({ target: stageRef, offset: ['start end', 'end start'] })

  // No desktop a foto fica fixa e desliza para a direita enquanto a história rola à esquerda.
  const shift = useTransform(act, (v) => {
    if (!isDesktop) return 0
    const k = clamp01((v - 0.05) / 0.3)
    return k * k * (3 - 2 * k) * window.innerWidth * 0.215
  })
  const parallax = !reduce && isFine
  const figureX = useTransform([sx, shift], ([p, s]: number[]) => s + (parallax ? (p - 0.5) * 30 : 0))
  const figureY = useTransform([sy, pass], ([p, s]: number[]) => {
    if (reduce) return 0
    if (isFine) return (p - 0.5) * 16
    return isDesktop ? 0 : (0.5 - s) * 44 // no toque: profundidade pela rolagem
  })
  const figureScale = useTransform(act, [0.05, 0.35], [1, isDesktop ? 0.93 : 1])
  const wordX = useTransform(sx, (p) => (parallax ? (0.5 - p) * 52 : 0))
  const wordY = useTransform(pass, (s) => (reduce || isDesktop ? 0 : (s - 0.5) * 36))
  const wordOpacity = useTransform(act, [0.06, 0.34], [1, isDesktop ? 0.28 : 1])
  const helloOpacity = useTransform(act, [0.02, 0.13], [1, isDesktop ? 0 : 1])
  const frontX = useTransform(sx, (p) => (parallax ? (p - 0.5) * 46 : 0))
  const frontY = useTransform(sy, (p) => (parallax ? (p - 0.5) * 30 : 0))

  // Luz dinâmica: segue o cursor; no toque acompanha o dedo e a rolagem.
  const lx = useTransform(sx, (p) => p * 100)
  const ly = useTransform([sy, pass], ([p, s]: number[]) => (isFine ? p * 100 : 18 + s * 50))
  const spot = useMotionTemplate`radial-gradient(40rem circle at ${lx}% ${ly}%, rgba(17,120,255,0.22), transparent 64%)`
  const relight = useMotionTemplate`radial-gradient(75% 60% at ${lx}% ${ly}%, rgba(120,195,255,0.6), transparent 72%)`

  const pop = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease } },
  })
  const rise = (delay: number) => ({
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
  })
  const helloText = `${f.hello} `

  return (
    <section
      id="fundador"
      data-nav="diferenciais"
      aria-labelledby="founder-title"
      className="founder"
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={release}
    >
      <div ref={actRef} className="founder-act">
        {/* ============ Palco (fixo no desktop) ============ */}
        <div ref={stageRef} className="founder-stage">
          <ParticleField started={started} pointerX={sx} pointerY={sy} reduced={reduce} />
          <m.div className="founder-spot" style={{ background: spot }} aria-hidden="true" />
          <div className="founder-grid" aria-hidden="true" />

          {/* feixe de luz que atravessa a tela */}
          <m.span
            className="founder-beam"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={started ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.55, 1], delay: T.beam, ease: 'easeInOut' }}
          />

          {/* NEXAWEB gigante, em contorno, atrás da figura */}
          <m.div className="founder-word" style={{ x: wordX, y: wordY, opacity: wordOpacity }} aria-hidden="true">
            {'NEXAWEB'.split('').map((l, i) => (
              <m.span
                key={i}
                initial="hidden"
                animate={state}
                variants={{
                  hidden: { opacity: 0, y: '32%', scale: 1.18 },
                  show: { opacity: 1, y: '0%', scale: 1, transition: { duration: 1.1, delay: T.word + i * 0.07, ease } },
                }}
              >
                {l}
              </m.span>
            ))}
          </m.div>

          {/* Figura: camadas de fundo, fotografia e elementos da frente */}
          <m.div className="founder-figure" style={{ x: figureX, y: figureY, scale: figureScale }}>
            <m.div className="founder-label" initial="hidden" animate={state} variants={rise(T.label)}>
              <p className="founder-label-main">
                <span className="founder-label-dot" aria-hidden="true" />
                {f.label}
              </p>
              <p className="founder-label-sub">{f.labelSub}</p>
            </m.div>

            <m.div className="founder-orbit" aria-hidden="true" initial="hidden" animate={state} variants={pop(T.hud)}>
              <span />
            </m.div>

            <m.div
              className="founder-reveal"
              initial="hidden"
              animate={state}
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, delay: T.photo, ease: [0.65, 0, 0.2, 1] } },
              }}
            >
              <m.div
                className="h-full w-full"
                initial="hidden"
                animate={state}
                variants={{
                  hidden: { scale: 1.14 },
                  show: { scale: 1, transition: { duration: 1.9, delay: T.photo, ease } },
                }}
              >
                <Img
                  src={portrait}
                  srcSet={`${portrait} 448w, ${portrait2x} 896w`}
                  sizes="(min-width: 1024px) 62vh, 78vw"
                  width={448}
                  height={573}
                  alt={f.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="founder-portrait"
                />
                {/* luz azul sobre a silhueta, que acompanha o cursor (recortada pela própria foto) */}
                <m.div
                  className="founder-relight"
                  aria-hidden="true"
                  style={{ background: relight, '--portrait': `url(${portrait})` } as unknown as CSSProperties}
                />
              </m.div>
            </m.div>

            {/* linha de varredura que acompanha a revelação */}
            <m.span
              className="founder-scan"
              aria-hidden="true"
              initial={{ top: '100%', opacity: 0 }}
              animate={started ? { top: ['100%', '0%'], opacity: [0, 1, 1, 0] } : { top: '100%', opacity: 0 }}
              transition={{ duration: 1.3, delay: T.photo, ease: [0.65, 0, 0.2, 1], opacity: { duration: 1.3, delay: T.photo, times: [0, 0.1, 0.85, 1] } }}
            />

            {(['tl', 'tr', 'bl', 'br'] as const).map((c, i) => (
              <m.span key={c} className={`founder-corner ${c}`} aria-hidden="true" initial="hidden" animate={state} variants={pop(T.hud + i * 0.08)} />
            ))}
            <m.span className="founder-tag tl" aria-hidden="true" initial="hidden" animate={state} variants={rise(T.hud + 0.3)}>
              Founder
            </m.span>
            <m.span className="founder-tag br" aria-hidden="true" initial="hidden" animate={state} variants={rise(T.hud + 0.4)}>
              NEXAWEB
            </m.span>

            {/* elementos gráficos flutuantes (camada da frente, mais sensível ao cursor) */}
            <m.div className="founder-front" style={{ x: frontX, y: frontY }} aria-hidden="true">
              <m.span className="founder-float chip a" initial="hidden" animate={state} variants={pop(T.float)}>
                <i>{'</>'}</i>
              </m.span>
              <m.span className="founder-float chip b" initial="hidden" animate={state} variants={pop(T.float + 0.12)}>
                <i>{'{ }'}</i>
              </m.span>
              <m.span className="founder-float plus c" initial="hidden" animate={state} variants={pop(T.float + 0.2)} />
              <m.span className="founder-float plus d" initial="hidden" animate={state} variants={pop(T.float + 0.28)} />
              <m.span className="founder-float dots e" initial="hidden" animate={state} variants={pop(T.float + 0.36)} />
              <m.span className="founder-float ring g" initial="hidden" animate={state} variants={pop(T.float + 0.44)} />
            </m.div>

            <div className="founder-shadow" aria-hidden="true" />
          </m.div>
        </div>

        {/* ============ Conteúdo (rola sobre o palco no desktop) ============ */}
        <div className="founder-content">
          <div className="founder-act1">
            <div className="founder-title-block">
              <m.p className="founder-eyebrow" initial="hidden" animate={state} variants={rise(T.title - 0.1)}>
                <span aria-hidden="true" />
                {f.eyebrow}
              </m.p>
              <h2 id="founder-title" className="founder-title">
                <span>
                  <Words text={f.titleA} delay={T.title} state={state} />
                </span>
                <span>
                  <Words text={f.titleB} delay={T.title + 0.36} state={state} className="text-gradient-blue" />
                </span>
              </h2>
            </div>

            <m.div className="founder-hello-wrap" style={{ opacity: helloOpacity }}>
            <m.div className="founder-hello" initial="hidden" animate={state} variants={rise(T.hello)}>
              <span className="founder-hello-line" aria-hidden="true" />
              <p>
                <span className="sr-only">{`${f.hello} ${f.name}.`}</span>
                {/* efeito de digitação: letras simples com atraso em CSS */}
                <span aria-hidden="true" className="founder-type" data-on={started}>
                  {helloText.split('').map((ch, i) => (
                    <span key={i} style={{ '--d': i } as CSSProperties}>
                      {ch}
                    </span>
                  ))}
                  <strong>
                    {`${f.name}.`.split('').map((ch, i) => (
                      <span key={i} style={{ '--d': helloText.length + i } as CSSProperties}>
                        {ch}
                      </span>
                    ))}
                  </strong>
                  <span className="founder-caret" />
                </span>
              </p>
            </m.div>
            </m.div>
          </div>

          <div className="founder-story">
            <ScrubText text={f.intro} className="founder-lead" />
            <ScrubText text={f.mission} className="founder-body" />

            <Reveal y={26} amount={0.35}>
              <blockquote
                className="founder-quote"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--qx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--qy', `${e.clientY - r.top}px`)
                }}
              >
                <span className="founder-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <p>{f.quoteA}</p>
                <p className="text-gradient-blue">{f.quoteB}</p>
              </blockquote>
            </Reveal>

            <Signature name={f.name} role={f.role} />
          </div>
        </div>
      </div>

      <Closing />
    </section>
  )
}
