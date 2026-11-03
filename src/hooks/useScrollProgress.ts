import { useEffect, useState } from 'react'

/** Page scroll state: reading progress (0 to 1) and whether the page left the top. */
export interface ScrollState {
  progress: number
  scrolled: boolean
}

/** Tracks document scroll progress with a rAF throttled passive listener. */
export function useScrollProgress(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false })

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const y = window.scrollY
      setState({ progress: max > 0 ? Math.min(1, y / max) : 0, scrolled: y > threshold })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return state
}

