// Pure 3D math engine — zero dependencies
// Handles mesh generation, transforms, projection, and wireframe rendering

// ── Vector / Matrix helpers ──────────────────────────────────────────

function vec3(x, y, z) { return { x, y, z } }

function normalize(v) {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1
  return vec3(v.x / len, v.y / len, v.z / len)
}

function cross(a, b) {
  return vec3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x,
  )
}

function sub(a, b) { return vec3(a.x - b.x, a.y - b.y, a.z - b.z) }

function dot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z }

function rotatePoint(p, rx, ry, rz) {
  let { x, y, z } = p

  // Rotate X
  const cosX = Math.cos(rx), sinX = Math.sin(rx)
  const y1 = y * cosX - z * sinX
  const z1 = y * sinX + z * cosX
  y = y1; z = z1

  // Rotate Y
  const cosY = Math.cos(ry), sinY = Math.sin(ry)
  const x2 = x * cosY + z * sinY
  const z2 = -x * sinY + z * cosY
  x = x2; z = z2

  // Rotate Z
  const cosZ = Math.cos(rz), sinZ = Math.sin(rz)
  const x3 = x * cosZ - y * sinZ
  const y3 = x * sinZ + y * cosZ

  return vec3(x3, y3, z)
}

function project(p, w, h, fov) {
  const f = fov || 500
  const zOffset = 5
  const scale = f / (p.z + zOffset)
  return {
    x: p.x * scale + w / 2,
    y: -p.y * scale + h / 2,
    z: p.z,
    scale,
  }
}

// ── Geometry generators ──────────────────────────────────────────────

export function createCube() {
  const v = [
    vec3(-1, -1, -1), vec3(1, -1, -1), vec3(1, 1, -1), vec3(-1, 1, -1),
    vec3(-1, -1, 1), vec3(1, -1, 1), vec3(1, 1, 1), vec3(-1, 1, 1),
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ]
  const faces = [
    [0, 1, 2, 3], [5, 4, 7, 6], [1, 5, 6, 2],
    [4, 0, 3, 7], [3, 2, 6, 7], [4, 5, 1, 0],
  ]
  return { vertices: v, edges, faces, name: 'Cube' }
}

export function createSphere(subdivisions) {
  const t = (1 + Math.sqrt(5)) / 2
  const base = [
    vec3(-1, t, 0), vec3(1, t, 0), vec3(-1, -t, 0), vec3(1, -t, 0),
    vec3(0, -1, t), vec3(0, 1, t), vec3(0, -1, -t), vec3(0, 1, -t),
    vec3(t, 0, -1), vec3(t, 0, 1), vec3(-t, 0, -1), vec3(-t, 0, 1),
  ]

  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  let verts = [...base]
  const subs = Math.min(subdivisions || 1, 3)

  for (let s = 0; s < subs; s++) {
    const midCache = {}
    const newFaces = []

    function getMidpoint(i1, i2) {
      const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`
      if (midCache[key] !== undefined) return midCache[key]
      const mid = normalize(vec3(
        (verts[i1].x + verts[i2].x) / 2,
        (verts[i1].y + verts[i2].y) / 2,
        (verts[i1].z + verts[i2].z) / 2,
      ))
      const idx = verts.length
      verts.push(mid)
      midCache[key] = idx
      return idx
    }

    for (const f of faces) {
      const a = getMidpoint(f[0], f[1])
      const b = getMidpoint(f[1], f[2])
      const c = getMidpoint(f[2], f[0])
      newFaces.push([f[0], a, c], [f[1], b, a], [f[2], c, b], [a, b, c])
    }
    faces = newFaces
  }

  const edges = []
  const edgeSet = new Set()
  for (const f of faces) {
    for (let i = 0; i < f.length; i++) {
      const a = f[i], b = f[(i + 1) % f.length]
      const key = a < b ? `${a}_${b}` : `${b}_${a}`
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push([a, b])
      }
    }
  }

  return { vertices: verts, edges, faces, name: 'Sphere' }
}

export function createTorus(majorR, minorR, majorSegs, minorSegs) {
  const R = majorR || 1
  const r = minorR || 0.4
  const m = majorSegs || 24
  const n = minorSegs || 12

  const vertices = []
  const faces = []
  const edges = []

  for (let i = 0; i < m; i++) {
    const theta = (i / m) * Math.PI * 2
    const cosT = Math.cos(theta), sinT = Math.sin(theta)
    for (let j = 0; j < n; j++) {
      const phi = (j / n) * Math.PI * 2
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      vertices.push(vec3(
        (R + r * cosP) * cosT,
        r * sinP,
        (R + r * cosP) * sinT,
      ))
    }
  }

  for (let i = 0; i < m; i++) {
    const i2 = (i + 1) % m
    for (let j = 0; j < n; j++) {
      const j2 = (j + 1) % n
      const a = i * n + j
      const b = i2 * n + j
      const c = i2 * n + j2
      const d = i * n + j2
      faces.push([a, b, c, d])
      edges.push([a, b], [a, d])
    }
  }

  return { vertices, edges, faces, name: 'Torus' }
}

// ── Transform & project ─────────────────────────────────────────────

export function transformAndProject(mesh, rx, ry, rz, scale, w, h, fov) {
  const s = scale || 1
  const transformed = mesh.vertices.map((v) => {
    const scaled = vec3(v.x * s, v.y * s, v.z * s)
    return rotatePoint(scaled, rx, ry, rz)
  })

  const projected = transformed.map((p) => project(p, w, h, fov))

  const faceNormals = mesh.faces.map((f) => {
    if (f.length < 3) return vec3(0, 0, 1)
    const a = transformed[f[0]], b = transformed[f[1]], c = transformed[f[2]]
    return normalize(cross(sub(b, a), sub(c, a)))
  })

  const faceDepths = mesh.faces.map((f) => {
    let sum = 0
    for (const idx of f) sum += transformed[idx].z
    return sum / f.length
  })

  return { projected, transformed, faceNormals, faceDepths }
}

// ── Render ───────────────────────────────────────────────────────────

export function renderWireframe(ctx, mesh, params) {
  const { width, height, hue, wireOpacity, shadingIntensity, rx, ry, rz, scale } = params

  const { projected, faceNormals, faceDepths } = transformAndProject(
    mesh, rx, ry, rz, scale, width, height, 500,
  )

  ctx.clearRect(0, 0, width, height)

  const lightDir = normalize(vec3(0.3, 0.6, 1))
  const baseHue = hue || 210

  const sortedFaces = mesh.faces
    .map((f, i) => ({ face: f, depth: faceDepths[i], normal: faceNormals[i], idx: i }))
    .sort((a, b) => a.depth - b.depth)

  for (const { face, normal } of sortedFaces) {
    const pts = face.map((i) => projected[i])
    if (pts.length < 3) continue

    const brightness = Math.max(0, dot(normal, lightDir))
    const shaded = 0.15 + brightness * 0.85 * (shadingIntensity || 1)
    const lightness = Math.round(20 + shaded * 45)
    const alpha = wireOpacity || 0.8

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y)
    }
    ctx.closePath()
    ctx.fillStyle = `hsla(${baseHue}, 70%, ${lightness}%, ${alpha * 0.3})`
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y)
    }
    ctx.closePath()
    ctx.strokeStyle = `hsla(${baseHue}, 80%, ${lightness + 20}%, ${alpha})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  for (const [a, b] of mesh.edges) {
    const pa = projected[a], pb = projected[b]
    if (!pa || !pb) continue
    const depthAvg = (pa.z + pb.z) / 2
    const fade = Math.max(0.2, 1 - (depthAvg + 3) / 8)

    ctx.beginPath()
    ctx.moveTo(pa.x, pa.y)
    ctx.lineTo(pb.x, pb.y)
    ctx.strokeStyle = `hsla(${baseHue}, 60%, 70%, ${(wireOpacity || 0.8) * fade})`
    ctx.lineWidth = 0.8
    ctx.stroke()
  }
}
