import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './ui/Logo'
import { ThemeToggle } from './ui/ThemeToggle'
import { LanguageSwitch } from './LanguageSwitch'
import { CircuitPagne, SignalRings, SMark } from '../assets/patterns'
import { siteConfig } from '../config/site'

/** Section identifier used by navigation and the view filter. */
export type SectionId = 'accueil' | 'a-propos' | 'expertise' | 'methode' | 'partenaires' | 'contact'

/** Props for the sticky Header. */
export interface HeaderProps {
  /** Optional callback when a section is selected (resets any single-section filter before scrolling). */
  onNavigate?: (id: SectionId) => void
}

const SECTION_IDS: readonly SectionId[] = [
  'accueil',
  'a-propos',
  'expertise',
  'methode',
  'partenaires',
  'contact',
]

/**
 * Sticky Header with backdrop blur, compact scroll state, green reading progress
 * bar at the bottom, FR|EN switch, Sun/Moon theme toggle, and a full-screen
 * animated mobile menu over a deep forest backdrop with giant S watermark.
 */
export function Header({ onNavigate }: HeaderProps) {
  const { t } = useTranslation()
  const { progress, scrolled } = useScrollProgress(24)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Lock body scroll and listen for Escape while the mobile menu is open. */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'accueil', label: t.nav.home },
    { id: 'a-propos', label: t.nav.about },
    { id: 'expertise', label: t.nav.expertise },
    { id: 'methode', label: t.nav.method },
    { id: 'partenaires', label: t.nav.partners },
    { id: 'contact', label: t.nav.contact },
  ]

  const handleLinkClick = (id: SectionId) => {
    setMenuOpen(false)
    onNavigate?.(id)
  }

  /* While over the Hero (top of page), the header sits on a dark forest canvas in both themes. */
  const onDarkHeader = !scrolled

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-b border-fg/10 bg-surface/85 py-2.5 shadow-soft backdrop-blur-md dark:border-brand-neon/15 dark:bg-[#041b12]/85'
            : 'border-b border-white/10 bg-[#041b12]/60 py-4 backdrop-blur-md'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <a
            href="#accueil"
            onClick={() => handleLinkClick('accueil')}
            aria-label={t.a11y.home}
            className="shrink-0"
          >
            <Logo onDark={onDarkHeader} size={scrolled ? 'sm' : 'md'} />
          </a>

          {/* Desktop navigation */}
          <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isCurrent = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  aria-current={isCurrent ? 'location' : undefined}
                  className={`relative rounded px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isCurrent
                      ? onDarkHeader
                        ? 'text-brand-neon'
                        : 'text-accent-strong dark:text-brand-neon'
                      : onDarkHeader
                        ? 'text-gray-200 hover:text-white'
                        : 'text-muted hover:text-fg dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isCurrent && (
                    <motion.span
                      layoutId="header-active-nav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-x-3 bottom-1 h-0.5 rounded-xs bg-brand-neon shadow-glow-sm"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <LanguageSwitch onDark={onDarkHeader} />
            <ThemeToggle onDark={onDarkHeader} />
            <a
              href="#contact"
              onClick={() => handleLinkClick('contact')}
              className="cut-tr group relative inline-flex h-9 items-center gap-1.5 rounded bg-brand-neon px-4 font-display text-xs font-bold tracking-tight text-[#041b12] shadow-glow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#49e65a] hover:shadow-glow"
              style={{ '--cut': '8px' } as React.CSSProperties}
            >
              <span>{t.nav.quote}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch onDark={onDarkHeader} />
            <ThemeToggle onDark={onDarkHeader} />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              className={`inline-flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                onDarkHeader
                  ? 'border-white/20 bg-white/[0.06] text-white hover:border-brand-neon/60'
                  : 'border-fg/15 bg-surface text-fg hover:border-brand-neon/60 dark:border-white/20 dark:bg-white/[0.06] dark:text-white'
              }`}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Reading progress bar at the bottom of the header */}
        <div
          role="progressbar"
          aria-label={t.a11y.readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-transparent"
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-[#063d2d] via-[#22c55e] to-[#39d94a] shadow-glow-sm transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#041b12] px-6 pt-24 pb-8 text-white lg:hidden"
          >
            {/* Background motifs: Circuit-Pagne + Giant S watermark + Signal rings */}
            <CircuitPagne className="text-brand-neon/[0.05]" size={64} />
            <SignalRings
              className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 text-brand-neon/20"
              rings={4}
              pulses={2}
            />
            <SMark
              className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 text-brand-neon/[0.05]"
              mono
            />

            <div className="relative z-10 my-auto flex flex-col items-center text-center">
              <ul className="flex flex-col items-center gap-3">
                {navItems.map((item, idx) => {
                  const isCurrent = active === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx + 0.1, duration: 0.35 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => handleLinkClick(item.id)}
                        className={`inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight transition-colors xs:text-3xl ${
                          isCurrent ? 'text-brand-neon' : 'text-white hover:text-brand-neon'
                        }`}
                      >
                        <span className="font-mono text-xs text-brand-neon/60">0{idx + 1}</span>
                        <span>{item.label}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.35 }}
                className="mt-8 flex w-full max-w-xs flex-col gap-3"
              >
                <a
                  href="#contact"
                  onClick={() => handleLinkClick('contact')}
                  className="cut-tr inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-brand-neon px-6 font-display text-sm font-bold text-[#041b12] shadow-glow"
                  style={{ '--cut': '10px' } as React.CSSProperties}
                >
                  <span>{t.nav.quote}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded border border-brand-neon/35 bg-white/[0.04] px-5 font-mono text-xs text-gray-200 hover:border-brand-neon"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-neon" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </motion.div>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-gray-400">
              <span>{siteConfig.contact.address.line2}</span>
              <span className="text-brand-neon">24/7</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

