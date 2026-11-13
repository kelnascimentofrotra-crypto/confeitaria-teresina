import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { Header } from './components/Header'
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

export default function App() {
  const { t } = useI18n()
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
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
