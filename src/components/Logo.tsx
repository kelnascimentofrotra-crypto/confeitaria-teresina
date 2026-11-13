import logo from '../assets/img/logo-nexaweb.webp'
import mark from '../assets/img/logo-mark.webp'
import wordmark from '../assets/img/logo-wordmark.webp'
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

/** Versão horizontal: o "N" e a palavra NEXAWEB, ambos recortados do logotipo oficial. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img src={mark} alt="" width={128} height={116} decoding="async" className="h-8 w-auto" />
      <img src={wordmark} alt="NEXAWEB" width={523} height={65} decoding="async" className="h-[13px] w-auto" />
    </span>
  )
}
