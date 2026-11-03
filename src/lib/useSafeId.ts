import { useId } from 'react'

/** `useId` sanitised for SVG `url(#id)` references (React ids may contain special characters). */
export function useSafeId(prefix: string): string {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
}

