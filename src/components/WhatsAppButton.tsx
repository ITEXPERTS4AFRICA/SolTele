import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../config/site'
import { useTranslation } from '../i18n/useTranslation'
import { SignalRings } from '../assets/patterns'

/**
 * Floating WhatsApp button (high priority channel in Côte d'Ivoire).
 * Features pulsing signal rings and a hover tooltip.
 */
export function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <a
        href={whatsappLink(t.contact.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.a11y.whatsapp}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-neon text-[#041b12] shadow-glow transition-transform duration-300 hover:scale-105 hover:shadow-glow-lg"
      >
        <SignalRings
          className="pointer-events-none absolute -inset-4 h-22 w-22 text-brand-neon/50"
          rings={2}
          pulses={2}
          emitter={false}
        />
        <MessageCircle className="relative z-10 h-6 w-6 stroke-[2.3]" aria-hidden="true" />

        {/* Desktop hover tooltip */}
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded border border-brand-neon/40 bg-[#041b12] px-3 py-1.5 font-display text-xs font-semibold text-white opacity-0 shadow-soft transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block sm:translate-x-2">
          {t.whatsapp.tooltip}
        </span>
      </a>
    </div>
  )
}

