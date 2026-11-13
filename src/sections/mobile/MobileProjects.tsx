import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import cloudLeft from '../../assets/img/cloud-left.webp'
import cloudRight from '../../assets/img/cloud-right.webp'
import { LogoMark } from '../../components/Logo'
import { Reveal, RevealLines } from '../../components/Reveal'
import { projects, type Project } from '../../data/projects'
import { useI18n } from '../../i18n'
import { isExternal, quoteHref } from '../../lib/contact'
import { Img } from '../../components/Img'

/** Artes das prévias (em código, sem prints de terceiros), como nas telas 5 e 6. */
const arts: Array<{ bg: string; art: ReactNode }> = [
  {
    bg: 'bg-[linear-gradient(110deg,#080a14_0%,#120c18_45%,#3a0d12_100%)]',
    art: (
      <span className="absolute top-[18%] -right-[8%] h-[70%] w-[62%] -rotate-[18deg] rounded-[50%] border-[10px] border-[#ff5a46] shadow-[0_0_28px_rgba(255,70,50,0.85),inset_0_0_26px_rgba(255,70,50,0.7)] transition-transform duration-700 group-hover:-rotate-[10deg]" />
    ),
  },
  {
    bg: 'bg-[linear-gradient(120deg,#0a3fb8_0%,#0a5be0_55%,#1689ff_100%)]',
    art: (
      <>
        <span className="absolute -right-[6%] -bottom-[30%] h-[150%] w-[42%] rotate-[28deg] bg-linear-to-b from-white/45 via-white/15 to-white/30 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-transform duration-700 group-hover:translate-x-2" />
        <span className="absolute right-[18%] -bottom-[30%] h-[150%] w-[3%] rotate-[28deg] bg-white/50" />
      </>
    ),
  },
  {
    bg: 'bg-[linear-gradient(120deg,#2a1d4f_0%,#5b3aa0_55%,#b98bb9_100%)]',
    art: (
      <span className="absolute right-[5%] -bottom-[2%] h-[80%] w-[36%] rounded-t-full bg-[radial-gradient(circle_at_50%_25%,#f2b9a5_0%,#7c4f8f_45%,#1d1230_85%)] transition-transform duration-700 group-hover:-translate-y-1" />
    ),
  },
  {
    bg: 'bg-[linear-gradient(120deg,#0b1a33_0%,#152945_60%,#0d1f3d_100%)]',
    art: (
      <span className="absolute right-[5%] bottom-[7%] grid aspect-square w-[30%] place-items-center rounded-[22%] border-2 border-[#3fb2ff] bg-[#0a1a33] shadow-[0_0_26px_rgba(17,170,255,0.55)] transition-transform duration-700 group-hover:scale-105">
        <LogoMark className="w-[55%]" />
      </span>
    ),
  },
]

function CardShell({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} y={26} amount={0.2}>
      <article className="m-card-light group p-3.5">{children}</article>
    </Reveal>
  )
}

function ArrowLink({ href, label }: { href: string; label: string }) {
  const external = isExternal(href)
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="btn-arrow !h-11 !w-11 shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <ArrowUpRight size={20} strokeWidth={2.6} aria-hidden="true" />
    </a>
  )
}

function PreviewCard({ index }: { index: number }) {
  const { t } = useI18n()
  const mp = t.mobile.projects
  const card = mp.cards[index]
  const format = t.projects.formats[index]
  const { bg, art } = arts[index]
  const message = t.projects.formatMessage.replace('{format}', format.title.toLowerCase())
  return (
    <CardShell delay={0.05}>
      <div className={`relative aspect-[2/1] overflow-hidden rounded-[1.15rem] ${bg}`} aria-hidden="true">
        {art}
        <div className="relative max-w-[70%] p-5 text-white">
          <p className="text-[0.66rem] font-extrabold tracking-[0.16em] uppercase">{card.tag}</p>
          <p className="mt-3 text-[clamp(1.15rem,5.6vw,1.45rem)] leading-[1.1] font-extrabold tracking-[-0.03em]">{card.headline}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1.5">
        <div>
          <h3 className="text-[1.15rem] leading-tight font-extrabold tracking-tight text-[#0b1630]">{format.title}</h3>
          <p className="mt-0.5 text-[0.82rem] text-[#6b7891]">{mp.preview}</p>
        </div>
        <ArrowLink href={quoteHref(message)} label={`${t.projects.want}: ${format.title}`} />
      </div>
    </CardShell>
  )
}

function RealCard({ project }: { project: Project }) {
  const { t, lang } = useI18n()
  return (
    <CardShell delay={0.05}>
      <Img
        src={project.image}
        alt={`${project.name} — ${project.category[lang]}`}
        loading="lazy"
        decoding="async"
        className="aspect-[2/1] w-full rounded-[1.15rem] object-cover object-top"
      />
      <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1.5">
        <div>
          <h3 className="text-[1.15rem] leading-tight font-extrabold tracking-tight text-[#0b1630]">{project.name}</h3>
          <p className="mt-0.5 text-[0.82rem] text-[#6b7891]">
            {project.category[lang]}
            {project.year ? ` · ${project.year}` : ''}
          </p>
        </div>
        {project.url ? (
          <ArrowLink href={project.url} label={`${t.projects.view}: ${project.name}`} />
        ) : (
          <span className="rounded-full bg-[#e6eefb] px-3 py-1.5 text-[0.75rem] font-bold text-[#36507f]">{t.projects.inProgress}</span>
        )}
      </div>
    </CardShell>
  )
}

function Heading({ badge, title, highlight, id }: { badge: string; title: string; highlight: string; id?: string }) {
  return (
    <div className="text-center">
      <Reveal y={12}>
        <span className="m-badge m-badge-light">{badge}</span>
      </Reveal>
      <h2 id={id} className="m-title mx-auto mt-5 max-w-[23rem] text-[clamp(1.6rem,7.4vw,2.1rem)] text-[#0b1630]">
        <RevealLines lines={[title, <span className="text-brand">{highlight}</span>]} />
      </h2>
    </div>
  )
}

export function MobileProjects() {
  const { t } = useI18n()
  const mp = t.mobile.projects
  const hasReal = projects.length > 0

  return (
    <section id="projetos" data-nav="projetos" aria-labelledby="m-projects-title" className="relative overflow-hidden bg-snow pt-16 pb-20">
      {/* Céu com nuvens no topo, como na referência */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[420px]">
        <div className="absolute inset-x-0 top-0 h-[260px] bg-[linear-gradient(180deg,#02040b_0%,#1f56b4_22%,#9cc2f0_55%,#f4f8ff_100%)]" />
        <Img src={cloudLeft} alt="" width={300} height={297} loading="lazy" className="cloud -left-[25%] -top-4 w-[min(90%,26rem)] opacity-90" />
        <Img src={cloudRight} alt="" width={292} height={287} loading="lazy" className="cloud -right-[25%] -top-8 w-[min(90%,26rem)] opacity-90" />
      </div>

      <div className="m-wrap relative pt-10">
        <Heading
          id="m-projects-title"
          badge={t.projects.badge}
          title={hasReal ? t.projects.realTitleA : mp.title}
          highlight={hasReal ? t.projects.realTitleHighlight : mp.highlight}
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-[21rem] text-center text-[0.98rem] leading-relaxed text-[#5b6884]">
            {hasReal ? t.projects.subtitle : mp.subtitle}
          </p>
        </Reveal>

        {hasReal ? (
          <div className="mt-9 space-y-5">
            {projects.map((p) => (
              <RealCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-9 space-y-5">
              <PreviewCard index={0} />
              <PreviewCard index={1} />
            </div>
            <div className="mt-16">
              <Heading badge={mp.moreBadge} title={mp.moreTitle} highlight={mp.moreHighlight} />
            </div>
            <div className="mt-8 space-y-5">
              <PreviewCard index={2} />
              <PreviewCard index={3} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
