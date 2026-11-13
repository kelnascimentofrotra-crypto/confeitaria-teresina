import { m, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  amount?: number
  /** false = só movimento, sem opacidade (use em imagens: nunca ficam invisíveis se a animação não rodar) */
  fade?: boolean
}

/** Revela o conteúdo suavemente ao entrar na tela (uma única vez). */
export function Reveal({ children, delay = 0, y = 28, x = 0, amount = 0.25, fade = true, ...rest }: Props) {
  return (
    <m.div
      initial={{ opacity: fade ? 0 : 1, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease }}
      {...rest}
    >
      {children}
    </m.div>
  )
}

/** Título com linhas que sobem a partir de uma máscara. O gatilho fica no elemento pai
 *  (as linhas começam recortadas pelo overflow e não seriam detectadas pelo observer). */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  animateOnMount?: boolean
}) {
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.4 } }
  return (
    <m.span className={className ?? 'block'} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <m.span
            className={lineClassName ?? 'block'}
            variants={{
              hidden: { y: '105%' },
              show: { y: '0%', transition: { duration: 0.85, delay: delay + i * 0.09, ease } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  )
}
