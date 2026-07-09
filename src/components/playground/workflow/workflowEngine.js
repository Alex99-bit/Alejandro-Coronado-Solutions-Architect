const NODE_W = 200
const NODE_H = 90

function interpolateTemplate(template, input) {
  if (typeof template !== 'string') return template
  return template.replace(/\{\{input\}\}/g, typeof input === 'string' ? input : JSON.stringify(input, null, 2))
}

function evalCondition(condition, input) {
  try {
    const expr = interpolateTemplate(condition, input)
    const fn = new Function('input', `"use strict"; try { return !!(${expr}); } catch { return false; }`)
    const inputStr = typeof input === 'string' ? input : JSON.stringify(input)
    return fn(inputStr)
  } catch {
    return false
  }
}

function evalExpression(expression, input) {
  try {
    return interpolateTemplate(expression, input)
  } catch {
    return expression
  }
}

async function callGemini(prompt) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content || '(no response)'
}

async function executeNode(node, input) {
  const config = node.config || {}
  const cfg = { ...node.defaultConfig, ...config }

  switch (node.typeId) {
    case 'trigger':
      return cfg.inputText || input || ''

    case 'llm-agent': {
      const prompt = interpolateTemplate(cfg.prompt || '', input)
      return await callGemini(prompt)
    }

    case 'data-loader': {
      try {
        return JSON.parse(cfg.jsonData || '{}')
      } catch {
        return cfg.jsonData || ''
      }
    }

    case 'filter': {
      const passes = evalCondition(cfg.condition || 'true', input)
      return passes ? input : null
    }

    case 'transform':
      return evalExpression(cfg.expression || '{{input}}', input)

    case 'conditional': {
      const result = evalCondition(cfg.condition || 'true', input)
      return { __branch: result ? 'true' : 'false', data: input }
    }

    case 'webhook':
      if (cfg.url) {
        try {
          await fetch(cfg.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
          })
        } catch (e) {
          console.warn('Webhook failed:', e.message)
        }
      }
      return input

    case 'output':
      return input

    default:
      return input
  }
}

export function topologicalSort(nodes, connections) {
  const inDegree = new Map()
  const adj = new Map()

  for (const n of nodes) {
    inDegree.set(n.id, 0)
    adj.set(n.id, [])
  }

  for (const c of connections) {
    inDegree.set(c.to, (inDegree.get(c.to) || 0) + 1)
    adj.get(c.from)?.push(c.to)
  }

  const queue = []
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id)
  }

  const sorted = []
  while (queue.length > 0) {
    const id = queue.shift()
    sorted.push(id)
    for (const neighbor of adj.get(id) || []) {
      const newDeg = inDegree.get(neighbor) - 1
      inDegree.set(neighbor, newDeg)
      if (newDeg === 0) queue.push(neighbor)
    }
  }

  return sorted
}

export async function executeWorkflow(nodes, connections, { onNodeStart, onNodeEnd, onOutput, signal }) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const sorted = topologicalSort(nodes, connections)
  const results = new Map()
  const errors = new Map()

  const connByTo = new Map()
  for (const c of connections) {
    connByTo.set(c.to, c)
  }

  for (const nodeId of sorted) {
    if (signal?.aborted) {
      throw new Error('Execution cancelled')
    }

    const node = nodeMap.get(nodeId)
    if (!node) continue

    const incomingConn = connByTo.get(nodeId)
    let input = undefined

    if (incomingConn) {
      const parentResult = results.get(incomingConn.from)

      if (parentResult === null || parentResult === undefined) {
        results.set(nodeId, null)
        onNodeEnd?.(nodeId, null, null)
        continue
      }

      if (parentResult && typeof parentResult === 'object' && '__branch' in parentResult) {
        if (node.typeId !== 'output' && node.typeId !== 'webhook') {
          const myPortIndex = incomingConn.fromPort
          const branchResult = parentResult.__branch === 'true' ? 'true' : 'false'
          const expectedPort = branchResult === 'true' ? 0 : 1
          if (myPortIndex !== expectedPort) {
            results.set(nodeId, null)
            onNodeEnd?.(nodeId, null, null)
            continue
          }
        }
        input = parentResult.data
      } else {
        input = parentResult
      }
    }

    onNodeStart?.(nodeId, node)

    try {
      const result = await executeNode(node, input)
      results.set(nodeId, result)
      onNodeEnd?.(nodeId, result, null)

      if (node.typeId === 'output' && result !== null) {
        onOutput?.(result, nodeId)
      }
    } catch (err) {
      errors.set(nodeId, err)
      results.set(nodeId, null)
      onNodeEnd?.(nodeId, null, err)
    }

    if (signal?.aborted) {
      throw new Error('Execution cancelled')
    }

    await new Promise((resolve) => setTimeout(resolve, 600))
  }

  return { success: errors.size === 0, results, errors }
}

export function getNodePortPosition(node, portType, portIndex) {
  if (portType === 'input') {
    return { x: node.x, y: node.y + NODE_H / 2 }
  }

  const type = node.typeId ? node : null
  const outputs = type?.outputs ?? 1
  if (outputs === 1) {
    return { x: node.x + NODE_W, y: node.y + NODE_H / 2 }
  }

  const yPercent = 30 + (portIndex || 0) * 25
  return {
    x: node.x + NODE_W,
    y: node.y + (NODE_H * yPercent) / 100,
  }
}
