import { DeferredFounder } from '../components/founder/DeferredFounder'
import { Progressive } from '../components/Progressive'
import { Faq } from '../sections/Faq'
import { MobileContact } from '../sections/mobile/MobileContact'
import { MobileDifferentials } from '../sections/mobile/MobileDifferentials'
import { MobileMission } from '../sections/mobile/MobileMission'
import { MobileProcess } from '../sections/mobile/MobileProcess'
import { MobileProjects } from '../sections/mobile/MobileProjects'
import { MobileSales } from '../sections/mobile/MobileSales'
import { MobileSolutions } from '../sections/mobile/MobileSolutions'
import { MobileValue } from '../sections/mobile/MobileValue'

/** Seções do celular abaixo do hero (carregadas em um arquivo separado do carregamento inicial). */
export default function MobileRest({ onDone }: { onDone: () => void }) {
  return (
    <Progressive onDone={onDone}>
      <MobileValue />
      <MobileSales />
      <MobileProjects />
      <MobileProcess />
      <MobileDifferentials />
      <MobileSolutions />
      <MobileMission />
      <DeferredFounder />
      <Faq />
      <MobileContact />
    </Progressive>
  )
}
