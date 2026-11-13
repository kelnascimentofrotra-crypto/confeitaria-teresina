import { useEffect, useState } from 'react'

/**
 * Observa as seções marcadas com `data-nav` e devolve o item de navegação
 * correspondente à seção que ocupa o centro da tela. Seções montadas depois
 * (o site monta o conteúdo aos poucos) passam a ser observadas automaticamente.
 */
export function useActiveSection(initial = 'inicio'): string {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute('data-nav') ?? initial)
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        observer.observe(el)
      })
    }
    scan()
    const main = document.getElementById('conteudo')
    const mutations = new MutationObserver(scan)
    if (main) mutations.observe(main, { childList: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [initial])

  return active
}
