import { useState, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import { Award, Headphones, MapPin, Shield } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import {
  CircuitPagne,
  DiagonalDivider,
  SignalRings,
  SMark,
} from '../assets/patterns'
import { photos } from '../assets/images'
import { SectionHeader } from './ui/SectionHeader'
import { SmartImage } from './ui/SmartImage'
import { useSpotlight } from '../hooks/useSpotlight'

/** Value card with subtle 3D tilt and cursor spotlight on hover. */
function ValueCard({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: typeof Shield
  title: string
  text: string
  index: number
}) {
  const onSpotlight = useSpotlight<HTMLDivElement>()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    onSpotlight(e)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -y * 7, ry: x * 7 })
  }

  const handleLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.45, delay: 0.1 * index }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="card spotlight group p-5 transition-transform duration-200 ease-out hover:shadow-glow-sm"
    >
      <div className="relative z-10">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded border border-brand-neon/30 bg-brand-neon/10 text-accent-strong transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-neon group-hover:text-[#041b12] dark:text-brand-neon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-3.5 font-display text-base font-bold text-fg">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-[13px]">{text}</p>
      </div>
    </motion.div>
  )
}

/**
 * About section:
 * 2-column layout with the signature abstract network constellation + Circuit-Pagne
 * and Abidjan team photography on the left, narrative copy and 3 3D-tilt value cards on the right.
 */
export function About() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Shield,
      title: t.about.values.reliability.title,
      text: t.about.values.reliability.text,
    },
    {
      icon: Award,
      title: t.about.values.certified.title,
      text: t.about.values.certified.text,
    },
    {
      icon: Headphones,
      title: t.about.values.support.title,
      text: t.about.values.support.text,
    },
  ]

  /* 4 satellite nodes around the central hub (matches reference/À propos.png) */
  const nodes = [
    { x: 96, y: 108, label: 'VoIP' },
    { x: 392, y: 126, label: 'SEC' },
    { x: 112, y: 318, label: 'CCTV' },
    { x: 376, y: 328, label: 'LAN' },
  ]

  return (
    <section id="a-propos" className="relative overflow-hidden bg-bg pt-14 sm:pt-20 lg:pt-24">
      <div className="tech-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative z-10 pb-16 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Abstract network node illustration + Abidjan team thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div
              className="cut-both relative overflow-hidden rounded-md border border-brand-neon/25 bg-gradient-to-br from-[#041b12] via-[#063d2d] to-[#041b12] p-6 text-white shadow-lift sm:p-8"
              style={{ '--cut': '24px' } as React.CSSProperties}
            >
              {/* Circuit-Pagne woven background */}
              <CircuitPagne className="text-brand-neon/[0.06]" size={64} />

              {/* Watermark S */}
              <SMark
                className="pointer-events-none absolute -right-14 -bottom-14 h-64 w-64 text-brand-neon/[0.06]"
                mono
              />

              {/* Concentric signal rings + interconnected nodes SVG */}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[480px]">
                <SignalRings
                  className="absolute inset-0 h-full w-full text-brand-neon/35"
                  rings={4}
                  pulses={3}
                  emitter={false}
                />

                <svg
                  viewBox="0 0 480 420"
                  className="relative z-10 h-full w-full"
                  aria-hidden="true"
                >
                  {/* Outer quadrangle links */}
                  <polygon
                    points="96,108 392,126 376,328 112,318"
                    fill="none"
                    stroke="#39d94a"
                    strokeOpacity="0.28"
                    strokeWidth="1.2"
                  />

                  {/* Diagonal cross links through central hub (240, 210) */}
                  {nodes.map((n, i) => (
                    <g key={i}>
                      <line
                        x1={240}
                        y1={210}
                        x2={n.x}
                        y2={n.y}
                        stroke="#39d94a"
                        strokeOpacity="0.45"
                        strokeWidth="1.4"
                      />
                      <line
                        x1={240}
                        y1={210}
                        x2={n.x}
                        y2={n.y}
                        stroke="#39d94a"
                        strokeWidth="2.2"
                        strokeDasharray="6 90"
                        className="motion-loop animate-flow"
                        style={{ animationDelay: `${i * -1.4}s` }}
                      />
                    </g>
                  ))}

                  {/* Satellite nodes */}
                  {nodes.map((n, i) => (
                    <g key={`node-${i}`}>
                      <circle cx={n.x} cy={n.y} r="12" fill="#39d94a" fillOpacity="0.16" />
                      <circle cx={n.x} cy={n.y} r="5.5" fill="#39d94a" />
                      <text
                        x={n.x}
                        y={n.y - 16}
                        textAnchor="middle"
                        fill="#86efac"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        {n.label}
                      </text>
                    </g>
                  ))}

                  {/* Central glowing hub */}
                  <circle cx="240" cy="210" r="24" fill="#39d94a" fillOpacity="0.2" />
                  <circle cx="240" cy="210" r="11" fill="#39d94a" />
                </svg>
              </div>

              {/* Embedded real-life Abidjan team preview card at bottom of illustration */}
              <div className="relative z-20 mt-4 grid grid-cols-12 items-center gap-3 rounded border border-white/15 bg-[#041b12]/80 p-3 backdrop-blur-md">
                <div className="col-span-5 sm:col-span-4">
                  <SmartImage
                    image={photos.team}
                    alt={t.about.photoAlt}
                    sizes="180px"
                    className="h-20 w-full"
                    overlay={false}
                    cut="tr"
                  />
                </div>
                <div className="col-span-7 sm:col-span-8">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-brand-neon">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.about.localTitle}</span>
                  </div>
                  <p className="mt-0.5 font-display text-sm font-bold text-white">
                    {t.about.localText}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-300">
                    Solutions Telecom Officielle CI
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: Copy + 3 Value Cards */}
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow={t.about.eyebrow}
              titleLead={t.about.titleLead}
              titleAccent={t.about.titleAccent}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 text-base leading-relaxed text-muted sm:text-[17px]"
            >
              {t.about.body1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-3 text-sm leading-relaxed text-muted/90 sm:text-base"
            >
              {t.about.body2}
            </motion.p>

            {/* 3 value cards with 3D hover tilt */}
            <div className="mt-8 grid gap-3.5 sm:grid-cols-3">
              {values.map((v, idx) => (
                <ValueCard
                  key={v.title}
                  icon={v.icon}
                  title={v.title}
                  text={v.text}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal cut transition to the dark forest Expertise / Showcase section */}
      <DiagonalDivider direction="up-left" fillClassName="fill-[#041b12]" />
    </section>
  )
}

