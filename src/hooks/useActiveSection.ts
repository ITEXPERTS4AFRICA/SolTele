import { useEffect, useState } from 'react'

/** Scroll spy: returns the id of the section currently crossing the upper third of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    const observe = () => {
      io.disconnect()
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) io.observe(el)
      })
    }
    observe()
    /* Sections may be lazy loaded: re-observe when the DOM grows. */
    const mo = new MutationObserver(observe)
    mo.observe(document.getElementById('main') ?? document.body, { childList: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [ids])

  return active
}

