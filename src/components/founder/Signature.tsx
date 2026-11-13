import { m } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/** Traço manuscrito "Miguel" (desenhado à mão em curvas, exclusivo da NEXAWEB). */
const SCRIPT =
  'M12 102 C18 78 24 44 34 28 C40 20 46 52 50 98 C54 70 62 40 72 28 C79 20 84 56 86 92 C87 100 92 102 98 94 C104 86 108 74 112 64 C110 78 108 96 114 100 C124 102 146 74 160 68 C148 58 132 68 132 84 C132 100 150 104 159 90 C163 83 163 74 162 67 C163 92 166 124 158 138 C151 150 136 146 138 132 C141 116 164 106 178 92 C182 84 184 74 185 66 C183 80 180 98 190 100 C200 102 208 86 212 68 C210 82 208 98 216 100 C224 102 230 94 236 86 C246 80 252 70 246 64 C240 58 230 70 232 84 C234 98 248 104 260 94 C272 82 284 50 284 30 C284 16 274 18 272 34 C269 58 270 90 280 100 C290 106 302 98 312 88 C330 72 352 70 374 76'
const FLOURISH = 'M388 98 C310 124 150 130 36 122'

/** Assinatura do fundador: nome em tipografia marcante + traço manuscrito que se desenha. */
export function Signature({ name, role }: { name: string; role: string }) {
  return (
    <m.div
      className="founder-sign"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.55 }}
    >
      <div className="founder-sign-mark">
        <p className="founder-name" aria-hidden="true">
          {name
            .toUpperCase()
            .split('')
            .map((l, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <m.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '105%' },
                    show: { y: '0%', transition: { duration: 0.9, delay: i * 0.07, ease } },
                  }}
                >
                  {l}
                </m.span>
              </span>
            ))}
        </p>
        <svg viewBox="0 0 400 156" className="founder-script" aria-hidden="true" fill="none">
          <defs>
            <linearGradient id="founder-ink" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#8cc8ff" />
              <stop offset="1" stopColor="#11c8ff" />
            </linearGradient>
          </defs>
          <m.path
            d={SCRIPT}
            stroke="url(#founder-ink)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 2.1, delay: 0.55, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 0.55 } } },
            }}
          />
          <m.circle
            cx="116"
            cy="48"
            r="2.6"
            fill="#ffffff"
            variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { delay: 2.5, duration: 0.25 } } }}
          />
          <m.path
            d={FLOURISH}
            stroke="url(#founder-ink)"
            strokeWidth="2.4"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 0.9, transition: { pathLength: { duration: 0.7, delay: 2.7, ease }, opacity: { duration: 0.2, delay: 2.7 } } },
            }}
          />
        </svg>
      </div>
      <m.p
        className="mt-3 flex items-center gap-3 text-[0.82rem] font-bold tracking-[0.22em] text-white/75 uppercase"
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.1, ease } } }}
      >
        <span className="h-px w-10 bg-linear-to-r from-brand to-cyan" aria-hidden="true" />
        <span>
          <span className="text-white">{name}</span> · {role}
        </span>
      </m.p>
    </m.div>
  )
}
