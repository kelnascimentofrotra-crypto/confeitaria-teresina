import { AnimatePresence, m } from 'framer-motion'
import { Instagram, Mail, X } from 'lucide-react'
import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'
import { useI18n } from '../i18n'
import { contact, instagramUrl, mailtoUrl, whatsappUrl } from '../lib/contact'
import { cn } from '../lib/cn'
import { scrollToId } from '../lib/scroll'
import { WhatsAppIcon } from './BrandIcons'
import { Logo } from './Logo'
import { QuoteButton } from './QuoteButton'

const links = ['inicio', 'projetos', 'entrega', 'diferenciais', 'solucoes', 'faq', 'contato'] as const
const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  open: boolean
  onClose: () => void
  returnFocusTo: RefObject<HTMLButtonElement>
  active: string
}

export function MenuDrawer({ open, onClose, returnFocusTo, active }: Props) {
  const { t, lang, setLang } = useI18n()
  const panel = useRef<HTMLDivElement>(null)
  useScrollLock(open)

  // Escape fecha; Tab fica preso dentro do painel enquanto aberto.
  useEffect(() => {
    if (!open) return
    const returnTarget = returnFocusTo.current
    const focusTimer = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 60)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focusables = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      returnTarget?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusTo])

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    onClose()
    // Aguarda o desbloqueio do scroll antes de navegar.
    window.setTimeout(() => scrollToId(id), 80)
  }

  const wa = whatsappUrl(t.cta.quoteMessage)
  const ig = instagramUrl()
  const mail = mailtoUrl(t.contact.form.subject, '')

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <m.div
            className="absolute inset-0 bg-[#02040b]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panel}
            id="menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu.title}
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col overflow-y-auto border-l border-white/10 bg-[linear-gradient(180deg,#061639_0%,#030c25_45%,#02040b_100%)] shadow-[-30px_0_80px_-20px_rgba(8,122,255,0.35)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/30 blur-[90px]"
            />
            <div className="relative flex items-center justify-between px-6 pt-5 sm:px-8">
              <Logo className="w-[104px]" alt="NEXAWEB" />
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label={t.menu.close}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-[transform,background-color] duration-300 hover:rotate-90 hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <nav aria-label={t.nav.label} className="relative mt-8 px-6 sm:px-8">
              <ul className="space-y-1">
                {links.map((id, i) => (
                  <m.li
                    key={id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.05, ease }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      className={cn(
                        'group flex items-baseline gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-white/5',
                        active === id ? 'text-white' : 'text-white/75 hover:text-white',
                      )}
                    >
                      <span className="w-6 text-xs font-bold tabular-nums text-cyan/80">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[1.6rem] font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                        {t.nav[id]}
                      </span>
                      {active === id && <span className="ml-auto h-2 w-2 self-center rounded-full bg-brand shadow-[0_0_12px_#087aff]" />}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>

            <div className="relative mt-auto space-y-6 px-6 pt-10 pb-8 sm:px-8">
              <div>
                <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/50 uppercase">{t.menu.language}</p>
                <div role="group" aria-label={t.menu.language} className="inline-flex rounded-full border border-white/15 p-1">
                  {(['pt', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLang(l)}
                      aria-pressed={lang === l}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-bold transition-colors',
                        lang === l ? 'bg-white text-brand' : 'text-white/75 hover:text-white',
                      )}
                    >
                      {t.lang[l]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-4 font-bold text-white">{t.menu.talk}</p>
                <QuoteButton onClick={wa ? onClose : go('contato')} />
                {(contact.hasWhatsapp || contact.hasInstagram || contact.hasEmail) && (
                  <div className="mt-5 flex gap-2">
                    {wa && (
                      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                        <WhatsAppIcon className="h-5 w-5" />
                      </a>
                    )}
                    {ig && (
                      <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                        <Instagram size={20} />
                      </a>
                    )}
                    {mail && (
                      <a href={mail} aria-label={t.contact.email} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
