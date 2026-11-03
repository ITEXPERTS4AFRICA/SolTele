import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { siteConfig, whatsappLink } from '../config/site'
import { CircuitPagne, DiagonalDivider, SMark } from '../assets/patterns'
import { SectionHeader } from './ui/SectionHeader'
import { useSpotlight } from '../hooks/useSpotlight'

interface FormValues {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormValues, string>>
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s().]{6,22}$/

/**
 * Contact section:
 * Left: validated bilingual form (Name, Company, Email, Phone, Message) with
 * loading/success/error states, configurable mailto/endpoint delivery + direct WhatsApp CTA.
 * Right: Dark forest info card (Deux Plateaux Vallon, Cocody, Abidjan + tel link) and
 * lazy-loaded green-tinted OpenStreetMap iframe with skeleton loader.
 */
export function Contact() {
  const { t } = useTranslation()
  const onSpotlight = useSpotlight<HTMLDivElement>()

  const [values, setValues] = useState<FormValues>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitState>('idle')
  const [mapLoaded, setMapLoaded] = useState(false)

  const validate = (v: FormValues): FieldErrors => {
    const next: FieldErrors = {}
    if (!v.name.trim()) next.name = t.contact.errors.nameRequired
    if (!v.email.trim()) {
      next.email = t.contact.errors.emailRequired
    } else if (!EMAIL_RE.test(v.email.trim())) {
      next.email = t.contact.errors.emailInvalid
    }
    if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) {
      next.phone = t.contact.errors.phoneInvalid
    }
    if (!v.message.trim()) {
      next.message = t.contact.errors.messageRequired
    } else if (v.message.trim().length < 10) {
      next.message = t.contact.errors.messageShort
    }
    return next
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validation = validate(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('submitting')

    try {
      if (siteConfig.form.mode === 'endpoint' && siteConfig.form.endpoint) {
        const res = await fetch(siteConfig.form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        /* Brief feedback delay before opening the configured mailto payload */
        await new Promise((resolve) => window.setTimeout(resolve, 450))
        const bodyLines = [
          `${t.contact.fields.name.label}: ${values.name}`,
          values.company ? `${t.contact.fields.company.label}: ${values.company}` : '',
          `${t.contact.fields.email.label}: ${values.email}`,
          values.phone ? `${t.contact.fields.phone.label}: ${values.phone}` : '',
          '',
          values.message,
        ]
          .filter(Boolean)
          .join('\n')

        const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
          t.contact.mailSubject,
        )}&body=${encodeURIComponent(bodyLines)}`
        window.location.href = mailto
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setValues({ name: '', company: '', email: '', phone: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  const { lat, lng } = siteConfig.contact.geo
  const bbox = `${lng - 0.012}%2C${lat - 0.008}%2C${lng + 0.012}%2C${lat + 0.008}`
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
  const osmDirectUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`

  return (
    <section id="contact" className="relative overflow-hidden bg-bg pt-14 sm:pt-20 lg:pt-24">
      <div className="tech-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative z-10 pb-16 sm:pb-24">
        <SectionHeader
          eyebrow={t.contact.eyebrow}
          titleLead={t.contact.titleLead}
          titleAccent={t.contact.titleAccent}
          intro={t.contact.intro}
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Left column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onPointerMove={onSpotlight}
            className="card spotlight p-6 sm:p-8 lg:col-span-7"
          >
            {status === 'success' ? (
              <div className="relative z-10 flex flex-col items-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-neon/50 bg-brand-neon/15 text-accent-strong shadow-glow-sm dark:text-brand-neon">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-fg">
                  {t.contact.successTitle}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">{t.contact.successText}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded border border-brand-neon/50 bg-brand-neon/10 px-5 py-2.5 font-display text-xs font-bold text-accent-strong transition-colors hover:bg-brand-neon hover:text-[#041b12] dark:text-brand-neon"
                  >
                    {t.contact.newMessage}
                  </button>
                  <a
                    href={whatsappLink(t.contact.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-brand-neon px-5 py-2.5 font-display text-xs font-bold text-[#041b12] shadow-glow-sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.info.whatsappCta}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-bold">{t.contact.errorTitle}</p>
                      <p className="mt-0.5">{t.contact.errorText}</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-display text-xs font-bold text-fg"
                    >
                      {t.contact.fields.name.label}{' '}
                      <span className="text-brand-green" aria-label={t.a11y.required}>
                        *
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, name: e.target.value }))
                        if (errors.name) setErrors((err) => ({ ...err, name: undefined }))
                      }}
                      placeholder={t.contact.fields.name.placeholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      className="field mt-1.5 focus:ring-2 focus:ring-green-500"
                    />
                    {errors.name && (
                      <p id="err-name" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="flex items-center justify-between font-display text-xs font-bold text-fg"
                    >
                      <span>{t.contact.fields.company.label}</span>
                      <span className="font-mono text-[10px] font-normal text-muted/70">
                        ({t.contact.optional})
                      </span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
                      placeholder={t.contact.fields.company.placeholder}
                      className="field mt-1.5 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-display text-xs font-bold text-fg"
                    >
                      {t.contact.fields.email.label}{' '}
                      <span className="text-brand-green" aria-label={t.a11y.required}>
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, email: e.target.value }))
                        if (errors.email) setErrors((err) => ({ ...err, email: undefined }))
                      }}
                      placeholder={t.contact.fields.email.placeholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className="field mt-1.5 focus:ring-2 focus:ring-green-500"
                    />
                    {errors.email && (
                      <p id="err-email" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="flex items-center justify-between font-display text-xs font-bold text-fg"
                    >
                      <span>{t.contact.fields.phone.label}</span>
                      <span className="font-mono text-[10px] font-normal text-muted/70">
                        ({t.contact.optional})
                      </span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, phone: e.target.value }))
                        if (errors.phone) setErrors((err) => ({ ...err, phone: undefined }))
                      }}
                      placeholder={t.contact.fields.phone.placeholder}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                      className="field mt-1.5 font-mono focus:ring-2 focus:ring-green-500"
                    />
                    {errors.phone && (
                      <p id="err-phone" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-display text-xs font-bold text-fg"
                  >
                    {t.contact.fields.message.label}{' '}
                    <span className="text-brand-green" aria-label={t.a11y.required}>
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={values.message}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, message: e.target.value }))
                      if (errors.message) setErrors((err) => ({ ...err, message: undefined }))
                    }}
                    placeholder={t.contact.fields.message.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    className="field mt-1.5 resize-y focus:ring-2 focus:ring-green-500"
                  />
                  {errors.message && (
                    <p id="err-message" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit + Direct WhatsApp CTA */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="cut-tr inline-flex h-12 flex-1 items-center justify-center gap-2 rounded bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#39d94a] px-6 font-display text-sm font-bold text-[#041b12] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg disabled:opacity-60"
                    style={{ '--cut': '12px' } as React.CSSProperties}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{t.contact.submit}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappLink(
                      values.message.trim() || t.contact.whatsappMessage,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded border border-brand-neon/50 bg-brand-neon/10 px-5 font-display text-xs font-bold text-accent-strong transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-neon hover:bg-brand-neon hover:text-[#041b12] dark:text-brand-neon"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.info.whatsappCta}</span>
                  </a>
                </div>

                <p className="text-[11px] text-muted/80">{t.contact.privacy}</p>
              </form>
            )}
          </motion.div>

          {/* Right column: Dark forest coordinates block + Green-tinted OpenStreetMap */}
          <div className="space-y-5 lg:col-span-5">
            {/* Coordinates card harmonized for Light & Dark mode */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="card cut-tr relative overflow-hidden p-6 sm:p-7"
              style={{ '--cut': '18px' } as React.CSSProperties}
            >
              <CircuitPagne className="text-[#063d2d]/[0.035] dark:text-brand-neon/[0.05]" size={56} />
              <SMark
                className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 text-[#063d2d]/[0.04] dark:text-brand-neon/[0.06]"
                mono
              />

              <div className="relative z-10 space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-strong dark:text-brand-neon">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.contact.info.address}
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-fg">
                    {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}
                  </p>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-strong dark:text-brand-neon">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.contact.info.phone}
                  </span>
                  <p className="mt-1">
                    <a
                      href={siteConfig.contact.phoneHref}
                      aria-label={t.a11y.callUs}
                      className="font-mono text-lg font-bold text-fg transition-colors hover:text-accent-strong dark:hover:text-brand-neon"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded border border-fg/15 bg-bg px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-[#063d2d] dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-neon"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                    <span>{t.contact.info.callCta}</span>
                  </a>
                  <a
                    href={whatsappLink(t.contact.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-[#063d2d] px-3.5 py-2 font-display text-xs font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-brand-neon dark:text-[#041b12]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.contact.info.whatsappCta}</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* OpenStreetMap embedded card with green tint filter and skeleton loader */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="card overflow-hidden p-1.5"
            >
              <div className="relative h-64 w-full overflow-hidden rounded bg-[#063d2d]/20 sm:h-72">
                {!mapLoaded && (
                  <div
                    className="skeleton absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#041b12]/85 text-white"
                    aria-hidden="true"
                  >
                    <SMark className="h-9 w-9 text-brand-neon/50 motion-loop animate-pulse" mono />
                    <span className="font-mono text-xs text-gray-300">{t.contact.map.loading}</span>
                  </div>
                )}

                <iframe
                  title={t.a11y.mapTitle}
                  src={osmEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="h-full w-full border-0 sepia-[.4] hue-rotate-[85deg] saturate-[1.6] contrast-[1.05] dark:invert dark:hue-rotate-[145deg] dark:brightness-90"
                />

                <a
                  href={osmDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2.5 bottom-2.5 z-20 inline-flex items-center gap-1.5 rounded border border-brand-neon/40 bg-[#041b12]/90 px-2.5 py-1 font-mono text-[10px] font-medium text-brand-neon backdrop-blur-sm transition-colors hover:bg-brand-neon hover:text-[#041b12]"
                >
                  <span>{t.contact.map.open}</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Diagonal S-cut into the Footer */}
      <DiagonalDivider direction="up-left" fillClassName="fill-surface dark:fill-[#041b12]" />
    </section>
  )
}

