import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useRef, type CSSProperties } from 'react'

/**
 * Parágrafo cujas palavras "acendem" uma a uma conforme a rolagem passa por ele.
 * Uma única variável CSS (--p) é atualizada no scroll; cada palavra calcula a própria
 * opacidade em CSS, sem um componente animado por palavra.
 */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.52'] })
  const words = text.split(' ')

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    ref.current?.style.setProperty('--p', v.toFixed(3))
  })

  if (reduce) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={`scrub ${className ?? ''}`} style={{ '--n': words.length + 2 } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {w}{' '}
        </span>
      ))}
    </p>
  )
}
