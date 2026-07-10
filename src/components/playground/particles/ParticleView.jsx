import { useState, useCallback, useRef } from 'react'
import { ParticleCanvas } from './ParticleCanvas.jsx'
import { ParticleControls } from './ParticleControls.jsx'
import { PRESETS } from './particleEngine.js'

export function ParticleView() {
  const [preset, setPreset] = useState('fountain')
  const [config, setConfig] = useState({ ...PRESETS.fountain })
  const burstRef = useRef(null)
  const clearRef = useRef(null)

  const handlePresetChange = useCallback((key) => {
    setPreset(key)
    setConfig({ ...PRESETS[key] })
  }, [])

  const handleBurst = useCallback(() => {
    burstRef.current?.()
  }, [])

  const handleClear = useCallback(() => {
    clearRef.current?.()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <ParticleCanvas config={config} preset={preset} onBurstRef={burstRef} onClearRef={clearRef} />
      <ParticleControls
        config={config}
        preset={preset}
        onChange={setConfig}
        onPresetChange={handlePresetChange}
        onBurst={handleBurst}
        onClear={handleClear}
      />
    </div>
  )
}
