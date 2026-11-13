import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from './en'
import { pt } from './pt'
import { I18nContext, type Lang } from './context'

const STORAGE_KEY = 'nexaweb-lang'
const dictionaries = { pt, en }

function readInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* armazenamento indisponível (modo privado etc.) */
  }
  return 'pt'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignora */
    }
  }, [])

  const toggle = useCallback(() => setLang(lang === 'pt' ? 'en' : 'pt'), [lang, setLang])

  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo(() => ({ lang, t, setLang, toggle }), [lang, t, setLang, toggle])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
