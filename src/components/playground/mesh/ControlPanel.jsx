export function ControlPanel({ params, onChange }) {
  function update(key, value) {
    onChange({ ...params, [key]: value })
  }

  return (
    <div className="mesh-control-panel grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Slider
        label="Rotation X"
        icon="fa-arrows-spin"
        value={params.rx}
        min={-6.28}
        max={6.28}
        step={0.01}
        onChange={(v) => update('rx', v)}
        format={radFormat}
      />
      <Slider
        label="Rotation Y"
        icon="fa-arrows-spin"
        value={params.ry}
        min={-6.28}
        max={6.28}
        step={0.01}
        onChange={(v) => update('ry', v)}
        format={radFormat}
      />
      <Slider
        label="Rotation Z"
        icon="fa-arrows-spin"
        value={params.rz}
        min={-6.28}
        max={6.28}
        step={0.01}
        onChange={(v) => update('rz', v)}
        format={radFormat}
      />
      <Slider
        label="Scale"
        icon="fa-up-right-and-down-left-from-center"
        value={params.scale}
        min={0.3}
        max={3}
        step={0.05}
        onChange={(v) => update('scale', v)}
        format={(v) => `${v.toFixed(1)}×`}
      />
      <Slider
        label="Color Hue"
        icon="fa-palette"
        value={params.hue}
        min={0}
        max={360}
        step={1}
        onChange={(v) => update('hue', v)}
        format={(v) => `${Math.round(v)}°`}
        style={{
          accentColor: `hsl(${params.hue}, 70%, 60%)`,
        }}
      />
      <Slider
        label="Shading"
        icon="fa-sun"
        value={params.shading}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => update('shading', v)}
        format={(v) => `${Math.round(v * 100)}%`}
      />
      <Slider
        label="Wireframe"
        icon="fa-vector-square"
        value={params.wireOpacity}
        min={0.1}
        max={1}
        step={0.01}
        onChange={(v) => update('wireOpacity', v)}
        format={(v) => `${Math.round(v * 100)}%`}
      />

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <i className="fas fa-shapes w-4 text-center" aria-hidden />
          Geometry
        </label>
        <div className="flex gap-2">
          {['cube', 'sphere', 'torus'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update('geometry', g)}
              className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold capitalize transition-all ${
                params.geometry === g
                  ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-end">
        <button
          type="button"
          onClick={() =>
            onChange({
              rx: 0,
              ry: 0,
              rz: 0,
              scale: 1.2,
              hue: 210,
              shading: 0.7,
              wireOpacity: 0.8,
              geometry: 'sphere',
            })
          }
          className="rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
        >
          <i className="fas fa-rotate-left mr-2" aria-hidden />
          Reset
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

function radFormat(v) {
  return `${v.toFixed(2)} rad`
}
