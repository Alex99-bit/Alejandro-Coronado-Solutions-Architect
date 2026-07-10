import { useRef, useCallback, useEffect } from 'react'
import { useCanvasSize } from '../hooks/useCanvasSize.js'
import { useAnimationLoop } from '../hooks/useAnimationLoop.js'
import { createCube, createSphere, createTorus, renderWireframe } from './meshEngine.js'

const MESH_FACTORIES = {
  cube: () => createCube(),
  sphere: () => createSphere(2),
  torus: () => createTorus(1, 0.38, 28, 14),
}

export function MeshCanvas({ params, onFrame }) {
  const canvasRef = useRef(null)
  const { width, height, dpr, containerRef } = useCanvasSize()

  const onFrameRef = useRef(onFrame)

  useEffect(() => {
    onFrameRef.current = onFrame
  }, [onFrame])

  const renderFrame = useCallback(
    (dt) => {
      onFrameRef.current?.(dt)

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const w = width * dpr
      const h = height * dpr
      canvas.width = w
      canvas.height = h
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mesh = MESH_FACTORIES[params.geometry]?.() || MESH_FACTORIES.cube()

      renderWireframe(ctx, mesh, {
        width,
        height,
        hue: params.hue,
        wireOpacity: params.wireOpacity,
        shadingIntensity: params.shading,
        rx: params.rx,
        ry: params.ry,
        rz: params.rz,
        scale: params.scale,
      })
    },
    [width, height, dpr, params],
  )

  const { start, stop } = useAnimationLoop(renderFrame)

  return (
    <div
      ref={containerRef}
      className="playground-canvas-container relative w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60"
      style={{ height: 'clamp(300px, 50vh, 520px)' }}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: 'none' }}
      />

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1.5 font-mono text-xs text-slate-400 backdrop-blur-sm">
        {width}×{height} · {params.geometry} · 60fps
      </div>
    </div>
  )
}
