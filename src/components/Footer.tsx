import { ArrowUp, MapPin, Phone } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { siteConfig } from '../config/site'
import { CircuitPagne, LagoonLine, SMark } from '../assets/patterns'
import { Logo } from './ui/Logo'
import { ThemeToggle } from './ui/ThemeToggle'
import { LanguageSwitch } from './LanguageSwitch'
import type { SectionId } from './Header'

/** Props for the Footer component. */
export interface FooterProps {
  onNavigate?: (id: SectionId) => void
}

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Footer section:
 * Harmonized for Light mode (clean white surface, black titles, anthracite text)
 * and Dark mode (deep forest surface, white text), with giant S watermark,
 * Abidjan skyline LagoonLine, navigation & expertise links, and dynamic copyright year.
 */
export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation()
  const year = CURRENT_YEAR

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'accueil', label: t.nav.home },
    { id: 'a-propos', label: t.nav.about },
    { id: 'expertise', label: t.nav.expertise },
    { id: 'methode', label: t.nav.method },
    { id: 'partenaires', label: t.nav.partners },
    { id: 'contact', label: t.nav.contact },
  ]

  const serviceLinks = [
    t.services.items.voip.title,
    t.services.items.cyber.title,
    t.services.items.cctv.title,
    t.services.items.network.title,
    t.services.items.wifi.title,
    t.services.items.pylone.title,
    t.services.items.solar.title,
  ]

  return (
    <footer className="relative overflow-hidden border-t border-fg/10 bg-surface pt-12 text-fg dark:border-white/10 dark:bg-[#041b12] dark:text-white sm:pt-16">
      <CircuitPagne className="text-[#063d2d]/[0.03] dark:text-brand-neon/[0.04]" size={64} />

      {/* Giant S watermark */}
      <SMark
        className="pointer-events-none absolute -right-20 -bottom-20 h-[380px] w-[380px] text-[#063d2d]/[0.035] dark:text-brand-neon/[0.05]"
        mono
      />

      <div className="container-x relative z-10 pb-10">
        <div className="grid gap-10 border-b border-fg/10 pb-10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted dark:text-gray-300">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <LanguageSwitch />
              <ThemeToggle />
              <a
                href="#accueil"
                onClick={() => onNavigate?.('accueil')}
                aria-label={t.a11y.backToTop}
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-fg/15 bg-bg text-fg transition-colors hover:border-[#063d2d] hover:text-accent-strong dark:border-white/15 dark:bg-white/[0.06] dark:text-gray-200 dark:hover:border-brand-neon dark:hover:text-brand-neon"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-strong dark:text-brand-neon">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted dark:text-gray-300">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => onNavigate?.(item.id)}
                    className="transition-colors hover:text-fg dark:hover:text-brand-neon"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-strong dark:text-brand-neon">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted dark:text-gray-300">
              {serviceLinks.map((title) => (
                <li key={title}>
                  <a
                    href="#expertise"
                    onClick={() => onNavigate?.('expertise')}
                    className="transition-colors hover:text-fg dark:hover:text-brand-neon"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-strong dark:text-brand-neon">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted dark:text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                <span>
                  {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-mono transition-colors hover:text-fg dark:hover:text-brand-neon"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 font-mono text-xs text-muted dark:text-gray-400 sm:flex-row">
          <p>
            <strong className="font-display font-bold text-fg dark:text-white">Sol</strong>
            <strong className="font-display font-bold text-accent-strong dark:text-brand-neon">Tele</strong> ·{' '}
            {siteConfig.brand.full}
          </p>
          <p>
            © {year} · {t.footer.rights} · {t.footer.madeIn}
          </p>
        </div>
      </div>

      {/* Stylized Abidjan Plateau skyline and Ébrié Lagoon waves */}
      <LagoonLine variant="footer" />
    </footer>
  )
}
