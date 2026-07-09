import { getNodeType, getNodeColors } from './nodeTypes.js'

export function NodeConfigPanel({ node, onConfigChange }) {
  if (!node) return null

  const type = getNodeType(node.typeId)
  if (!type || !type.configFields || type.configFields.length === 0) {
    return (
      <div className="rounded-xl bg-white/5 p-4">
        <p className="text-xs text-slate-500">No configuration available for this node type.</p>
      </div>
    )
  }

  const colors = getNodeColors(type.color)
  const config = { ...type.defaultConfig, ...node.config }

  function handleChange(key, value) {
    onConfigChange(node.id, { ...config, [key]: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className={`flex h-6 w-6 items-center justify-center rounded-md ${colors.text}`}>
          <i className={`fas ${type.icon} text-xs`} aria-hidden />
        </div>
        <span className={`text-sm font-bold ${colors.text}`}>{type.label}</span>
        <span className="text-xs text-slate-500">configuration</span>
      </div>

      {type.configFields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {field.label}
          </label>

          {field.type === 'textarea' && (
            <textarea
              value={config[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors focus:border-blue-500/40"
            />
          )}

          {field.type === 'text' && (
            <input
              type="text"
              value={config[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors focus:border-blue-500/40"
            />
          )}

          {field.type === 'range' && (
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={field.min ?? 0}
                max={field.max ?? 1}
                step={field.step ?? 0.1}
                value={config[field.key] ?? 0}
                onChange={(e) => handleChange(field.key, parseFloat(e.target.value))}
                className="mesh-slider flex-1 cursor-pointer accent-blue-500"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-300">
                {(config[field.key] ?? 0).toFixed(1)}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
