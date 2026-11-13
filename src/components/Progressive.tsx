import { Children, useEffect, useState, type ReactNode } from 'react'

const WAKE_EVENTS = ['pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const

/**
 * Monta os filhos um de cada vez, nos intervalos ociosos do navegador, em vez de tudo em uma
 * única tarefa longa. Na primeira interação do visitante, monta de imediato o que faltar,
 * para que âncoras e rolagem encontrem todas as seções.
 */
export function Progressive({ children, onDone }: { children: ReactNode; onDone?: () => void }) {
  const items = Children.toArray(children)
  const total = items.length
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (count >= total) {
      onDone?.()
      return
    }
    const next = () => setCount((c) => Math.min(total, c + 1))
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(next, { timeout: 120 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(next, 60)
    return () => clearTimeout(id)
  }, [count, total, onDone])

  useEffect(() => {
    const all = () => setCount(total)
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, all, { once: true, passive: true }))
    return () => WAKE_EVENTS.forEach((e) => window.removeEventListener(e, all))
  }, [total])

  return <>{items.slice(0, count)}</>
}
