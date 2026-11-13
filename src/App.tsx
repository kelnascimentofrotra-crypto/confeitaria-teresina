import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { Header } from './components/Header'
import { useIsMobile } from './hooks/useIsMobile'
import { useI18n } from './i18n'
import { Contact } from './sections/Contact'
import { Differentials } from './sections/Differentials'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Mission } from './sections/Mission'
import { Process } from './sections/Process'
import { Projects } from './sections/Projects'
import { SalesImpact } from './sections/SalesImpact'
import { Solutions } from './sections/Solutions'
import { ValuePerception } from './sections/ValuePerception'
import { MobileContact } from './sections/mobile/MobileContact'
import { MobileDifferentials } from './sections/mobile/MobileDifferentials'
import { MobileHero } from './sections/mobile/MobileHero'
import { MobileMission } from './sections/mobile/MobileMission'
import { MobileProcess } from './sections/mobile/MobileProcess'
import { MobileProjects } from './sections/mobile/MobileProjects'
import { MobileSales } from './sections/mobile/MobileSales'
import { MobileSolutions } from './sections/mobile/MobileSolutions'
import { MobileValue } from './sections/mobile/MobileValue'

export default function App() {
  const { t } = useI18n()
  // Celular (até 767 px) tem composição própria, baseada na referência mobile.
  const isMobile = useIsMobile()
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
          {isMobile ? (
            <>
              <MobileHero />
              <MobileValue />
              <MobileSales />
              <MobileProjects />
              <MobileProcess />
              <MobileDifferentials />
              <MobileSolutions />
              <MobileMission />
              <Faq />
              <MobileContact />
            </>
          ) : (
            <>
              <Hero />
              <ValuePerception />
              <SalesImpact />
              <Projects />
              <Process />
              <Differentials />
              <Solutions />
              <Mission />
              <Faq />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
