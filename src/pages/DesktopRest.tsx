import { DeferredFounder } from '../components/founder/DeferredFounder'
import { Progressive } from '../components/Progressive'
import { Contact } from '../sections/Contact'
import { Differentials } from '../sections/Differentials'
import { Faq } from '../sections/Faq'
import { Mission } from '../sections/Mission'
import { Process } from '../sections/Process'
import { Projects } from '../sections/Projects'
import { SalesImpact } from '../sections/SalesImpact'
import { Solutions } from '../sections/Solutions'
import { ValuePerception } from '../sections/ValuePerception'

/** Seções de tablet/desktop abaixo do hero (carregadas em um arquivo separado do carregamento inicial). */
export default function DesktopRest({ onDone }: { onDone: () => void }) {
  return (
    <Progressive onDone={onDone}>
      <ValuePerception />
      <SalesImpact />
      <Projects />
      <Process />
      <Differentials />
      <Solutions />
      <Mission />
      <DeferredFounder />
      <Faq />
      <Contact />
    </Progressive>
  )
}
