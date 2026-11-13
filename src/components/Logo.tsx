import logo from '../assets/img/logo-nexaweb.webp'
import mark from '../assets/img/logo-mark.webp'
import { cn } from '../lib/cn'

/** Logotipo oficial NEXAWEB (extraído do arquivo original, sem alterações de desenho). */
export function Logo({ className, alt = 'NEXAWEB' }: { className?: string; alt?: string }) {
  return (
    <img src={logo} alt={alt} width={531} height={357} loading="lazy" decoding="async" className={cn('h-auto', className)} />
  )
}

export function LogoMark({ className }: { className?: string }) {
  return <img src={mark} alt="" width={128} height={116} decoding="async" className={cn('h-auto', className)} />
}
