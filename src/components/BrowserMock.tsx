import { cn } from '../lib/cn'

export type MockVariant = 'institucional' | 'landing' | 'sistema' | 'plataforma'

const bar = 'rounded-full bg-white/20'

/** Ilustração em código (não é print de cliente) de um formato de projeto. */
export function BrowserMock({ variant, className }: { variant: MockVariant; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'group/mock relative overflow-hidden rounded-[18px] bg-[#050b1f] shadow-[0_24px_50px_-24px_rgba(3,12,37,0.75)] ring-1 ring-black/5',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#0a1430] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 h-3 flex-1 rounded-full bg-white/8" />
      </div>
      <div className="relative aspect-[16/10]">{renderVariant(variant)}</div>
    </div>
  )
}

function Nav({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-between px-[6%] pt-[5%]">
      <span className={cn('h-2.5 w-10 rounded-sm', light ? 'bg-[#087aff]' : 'bg-white/80')} />
      <div className="hidden gap-2 sm:flex">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn('h-1.5 w-6', light ? 'rounded-full bg-[#0b1630]/20' : bar)} />
        ))}
      </div>
      <span className="h-3.5 w-12 rounded-full bg-[#087aff]" />
    </div>
  )
}

function renderVariant(variant: MockVariant) {
  switch (variant) {
    case 'institucional':
      return (
        <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_80%_40%,rgba(8,122,255,0.55),transparent_60%),linear-gradient(180deg,#071329,#030712)]">
          <Nav />
          <div className="grid grid-cols-[1.1fr_1fr] items-center gap-3 px-[6%] pt-[7%]">
            <div className="space-y-2">
              <span className="block h-3.5 w-[92%] rounded-sm bg-white/90" />
              <span className="block h-3.5 w-[70%] rounded-sm bg-white/90" />
              <span className="block h-1.5 w-[80%] rounded-full bg-white/30" />
              <span className="block h-1.5 w-[60%] rounded-full bg-white/30" />
              <div className="flex gap-2 pt-2">
                <span className="h-4 w-14 rounded-full bg-[#087aff]" />
                <span className="h-4 w-12 rounded-full border border-white/40" />
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-[72%]">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7cc4ff,#087aff_45%,#04205e_80%)] shadow-[0_0_40px_rgba(17,160,255,0.7)] transition-transform duration-700 group-hover/mock:scale-105" />
              <span className="absolute inset-[-12%] rounded-full border border-cyan/40" />
            </div>
          </div>
          <div className="absolute inset-x-[6%] bottom-[7%] grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-7 rounded-lg border border-white/10 bg-white/[0.06]" />
            ))}
          </div>
        </div>
      )
    case 'landing':
      return (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#f4f8ff,#dde9fb)]">
          <Nav light />
          <div className="flex flex-col items-center px-[8%] pt-[6%] text-center">
            <span className="h-3 w-16 rounded-full bg-[#087aff]/15" />
            <span className="mt-2.5 block h-3.5 w-[70%] rounded-sm bg-[#0b1630]" />
            <span className="mt-1.5 block h-3.5 w-[52%] rounded-sm bg-[#087aff]" />
            <span className="mt-2.5 block h-1.5 w-[58%] rounded-full bg-[#0b1630]/25" />
            <span className="mt-3 h-5 w-24 rounded-full bg-[#030c25] shadow-[0_6px_16px_rgba(8,122,255,0.45)] transition-transform duration-500 group-hover/mock:-translate-y-0.5" />
          </div>
          <div className="absolute inset-x-[18%] bottom-[7%] rounded-xl bg-white p-2.5 shadow-[0_12px_30px_-12px_rgba(8,60,160,0.45)]">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <span className="h-4 rounded-md bg-[#eef3fb]" />
              <span className="h-4 rounded-md bg-[#eef3fb]" />
              <span className="h-4 w-12 rounded-md bg-[#087aff]" />
            </div>
          </div>
        </div>
      )
    case 'sistema':
      return (
        <div className="absolute inset-0 grid grid-cols-[22%_1fr] bg-[#060d22]">
          <div className="space-y-2.5 border-r border-white/8 bg-[#081331] p-[12%] pt-[18%]">
            <span className="block h-3 w-[70%] rounded-sm bg-[#087aff]" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={cn('block h-1.5 rounded-full', i === 1 ? 'w-[85%] bg-cyan/70' : 'w-[75%] bg-white/15')} />
            ))}
          </div>
          <div className="p-[6%]">
            <div className="grid grid-cols-3 gap-2">
              {['bg-[#087aff]', 'bg-cyan', 'bg-white/70'].map((c, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.05] p-2">
                  <span className="block h-1.5 w-[50%] rounded-full bg-white/25" />
                  <span className={cn('mt-1.5 block h-2.5 w-[70%] rounded-sm', c)} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-[52%] items-end gap-[5%] rounded-lg border border-white/10 bg-white/[0.03] px-[6%] pb-[6%]">
              {[45, 70, 38, 82, 60, 92, 74].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 origin-bottom rounded-t-sm bg-linear-to-t from-[#0650c8] to-[#11b4ff] transition-transform duration-700 group-hover/mock:scale-y-110"
                />
              ))}
            </div>
          </div>
        </div>
      )
    case 'plataforma':
      return (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a1a44,#050b1f)]">
          <Nav />
          <div className="mx-[6%] mt-[4%] flex h-4 items-center rounded-full bg-white/10 px-2">
            <span className="h-1.5 w-1/3 rounded-full bg-white/30" />
          </div>
          <div className="grid grid-cols-3 gap-2 px-[6%] pt-[4%]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.05] p-1.5 transition-transform duration-500 group-hover/mock:-translate-y-0.5">
                <span
                  className={cn(
                    'block aspect-[16/9] rounded-md',
                    i % 3 === 0 ? 'bg-[linear-gradient(135deg,#087aff,#11c8ff)]' : i % 3 === 1 ? 'bg-[linear-gradient(135deg,#1b2b5c,#3d5aa8)]' : 'bg-[linear-gradient(135deg,#0d3b8c,#087aff)]',
                  )}
                />
                <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      )
  }
}
