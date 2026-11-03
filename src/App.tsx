import { useCallback, useEffect, useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { useTranslation } from './i18n/useTranslation'
import { ThemeProvider } from './theme/ThemeContext'
import { Header, type SectionId } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Partners } from './components/Partners'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { BrandLoader } from './components/ui/BrandLoader'
import { ViewFilterBar, type ViewFilter } from './components/ui/ViewFilterBar'
import { SMark } from './assets/patterns'
import { siteConfig } from './config/site'

const VALID_VIEWS: readonly ViewFilter[] = [
  'all',
  'accueil',
  'a-propos',
  'expertise',
  'methode',
  'partenaires',
  'contact',
]

/** Reads the initial `?view=` query parameter so sitemap deep links resolve directly. */
function detectInitialView(): ViewFilter {
  if (typeof window === 'undefined') return 'all'
  try {
    const param = new URLSearchParams(window.location.search).get('view')
    if (param && (VALID_VIEWS as readonly string[]).includes(param)) {
      return param as ViewFilter
    }
  } catch {
    /* ignore */
  }
  return 'all'
}

/** Inner page shell consuming the active language and theme contexts. */
function PageShell() {
  const { lang, t } = useTranslation()
  const [viewFilter, setViewFilter] = useState<ViewFilter>(detectInitialView)
  const [filterLoading, setFilterLoading] = useState(false)

  /* Sync URL and canonical link when viewFilter or language changes */
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (viewFilter === 'all') {
        url.searchParams.delete('view')
      } else {
        url.searchParams.set('view', viewFilter)
      }
      if (lang === 'en') {
        url.searchParams.set('lang', 'en')
      } else {
        url.searchParams.delete('lang')
      }
      window.history.replaceState({}, '', url.pathname + url.search + url.hash)

      const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (canonical) {
        canonical.href = `${siteConfig.brand.url}${url.pathname}${url.search}`
      }
    } catch {
      /* ignore */
    }
  }, [viewFilter, lang])

  const handleFilterChange = useCallback(
    (next: ViewFilter) => {
      if (next === viewFilter) return
      setFilterLoading(true)
      setViewFilter(next)
      window.setTimeout(() => {
        setFilterLoading(false)
        if (next !== 'all') {
          const el = document.getElementById(next)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 220)
    },
    [viewFilter],
  )

  const handleHeaderNavigate = useCallback(
    (id: SectionId) => {
      if (viewFilter !== 'all' && viewFilter !== id) {
        setViewFilter('all')
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 60)
      }
    },
    [viewFilter],
  )

  const show = (id: SectionId) => viewFilter === 'all' || viewFilter === id

  return (
    <div className="min-h-screen bg-bg text-muted selection:bg-brand-neon/35">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded focus:bg-brand-neon focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:font-bold focus:text-[#041b12] focus:shadow-glow"
      >
        {t.a11y.skipToContent}
      </a>

      {/* Signature startup loader */}
      <BrandLoader />

      {/* Sticky Header with reading progress bar */}
      <Header onNavigate={handleHeaderNavigate} />

      <main id="main">
        {show('accueil') && <Hero />}

        {/* Interactive multi-section view filter bar */}
        <ViewFilterBar
          active={viewFilter}
          onChange={handleFilterChange}
          loading={filterLoading}
        />

        {/* Brief section transition state when filtering */}
        {filterLoading && (
          <div
            role="status"
            aria-label={t.loader.section}
            className="container-x flex items-center justify-center gap-3 py-8"
          >
            <SMark className="h-7 w-7 text-brand-neon motion-loop animate-spin" mono />
            <span className="font-mono text-xs text-muted">{t.loader.section}</span>
          </div>
        )}

        <div className={`transition-opacity duration-200 ${filterLoading ? 'opacity-40' : 'opacity-100'}`}>
          {show('a-propos') && <About />}
          {show('expertise') && <Services />}
          {show('methode') && <Process />}
          {show('partenaires') && <Partners />}
          {show('contact') && <Contact />}
        </div>
      </main>

      <Footer onNavigate={handleHeaderNavigate} />
      <WhatsAppButton />
    </div>
  )
}

/** Root application wrapping ThemeProvider and LanguageProvider. */
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageShell />
      </LanguageProvider>
    </ThemeProvider>
  )
}
