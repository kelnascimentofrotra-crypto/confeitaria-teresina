import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const Founder = lazy(() => import('../../sections/Founder').then((mod) => ({ default: mod.Founder })))

/**
 * A seção do fundador fica fora do carregamento inicial: o código e a montagem só acontecem
 * depois da primeira interação do visitante (toque, rolagem, tecla) ou quando a seção se aproxima
 * da tela. Assim o hero carrega sem nenhum custo extra.
 */
export function DeferredFounder() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return
    const go = () => setShow(true)
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && go(), { rootMargin: '150% 0px' })
    if (ref.current) io.observe(ref.current)
    const events = ['pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const
    const onFirst = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(go, { timeout: 600 })
      else setTimeout(go, 150)
    }
    events.forEach((e) => window.addEventListener(e, onFirst, { once: true, passive: true }))
    return () => {
      io.disconnect()
      events.forEach((e) => window.removeEventListener(e, onFirst))
    }
  }, [show])

  if (!show) return <div ref={ref} id="fundador" data-nav="diferenciais" className="founder-placeholder" aria-hidden="true" />
  return (
    <Suspense fallback={<div id="fundador" data-nav="diferenciais" className="founder-placeholder" aria-hidden="true" />}>
      <Founder />
    </Suspense>
  )
}
