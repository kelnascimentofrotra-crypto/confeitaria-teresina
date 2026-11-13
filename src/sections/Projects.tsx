import { m } from 'framer-motion'
import { Layers } from 'lucide-react'
import cloudLeft from '../assets/img/cloud-left.webp'
import cloudRight from '../assets/img/cloud-right.webp'
import { BrowserMock, type MockVariant } from '../components/BrowserMock'
import { CtaButton } from '../components/CtaButton'
import { Reveal, RevealLines } from '../components/Reveal'
import { SectionBadge } from '../components/SectionBadge'
import { projects, type Project } from '../data/projects'
import { useI18n } from '../i18n'
import { quoteHref } from '../lib/contact'

function Clouds() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[820px]">
      <div className="absolute inset-x-0 top-0 h-[460px] bg-[linear-gradient(180deg,#02040b_0%,#071d55_20%,#2a62bd_44%,#a9c6ee_70%,#f4f8ff_100%)]" />
      <m.img
        src={cloudLeft}
        alt=""
        width={300}
        height={297}
        loading="lazy"
        className="cloud -left-[8%] top-[40px] w-[min(70vw,680px)] opacity-95"
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.img
        src={cloudRight}
        alt=""
        width={292}
        height={287}
        loading="lazy"
        className="cloud -right-[8%] top-[20px] w-[min(70vw,680px)] opacity-95"
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-x-[15%] top-[260px] h-[200px] rounded-full bg-white/60 blur-[70px]" />
    </div>
  )
}

function FormatCard({ variant, title, tag, text, delay }: { variant: MockVariant; title: string; tag: string; text: string; delay: number }) {
  const { t } = useI18n()
  const message = t.projects.formatMessage.replace('{format}', title.toLowerCase())
  return (
    <Reveal delay={delay} amount={0.2}>
      <article className="card-frost group grid h-full items-center gap-5 rounded-[28px] p-3 transition-transform duration-500 hover:-translate-y-1 sm:grid-cols-[1.2fr_1fr] sm:p-3.5">
        <div className="relative">
          <BrowserMock variant={variant} />
          <span className="absolute top-[5px] right-3 rounded-full bg-white/90 px-2 py-0.5 text-[0.62rem] font-bold tracking-wide text-[#0b1630] uppercase shadow-sm">
            {t.projects.illustration}
          </span>
        </div>
        <div className="px-2 pb-3 sm:px-1 sm:pb-0">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] text-brand uppercase">{tag}</p>
          <h3 className="mt-1.5 text-[1.45rem] leading-tight font-extrabold tracking-tight text-[#0b1630]">{title}</h3>
          <p className="mt-2 text-[0.93rem] leading-relaxed text-slate-ink">{text}</p>
          <CtaButton
            href={quoteHref(message)}
            className="mt-5 !gap-3 !py-1.5 !pr-1.5 !pl-4 text-[0.88rem] whitespace-normal sm:text-[0.88rem]"
          >
            {t.projects.want}
          </CtaButton>
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { t, lang } = useI18n()
  return (
    <Reveal delay={delay} amount={0.2}>
      <article className="card-frost grid h-full items-center gap-5 rounded-[28px] p-3 sm:grid-cols-[1.2fr_1fr] sm:p-3.5">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category[lang]}`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full rounded-[18px] object-cover object-top"
        />
        <div className="px-2 pb-3 sm:px-1 sm:pb-0">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] text-brand uppercase">{project.category[lang]}</p>
          <h3 className="mt-1.5 text-[1.45rem] leading-tight font-extrabold tracking-tight text-[#0b1630] uppercase">
            {project.name}
          </h3>
          {project.year && <p className="mt-1 text-[0.95rem] font-semibold text-[#8090ad]">{project.year}</p>}
          <p className="mt-2 text-[0.93rem] leading-relaxed text-slate-ink">{project.description[lang]}</p>
          {project.url ? (
            <CtaButton href={project.url} className="mt-5 !py-1.5 !pr-1.5 !pl-4 text-[0.9rem]">
              {t.projects.view}
            </CtaButton>
          ) : (
            <span className="mt-5 inline-block rounded-full bg-[#e6eefb] px-4 py-2 text-[0.85rem] font-bold text-[#36507f]">
              {t.projects.inProgress}
            </span>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  const { t } = useI18n()
  const p = t.projects
  const hasReal = projects.length > 0
  const variants: MockVariant[] = ['institucional', 'landing', 'sistema', 'plataforma']

  return (
    <section id="projetos" data-nav="projetos" aria-labelledby="projects-title" className="relative overflow-hidden bg-snow pt-[230px] pb-24 sm:pt-[270px] sm:pb-32">
      <Clouds />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={16}>
            <SectionBadge icon={<Layers size={20} />}>{p.badge}</SectionBadge>
          </Reveal>
          <h2
            id="projects-title"
            className="mt-7 text-[clamp(2rem,4.8vw,3.5rem)] text-balance leading-[1.06] font-extrabold tracking-[-0.03em] text-[#0b1630]"
          >
            <RevealLines
              lines={
                hasReal
                  ? [p.realTitleA, <span className="text-brand">{p.realTitleHighlight}</span>]
                  : [p.titleA, <span className="text-brand">{p.titleHighlight}</span>]
              }
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed font-medium text-[#3c4a66] sm:text-lg">{p.subtitle}</p>
            <span className="bar-accent mx-auto mt-7" aria-hidden="true" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {hasReal
            ? projects.map((project, i) => <ProjectCard key={project.id} project={project} delay={(i % 2) * 0.1} />)
            : p.formats.map((f, i) => (
                <FormatCard key={f.id} variant={variants[i]} title={f.title} tag={f.tag} text={f.text} delay={(i % 2) * 0.1} />
              ))}
        </div>
      </div>
    </section>
  )
}
