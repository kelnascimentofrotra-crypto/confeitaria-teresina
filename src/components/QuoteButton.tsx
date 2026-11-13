import type { MouseEvent } from 'react'
import { useI18n } from '../i18n'
import { quoteHref } from '../lib/contact'
import { CtaButton } from './CtaButton'

/** Botão "Solicitar orçamento": abre o WhatsApp configurado ou leva à seção de contato. */
export function QuoteButton({
  variant = 'light',
  className,
  message,
  onClick,
  arrow,
}: {
  variant?: 'light' | 'dark'
  className?: string
  message?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  arrow?: 'right' | 'up-right'
}) {
  const { t } = useI18n()
  return (
    <CtaButton href={quoteHref(message ?? t.cta.quoteMessage)} variant={variant} className={className} onClick={onClick} arrow={arrow}>
      {t.cta.quote}
    </CtaButton>
  )
}
