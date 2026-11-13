import { AnimatePresence, m } from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useI18n } from '../i18n'
import { mailtoUrl, whatsappUrl } from '../lib/contact'
import { cn } from '../lib/cn'

type Field = 'name' | 'reply' | 'type' | 'message' | 'consent'
type Status = { kind: 'success' | 'warning'; text: string } | null

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactForm() {
  const { t } = useI18n()
  const f = t.contact.form
  const id = useId()
  const [values, setValues] = useState({ name: '', reply: '', type: '', message: '', consent: false })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>(null)

  const validate = () => {
    const e: Partial<Record<Field, string>> = {}
    if (values.name.trim().length < 2) e.name = f.errors.name
    const reply = values.reply.trim()
    const phoneDigits = reply.replace(/\D/g, '')
    if (!(emailRe.test(reply) || (phoneDigits.length >= 10 && phoneDigits.length <= 13 && !/[a-z]/i.test(reply)))) e.reply = f.errors.reply
    if (!values.type) e.type = f.errors.type
    if (values.message.trim().length < 10) e.message = f.errors.message
    if (!values.consent) e.consent = f.errors.consent
    return e
  }

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    setStatus(null)
    const firstError = Object.keys(e)[0]
    if (firstError) {
      document.getElementById(`${id}-${firstError}`)?.focus()
      return
    }

    const body = [
      f.composed,
      '',
      `${f.name}: ${values.name.trim()}`,
      `${f.reply}: ${values.reply.trim()}`,
      `${f.type}: ${values.type}`,
      '',
      values.message.trim(),
    ].join('\n')

    const wa = whatsappUrl(body)
    const mail = mailtoUrl(f.subject, body)
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus({ kind: 'success', text: f.sentWhatsapp })
    } else if (mail) {
      window.location.href = mail
      setStatus({ kind: 'success', text: f.sentEmail })
    } else {
      setStatus({ kind: 'warning', text: f.unavailable })
    }
  }

  const set = (field: Field, value: string | boolean) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${id}-${field}-err`} className="mt-1.5 flex items-center gap-1.5 text-[0.85rem] font-medium text-[#ff8da0]">
        <AlertCircle size={14} aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null

  const aria = (field: Field) => ({
    id: `${id}-${field}`,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${id}-${field}-err` : undefined,
  })

  const label = 'mb-2 block text-[0.9rem] font-bold text-white/90'

  return (
    <form id="formulario" noValidate onSubmit={onSubmit} className="space-y-5" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="text-xl font-extrabold tracking-tight">
        {f.title}
      </h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            {f.name}
          </label>
          <input {...aria('name')} className="field" autoComplete="name" placeholder={f.namePh} value={values.name} onChange={(e) => set('name', e.target.value)} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor={`${id}-reply`} className={label}>
            {f.reply}
          </label>
          <input {...aria('reply')} className="field" autoComplete="email" inputMode="email" placeholder={f.replyPh} value={values.reply} onChange={(e) => set('reply', e.target.value)} />
          {errorText('reply')}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-type`} className={label}>
          {f.type}
        </label>
        <select {...aria('type')} className={cn('field', !values.type && 'text-white/50')} value={values.type} onChange={(e) => set('type', e.target.value)}>
          <option value="" disabled>
            {f.typePh}
          </option>
          {f.types.map((tp) => (
            <option key={tp} value={tp}>
              {tp}
            </option>
          ))}
        </select>
        {errorText('type')}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {f.message}
        </label>
        <textarea {...aria('message')} className="field min-h-[130px] resize-y" placeholder={f.messagePh} value={values.message} onChange={(e) => set('message', e.target.value)} />
        {errorText('message')}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] text-white/80">
          <input
            {...aria('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#087aff]"
          />
          <span>{f.consent}</span>
        </label>
        {errorText('consent')}
      </div>

      <button type="submit" className="btn-pill btn-light w-full justify-between sm:w-auto">
        <span>{f.submit}</span>
        <span className="btn-arrow" aria-hidden="true">
          <Check size={18} strokeWidth={2.6} />
        </span>
      </button>

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {status && (
            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'flex items-start gap-2 rounded-2xl border px-4 py-3 text-[0.95rem] font-medium',
                status.kind === 'success' ? 'border-[#3ddc97]/40 bg-[#3ddc97]/10 text-[#b9f5d8]' : 'border-[#ffc861]/40 bg-[#ffc861]/10 text-[#ffe3a8]',
              )}
            >
              {status.kind === 'success' ? <Check size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
              {status.text}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
