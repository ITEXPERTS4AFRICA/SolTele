import type { PartnerLogoKey } from '../assets/images'

/**
 * Central site configuration.
 * Everything business specific lives here so it can be edited without touching components.
 */

/** Identifier of a hero statistic (its label lives in the i18n `stats` namespace). */
export type StatId = 'years' | 'clients' | 'support'

/** Animated counter shown in the hero band. */
export interface StatConfig {
  id: StatId
  /** Numeric value animated from 0. Omit when `display` is used. */
  value?: number
  /** Static text displayed as is (e.g. "24/7"). */
  display?: string
  prefix?: string
  suffix?: string
  /** True when the figure still needs to be confirmed by the client. */
  placeholder?: boolean
}

/** How the contact form is delivered. */
export type ContactMode = 'mailto' | 'endpoint'

/** Official partner configuration. */
export interface PartnerConfig {
  id: string
  name: string
  logoKey: PartnerLogoKey
  specialtyFr: string
  specialtyEn: string
}

export const siteConfig = {
  brand: {
    short: 'SolTele',
    full: 'Solutions Telecom Officielle CI',
    url: 'https://www.soltele.ci',
  },
  contact: {
    phoneDisplay: '+225 05 85 84 97 52',
    phoneHref: 'tel:+2250585849752',
    /** International number without "+" for wa.me links. */
    whatsapp: '2250585849752',
    email: 'contact@soltele.ci',
    address: {
      line1: 'Deux Plateaux Vallon, Rue des Jardins',
      line2: 'Cocody, Abidjan',
      country: 'Côte d’Ivoire',
    },
    /** Coordinates of Deux Plateaux Vallon, Cocody, Abidjan. */
    geo: { lat: 5.3712, lng: -3.9968 },
  },
  /** Hero counters. */
  stats: [
    { id: 'years', value: 10, prefix: '+', placeholder: true },
    { id: 'clients', value: 200, prefix: '+', placeholder: true },
    { id: 'support', display: '24/7' },
  ] as StatConfig[],
  form: {
    /** 'mailto' opens the visitor's mail client; 'endpoint' POSTs JSON to `endpoint`. */
    mode: 'mailto' as ContactMode,
    /** e.g. a Formspree / serverless URL. Used when mode = 'endpoint'. */
    endpoint: '',
  },
  /** Official technology partners. */
  partners: [
    {
      id: 'yealink',
      name: 'Yealink',
      logoKey: 'yealink',
      specialtyFr: 'Terminaux IP & Visioconférence',
      specialtyEn: 'IP Phones & Video Conferencing',
    },
    {
      id: 'yeastar',
      name: 'Yeastar',
      logoKey: 'yeastar',
      specialtyFr: 'Standards IPBX & Communications',
      specialtyEn: 'IP PBX & Unified Communications',
    },
    {
      id: 'flyingvoice',
      name: 'Flyingvoice',
      logoKey: 'flyingvoice',
      specialtyFr: 'Téléphonie IP & Passerelles VoIP',
      specialtyEn: 'IP Telephony & VoIP Gateways',
    },
    {
      id: 'zyxel',
      name: 'Zyxel Networks',
      logoKey: 'zyxel',
      specialtyFr: 'Réseaux, WiFi Pro & Firewalls',
      specialtyEn: 'Networking, Pro WiFi & Firewalls',
    },
    {
      id: 'katela',
      name: 'Katela Networks',
      logoKey: 'katela',
      specialtyFr: 'Infrastructures & Connectivité',
      specialtyEn: 'Infrastructure & Connectivity',
    },
  ] as PartnerConfig[],
} as const

/** Builds a WhatsApp deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`
}
