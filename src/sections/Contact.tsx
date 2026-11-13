import { Instagram, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { ContactForm } from '../components/ContactForm'
import { CtaButton } from '../components/CtaButton'
import { QuoteButton } from '../components/QuoteButton'
import { Reveal, RevealLines } from '../components/Reveal'
import { useI18n } from '../i18n'
import { contact, hasAnyChannel, instagramUrl, mailtoUrl, whatsappUrl } from '../lib/contact'

function Channel({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  const { t } = useI18n()
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:bg-white/[0.07]"
    >
      <span className="icon-tile-dark h-12 w-12 shrink-0 transition-transform duration-500 group-hover:scale-105">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs font-bold tracking-[0.14em] text-white/55 uppercase">{label}</span>
        <span className="block truncate font-bold text-white">{value}</span>
      </span>
      {external && <span className="sr-only">{t.a11y.newTab}</span>}
    </a>
  )
}

export function Contact() {
  const { t } = useI18n()
  const c = t.contact
  const wa = whatsappUrl(t.cta.quoteMessage)
  const ig = instagramUrl()
  const mail = mailtoUrl(c.form.subject, '')

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#000_0%,#030c25_55%,#02040b_100%)] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal y={12}>
            <p className="text-xs font-extrabold tracking-[0.22em] text-cyan uppercase">{c.eyebrow}</p>
          </Reveal>
          <h2 id="contact-title" className="mt-4 text-[clamp(2.1rem,4.8vw,3.7rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            <RevealLines lines={[c.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed font-medium text-white/80 sm:text-lg">{c.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {contact.hasWhatsapp && <QuoteButton />}
              <CtaButton href="#formulario" variant={contact.hasWhatsapp ? 'ghost' : 'light'}>
                {c.talk}
              </CtaButton>
            </div>
          </Reveal>

          {hasAnyChannel && (
            <Reveal delay={0.2} className="mt-10">
              <p className="mb-3 text-sm font-bold text-white/60">{c.channelsTitle}</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {wa && <Channel href={wa} icon={<WhatsAppIcon className="h-6 w-6" />} label={c.whatsapp} value={contact.whatsappDisplay} />}
                {ig && <Channel href={ig} icon={<Instagram size={22} />} label={c.instagram} value={`@${contact.instagram}`} />}
                {mail && <Channel href={mail} icon={<Mail size={22} />} label={c.email} value={contact.email} />}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} amount={0.15}>
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(14,36,90,0.55),rgba(4,10,30,0.8))] p-6 shadow-[0_40px_80px_-40px_rgba(8,122,255,0.45)] backdrop-blur-xl sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
