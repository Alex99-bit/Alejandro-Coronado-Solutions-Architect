export function FlowAnimation({ connection, nodes, isRunning }) {
  if (!connection || !isRunning) return null

  const fromNode = nodes.find((n) => n.id === connection.from)
  const toNode = nodes.find((n) => n.id === connection.to)
  if (!fromNode || !toNode) return null

  const NODE_W = 200
  const NODE_H = 90

  const fromX = fromNode.x + NODE_W
  const fromY = fromNode.y + NODE_H / 2
  const toX = toNode.x
  const toY = toNode.y + NODE_H / 2

  const dx = Math.abs(toX - fromX)
  const cp = Math.max(60, dx * 0.4)

  const path = `M ${fromX} ${fromY} C ${fromX + cp} ${fromY}, ${toX - cp} ${toY}, ${toX} ${toY}`

  return (
    <g className="pointer-events-none">
      <circle r="6" fill="rgba(96,165,250,0.9)">
        <animateMotion
          dur="0.7s"
          repeatCount="1"
          fill="freeze"
          path={path}
        />
      </circle>
      <circle r="12" fill="rgba(96,165,250,0.3)" filter="url(#flowGlow)">
        <animateMotion
          dur="0.7s"
          repeatCount="1"
          fill="freeze"
          path={path}
        />
      </circle>
    </g>
  )
}
