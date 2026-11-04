/**
 * Responsive WebP image registry.
 * Photos are AI generated illustrations (PLACEHOLDER): replace the files in
 * `src/assets/images` with real SolTele photos keeping the same names.
 */

const files = import.meta.glob<string>('./images/*.webp', { eager: true, query: '?url', import: 'default' })

/** Available photo keys. */
export type PhotoKey =
  | 'voip'
  | 'cyber'
  | 'cctv'
  | 'network'
  | 'wifi'
  | 'pylone'
  | 'solar'
  | 'abidjan'
  | 'technician'
  | 'team'

/** Partner logo keys. */
export type PartnerLogoKey = 'proxim' | 'zyxel' | 'yealink' | 'yeastar' | 'fanvil' | 'mobotix'

/** Ready to spread `<img>` attributes. */
export interface ResponsiveImage {
  src: string
  srcSet: string
  width: number
  height: number
}

const WIDTHS = [640, 1024, 1376] as const

function build(key: PhotoKey): ResponsiveImage {
  const url = (w: number) => files[`./images/${key}-${w}.webp`] ?? ''
  return {
    src: url(1024),
    srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
    width: 1376,
    height: 768,
  }
}

export const photos: Record<PhotoKey, ResponsiveImage> = {
  voip: build('voip'),
  cyber: build('cyber'),
  cctv: build('cctv'),
  network: build('network'),
  wifi: build('wifi'),
  pylone: build('pylone'),
  solar: build('solar'),
  abidjan: build('abidjan'),
  technician: build('technician'),
  team: build('team'),
}

/** Official partner logos in transparent WebP. */
export const partnerLogos: Record<PartnerLogoKey, string> = {
  proxim: files['./images/partner-proxim.webp'] ?? '',
  zyxel: files['./images/partner-zyxel.webp'] ?? '',
  yealink: files['./images/partner-yealink.webp'] ?? '',
  yeastar: files['./images/partner-yeastar.webp'] ?? '',
  fanvil: files['./images/partner-fanvil.webp'] ?? '',
  mobotix: files['./images/partner-mobotix.webp'] ?? '',
}

/** Official full SolTele logo for light backgrounds (original dark green OL & baseline). */
export const logoFull = files['./images/logo-full.webp'] ?? ''

/** Official full SolTele logo adapted for dark forest backgrounds (luminous OL & baseline). */
export const logoFullDark = files['./images/logo-full-dark.webp'] ?? ''

/** Official S mark (transparent WebP) extracted from the logo. */
export const logoMark = files['./images/logo-mark.webp'] ?? ''
