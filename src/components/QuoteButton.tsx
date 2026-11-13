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
}: {
  variant?: 'light' | 'dark'
  className?: string
  message?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  const { t } = useI18n()
  return (
    <CtaButton href={quoteHref(message ?? t.cta.quoteMessage)} variant={variant} className={className} onClick={onClick}>
      {t.cta.quote}
    </CtaButton>
  )
}
