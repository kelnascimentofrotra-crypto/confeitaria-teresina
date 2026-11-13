import { AnimatePresence, m } from 'framer-motion'
import { Instagram, Mail, X } from 'lucide-react'
import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'
import { useI18n } from '../i18n'
import { instagramUrl, mailtoUrl, whatsappUrl } from '../lib/contact'
import { cn } from '../lib/cn'
import { scrollToId } from '../lib/scroll'
import { WhatsAppIcon } from './BrandIcons'
import { LogoLockup } from './Logo'

const links = ['inicio', 'projetos', 'entrega', 'diferenciais', 'contato'] as const
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
  const social = 'grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10'

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
            className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-[radial-gradient(70%_45%_at_100%_0%,rgba(8,90,230,0.55),transparent_70%),linear-gradient(180deg,#040a1c_0%,#02040b_100%)] md:max-w-[480px] md:border-l md:border-white/10"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/10 px-[clamp(1rem,4.5vw,2rem)] sm:h-[76px]">
              <LogoLockup />
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label={t.menu.close}
                className="grid h-11 w-11 place-items-center rounded-full text-white transition-[transform,background-color] duration-300 hover:rotate-90 hover:bg-white/10"
              >
                <X size={28} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-[clamp(1.5rem,7vw,2.5rem)] pt-10 pb-10">
              <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-[#4da3ff] uppercase">{t.mobile.menuTitle}</p>
              <nav aria-label={t.nav.label} className="mt-6">
                <ul>
                  {links.map((id, i) => (
                    <m.li
                      key={id}
                      className="border-b border-white/12"
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.12 + i * 0.06, ease }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={go(id)}
                        aria-current={active === id ? 'true' : undefined}
                        className="group flex items-baseline justify-between gap-4 py-4"
                      >
                        <span
                          className={cn(
                            'text-[clamp(2rem,9.5vw,2.6rem)] leading-tight font-bold tracking-[-0.03em] transition-[color,transform] duration-300 group-hover:translate-x-1',
                            active === id ? 'text-white' : 'text-white/85 group-hover:text-white',
                          )}
                        >
                          {t.nav[id]}
                        </span>
                        <span className={cn('text-sm font-bold tabular-nums', active === id ? 'text-cyan' : 'text-[#4da3ff]/80')}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <div role="group" aria-label={t.menu.language} className="mt-10 inline-flex w-fit rounded-full border border-[#2c5fb0]/70 bg-[#0b1a3a] p-1.5">
                {(['pt', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    aria-label={t.lang[l]}
                    className={cn(
                      'min-w-[5.5rem] rounded-full px-6 py-3 text-[0.95rem] font-extrabold transition-colors duration-300',
                      lang === l ? 'bg-brand text-white shadow-[0_0_20px_rgba(8,122,255,0.55)]' : 'text-white/70 hover:text-white',
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {(wa || ig || mail) && (
                <div className="mt-auto flex gap-2 pt-10">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={social}>
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  )}
                  {ig && (
                    <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={social}>
                      <Instagram size={20} />
                    </a>
                  )}
                  {mail && (
                    <a href={mail} aria-label={t.contact.email} className={social}>
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
