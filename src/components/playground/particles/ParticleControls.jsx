import { PRESETS } from './particleEngine.js'

const PRESET_KEYS = Object.keys(PRESETS)

export function ParticleControls({ config, preset, onChange, onPresetChange, onBurst, onClear }) {
  function update(key, value) {
    onChange({ ...config, [key]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <i className="fas fa-wand-magic-sparkles w-4 text-center" aria-hidden />
          Preset
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onPresetChange(key)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
                preset === key
                  ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {PRESETS[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Slider
          label="Gravity"
          icon="fa-arrow-down"
          value={config.gravity}
          min={-2}
          max={2}
          step={0.01}
          onChange={(v) => update('gravity', v)}
          format={(v) => v.toFixed(2)}
        />
        <Slider
          label="Wind"
          icon="fa-wind"
          value={config.windX}
          min={-1}
          max={1}
          step={0.01}
          onChange={(v) => update('windX', v)}
          format={(v) => v.toFixed(2)}
        />
        <Slider
          label="Spawn Rate"
          icon="fa-gauge-high"
          value={config.spawnRate}
          min={0}
          max={12}
          step={1}
          onChange={(v) => update('spawnRate', v)}
          format={(v) => `${v}/f`}
        />
        <Slider
          label="Particle Life"
          icon="fa-hourglass-half"
          value={config.particleLife}
          min={20}
          max={250}
          step={5}
          onChange={(v) => update('particleLife', v)}
          format={(v) => `${v}f`}
        />
        <Slider
          label="Size"
          icon="fa-circle"
          value={config.size}
          min={0.5}
          max={8}
          step={0.1}
          onChange={(v) => update('size', v)}
          format={(v) => `${v.toFixed(1)}px`}
        />
        <Slider
          label="Color Hue"
          icon="fa-palette"
          value={config.hue}
          min={0}
          max={360}
          step={1}
          onChange={(v) => update('hue', v)}
          format={(v) => `${Math.round(v)}°`}
          style={{ accentColor: `hsl(${config.hue}, 70%, 60%)` }}
        />
        <Slider
          label="Speed"
          icon="fa-bolt"
          value={config.speed}
          min={0.5}
          max={15}
          step={0.1}
          onChange={(v) => update('speed', v)}
          format={(v) => v.toFixed(1)}
        />
        <Slider
          label="Spread"
          icon="fa-expand"
          value={config.spread}
          min={0.1}
          max={Math.PI * 2}
          step={0.05}
          onChange={(v) => update('spread', v)}
          format={(v) => `${((v / Math.PI) * 180).toFixed(0)}°`}
        />
        <Slider
          label="Turbulence"
          icon="fa-tornado"
          value={config.turbulence}
          min={0}
          max={0.2}
          step={0.005}
          onChange={(v) => update('turbulence', v)}
          format={(v) => v.toFixed(3)}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBurst}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 px-5 py-2.5 text-sm font-bold text-white transition-all hover:from-blue-500/30 hover:to-violet-500/30 active:scale-95"
        >
          <i className="fas fa-burst" aria-hidden />
          Burst (200)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...PRESETS[preset] })}
          className="rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
        >
          <i className="fas fa-rotate-left mr-2" aria-hidden />
          Reset
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
        >
          <i className="fas fa-trash-can mr-2" aria-hidden />
          Clear
        </button>
      </div>
    </div>
  )
}

function Slider({ label, icon, value, min, max, step, onChange, format, style }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
        <span className="flex items-center gap-2">
          <i className={`fas ${icon} w-4 text-center`} aria-hidden />
          {label}
        </span>
        <span className="font-mono text-slate-300">
          {format ? format(value) : value.toFixed(2)}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mesh-slider w-full cursor-pointer accent-blue-500"
        style={style}
      />
    </div>
  )
}
