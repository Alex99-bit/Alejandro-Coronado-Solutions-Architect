import { useRef, useCallback, useState, useEffect } from 'react'
import { useCanvasSize } from '../hooks/useCanvasSize.js'
import { useAnimationLoop } from '../hooks/useAnimationLoop.js'
import { createParticleEngine, PRESETS } from './particleEngine.js'

export function ParticleCanvas({ config, preset, onBurstRef, onClearRef }) {
  const canvasRef = useRef(null)
  const { width, height, dpr, containerRef } = useCanvasSize()
  const engineRef = useRef(createParticleEngine())
  const hueShiftRef = useRef(0)
  const [count, setCount] = useState(0)

  const configRef = useRef(config)

  useEffect(() => {
    configRef.current = config
  }, [config])

  const sizeRef = useRef({ width, height })

  useEffect(() => {
    sizeRef.current = { width, height }
  }, [width, height])

  useEffect(() => {
    if (onBurstRef) {
      onBurstRef.current = () => {
        const engine = engineRef.current
        const size = sizeRef.current
        engine.burst(size.width / 2, size.height / 2, configRef.current, 200)
      }
    }
  }, [onBurstRef])

  useEffect(() => {
    if (onClearRef) {
      onClearRef.current = () => {
        engineRef.current.clear()
      }
    }
  }, [onClearRef])

  const renderFrame = useCallback(
    (dt) => {
      const canvas = canvasRef.current
      const engine = engineRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const w = width * dpr
      const h = height * dpr
      canvas.width = w
      canvas.height = h
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cfg = configRef.current

      const cx = width / 2
      const cy = height * 0.75
      engine.spawn(cx, cy, cfg)

      hueShiftRef.current = (hueShiftRef.current + 0.15) % 360

      engine.update(cfg, width, height, dt)
      engine.render(ctx, cfg, width, height, hueShiftRef.current)

      setCount(engine.getActiveCount())
    },
    [width, height, dpr],
  )

  const { start, stop } = useAnimationLoop(renderFrame)

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  return (
    <div
      ref={containerRef}
      className="playground-canvas-container relative w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60"
      style={{ height: 'clamp(300px, 50vh, 520px)' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: 'none' }}
      />

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1.5 font-mono text-xs text-slate-400 backdrop-blur-sm">
        {PRESETS[preset]?.label || preset} · {count} particles · 60fps
      </div>
    </div>
  )
}
