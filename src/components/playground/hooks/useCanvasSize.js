import { useState, useRef, useEffect, useCallback } from 'react'

export function useCanvasSize() {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ width: 800, height: 500, dpr: 1 })

  const update = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.floor(rect.width)
    const height = Math.floor(rect.height)

    setSize((prev) => {
      if (prev.width === width && prev.height === height && prev.dpr === dpr) return prev
      return { width, height, dpr }
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    update()

    const observer = new ResizeObserver(() => update())
    observer.observe(el)

    return () => observer.disconnect()
  }, [update])

  return { ...size, containerRef }
}
