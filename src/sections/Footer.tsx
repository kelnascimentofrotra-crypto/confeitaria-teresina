import { ArrowUp, Instagram, Mail } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { LanguageButton } from '../components/Header'
import { Logo } from '../components/Logo'
import { useI18n } from '../i18n'
import { contact, hasAnyChannel, instagramUrl, mailtoUrl, whatsappUrl } from '../lib/contact'

const links = ['inicio', 'projetos', 'entrega', 'diferenciais', 'solucoes', 'faq', 'contato'] as const

export function Footer() {
  const { t } = useI18n()
  const wa = whatsappUrl(t.cta.quoteMessage)
  const ig = instagramUrl()
  const mail = mailtoUrl(t.contact.form.subject, '')
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-ink pt-16 pb-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/70 to-transparent" />
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo className="w-[130px]" alt="NEXAWEB" />
            <p className="mt-5 max-w-xs leading-relaxed text-white/70">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <p className="text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">{t.footer.navTitle}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {links.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="font-semibold text-white/80 transition-colors hover:text-white">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">{t.footer.contactTitle}</p>
            {hasAnyChannel ? (
              <ul className="mt-4 space-y-3">
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold text-white/80 hover:text-white">
                      <WhatsAppIcon className="h-5 w-5 text-cyan" /> {contact.whatsappDisplay}
                    </a>
                  </li>
                )}
                {ig && (
                  <li>
                    <a href={ig} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold text-white/80 hover:text-white">
                      <Instagram size={20} className="text-cyan" /> @{contact.instagram}
                    </a>
                  </li>
                )}
                {mail && (
                  <li>
                    <a href={mail} className="inline-flex items-center gap-3 font-semibold break-all text-white/80 hover:text-white">
                      <Mail size={20} className="text-cyan" /> {contact.email}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-4 text-white/70">
                <a href="#formulario" className="font-semibold underline decoration-brand/60 underline-offset-4 hover:text-white">
                  {t.footer.contactFallback}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/55">
            © {year} NEXAWEB. {t.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <LanguageButton />
            <a
              href="#inicio"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white/85 transition-colors hover:bg-white/8 hover:text-white"
            >
              <ArrowUp size={16} /> {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
