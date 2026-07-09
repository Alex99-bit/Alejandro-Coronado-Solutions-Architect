import { useState, useCallback } from 'react'
import { MeshCanvas } from './MeshCanvas.jsx'
import { ControlPanel } from './ControlPanel.jsx'

const DEFAULT_PARAMS = {
  rx: 0.4,
  ry: 0.6,
  rz: 0,
  scale: 1.2,
  hue: 210,
  shading: 0.7,
  wireOpacity: 0.8,
  geometry: 'sphere',
}

export function MeshView() {
  const [params, setParams] = useState(DEFAULT_PARAMS)

  const handleRotate = useCallback((dt) => {
    setParams((prev) => ({
      ...prev,
      rx: prev.rx + 0.003 * (dt / 16),
      ry: prev.ry + 0.005 * (dt / 16),
    }))
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <MeshCanvas params={params} onFrame={handleRotate} />
      <ControlPanel params={params} onChange={setParams} />
    </div>
  )
}
