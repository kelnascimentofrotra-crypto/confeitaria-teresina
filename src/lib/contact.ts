import { site } from '../config/site'

const digits = site.contact.whatsapp.replace(/\D/g, '')

/** 5598984201544 → +55 (98) 98420-1544 */
function formatPhone(d: string): string {
  const m = d.match(/^55(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `+55 (${m[1]}) ${m[2]}-${m[3]}` : d ? `+${d}` : ''
}
const email = site.contact.email.trim()
const instagram = site.contact.instagram.replace(/^@/, '').trim()

export const contact = {
  hasWhatsapp: digits.length >= 10,
  hasEmail: /.+@.+\..+/.test(email),
  hasInstagram: instagram.length > 0,
  email,
  instagram,
  whatsappDisplay: formatPhone(digits),
}

export const hasAnyChannel = contact.hasWhatsapp || contact.hasEmail || contact.hasInstagram

export function whatsappUrl(text: string): string | null {
  if (!contact.hasWhatsapp) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function mailtoUrl(subject: string, body: string): string | null {
  if (!contact.hasEmail) return null
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function instagramUrl(): string | null {
  if (!contact.hasInstagram) return null
  return `https://instagram.com/${encodeURIComponent(instagram)}`
}

/** Link de orçamento: WhatsApp quando configurado; caso contrário, a seção de contato. */
export function quoteHref(message: string): string {
  return whatsappUrl(message) ?? '#contato'
}

export const isExternal = (href: string) => /^https?:/.test(href)
