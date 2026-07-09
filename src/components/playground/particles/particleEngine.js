const PRESETS = {
  fountain: {
    label: 'Fountain',
    spawnRate: 4,
    particleLife: 120,
    size: 3,
    gravity: 0.15,
    windX: 0,
    turbulence: 0,
    speed: 6,
    spread: 0.4,
    angle: -Math.PI / 2,
    hue: 200,
    hueDrift: 30,
    trailAlpha: 0.12,
    additive: true,
  },
  explosion: {
    label: 'Explosion',
    spawnRate: 3,
    particleLife: 80,
    size: 3.5,
    gravity: 0.04,
    windX: 0,
    turbulence: 0.02,
    speed: 10,
    spread: Math.PI * 2,
    angle: 0,
    hue: 30,
    hueDrift: 40,
    trailAlpha: 0.08,
    additive: true,
  },
  snow: {
    label: 'Snow',
    spawnRate: 2,
    particleLife: 200,
    size: 2.5,
    gravity: 0.02,
    windX: 0.3,
    turbulence: 0.05,
    speed: 0.8,
    spread: 0.6,
    angle: Math.PI / 2,
    hue: 210,
    hueDrift: 10,
    trailAlpha: 0.15,
    additive: false,
  },
  fire: {
    label: 'Fire',
    spawnRate: 6,
    particleLife: 60,
    size: 4,
    gravity: -0.08,
    windX: 0,
    turbulence: 0.06,
    speed: 2.5,
    spread: 0.5,
    angle: -Math.PI / 2,
    hue: 15,
    hueDrift: 25,
    trailAlpha: 0.06,
    additive: true,
  },
  orbit: {
    label: 'Orbit',
    spawnRate: 3,
    particleLife: 150,
    size: 2,
    gravity: 0,
    windX: 0,
    turbulence: 0,
    speed: 3,
    spread: Math.PI * 2,
    angle: 0,
    hue: 270,
    hueDrift: 60,
    trailAlpha: 0.04,
    additive: true,
    orbital: true,
    orbitalStrength: 0.4,
  },
}

const MAX_PARTICLES = 2000

export function createParticleEngine() {
  const pool = []
  const active = []

  for (let i = 0; i < MAX_PARTICLES; i++) {
    pool.push({
      x: 0, y: 0, vx: 0, vy: 0,
      life: 0, maxLife: 0,
      size: 2, hue: 200, alpha: 1,
    })
  }

  let poolIndex = 0

  function spawn(cx, cy, config) {
    const count = config.spawnRate
    let spawned = 0

    for (let attempts = 0; attempts < count * 3 && spawned < count; attempts++) {
      const p = pool[poolIndex]
      poolIndex = (poolIndex + 1) % pool.length

      if (p.life > 0) continue

      initParticle(p, cx, cy, config)
      active.push(p)
      spawned++
    }

    if (spawned < count && active.length > 0) {
      for (let i = 0; i < count - spawned; i++) {
        let oldest = active[0]
        let oldestIdx = 0
        for (let j = 1; j < active.length; j++) {
          if (active[j].life < oldest.life) {
            oldest = active[j]
            oldestIdx = j
          }
        }
        active.splice(oldestIdx, 1)
        initParticle(oldest, cx, cy, config)
        active.push(oldest)
      }
    }
  }

  function initParticle(p, cx, cy, config) {
    const angle = config.angle + (Math.random() - 0.5) * config.spread
    const speed = config.speed * (0.6 + Math.random() * 0.8)

    p.x = cx + (Math.random() - 0.5) * 4
    p.y = cy + (Math.random() - 0.5) * 4
    p.vx = Math.cos(angle) * speed
    p.vy = Math.sin(angle) * speed
    p.life = config.particleLife * (0.7 + Math.random() * 0.6)
    p.maxLife = p.life
    p.size = config.size * (0.5 + Math.random() * 1)
    p.hue = config.hue + (Math.random() - 0.5) * config.hueDrift
    p.alpha = 1
  }

  function burst(cx, cy, config, count) {
    for (let i = 0; i < count; i++) {
      let p = null

      for (let attempts = 0; attempts < 3; attempts++) {
        const candidate = pool[poolIndex]
        poolIndex = (poolIndex + 1) % pool.length
        if (candidate.life <= 0) {
          p = candidate
          break
        }
      }

      if (!p && active.length > 0) {
        let oldest = active[0]
        let oldestIdx = 0
        for (let j = 1; j < active.length; j++) {
          if (active[j].life < oldest.life) {
            oldest = active[j]
            oldestIdx = j
          }
        }
        active.splice(oldestIdx, 1)
        p = oldest
      }

      if (!p) continue

      const angle = Math.random() * Math.PI * 2
      const speed = config.speed * (0.3 + Math.random() * 1.4)

      p.x = cx + (Math.random() - 0.5) * 8
      p.y = cy + (Math.random() - 0.5) * 8
      p.vx = Math.cos(angle) * speed
      p.vy = Math.sin(angle) * speed
      p.life = config.particleLife * (0.5 + Math.random() * 1)
      p.maxLife = p.life
      p.size = config.size * (0.4 + Math.random() * 1.2)
      p.hue = config.hue + (Math.random() - 0.5) * config.hueDrift
      p.alpha = 1

      active.push(p)
    }
  }

  function update(config, width, height, dt) {
    const dtScale = dt / 16
    const gravity = config.gravity * dtScale
    const windX = config.windX * dtScale
    const turbulence = config.turbulence
    const orbital = config.orbital
    const orbStr = config.orbitalStrength || 0.4
    const cx = width / 2
    const cy = height / 2

    let writeIdx = 0
    for (let i = 0; i < active.length; i++) {
      const p = active[i]
      p.life -= dtScale
      if (p.life <= 0) continue

      p.alpha = Math.min(1, p.life / (p.maxLife * 0.3))

      if (orbital) {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        p.vx += (-dy / dist) * orbStr * dtScale
        p.vy += (dx / dist) * orbStr * dtScale
      }

      p.vy += gravity
      p.vx += windX

      if (turbulence > 0) {
        p.vx += (Math.random() - 0.5) * turbulence * dtScale
        p.vy += (Math.random() - 0.5) * turbulence * dtScale
      }

      p.vx *= 0.998
      p.vy *= 0.998

      p.x += p.vx * dtScale
      p.y += p.vy * dtScale

      if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
        continue
      }

      active[writeIdx++] = p
    }

    active.length = writeIdx
  }

  function render(ctx, config, width, height, hueShift) {
    if (config.trailAlpha > 0) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgba(2, 6, 23, ${config.trailAlpha})`
      ctx.fillRect(0, 0, width, height)
    } else {
      ctx.clearRect(0, 0, width, height)
    }

    ctx.globalCompositeOperation = config.additive ? 'lighter' : 'source-over'

    for (let i = 0; i < active.length; i++) {
      const p = active[i]
      const h = (p.hue + hueShift) % 360
      const a = p.alpha

      const r = p.size * 1.5
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
      gradient.addColorStop(0, `hsla(${h}, 80%, 65%, ${a})`)
      gradient.addColorStop(0.4, `hsla(${h}, 90%, 50%, ${a * 0.6})`)
      gradient.addColorStop(1, `hsla(${h}, 100%, 40%, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
  }

  function getActiveCount() {
    return active.length
  }

  function clear() {
    active.length = 0
  }

  return { spawn, burst, update, render, getActiveCount, clear, PRESETS }
}

export { PRESETS }
