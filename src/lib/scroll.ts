export function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * Rola até uma seção pelo id e atualiza o hash sem salto brusco.
 * Como o site monta as seções aos poucos, se o destino ainda não existir
 * a função espera por ele (até alguns segundos) antes de rolar.
 */
export function scrollToId(id: string) {
  const started = Date.now()
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    } else if (Date.now() - started < 6000) {
      setTimeout(attempt, 60)
    }
  }
  attempt()
}
