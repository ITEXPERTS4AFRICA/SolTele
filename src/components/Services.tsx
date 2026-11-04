import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Network,
  Pause,
  PhoneCall,
  Play,
  RadioTower,
  ShieldCheck,
  Sun,
  Wifi,
} from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { photos, type PhotoKey } from '../assets/images'
import {
  CircuitPagne,
  DataPackets,
  DiagonalDivider,
  SignalRings,
  SMark,
} from '../assets/patterns'
import { SectionHeader } from './ui/SectionHeader'
import { SmartImage } from './ui/SmartImage'
import { useSpotlight } from '../hooks/useSpotlight'

type DomainFilter = 'all' | 'voip' | 'security' | 'network' | 'energy'

/** Mini SVG animation 1: VoIP call waves emanating from handset. */
function VoipWaveMicro() {
  return (
    <svg viewBox="0 0 64 40" className="h-9 w-14 text-accent-strong dark:text-brand-neon" aria-hidden="true">
      <circle cx="12" cy="20" r="4" fill="currentColor" />
      {[12, 22, 32].map((r, i) => (
        <path
          key={r}
          d={`M ${12 + r * 0.6} ${20 - r * 0.55} A ${r} ${r} 0 0 1 ${12 + r * 0.6} ${20 + r * 0.55}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          className="motion-loop animate-pulse"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </svg>
  )
}

/** Mini SVG animation 2: Cybersecurity shield with vertical laser scan. */
function CyberShieldMicro() {
  return (
    <div className="relative h-9 w-9 overflow-hidden rounded-xs border border-brand-neon/30 bg-brand-neon/10 p-1">
      <ShieldCheck className="h-full w-full text-accent-strong dark:text-brand-neon" aria-hidden="true" />
      <span
        className="motion-loop animate-scan pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-brand-neon to-transparent opacity-80"
        aria-hidden="true"
      />
    </div>
  )
}

/** Mini SVG animation 3: Smart CCTV camera panning left and right. */
function CctvPanMicro() {
  return (
    <div className="relative flex h-9 w-12 items-center justify-center rounded-xs border border-brand-neon/30 bg-brand-neon/10">
      <div className="motion-loop animate-pan origin-left">
        <Camera className="h-5 w-5 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
      </div>
    </div>
  )
}

/** Mini SVG animation 4: Network cables lighting up with data packets. */
function NetworkCableMicro() {
  return (
    <svg viewBox="0 0 72 36" className="h-9 w-16 text-accent-strong dark:text-brand-neon" aria-hidden="true">
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none">
        <path d="M4 8 H28 L40 18 H68" />
        <path d="M4 28 H28 L40 18" />
      </g>
      <g stroke="currentColor" strokeWidth="2.2" fill="none">
        <path d="M4 8 H28 L40 18 H68" strokeDasharray="8 60" className="motion-loop animate-flow" />
        <path
          d="M4 28 H28 L40 18 H68"
          strokeDasharray="8 60"
          className="motion-loop animate-flow"
          style={{ animationDelay: '-2s' }}
        />
      </g>
      <circle cx="4" cy="8" r="2.5" fill="currentColor" />
      <circle cx="4" cy="28" r="2.5" fill="currentColor" />
      <circle cx="40" cy="18" r="3" fill="currentColor" />
      <circle cx="68" cy="18" r="2.5" fill="currentColor" />
    </svg>
  )
}

/** Mini SVG animation 5: Enterprise WiFi concentric signal arcs. */
function WifiSignalMicro() {
  return (
    <div className="relative flex h-9 w-12 items-center justify-center rounded-xs border border-brand-neon/30 bg-brand-neon/10">
      <Wifi className="h-5 w-5 text-accent-strong dark:text-brand-neon motion-loop animate-pulse" aria-hidden="true" />
    </div>
  )
}

/** Mini SVG animation 6: Telecom tower point-to-point radio link. */
function PyloneLinkMicro() {
  return (
    <div className="relative flex h-9 w-12 items-center justify-center rounded-xs border border-brand-neon/30 bg-brand-neon/10">
      <RadioTower className="h-5 w-5 text-accent-strong dark:text-brand-neon motion-loop animate-pulse" aria-hidden="true" />
    </div>
  )
}

/** Mini SVG animation 7: Solar power autonomy indicator. */
function SolarEnergyMicro() {
  return (
    <div className="relative flex h-9 w-12 items-center justify-center rounded-xs border border-brand-neon/30 bg-brand-neon/10">
      <Sun className="h-5 w-5 text-accent-strong dark:text-brand-neon motion-loop animate-pulse" aria-hidden="true" />
    </div>
  )
}

/**
 * Expertise (Asymmetric Bento Grid) + Field Showcase Carousel:
 * Harmonized for both Light mode (white/pearl backgrounds, black titles, discreet circuit lines)
 * and Dark mode (deep forest backgrounds, white titles, glowing neon accents).
 */
export function Services() {
  const { t } = useTranslation()
  const onSpotlight = useSpotlight<HTMLElement>()
  const [filter, setFilter] = useState<DomainFilter>('all')
  const [filterLoading, setFilterLoading] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)
  const [playing, setPlaying] = useState(true)

  const slides: {
    id: string
    domain: Exclude<DomainFilter, 'all'>
    photo: PhotoKey
    title: string
    text: string
  }[] = [
    {
      id: 'solar',
      domain: 'energy',
      photo: 'solar',
      title: t.showcase.slides.solar.title,
      text: t.showcase.slides.solar.text,
    },
    {
      id: 'wifi',
      domain: 'network',
      photo: 'wifi',
      title: t.showcase.slides.wifi.title,
      text: t.showcase.slides.wifi.text,
    },
    {
      id: 'pylone',
      domain: 'energy',
      photo: 'pylone',
      title: t.showcase.slides.pylone.title,
      text: t.showcase.slides.pylone.text,
    },
    {
      id: 'office',
      domain: 'voip',
      photo: 'voip',
      title: t.showcase.slides.office.title,
      text: t.showcase.slides.office.text,
    },
    {
      id: 'datacenter',
      domain: 'security',
      photo: 'cyber',
      title: t.showcase.slides.datacenter.title,
      text: t.showcase.slides.datacenter.text,
    },
    {
      id: 'facade',
      domain: 'security',
      photo: 'cctv',
      title: t.showcase.slides.facade.title,
      text: t.showcase.slides.facade.text,
    },
    {
      id: 'cabling',
      domain: 'network',
      photo: 'network',
      title: t.showcase.slides.cabling.title,
      text: t.showcase.slides.cabling.text,
    },
    {
      id: 'technician',
      domain: 'network',
      photo: 'technician',
      title: t.showcase.slides.technician.title,
      text: t.showcase.slides.technician.text,
    },
    {
      id: 'team',
      domain: 'voip',
      photo: 'team',
      title: t.showcase.slides.team.title,
      text: t.showcase.slides.team.text,
    },
    {
      id: 'city',
      domain: 'network',
      photo: 'abidjan',
      title: t.showcase.slides.city.title,
      text: t.showcase.slides.city.text,
    },
  ]

  const filteredSlides =
    filter === 'all' ? slides : slides.filter((s) => s.domain === filter)

  const safeIdx = filteredSlides.length > 0 ? slideIdx % filteredSlides.length : 0
  const activeSlide = filteredSlides[safeIdx] ?? slides[0]!

  const handleFilterChange = (next: DomainFilter) => {
    if (next === filter) return
    setFilterLoading(true)
    setFilter(next)
    setSlideIdx(0)
    window.setTimeout(() => setFilterLoading(false), 220)
  }

  /* Autoplay carousel */
  useEffect(() => {
    if (!playing || filteredSlides.length <= 1) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % filteredSlides.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [playing, filteredSlides.length])

  const showVoip = filter === 'all' || filter === 'voip'
  const showSecurity = filter === 'all' || filter === 'security'
  const showNetwork = filter === 'all' || filter === 'network'
  const showEnergy = filter === 'all' || filter === 'energy'

  const filterButtons: { id: DomainFilter; label: string }[] = [
    { id: 'all', label: t.showcase.filters.all },
    { id: 'voip', label: t.showcase.filters.voip },
    { id: 'security', label: t.showcase.filters.security },
    { id: 'network', label: t.showcase.filters.network },
    { id: 'energy', label: t.showcase.filters.energy },
  ]

  return (
    <section id="expertise" className="relative overflow-hidden bg-bg">
      {/* ====================================================================
          PART 1: Interactive Carousel ("Sur le terrain")
          ==================================================================== */}
      <div className="relative overflow-hidden bg-surface pt-12 pb-16 text-fg dark:bg-[#041b12] dark:text-white sm:pt-16 sm:pb-20">
        <CircuitPagne className="text-[#063d2d]/[0.03] dark:text-brand-neon/[0.04]" size={64} />
        <DataPackets className="absolute inset-0 h-full w-full text-[#063d2d] opacity-60 dark:text-brand-neon dark:opacity-45" />
        <SMark
          className="pointer-events-none absolute -top-12 right-[-60px] h-80 w-80 text-[#063d2d]/[0.03] dark:text-brand-neon/[0.04]"
          mono
        />

        <div className="container-x relative z-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow={t.showcase.eyebrow}
              titleLead={t.showcase.titleLead}
              titleAccent={t.showcase.titleAccent}
              intro={t.showcase.intro}
            />

            {/* Domain Filter Bar */}
            <div
              role="group"
              aria-label={t.a11y.filters}
              className="flex flex-wrap items-center gap-2"
            >
              {filterButtons.map((btn) => {
                const active = filter === btn.id
                return (
                  <button
                    key={btn.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleFilterChange(btn.id)}
                    className={`cut-tr relative rounded border px-4 py-2 font-display text-xs font-bold tracking-tight transition-all duration-200 ${
                      active
                        ? 'border-[#063d2d] bg-[#063d2d] text-white dark:border-brand-neon dark:bg-brand-neon dark:text-[#041b12]'
                        : 'border-fg/15 bg-bg text-muted hover:-translate-y-0.5 hover:border-[#063d2d]/50 hover:text-fg dark:border-white/15 dark:bg-white/[0.05] dark:text-gray-200 dark:hover:border-brand-neon/50 dark:hover:text-white'
                    }`}
                    style={{ '--cut': '7px' } as React.CSSProperties}
                  >
                    {btn.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Motion Carousel */}
          <div
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(true)}
            className="mt-8 grid items-stretch gap-5 lg:grid-cols-12"
          >
            {/* Stage */}
            <div className="relative lg:col-span-8">
              <div
                className="cut-both relative aspect-[16/10] w-full overflow-hidden rounded-md border border-fg/15 bg-bg shadow-lift dark:border-brand-neon/30 dark:bg-[#063d2d]/40"
                style={{ '--cut': '22px' } as React.CSSProperties}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full w-full"
                  >
                    <SmartImage
                      image={photos[activeSlide.photo]}
                      alt={activeSlide.title}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="h-full w-full"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-between gap-3 bg-gradient-to-t from-[#041b12] via-[#041b12]/80 to-transparent p-5 sm:flex-row sm:items-end sm:p-7">
                      <div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-neon">
                          {String(safeIdx + 1).padStart(2, '0')} / {String(filteredSlides.length).padStart(2, '0')}
                        </span>
                        <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                          {activeSlide.title}
                        </h3>
                        <p className="mt-1 max-w-xl text-xs text-gray-200 sm:text-sm">
                          {activeSlide.text}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPlaying((p) => !p)}
                          aria-label={playing ? t.a11y.pause : t.a11y.play}
                          className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/20 bg-[#041b12]/80 text-white transition-colors hover:border-brand-neon hover:text-brand-neon"
                        >
                          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIdx(
                              (prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length,
                            )
                          }
                          aria-label={t.a11y.prevSlide}
                          className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/20 bg-[#041b12]/80 text-white transition-colors hover:border-brand-neon hover:text-brand-neon"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIdx((prev) => (prev + 1) % filteredSlides.length)
                          }
                          aria-label={t.a11y.nextSlide}
                          className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/20 bg-[#041b12]/80 text-white transition-colors hover:border-brand-neon hover:text-brand-neon"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnail selector list */}
            <div className="flex flex-row gap-2.5 overflow-x-auto lg:col-span-4 lg:max-h-[440px] lg:flex-col lg:overflow-y-auto lg:pr-1">
              {filteredSlides.map((slide, idx) => {
                const isCurrent = idx === safeIdx
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    aria-label={`${t.a11y.goToSlide} ${idx + 1}: ${slide.title}`}
                    className={`group flex min-w-[210px] items-center gap-3 rounded border p-2 text-left transition-all duration-200 lg:min-w-0 ${
                      isCurrent
                        ? 'border-[#063d2d] bg-[#f7faf8] shadow-soft dark:border-brand-neon dark:bg-brand-neon/15 dark:shadow-glow-sm'
                        : 'border-fg/10 bg-white hover:border-[#063d2d]/40 hover:bg-[#f7faf8]/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-neon/40 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xs">
                      <img
                        src={photos[slide.photo].src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-xs font-bold text-fg dark:text-white">
                        {slide.title}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-muted dark:text-gray-300">
                        {slide.text}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <DiagonalDivider direction="up-right" fillClassName="fill-bg" />

      {/* ====================================================================
          PART 2: Asymmetric Bento Grid (4 core telecom & IT trades)
          ==================================================================== */}
      <div className="tech-grid-light dark:tech-grid pointer-events-none absolute inset-x-0 bottom-0 top-1/3 opacity-60" aria-hidden="true" />

      <div className="container-x relative z-10 py-14 sm:py-20 lg:py-24">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          titleLead={t.services.titleLead}
          titleAccent={t.services.titleAccent}
          titleTail={t.services.titleTail}
          intro={t.services.intro}
        />

        {/* Brief loading bar when filtering */}
        {filterLoading && (
          <div className="mt-4 h-1 w-40 overflow-hidden rounded-xs bg-brand-neon/20">
            <div className="h-full w-full origin-left animate-pulse bg-brand-neon" />
          </div>
        )}

        {/* Responsive Asymmetric Bento Grid */}
        <div
          className={`mt-10 grid grid-cols-1 gap-5 transition-opacity duration-200 md:grid-cols-2 lg:grid-cols-12 ${
            filterLoading ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {/* CARD 1: Téléphonie IP & VoIP */}
          {showVoip && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5 }}
              onPointerMove={onSpotlight}
              className={`card spotlight cut-tr group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-2 lg:col-span-5 lg:row-span-2' : 'md:col-span-2 lg:col-span-12'
              }`}
              style={{ '--cut': '20px' } as React.CSSProperties}
            >
              <CircuitPagne className="text-[#063d2d]/[0.04] dark:text-brand-neon/[0.08]" size={56} />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.voip.tag}
                  </span>
                  <VoipWaveMicro />
                </div>

                <div className="mt-4 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.voip}
                    alt={t.services.items.voip.alt}
                    sizes="(min-width: 1024px) 440px, 100vw"
                    className="h-44 w-full sm:h-52"
                    imgClassName="group-hover:scale-105"
                    cut="tr"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded border border-fg/15 bg-bg text-accent-strong dark:border-brand-neon/40 dark:bg-brand-neon/15 dark:text-brand-neon">
                  <SignalRings
                    className="absolute -inset-3 h-16 w-16 text-[#063d2d]/20 dark:text-brand-neon/35"
                    rings={2}
                    pulses={1}
                    emitter={false}
                  />
                  <PhoneCall className="relative h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-display text-2xl font-extrabold text-fg">
                  {t.services.items.voip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.services.items.voip.text}
                </p>

                <ul className="mt-4 space-y-2 border-t border-fg/10 pt-4 text-xs text-muted dark:border-white/10">
                  {t.services.items.voip.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 font-display text-xs font-bold text-accent-strong transition-transform group-hover:translate-x-1 dark:text-brand-neon"
                >
                  <span>{t.services.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          )}

          {/* CARD 2: Cybersécurité */}
          {showSecurity && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              onPointerMove={onSpotlight}
              className={`card spotlight group flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-1 lg:col-span-3' : 'md:col-span-1 lg:col-span-6'
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.cyber.tag}
                  </span>
                  <CyberShieldMicro />
                </div>

                <div className="mt-3.5 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.cyber}
                    alt={t.services.items.cyber.alt}
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="h-32 w-full"
                    imgClassName="group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-fg">
                  {t.services.items.cyber.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.services.items.cyber.text}
                </p>
              </div>

              <ul className="relative z-10 mt-4 space-y-1.5 border-t border-fg/10 pt-3.5 text-xs text-muted dark:border-white/10">
                {t.services.items.cyber.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          )}

          {/* CARD 3: Vidéosurveillance */}
          {showSecurity && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.14 }}
              onPointerMove={onSpotlight}
              className={`card spotlight group flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-1 lg:col-span-4' : 'md:col-span-1 lg:col-span-6'
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.cctv.tag}
                  </span>
                  <CctvPanMicro />
                </div>

                <div className="mt-3.5 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.cctv}
                    alt={t.services.items.cctv.alt}
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="h-32 w-full"
                    imgClassName="group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-fg">
                  {t.services.items.cctv.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.services.items.cctv.text}
                </p>
              </div>

              <ul className="relative z-10 mt-4 space-y-1.5 border-t border-fg/10 pt-3.5 text-xs text-muted dark:border-white/10">
                {t.services.items.cctv.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          )}

          {/* CARD 4: Réseaux & Infrastructures IT */}
          {showNetwork && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onPointerMove={onSpotlight}
              className={`card spotlight cut-bl group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-2 lg:col-span-7' : 'md:col-span-2 lg:col-span-12'
              }`}
              style={{ '--cut': '20px' } as React.CSSProperties}
            >
              <CircuitPagne className="text-[#063d2d]/[0.035] dark:text-white/[0.05]" size={64} />

              <div className="relative z-10 grid items-center gap-6 sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded border border-fg/15 bg-bg text-accent-strong dark:border-brand-neon/50 dark:bg-[#041b12]/50 dark:text-brand-neon">
                      <Network className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <NetworkCableMicro />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-extrabold text-fg sm:text-2xl">
                    {t.services.items.network.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t.services.items.network.text}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                    {t.services.items.network.points.map((pt) => (
                      <li key={pt} className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-5">
                  <SmartImage
                    image={photos.network}
                    alt={t.services.items.network.alt}
                    sizes="(min-width: 1024px) 280px, 100vw"
                    className="h-40 w-full border border-fg/10 dark:border-white/20 sm:h-44"
                    imgClassName="group-hover:scale-105"
                    cut="tr"
                  />
                </div>
              </div>
            </motion.article>
          )}

          {/* CARD 5: WiFi Professionnel & Radio */}
          {showNetwork && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.24 }}
              onPointerMove={onSpotlight}
              className={`card spotlight cut-tr group flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-1 lg:col-span-4' : 'md:col-span-2 lg:col-span-12'
              }`}
              style={{ '--cut': '16px' } as React.CSSProperties}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.wifi.tag}
                  </span>
                  <WifiSignalMicro />
                </div>

                <div className="mt-3.5 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.wifi}
                    alt={t.services.items.wifi.alt}
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="h-40 w-full"
                    imgClassName="group-hover:scale-105"
                    cut="tr"
                  />
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-fg">
                  {t.services.items.wifi.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.services.items.wifi.text}
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <ul className="space-y-1.5 border-t border-fg/10 pt-3.5 text-xs text-muted dark:border-white/10">
                  {t.services.items.wifi.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold text-accent-strong transition-transform group-hover:translate-x-1 dark:text-brand-neon"
                >
                  <span>{t.services.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          )}

          {/* CARD 6: Pylônes & Interconnexion */}
          {showEnergy && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.28 }}
              onPointerMove={onSpotlight}
              className={`card spotlight cut-tr group flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-1 lg:col-span-4' : 'md:col-span-1 lg:col-span-6'
              }`}
              style={{ '--cut': '16px' } as React.CSSProperties}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.pylone.tag}
                  </span>
                  <PyloneLinkMicro />
                </div>

                <div className="mt-3.5 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.pylone}
                    alt={t.services.items.pylone.alt}
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="h-40 w-full"
                    imgClassName="group-hover:scale-105"
                    cut="tr"
                  />
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-fg">
                  {t.services.items.pylone.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.services.items.pylone.text}
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <ul className="space-y-1.5 border-t border-fg/10 pt-3.5 text-xs text-muted dark:border-white/10">
                  {t.services.items.pylone.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold text-accent-strong transition-transform group-hover:translate-x-1 dark:text-brand-neon"
                >
                  <span>{t.services.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          )}

          {/* CARD 7: Énergie Solaire & Secours IT */}
          {showEnergy && (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: 0.32 }}
              onPointerMove={onSpotlight}
              className={`card spotlight cut-tr group flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 hover:shadow-green-500/20 hover:shadow-2xl sm:p-7 ${
                filter === 'all' ? 'md:col-span-2 lg:col-span-4' : 'md:col-span-1 lg:col-span-6'
              }`}
              style={{ '--cut': '16px' } as React.CSSProperties}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xs border border-fg/15 bg-bg px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-strong dark:border-brand-neon/35 dark:bg-brand-neon/10 dark:text-brand-neon">
                    {t.services.items.solar.tag}
                  </span>
                  <SolarEnergyMicro />
                </div>

                <div className="mt-3.5 overflow-hidden rounded border border-fg/10 dark:border-white/10">
                  <SmartImage
                    image={photos.solar}
                    alt={t.services.items.solar.alt}
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="h-40 w-full"
                    imgClassName="group-hover:scale-105"
                    cut="tr"
                  />
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-fg">
                  {t.services.items.solar.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.services.items.solar.text}
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <ul className="space-y-1.5 border-t border-fg/10 pt-3.5 text-xs text-muted dark:border-white/10">
                  {t.services.items.solar.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-strong dark:text-brand-neon" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold text-accent-strong transition-transform group-hover:translate-x-1 dark:text-brand-neon"
                >
                  <span>{t.services.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          )}
        </div>
      </div>

      {/* Diagonal S-cut into Method section */}
      <DiagonalDivider direction="up-left" fillClassName="fill-surface dark:fill-[#041b12]" />
    </section>
  )
}
