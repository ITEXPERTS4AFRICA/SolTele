import { useCallback, type PointerEvent } from 'react'

/**
 * Pointer following spotlight: writes the cursor position into `--mx` / `--my`
 * CSS variables on the hovered element. Pair it with the `.spotlight` class.
 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: PointerEvent<T>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])
}

