import { useTranslation } from '../i18n/useTranslation'
import { siteConfig, type PartnerConfig } from '../config/site'
import { partnerLogos } from '../assets/images'
import { CircuitPagne, DiagonalDivider } from '../assets/patterns'
import { SectionHeader } from './ui/SectionHeader'

/** Single partner logo card: subtle grayscale at rest, full colour on hover. */
function PartnerCard({ item, lang }: { item: PartnerConfig; lang: 'fr' | 'en' }) {
  const logoSrc = partnerLogos[item.logoKey]
  const specialty = lang === 'fr' ? item.specialtyFr : item.specialtyEn

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.name} · ${specialty}`}
      className="card cut-tr group relative flex h-28 w-64 shrink-0 flex-col items-center justify-between p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm sm:w-72"
      style={{ '--cut': '12px' } as React.CSSProperties}
    >
      {/* Crisp white stage so dark-lettered and coloured logos have 100% contrast */}
      <div className="flex h-14 w-full items-center justify-center rounded-xs border border-fg/[0.06] bg-white px-5 py-2 transition-colors duration-300">
        <img
          src={logoSrc}
          alt={item.name}
          width={180}
          height={48}
          loading="lazy"
          decoding="async"
          className="max-h-9 w-auto max-w-[175px] object-contain opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>

      {/* Partner name + specialty footer */}
      <div className="mt-2 flex w-full items-center justify-between gap-2 font-mono text-[10px]">
        <span className="font-semibold text-fg group-hover:text-accent-strong dark:group-hover:text-brand-neon">
          {item.name}
        </span>
        <span className="truncate text-muted">{specialty}</span>
      </div>
    </a>
  )
}

/**
 * Partners section:
 * Two opposite-direction infinite marquee rows that pause on hover,
 * showcasing SolTele's official hardware and telecom partners.
 * Harmonized for both Light mode and Dark mode.
 */
export function Partners() {
  const { lang, t } = useTranslation()
  const partners = siteConfig.partners
  const reversed = [...partners].reverse()

  /* Repeat 4x per track so wide screens have a seamless 50% marquee loop */
  const row1 = [...partners, ...partners, ...partners, ...partners]
  const row2 = [...reversed, ...reversed, ...reversed, ...reversed]

  return (
    <section
      id="partenaires"
      className="relative overflow-hidden bg-surface pt-12 text-fg dark:bg-[#041b12] dark:text-white sm:pt-16"
    >
      <CircuitPagne className="text-[#063d2d]/[0.03] dark:text-brand-neon/[0.04]" size={64} />

      <div className="container-x relative z-10">
        <SectionHeader
          eyebrow={t.partners.eyebrow}
          titleLead={t.partners.titleLead}
          titleAccent={t.partners.titleAccent}
          intro={t.partners.intro}
          align="center"
        />
      </div>

      {/* 2 opposite-direction infinite marquee tracks */}
      <div
        aria-label={t.a11y.partnersList}
        className="pause-on-hover mask-x relative z-10 mt-10 pb-14 sm:pb-20"
      >
        {/* Row 1: left to right */}
        <div className="flex overflow-hidden">
          <div className="marquee-track motion-loop animate-marquee flex gap-4 pr-4">
            {row1.map((item, idx) => (
              <PartnerCard key={`r1-${item.id}-${idx}`} item={item} lang={lang} />
            ))}
          </div>
        </div>

        {/* Row 2: right to left */}
        <div className="flex overflow-hidden">
          <div className="marquee-track motion-loop animate-marquee-rev flex gap-4 pr-4">
            {row2.map((item, idx) => (
              <PartnerCard key={`r2-${item.id}-${idx}`} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal S-cut into the Contact section */}
      <DiagonalDivider direction="up-right" fillClassName="fill-bg" />
    </section>
  )
}
