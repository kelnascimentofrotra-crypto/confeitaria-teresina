import { useEffect } from 'react'

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const before = document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    // compensa a barra só se a largura realmente mudou (com scrollbar-gutter o espaço já está reservado)
    const gap = document.documentElement.clientWidth - before
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
