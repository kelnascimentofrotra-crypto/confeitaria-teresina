import { AnimatePresence, m } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useI18n, type Lang } from '../i18n'
import { cn } from '../lib/cn'

/** Bandeiras em SVG (emojis de bandeira não aparecem no Windows). */
function Flag({ lang, className }: { lang: Lang; className?: string }) {
  if (lang === 'pt')
    return (
      <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
        <rect width="28" height="20" rx="3" fill="#009c3b" />
        <path d="M14 3 25 10 14 17 3 10z" fill="#ffdf00" />
        <circle cx="14" cy="10" r="4.2" fill="#002776" />
        <path d="M10 9.3c2.6-.6 5.4-.3 8 .9" stroke="#fff" strokeWidth=".9" fill="none" />
      </svg>
    )
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect width="28" height="20" rx="3" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
    </svg>
  )
}

/** Seletor de idioma em pílula (cabeçalho mobile), com lista Português / English. */
export function LanguagePill({ className }: { className?: string }) {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${lang.toUpperCase()} · ${t.menu.language}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.04] pr-2.5 pl-2 text-[0.82rem] font-bold text-white transition-colors active:bg-white/10"
      >
        <Flag lang={lang} className="h-[14px] w-5 rounded-[3px]" />
        {lang.toUpperCase()}
        <ChevronDown size={15} className={cn('transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.ul
            role="listbox"
            aria-label={t.menu.language}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-12 right-0 z-10 w-44 origin-top-right overflow-hidden rounded-2xl border border-white/12 bg-[#071329]/95 p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {(['pt', 'en'] as const).map((l) => (
              <li key={l} role="option" aria-selected={lang === l}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[0.92rem] font-semibold transition-colors',
                    lang === l ? 'bg-brand/20 text-white' : 'text-white/80 active:bg-white/10',
                  )}
                >
                  <Flag lang={l} className="h-[15px] w-[21px] rounded-[3px]" />
                  {t.lang[l]}
                  {lang === l && <Check size={16} className="ml-auto text-cyan" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
