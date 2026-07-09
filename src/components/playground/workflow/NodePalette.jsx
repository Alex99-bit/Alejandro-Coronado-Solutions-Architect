import { NODE_TYPES, getNodeColors } from './nodeTypes.js'

export function NodePalette({ onAddNode }) {
  return (
    <div className="node-palette flex flex-col gap-2">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
        Drag to canvas
      </p>
      {NODE_TYPES.map((type) => {
        const colors = getNodeColors(type.color)
        return (
          <button
            key={type.id}
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/node-type', type.id)
              e.dataTransfer.effectAllowed = 'copy'
            }}
            onClick={() => onAddNode(type.id)}
            className={`workflow-palette-item group flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${colors.bg} hover:ring-1 ${colors.ring} hover:shadow-lg ${colors.glow}`}
          >
            <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${colors.text}`}>
              <i className={`fas ${type.icon}`} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-bold ${colors.text}`}>{type.label}</p>
              <p className="truncate text-xs text-slate-500">{type.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
