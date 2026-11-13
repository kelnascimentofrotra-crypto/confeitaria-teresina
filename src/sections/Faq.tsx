import { AnimatePresence, m } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { useI18n } from '../i18n'

export function Faq() {
  const { t } = useI18n()
  // Segunda pergunta começa aberta, como na referência aprovada.
  const [open, setOpen] = useState<number | null>(1)
  const baseId = useId()

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full border-[3px] border-[#3d5bff]/70 shadow-[0_0_40px_rgba(61,91,255,0.6)] sm:-top-56 sm:-right-48 sm:h-[420px] sm:w-[420px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[38%] right-[12%] hidden text-white/80 lg:block">
        <span className="absolute top-0">+</span>
        <span className="absolute top-32 -left-2">+</span>
        <span className="absolute top-64">+</span>
      </div>

      <div className="container-x relative">
        <Reveal y={16}>
          <h2 id="faq-title" className="text-center text-[clamp(2rem,4.4vw,3.4rem)] font-semibold tracking-[-0.025em]">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-[720px] space-y-3.5">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            const btnId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <Reveal key={i} delay={i * 0.05} y={14}>
                <div className="faq-item overflow-hidden rounded-[14px]" data-open={isOpen}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? panelId : undefined}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.02rem] font-bold text-white sm:px-6 sm:text-[1.1rem]"
                    >
                      <span>{item.q}</span>
                      <span className="relative grid h-6 w-6 shrink-0 place-items-center" aria-hidden="true">
                        <AnimatePresence initial={false} mode="wait">
                          <m.span
                            key={isOpen ? 'minus' : 'plus'}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isOpen ? <Minus size={22} strokeWidth={2.6} /> : <Plus size={22} strokeWidth={2.6} />}
                          </m.span>
                        </AnimatePresence>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-[0.98rem] leading-relaxed text-white/85 sm:px-6">{item.a}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
