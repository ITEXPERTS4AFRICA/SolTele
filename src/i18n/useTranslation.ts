import { createContext, useContext } from 'react'
import type { Dictionary } from './fr'

/** Supported languages. French is the default. */
export type Lang = 'fr' | 'en'

/** Value exposed by the language context. */
export interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Access the active dictionary (`t`), the current language and its setter. */
export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used inside <LanguageProvider>')
  return ctx
}
