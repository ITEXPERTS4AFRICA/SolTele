import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fr, type Dictionary } from './fr'
import { en } from './en'
import { LanguageContext, type Lang } from './useTranslation'

export type { Lang, LanguageContextValue } from './useTranslation'

const STORAGE_KEY = 'soltele-lang'
const dictionaries: Record<Lang, Dictionary> = { fr, en }

/** Resolves the initial language: URL ?lang, then localStorage, then browser, defaulting to French. */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* storage unavailable: fall through */
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

/** Updates (or creates) a `<meta>` tag in the document head. */
function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Provides the active dictionary to the tree. Switching is instant (no reload):
 * `<html lang>`, title, description and Open Graph locale follow the language.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    setMeta('meta[name="description"]', 'name', 'description', t.meta.description)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', t.meta.ogLocale)
    setMeta('meta[property="og:title"]', 'property', 'og:title', t.meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
