import { m } from 'framer-motion'
import { Languages, Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { useI18n } from '../i18n'
import { cn } from '../lib/cn'
import { LogoLockup, LogoMark } from './Logo'
import { MenuDrawer } from './MenuDrawer'

export const primaryNav = ['inicio', 'projetos', 'entrega', 'diferenciais'] as const

export function LanguageButton({ className }: { className?: string }) {
  const { t, lang, toggle } = useI18n()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.lang.toggle}
      className={cn(
        'group inline-flex h-11 items-center gap-1.5 rounded-full px-2.5 text-white/90 transition-colors hover:bg-white/8 hover:text-white',
        className,
      )}
    >
      <Languages size={24} strokeWidth={2} className="transition-transform duration-500 group-hover:rotate-12" />
      <span className="text-[0.8rem] font-extrabold tracking-wide">{lang === 'pt' ? 'PT' : 'EN'}</span>
    </button>
  )
}

export function Header() {
  const { t } = useI18n()
  const scrolled = useScrolled()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <>
      <m.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500',
            // No celular o cabeçalho é sempre sólido, como na referência mobile.
            'max-md:rounded-none max-md:border-b max-md:border-white/10 max-md:bg-[#040916]/95 max-md:backdrop-blur-xl',
            scrolled
              ? 'md:rounded-b-[26px] border-b border-white/10 bg-[#030c25]/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <div className="container-wide flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
            <div className="flex items-center gap-3 lg:gap-6">
              <a href="#inicio" aria-label={t.a11y.home} className="shrink-0 rounded-lg p-1">
                <LogoLockup className="md:hidden" />
                <LogoMark className="hidden w-9 md:block" />
              </a>
              <nav aria-label={t.nav.label} className="hidden md:block">
                <ul className="flex items-center gap-1">
                  {primaryNav.map((id) => {
                    const isActive = active === id
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          aria-current={isActive ? 'true' : undefined}
                          className={cn(
                            'relative block rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-colors duration-300',
                            isActive ? 'text-brand' : 'text-white/90 hover:text-white',
                          )}
                        >
                          {isActive && (
                            <m.span
                              layoutId="nav-pill"
                              className="nav-pill-active absolute inset-0 rounded-full"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span className="relative">{t.nav[id]}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageButton />
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.menu.open}
                aria-expanded={open}
                aria-controls="menu-drawer"
                className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/8"
              >
                <Menu size={28} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </m.header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} returnFocusTo={menuButton} active={active} />
    </>
  )
}
