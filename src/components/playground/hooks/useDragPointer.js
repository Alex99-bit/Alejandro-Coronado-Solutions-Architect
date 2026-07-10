import { useRef, useCallback, useEffect } from 'react'

export function useDragPointer({ onStart, onMove, onEnd } = {}) {
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
  })

  const callbacksRef = useRef({ onStart, onMove, onEnd })

  useEffect(() => {
    callbacksRef.current = { onStart, onMove, onEnd }
  }, [onStart, onMove, onEnd])

  const targetRef = useRef(null)

  const handlePointerDown = useCallback((e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    const el = e.currentTarget
    targetRef.current = el
    el.setPointerCapture(e.pointerId)

    const s = stateRef.current
    s.isDragging = true
    s.startX = e.clientX
    s.startY = e.clientY
    s.currentX = e.clientX
    s.currentY = e.clientY
    s.deltaX = 0
    s.deltaY = 0

    callbacksRef.current.onStart?.({
      x: e.clientX,
      y: e.clientY,
      target: el,
      event: e,
    })
  }, [])

  const handlePointerMove = useCallback((e) => {
    const s = stateRef.current
    if (!s.isDragging) return

    s.deltaX = e.clientX - s.currentX
    s.deltaY = e.clientY - s.currentY
    s.currentX = e.clientX
    s.currentY = e.clientY

    callbacksRef.current.onMove?.({
      x: e.clientX,
      y: e.clientY,
      deltaX: s.deltaX,
      deltaY: s.deltaY,
      totalDeltaX: e.clientX - s.startX,
      totalDeltaY: e.clientY - s.startY,
      target: targetRef.current,
      event: e,
    })
  }, [])

  const handlePointerUp = useCallback((e) => {
    const s = stateRef.current
    if (!s.isDragging) return

    s.isDragging = false

    callbacksRef.current.onEnd?.({
      x: e.clientX,
      y: e.clientY,
      totalDeltaX: e.clientX - s.startX,
      totalDeltaY: e.clientY - s.startY,
      target: targetRef.current,
      event: e,
    })

    targetRef.current = null
  }, [])

  useEffect(() => {
    const state = stateRef.current
    return () => {
      state.isDragging = false
      targetRef.current = null
    }
  }, [])

  return {
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  }
}
