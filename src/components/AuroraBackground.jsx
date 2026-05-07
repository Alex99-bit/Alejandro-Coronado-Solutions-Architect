import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const cubes = [
    { top: '10%', left: '75%', size: 220, speed: 1.0, phase: 0 },
    { top: '26%', left: '58%', size: 160, speed: 0.9, phase: 0.4 },
    { top: '40%', left: '72%', size: 140, speed: 1.1, phase: 0.2 },
    { top: '56%', left: '60%', size: 180, speed: 0.8, phase: 0.6 },
    { top: '72%', left: '68%', size: 120, speed: 1.2, phase: 0.8 },
    { top: '22%', left: '22%', size: 160, speed: 0.6, phase: 0.9 },
    { top: '38%', left: '8%', size: 200, speed: 0.7, phase: 0.1 },
    { top: '58%', left: '20%', size: 130, speed: 0.9, phase: 0.3 },
  ]

  const cubeElsRef = useRef([])
  const cubeStatesRef = useRef(
    cubes.map(() => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      rx: (Math.random() - 0.5) * 20,
      ry: (Math.random() - 0.5) * 20,
      vrx: (Math.random() - 0.5) * 0.02,
      vry: (Math.random() - 0.5) * 0.02,
    }))
  )

  const particleElsRef = useRef([])
  const isClient = typeof window !== 'undefined'

  const computeParticleCount = () => {
    if (!isClient) return 48
    const w = window.innerWidth
    if (w <= 420) return 10
    if (w <= 640) return 14
    if (w <= 900) return 28
    return 48
  }

  const PARTICLE_COUNT = computeParticleCount()
  const particleSeedsRef = useRef(
    isClient
      ? Array.from({ length: PARTICLE_COUNT }).map(() => ({
          size: Math.floor(Math.random() * 6) + 4,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }))
      : Array.from({ length: PARTICLE_COUNT }).map(() => ({ size: 6, x: 0, y: 0 }))
  )

  const particleStatesRef = useRef(
    particleSeedsRef.current.map((s) => ({
      x: s.x,
      y: s.y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: s.size,
    }))
  )

  const pointerRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    vx: 0,
    vy: 0,
  })

  const lastScrollRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId = null
    let lastTime = performance.now()

    const handleMouseMove = (e) => {
      const p = pointerRef.current
      p.vx = e.clientX - p.x
      p.vy = e.clientY - p.y
      p.x = e.clientX
      p.y = e.clientY
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const t0 = e.touches[0]
        const p = pointerRef.current
        p.vx = t0.clientX - p.x
        p.vy = t0.clientY - p.y
        p.x = t0.clientX
        p.y = t0.clientY
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const smallScreen = window.innerWidth <= 640
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const step = () => {
      const now = performance.now()
      const dt = Math.max(16, now - lastTime)
      lastTime = now

      const scrollY = window.scrollY || 0
      const scrollDelta = scrollY - lastScrollRef.current
      lastScrollRef.current = scrollY
      const scrollNorm = scrollDelta / (window.innerHeight || 1)

      const pointer = pointerRef.current
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      // update cubes (zero-gravity float + scroll / pointer influences)
      if (!smallScreen) {
        cubeStatesRef.current.forEach((state, i) => {
          const el = cubeElsRef.current[i]
          const c = cubes[i]
          if (!el || !c) return
          const speed = c.speed || 1

          // subtle noise so cubes don't feel perfectly mechanical
          const noiseX = Math.sin((now + i * 1000) / (2200 - speed * 120)) * 0.006
          const noiseY = Math.cos((now + i * 700) / (1800 - speed * 100)) * 0.005

          // gentler scroll influence so cubes don't overreact
          const scrollForceX = scrollNorm * 160 * (i % 2 ? 1 : -1) * (0.4 + speed * 0.15)
          const scrollForceY = scrollNorm * 200 * (0.4 + speed * 0.15)

          // much lighter pointer effect for cubes (particles keep stronger response)
          const pointerFX = pointer.vx * 0.005 * (0.4 + speed * 0.2)
          const pointerFY = pointer.vy * 0.005 * (0.4 + speed * 0.2)

          state.vx += noiseX + scrollForceX + pointerFX
          state.vy += noiseY + scrollForceY + pointerFY

          // stronger damping so motion decays faster (less overreaction)
          state.vx *= 0.94
          state.vy *= 0.94

          // integrate
          state.x += state.vx * (dt / 16)
          state.y += state.vy * (dt / 16)

          // clamp velocities to avoid large, jarring movements
          state.vx = Math.max(Math.min(state.vx, 3), -3)
          state.vy = Math.max(Math.min(state.vy, 3), -3)

          // wrap-around bounds so cubes stay in view
          const boundX = window.innerWidth * 0.6
          const boundY = window.innerHeight * 0.6
          if (state.x > boundX) state.x = -boundX
          if (state.x < -boundX) state.x = boundX
          if (state.y > boundY) state.y = -boundY
          if (state.y < -boundY) state.y = boundY

          // rotation reacts softly to velocity and reduced noise
          state.rx += state.vx * 0.015 + Math.sin(now / 1200 + i) * 0.006
          state.ry += state.vy * 0.015 + Math.cos(now / 1000 + i) * 0.006

          el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`
        })
      }

      // update particles (react to mouse movement)
      const particleThreshold = smallScreen ? 180 : 260
      const repulseBase = isTouch ? (smallScreen ? 0.06 : 0.08) : (smallScreen ? 0.08 : 0.12)

      particleStatesRef.current.forEach((pstate, j) => {
        const pel = particleElsRef.current[j]
        if (!pel) return
        const dx = pstate.x - pointer.x
        const dy = pstate.y - pointer.y
        const dist = Math.hypot(dx, dy) || 1

        if (pointerSpeed > 1) {
          const repulse = Math.max(0, 1 - dist / particleThreshold) * (pointerSpeed * repulseBase)
          pstate.vx += (dx / dist) * repulse
          pstate.vy += (dy / dist) * repulse
        } else {
          pstate.vx += (Math.random() - 0.5) * 0.08
          pstate.vy += (Math.random() - 0.5) * 0.08
        }

        // gentle pull toward center to keep particles visible
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        pstate.vx += (centerX - pstate.x) * 0.00004
        pstate.vy += (centerY - pstate.y) * 0.00004

        pstate.vx *= 0.94
        pstate.vy *= 0.94

        pstate.x += pstate.vx * (dt / 16)
        pstate.y += pstate.vy * (dt / 16)

        if (pstate.x < -30) pstate.x = window.innerWidth + 30
        if (pstate.x > window.innerWidth + 30) pstate.x = -30
        if (pstate.y < -30) pstate.y = window.innerHeight + 30
        if (pstate.y > window.innerHeight + 30) pstate.y = -30

        const rot = (pstate.vx + pstate.vy) * 6
        pel.style.transform = `translate3d(${pstate.x}px, ${pstate.y}px, 0) rotate(${rot}deg)`
        pel.style.opacity = `${0.55 + pstate.size / 14}`
      })

      // decay pointer velocity for smoother motion
      pointer.vx *= 0.75
      pointer.vy *= 0.75

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div className="aurora-bg" aria-hidden>
      <div className="blob" style={{ top: '-10%', left: '-10%' }} />
      <div className="blob" style={{ bottom: '10%', right: '-5%', animationDelay: '-5s' }} />

      <div className="scroll-3d" aria-hidden>
        {cubes.map((c, i) => (
          <div
            key={`cube-${i}`}
            className="cube-wrapper"
            ref={(el) => (cubeElsRef.current[i] = el)}
            style={{
              top: c.top,
              left: c.left,
              width: `${c.size}px`,
              height: `${c.size}px`,
              ['--cube-depth']: `${Math.round(c.size / 2)}px`,
            }}
          >
            <div className="cube">
              <div className="face face-front" />
              <div className="face face-back" />
              <div className="face face-right" />
              <div className="face face-left" />
              <div className="face face-top" />
              <div className="face face-bottom" />
            </div>
          </div>
        ))}

        <div className="particle-layer" aria-hidden>
          {particleStatesRef.current.map((p, idx) => (
            <div
              key={`part-${idx}`}
              ref={(el) => (particleElsRef.current[idx] = el)}
              className="particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: 0,
                top: 0,
                transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
