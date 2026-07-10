import { getNodeType } from './nodeTypes.js'

const NODE_W = 200
const NODE_H = 90

export function getNodePortPosition(node, portType, portIndex) {
  if (portType === 'input') {
    return { x: node.x, y: node.y + NODE_H / 2 }
  }

  const type = getNodeType(node.typeId)
  if (type.outputs === 1) {
    return { x: node.x + NODE_W, y: node.y + NODE_H / 2 }
  }

  const yPercent = 30 + (portIndex || 0) * 25
  return {
    x: node.x + NODE_W,
    y: node.y + (NODE_H * yPercent) / 100,
  }
}
