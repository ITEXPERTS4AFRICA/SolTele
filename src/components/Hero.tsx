import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, Camera, Lock, Network, PhoneCall, ShieldCheck } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import {
  CircuitPagne,
  DataPackets,
  DiagonalDivider,
  LagoonLine,
  SignalRings,
  SMark,
} from '../assets/patterns'
import { photos, type PhotoKey } from '../assets/images'
import { Stats } from './Stats'
import { SmartImage } from './ui/SmartImage'
import { useSpotlight } from '../hooks/useSpotlight'

/** Word-by-word animated text line. */
function AnimatedWords({
  text,
  className = '',
  delayOffset = 0,
}: {
  text: string
  className?: string
  delayOffset?: number
}) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.48,
            delay: delayOffset + idx * 0.075,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
          {idx < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

type ModuleKey = 'voip' | 'cyber' | 'cctv' | 'network'

/**
 * Hero section:
 * Dark forest atmosphere, tech grid, pulsing signal rings, giant S watermark (5% opacity),
 * word-by-word headline reveal, interactive glassmorphism network dashboard,
 * animated Stats counters, Abidjan skyline LagoonLine, and diagonal S-cut divider.
 */
export function Hero() {
  const { t } = useTranslation()
  const onSpotlight = useSpotlight<HTMLDivElement>()
  const [activeModule, setActiveModule] = useState<ModuleKey>('voip')

  const modules: {
    key: ModuleKey
    photo: PhotoKey
    label: string
    status: string
    metric: string
    icon: typeof PhoneCall
  }[] = [
    {
      key: 'voip',
      photo: 'voip',
      label: t.hero.dashboard.voip,
      status: t.hero.dashboard.voipStatus,
      metric: '48 HD',
      icon: PhoneCall,
    },
    {
      key: 'cyber',
      photo: 'cyber',
      label: t.hero.dashboard.firewall,
      status: t.hero.dashboard.firewallStatus,
      metric: 'TLS 1.3',
      icon: ShieldCheck,
    },
    {
      key: 'cctv',
      photo: 'cctv',
      label: t.hero.dashboard.cctv,
      status: t.hero.dashboard.cctvStatus,
      metric: '24 CAM',
      icon: Camera,
    },
    {
      key: 'network',
      photo: 'network',
      label: t.hero.dashboard.lan,
      status: t.hero.dashboard.lanStatus,
      metric: '10 Gbps',
      icon: Network,
    },
  ]

  const currentModule = modules.find((m) => m.key === activeModule) ?? modules[0]!

  return (
    <section
      id="accueil"
      className="on-forest relative overflow-hidden bg-gradient-to-b from-[#041b12] via-[#063d2d] to-[#041b12] pt-24 text-white sm:pt-28 lg:pt-32"
    >
      {/* Subtle Abidjan blue-hour backdrop blended into deep forest green */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-luminosity" aria-hidden="true">
        <img
          src={photos.abidjan.src}
          srcSet={photos.abidjan.srcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041b12] via-[#041b12]/90 to-[#063d2d]/75" />
      </div>

      {/* Technological grid + Circuit-Pagne subtle overlay + flowing data packets */}
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-65" aria-hidden="true" />
      <CircuitPagne className="text-brand-neon/[0.035]" size={72} />
      <DataPackets className="absolute inset-0 h-full w-full opacity-55" />

      {/* Giant S monogram watermark (4-6% opacity as required) */}
      <SMark
        className="pointer-events-none absolute -top-16 -left-24 h-[420px] w-[420px] text-brand-neon/[0.05] sm:h-[560px] sm:w-[560px]"
        mono
      />

      {/* Soft green ambient glows */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-brand-neon/15 blur-[110px] sm:h-[460px] sm:w-[460px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#22c55e]/10 blur-[90px]"
        aria-hidden="true"
      />

      {/* Concentric signal rings (simplified on mobile, full on desktop) */}
      <SignalRings
        className="pointer-events-none absolute top-1/2 right-[-120px] h-[360px] w-[360px] -translate-y-1/2 text-brand-neon/30 sm:right-[-40px] sm:h-[560px] sm:w-[560px] lg:right-[2%] lg:h-[680px] lg:w-[680px]"
        rings={4}
        pulses={3}
      />

      <div className="container-x relative z-10 pb-8 sm:pb-12 lg:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left column: headline, subtitle, stacked mobile CTAs, Stats */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded border border-brand-neon/35 bg-brand-deep/70 px-3.5 py-1.5 font-mono text-xs font-medium text-brand-neon shadow-inner-hl backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-brand-neon motion-loop animate-ping" aria-hidden="true" />
              <span className="h-2 w-2 -ml-4 rounded-full bg-brand-neon" aria-hidden="true" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.05] tracking-tightest text-white xs:text-[38px] sm:text-5xl lg:text-[58px]">
              <AnimatedWords text={t.hero.titleLead} className="block text-white" delayOffset={0.05} />
              <AnimatedWords
                text={t.hero.titleAccent}
                className="mt-1 block bg-gradient-to-r from-green-600 via-[#22c55e] to-[#39d94a] bg-clip-text text-transparent"
                delayOffset={0.28}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs: stacked on mobile, side-by-side from sm */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href="#expertise"
                className="cut-tr group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded bg-brand-neon px-7 font-display text-sm font-bold text-[#041b12] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#49e65a] hover:shadow-glow-lg sm:w-auto"
                style={{ '--cut': '12px' } as React.CSSProperties}
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded border border-brand-neon/50 bg-white/[0.03] px-7 font-display text-sm font-semibold text-brand-neon backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-neon hover:bg-brand-neon/10 hover:shadow-glow-sm sm:w-auto"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* 3 animated stats band */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.78 }}
              className="mt-8 max-w-xl sm:mt-10"
            >
              <Stats />
            </motion.div>
          </div>

          {/* Right column: Floating Glassmorphism Network Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div
              onPointerMove={onSpotlight}
              className="glass spotlight cut-tr relative mx-auto max-w-md rounded-md p-4 sm:p-5 lg:max-w-none motion-loop lg:animate-float"
              style={{ '--cut': '20px' } as React.CSSProperties}
            >
              {/* Dashboard header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-brand-neon" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-200">
                    {t.hero.dashboard.title}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xs border border-brand-neon/35 bg-brand-neon/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-brand-neon">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-neon motion-loop animate-blink" />
                  {t.hero.dashboard.live}
                </span>
              </div>

              {/* Interactive live photo preview inside the dashboard */}
              <div className="relative z-10 mt-3.5 overflow-hidden rounded border border-white/10">
                <SmartImage
                  key={currentModule.photo}
                  image={photos[currentModule.photo]}
                  alt={currentModule.label}
                  sizes="(min-width: 1024px) 420px, 92vw"
                  priority
                  className="h-36 w-full sm:h-44"
                  cut="tr"
                />
                {/* HUD overlay on preview */}
                <div className="pointer-events-none absolute inset-x-3 bottom-2.5 z-20 flex items-center justify-between font-mono text-[11px] text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-xs bg-[#041b12]/80 px-2 py-0.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-neon" />
                    {currentModule.label}
                  </span>
                  <span className="rounded-xs bg-brand-neon/90 px-2 py-0.5 font-bold text-[#041b12]">
                    {currentModule.metric}
                  </span>
                </div>
              </div>

              {/* Status rows (interactive: click/hover switches the live preview) */}
              <div className="relative z-10 mt-3.5 space-y-2" role="tablist" aria-label={t.hero.dashboard.title}>
                {modules.map((mod) => {
                  const Icon = mod.icon
                  const isSelected = mod.key === activeModule
                  return (
                    <button
                      key={mod.key}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveModule(mod.key)}
                      className={`flex w-full items-center justify-between rounded border px-3.5 py-2.5 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-neon/60 bg-brand-neon/15 shadow-glow-sm'
                          : 'border-white/10 bg-white/[0.04] hover:border-brand-neon/35 hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-brand-neon" aria-hidden="true" />
                        <span className="text-sm font-medium text-white">{mod.label}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-brand-neon">
                        <span className="h-2 w-2 rounded-full bg-brand-neon" />
                        {mod.status}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Micro-telemetry footer: VoIP equalizer + encrypted badge */}
              <div className="relative z-10 mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-gray-300">
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-brand-neon" aria-hidden="true" />
                  <span>{t.hero.dashboard.secure}</span>
                </div>
                <div className="flex items-end gap-1 h-3.5" aria-hidden="true">
                  {[0.4, 0.9, 0.6, 1, 0.5, 0.8].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-xs bg-brand-neon motion-loop animate-eq"
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.14}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Abidjan Plateau skyline & Ébrié Lagoon waves */}
      <LagoonLine variant="hero" />

      {/* Signature diagonal S-cut transition into the next section */}
      <DiagonalDivider direction="up-right" fillClassName="fill-bg" />
    </section>
  )
}

