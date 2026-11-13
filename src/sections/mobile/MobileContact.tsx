import { Instagram, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { WhatsAppIcon } from '../../components/BrandIcons'
import { ContactForm } from '../../components/ContactForm'
import { CtaButton } from '../../components/CtaButton'
import { Reveal, RevealLines } from '../../components/Reveal'
import { useI18n } from '../../i18n'
import { contact, hasAnyChannel, instagramUrl, mailtoUrl, whatsappUrl } from '../../lib/contact'

function Channel({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 font-bold transition-colors hover:border-brand/60"
    >
      <span className="text-cyan">{icon}</span>
      {label}
    </a>
  )
}

export function MobileContact() {
  const { t } = useI18n()
  const c = t.contact
  const mc = t.mobile.contact
  const wa = whatsappUrl(t.cta.quoteMessage)
  const ig = instagramUrl()
  const mail = mailtoUrl(c.form.subject, '')

  return (
    <section
      id="contato"
      aria-labelledby="m-contact-title"
      className="relative overflow-hidden bg-[radial-gradient(60%_30%_at_100%_30%,rgba(8,90,230,0.4),transparent_70%),linear-gradient(180deg,#02040b_0%,#040b20_100%)] pt-16 pb-16"
    >
      <div className="m-wrap">
        <Reveal y={10}>
          <span className="m-badge m-badge-dark">{mc.badge}</span>
        </Reveal>
        <h2 id="m-contact-title" className="m-title mt-6 text-[clamp(2.2rem,10.6vw,2.8rem)]">
          <RevealLines lines={[...mc.lines, <span className="text-gradient-blue">{mc.highlight}</span>]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-white/80">{mc.text}</p>
          <CtaButton
            href={wa ?? '#formulario'}
            arrow="up-right"
            className="mt-8 w-full max-w-[23rem] justify-between !bg-linear-to-r !from-white !to-[#dbe7ff]"
          >
            {c.talk}
          </CtaButton>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="rounded-[1.6rem] border border-[#2c6fd6]/70 bg-[linear-gradient(160deg,rgba(14,36,90,0.55),rgba(4,10,30,0.85))] p-6">
            <p className="m-eyebrow font-medium text-[#8fb8ea]">{mc.cardEyebrow}</p>
            <h3 className="mt-3 text-[1.4rem] leading-tight font-bold tracking-[-0.02em]">{mc.cardTitle}</h3>
            {hasAnyChannel ? (
              <div className="mt-5 grid gap-2.5">
                {wa && <Channel href={wa} icon={<WhatsAppIcon className="h-5 w-5" />} label={contact.whatsappDisplay} />}
                {ig && <Channel href={ig} icon={<Instagram size={20} />} label={`@${contact.instagram}`} />}
                {mail && <Channel href={mail} icon={<Mail size={20} />} label={contact.email} />}
              </div>
            ) : (
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{mc.cardFallback}</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} amount={0.1} className="mt-6">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
