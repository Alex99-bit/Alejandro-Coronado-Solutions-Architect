import { getNodeType, getNodeColors } from './nodeTypes.js'

export function WorkflowConnection({ connection, nodes, isActive }) {
  const fromNode = nodes.find((n) => n.id === connection.from)
  const toNode = nodes.find((n) => n.id === connection.to)
  if (!fromNode || !toNode) return null

  const fromType = getNodeType(fromNode.typeId)
  const colors = getNodeColors(fromType.color)

  const NODE_W = 200
  const NODE_H = 90

  const fromX = fromNode.x + NODE_W
  const fromY = fromNode.y + NODE_H / 2
  const toX = toNode.x
  const toY = toNode.y + NODE_H / 2

  const dx = Math.abs(toX - fromX)
  const cp = Math.max(60, dx * 0.4)

  const d = `M ${fromX} ${fromY} C ${fromX + cp} ${fromY}, ${toX - cp} ${toY}, ${toX} ${toY}`

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={isActive ? 12 : 8}
        strokeLinecap="round"
      />
      {isActive && (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          className={colors.text}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.15"
        />
      )}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        className={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isActive ? 1 : 0.6}
      />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        className={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isActive ? 0.8 : 0.4}
        strokeDasharray="8 12"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-40"
          dur={isActive ? '0.5s' : '1.5s'}
          repeatCount="indefinite"
        />
      </path>
    </g>
  )
}

export function TempConnection({ from, to }) {
  if (!from || !to) return null

  const dx = Math.abs(to.x - from.x)
  const cp = Math.max(60, dx * 0.4)

  const d = `M ${from.x} ${from.y} C ${from.x + cp} ${from.y}, ${to.x - cp} ${to.y}, ${to.x} ${to.y}`

  return (
    <path
      d={d}
      fill="none"
      stroke="rgba(96,165,250,0.6)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 6"
      className="pointer-events-none"
    />
  )
}
