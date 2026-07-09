import { useRef, useCallback, useEffect } from 'react'

export function useAnimationLoop(callback) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  const lastTimeRef = useRef(null)
  const runningRef = useRef(false)

  const stop = useCallback(() => {
    runningRef.current = false
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (runningRef.current) return

    try {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    } catch {
      // SSR safe
    }

    runningRef.current = true
    startTimeRef.current = null
    lastTimeRef.current = null

    const step = (now) => {
      if (!runningRef.current) return

      if (startTimeRef.current === null) {
        startTimeRef.current = now
        lastTimeRef.current = now
      }

      const deltaTime = Math.min(now - lastTimeRef.current, 50)
      const elapsed = now - startTimeRef.current
      lastTimeRef.current = now

      callbackRef.current(deltaTime, elapsed)

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    return () => {
      runningRef.current = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return { start, stop }
}
