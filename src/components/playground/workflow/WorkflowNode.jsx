import { useRef, useCallback } from 'react'
import { getNodeType, getNodeColors } from './nodeTypes.js'

export function WorkflowNode({
  node,
  isSelected,
  execStatus,
  execResult,
  onDragStart,
  onDragMove,
  onDragEnd,
  onPortMouseDown,
  onPortMouseUp,
  onSelect,
}) {
  const type = getNodeType(node.typeId)
  const colors = getNodeColors(type.color)
  const nodeRef = useRef(null)

  const config = { ...type.defaultConfig, ...node.config }
  const previewField = type.configFields?.[0]
  const previewValue = previewField ? config[previewField.key] : null
  const previewText = typeof previewValue === 'string'
    ? previewValue.split('\n')[0].slice(0, 40) + (previewValue.length > 40 ? '...' : '')
    : null

  const statusBorder = execStatus === 'running'
    ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-500/40 animate-pulse'
    : execStatus === 'error'
      ? 'ring-2 ring-red-400 shadow-lg shadow-red-500/30'
      : execStatus === 'done'
        ? 'ring-1 ring-emerald-400/40'
        : ''

  const handlePointerDown = useCallback(
    (e) => {
      if (e.target.closest('.workflow-port')) return
      if (e.target.closest('.workflow-config-area')) return
      e.stopPropagation()
      onSelect?.(node.id)

      const el = nodeRef.current
      if (!el) return
      el.setPointerCapture(e.pointerId)

      const startX = e.clientX - node.x
      const startY = e.clientY - node.y

      onDragStart?.({ nodeId: node.id })

      const handleMove = (ev) => {
        const nx = ev.clientX - startX
        const ny = ev.clientY - startY
        onDragMove?.({ nodeId: node.id, x: nx, y: ny })
      }

      const handleUp = () => {
        el.releasePointerCapture(e.pointerId)
        onDragEnd?.({ nodeId: node.id })
        el.removeEventListener('pointermove', handleMove)
        el.removeEventListener('pointerup', handleUp)
      }

      el.addEventListener('pointermove', handleMove)
      el.addEventListener('pointerup', handleUp)
    },
    [node.id, node.x, node.y, onDragStart, onDragMove, onDragEnd, onSelect],
  )

  const portBase =
    'workflow-port absolute h-3.5 w-3.5 rounded-full border-2 border-slate-950 cursor-crosshair transition-transform hover:scale-150 z-10'

  const resultPreview = execResult !== undefined && execResult !== null
    ? typeof execResult === 'string'
      ? execResult.slice(0, 50) + (execResult.length > 50 ? '...' : '')
      : JSON.stringify(execResult).slice(0, 50)
    : null

  return (
    <div
      ref={nodeRef}
      className={`workflow-node absolute select-none rounded-2xl border bg-slate-950/90 backdrop-blur-sm transition-all ${
        isSelected && !statusBorder
          ? `ring-2 ${colors.ring} shadow-lg ${colors.glow}`
          : !statusBorder
            ? 'border-white/10 hover:border-white/20'
            : ''
      } ${statusBorder}`}
      style={{
        transform: `translate(${node.x}px, ${node.y}px)`,
        width: 200,
        touchAction: 'none',
        zIndex: isSelected ? 20 : 10,
      }}
      onPointerDown={handlePointerDown}
    >
      <div className={`flex items-center gap-2.5 rounded-t-2xl px-4 py-3 ${colors.bg}`}>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors.text}`}>
          <i className={`fas ${type.icon} text-sm`} aria-hidden />
        </div>
        <span className={`text-sm font-bold ${colors.text}`}>{type.label}</span>
        {execStatus === 'running' && (
          <i className="fas fa-spinner fa-spin ml-auto text-xs text-blue-400" aria-hidden />
        )}
        {execStatus === 'done' && (
          <i className="fas fa-check ml-auto text-xs text-emerald-400" aria-hidden />
        )}
        {execStatus === 'error' && (
          <i className="fas fa-xmark ml-auto text-xs text-red-400" aria-hidden />
        )}
      </div>

      <div className="px-4 py-2">
        <p className="text-xs leading-relaxed text-slate-400">{type.description}</p>
        {previewText && (
          <p className="mt-1 truncate font-mono text-[10px] text-slate-600">{previewText}</p>
        )}
      </div>

      {resultPreview && (
        <div className="workflow-config-area mx-3 mb-2.5 rounded-lg bg-emerald-500/5 px-2.5 py-1.5">
          <p className="truncate font-mono text-[10px] text-emerald-400/70">{resultPreview}</p>
        </div>
      )}

      {type.inputs > 0 && (
        <div
          className={`${portBase} ${colors.port} left-[-7px] top-1/2 -translate-y-1/2`}
          data-port="input"
          data-node-id={node.id}
          onPointerDown={(e) => {
            e.stopPropagation()
            onPortMouseDown?.({ nodeId: node.id, portType: 'input', event: e })
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            onPortMouseUp?.({ nodeId: node.id, portType: 'input', event: e })
          }}
        />
      )}

      {type.outputs > 0 &&
        Array.from({ length: type.outputs }).map((_, i) => {
          const label =
            type.outputs === 2 ? (i === 0 ? 'T' : 'F') : null
          return (
            <div key={i} className="absolute right-[-7px]" style={{ top: type.outputs === 1 ? '50%' : `${30 + i * 25}%`, transform: 'translateY(-50%)' }}>
              <div
                className={`${portBase} ${colors.port}`}
                data-port="output"
                data-port-index={i}
                data-node-id={node.id}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  onPortMouseDown?.({ nodeId: node.id, portType: 'output', portIndex: i, event: e })
                }}
                onPointerUp={(e) => {
                  e.stopPropagation()
                  onPortMouseUp?.({ nodeId: node.id, portType: 'output', portIndex: i, event: e })
                }}
              />
              {label && (
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500">
                  {label}
                </span>
              )}
            </div>
          )
        })}
    </div>
  )
}
