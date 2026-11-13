import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { isExternal } from '../lib/contact'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n'

interface Props {
  href: string
  children: ReactNode
  variant?: 'light' | 'dark' | 'ghost'
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  arrow?: 'right' | 'up-right'
  ariaLabel?: string
}

export function CtaButton({ href, children, variant = 'light', className, onClick, arrow = 'right', ariaLabel }: Props) {
  const { t } = useI18n()
  const external = isExternal(href)
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'btn-pill text-[0.95rem] sm:text-base',
        variant === 'light' && 'btn-light',
        variant === 'dark' && 'btn-dark',
        variant === 'ghost' && 'btn-ghost',
        className,
      )}
    >
      <span>{children}</span>
      {variant !== 'ghost' && (
        <span className="btn-arrow" aria-hidden="true">
          {arrow === 'up-right' ? <ArrowUpRight size={19} strokeWidth={2.6} /> : <ArrowRight size={18} strokeWidth={2.4} />}
        </span>
      )}
      {external && <span className="sr-only">{t.a11y.newTab}</span>}
    </a>
  )
}
