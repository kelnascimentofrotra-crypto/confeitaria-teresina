import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { useIsMobile } from './hooks/useIsMobile'
import { useI18n } from './i18n'
import { scrollToId } from './lib/scroll'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { MobileHero } from './sections/mobile/MobileHero'

// O carregamento inicial traz só o cabeçalho e o hero. As demais seções ficam em arquivos
// separados (um para celular, outro para desktop), baixados em paralelo e montados aos poucos.
const loadMobile = () => import('./pages/MobileRest')
const loadDesktop = () => import('./pages/DesktopRest')
const MobileRest = lazy(loadMobile)
const DesktopRest = lazy(loadDesktop)
// começa a baixar o arquivo do aparelho atual enquanto o hero é montado
void (window.matchMedia('(max-width: 767px)').matches ? loadMobile() : loadDesktop())

export default function App() {
  const { t } = useI18n()
  // Celular (até 767 px) tem composição própria, baseada na referência mobile.
  const isMobile = useIsMobile()
  // O rodapé entra depois da última seção, para nunca ser empurrado na tela.
  const [restDone, setRestDone] = useState(false)
  const onDone = useCallback(() => setRestDone(true), [])

  // Link para uma seção que ainda não foi montada (toque logo no primeiro instante):
  // em vez de não fazer nada, espera a seção existir e rola até ela.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      if (!id || document.getElementById(id)) return
      e.preventDefault()
      scrollToId(id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-white px-5 py-3 font-bold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.a11y.skip}
        </a>
        <Header />
        <main id="conteudo">
          {isMobile ? <MobileHero /> : <Hero />}
          <Suspense fallback={null}>{isMobile ? <MobileRest onDone={onDone} /> : <DesktopRest onDone={onDone} />}</Suspense>
        </main>
        {restDone && <Footer />}
      </MotionConfig>
    </LazyMotion>
  )
}
