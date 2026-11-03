import { motion } from 'framer-motion'
import { Filter, Layers, RotateCcw } from 'lucide-react'
import { useTranslation } from '../../i18n/useTranslation'
import type { SectionId } from '../Header'

/** Filterable view mode: 'all' shows the complete narrative page, or a specific section id. */
export type ViewFilter = 'all' | SectionId

/** Props for the interactive site view filter bar. */
export interface ViewFilterBarProps {
  active: ViewFilter
  onChange: (next: ViewFilter) => void
  loading?: boolean
}

/**
 * Interactive filter bar allowing visitors to either browse the complete site
 * or filter directly by Accueil, À propos, Expertise, Méthode, Partenaires, or Contact
 * with a professional loading transition and 2px-5px architectural radii.
 */
export function ViewFilterBar({ active, onChange, loading = false }: ViewFilterBarProps) {
  const { lang, t } = useTranslation()

  const items: { id: ViewFilter; label: string }[] = [
    { id: 'all', label: lang === 'fr' ? 'Vue complète' : 'Full view' },
    { id: 'accueil', label: t.nav.home },
    { id: 'a-propos', label: t.nav.about },
    { id: 'expertise', label: t.nav.expertise },
    { id: 'methode', label: t.nav.method },
    { id: 'partenaires', label: t.nav.partners },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <div className="relative z-20 border-b border-fg/10 bg-surface/90 py-3 backdrop-blur-md dark:border-brand-neon/15 dark:bg-[#07281b]/90">
      <div className="container-x flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <Filter className="h-3.5 w-3.5 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
          <span>{lang === 'fr' ? 'Filtrer la vue :' : 'Filter view:'}</span>
        </div>

        <div
          role="tablist"
          aria-label={t.a11y.mainNav}
          className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto py-0.5"
        >
          {items.map((item) => {
            const isSelected = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onChange(item.id)}
                className={`relative inline-flex shrink-0 items-center gap-1.5 rounded border px-3 py-1.5 font-display text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-neon bg-brand-neon text-[#041b12] shadow-glow-sm'
                    : 'border-fg/10 bg-bg/70 text-muted hover:-translate-y-0.5 hover:border-brand-neon/50 hover:text-fg hover:shadow-glow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:text-white'
                }`}
              >
                {item.id === 'all' && <Layers className="h-3.5 w-3.5" aria-hidden="true" />}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {active !== 'all' && (
          <button
            type="button"
            onClick={() => onChange('all')}
            className="inline-flex items-center gap-1.5 rounded border border-brand-neon/40 bg-brand-neon/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent-strong transition-colors hover:bg-brand-neon/20 dark:text-brand-neon"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>{lang === 'fr' ? 'Tout afficher' : 'Show all'}</span>
          </button>
        )}
      </div>

      {/* Professional loading progress line when switching views */}
      {loading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#063d2d] via-[#22c55e] to-[#39d94a] shadow-glow-sm"
        />
      )}
    </div>
  )
}

