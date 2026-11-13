import { useEffect, useState } from 'react'

/**
 * Observa as seções marcadas com `data-nav` e devolve o item de navegação
 * correspondente à seção que ocupa o centro da tela.
 */
export function useActiveSection(initial = 'inicio'): string {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute('data-nav') ?? initial)
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [initial])

  return active
}
