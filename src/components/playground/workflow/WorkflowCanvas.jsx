import { useState, useCallback, useRef } from 'react'
import { useCanvasSize } from '../hooks/useCanvasSize.js'
import { NodePalette } from './NodePalette.jsx'
import { WorkflowNode } from './WorkflowNode.jsx'
import { WorkflowConnection, TempConnection } from './WorkflowConnection.jsx'
import { FlowAnimation } from './FlowAnimation.jsx'
import { NodeConfigPanel } from './NodeConfigPanel.jsx'
import { getNodePortPosition } from './portUtils.js'
import { getNodeType } from './nodeTypes.js'
import { executeWorkflow } from './workflowEngine.js'

let nextId = 1

function createNode(typeId, x, y) {
  const type = getNodeType(typeId)
  return {
    id: `node-${nextId++}`,
    typeId,
    x,
    y,
    config: type?.defaultConfig ? { ...type.defaultConfig } : {},
  }
}

const DEFAULT_NODES = [
  {
    id: 'node-1', typeId: 'trigger', x: 40, y: 120,
    config: { inputText: 'Analyze the sentiment of this review: "This product is amazing and I love it!"' },
  },
  {
    id: 'node-2', typeId: 'llm-agent', x: 300, y: 80,
    config: { prompt: 'Analyze the following text for sentiment. Reply with POSITIVE, NEGATIVE, or NEUTRAL and explain why.\n\n{{input}}', temperature: 0.7 },
  },
  {
    id: 'node-3', typeId: 'conditional', x: 560, y: 100,
    config: { condition: '{{input}}.includes("POSITIVE")' },
  },
  {
    id: 'node-4', typeId: 'output', x: 820, y: 60,
    config: {},
  },
  {
    id: 'node-5', typeId: 'output', x: 820, y: 200,
    config: {},
  },
]

const DEFAULT_CONNECTIONS = [
  { from: 'node-1', to: 'node-2', fromPort: 0, toPort: 0 },
  { from: 'node-2', to: 'node-3', fromPort: 0, toPort: 0 },
  { from: 'node-3', to: 'node-4', fromPort: 0, toPort: 0 },
  { from: 'node-3', to: 'node-5', fromPort: 1, toPort: 0 },
]

nextId = 6

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState(DEFAULT_NODES)
  const [connections, setConnections] = useState(DEFAULT_CONNECTIONS)
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [connecting, setConnecting] = useState(null)
  const [execState, setExecState] = useState('idle')
  const [nodeExecStatus, setNodeExecStatus] = useState({})
  const [nodeResults, setNodeResults] = useState({})
  const [activeConnection, setActiveConnection] = useState(null)
  const [output, setOutput] = useState(null)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const { containerRef } = useCanvasSize()
  const svgRef = useRef(null)
  const abortRef = useRef(null)
  const panRef = useRef({ isPanning: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 })

  const handleCanvasPointerDown = useCallback((e) => {
    if (e.target.closest('.workflow-node')) return
    if (e.target.closest('.workflow-port')) return
    panRef.current = {
      isPanning: true,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: panOffset.x,
      startPanY: panOffset.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [panOffset.x, panOffset.y])

  const handleCanvasPointerMove = useCallback((e) => {
    const pan = panRef.current
    if (pan.isPanning) {
      setPanOffset({
        x: pan.startPanX + (e.clientX - pan.startX),
        y: pan.startPanY + (e.clientY - pan.startY),
      })
    }
    if (!connecting) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    setConnecting((prev) =>
      prev ? {
        ...prev,
        to: {
          x: e.clientX - rect.left - panOffset.x,
          y: e.clientY - rect.top - panOffset.y,
        },
      } : null,
    )
  }, [connecting, panOffset.x, panOffset.y])

  const handleCanvasPointerUp = useCallback((e) => {
    panRef.current.isPanning = false
    e.currentTarget.releasePointerCapture(e.pointerId)
    if (connecting) setConnecting(null)
  }, [connecting])

  const handleAddNode = useCallback((typeId) => {
    const x = 100 + Math.random() * 300 - panOffset.x
    const y = 80 + Math.random() * 200 - panOffset.y
    setNodes((prev) => [...prev, createNode(typeId, Math.max(0, x), Math.max(0, y))])
  }, [panOffset.x, panOffset.y])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const typeId = e.dataTransfer.getData('application/node-type')
    if (!typeId) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 100 - panOffset.x
    const y = e.clientY - rect.top - 45 - panOffset.y
    setNodes((prev) => [...prev, createNode(typeId, Math.max(0, x), Math.max(0, y))])
  }, [panOffset.x, panOffset.y])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleNodeDragMove = useCallback(({ nodeId, x, y }) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n,
      ),
    )
  }, [])

  const handlePortMouseDown = useCallback(({ nodeId, portType, portIndex, event }) => {
    if (portType !== 'output') return
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const pos = getNodePortPosition(node, 'output', portIndex || 0)
    setConnecting({
      fromNodeId: nodeId,
      fromPortIndex: portIndex || 0,
      from: pos,
      to: { x: event.clientX - rect.left - panOffset.x, y: event.clientY - rect.top - panOffset.y },
    })
  }, [nodes, panOffset.x, panOffset.y])

  const handlePortMouseUp = useCallback(
    ({ nodeId, portType, portIndex }) => {
      if (!connecting) return
      if (portType !== 'input') {
        setConnecting(null)
        return
      }
      if (nodeId === connecting.fromNodeId) {
        setConnecting(null)
        return
      }

      const exists = connections.some(
        (c) => c.from === connecting.fromNodeId && c.to === nodeId && c.fromPort === connecting.fromPortIndex,
      )

      if (!exists) {
        const toType = getNodeType(nodes.find((n) => n.id === nodeId)?.typeId)
        if (toType && toType.inputs > 0) {
          setConnections((prev) => [
            ...prev,
            { from: connecting.fromNodeId, to: nodeId, fromPort: connecting.fromPortIndex, toPort: portIndex || 0 },
          ])
        }
      }
      setConnecting(null)
    },
    [connecting, connections, nodes],
  )

  const handleDeleteSelected = useCallback(() => {
    if (!selectedNodeId) return
    setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId))
    setConnections((prev) =>
      prev.filter((c) => c.from !== selectedNodeId && c.to !== selectedNodeId),
    )
    setSelectedNodeId(null)
  }, [selectedNodeId])

  const handleConfigChange = useCallback((nodeId, config) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, config } : n)),
    )
  }, [])

  const handleRun = useCallback(async () => {
    if (execState === 'running') {
      abortRef.current?.abort()
      setExecState('idle')
      setNodeExecStatus({})
      setActiveConnection(null)
      return
    }

    setExecState('running')
    setNodeExecStatus({})
    setNodeResults({})
    setOutput(null)
    setActiveConnection(null)

    const abort = new AbortController()
    abortRef.current = abort

    try {
      const result = await executeWorkflow(nodes, connections, {
        signal: abort.signal,
        onNodeStart(nodeId) {
          setNodeExecStatus((prev) => ({ ...prev, [nodeId]: 'running' }))
          const conn = connections.find((c) => c.to === nodeId)
          if (conn) setActiveConnection(conn)
        },
        onNodeEnd(nodeId, result, error) {
          setNodeExecStatus((prev) => ({
            ...prev,
            [nodeId]: error ? 'error' : 'done',
          }))
          setNodeResults((prev) => ({ ...prev, [nodeId]: result }))
          setTimeout(() => setActiveConnection(null), 400)
        },
        onOutput(finalResult) {
          setOutput(finalResult)
        },
      })

      if (!result.success) {
        setExecState('error')
      } else {
        setExecState('done')
      }
    } catch (err) {
      if (err.message !== 'Execution cancelled') {
        setExecState('error')
        setOutput(`Error: ${err.message}`)
      } else {
        setExecState('idle')
      }
    }
  }, [execState, nodes, connections])

  const handleReset = useCallback(() => {
    setNodes(DEFAULT_NODES)
    setConnections(DEFAULT_CONNECTIONS)
    setSelectedNodeId(null)
    setExecState('idle')
    setNodeExecStatus({})
    setNodeResults({})
    setActiveConnection(null)
    setOutput(null)
    setPanOffset({ x: 0, y: 0 })
    nextId = 6
  }, [])

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full flex-shrink-0 lg:w-56">
          <NodePalette onAddNode={handleAddNode} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Workflow canvas
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRun}
                className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                  execState === 'running'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-blue-400 hover:from-blue-500/30 hover:to-violet-500/30'
                }`}
              >
                <i className={`fas ${execState === 'running' ? 'fa-stop' : 'fa-play'}`} aria-hidden />
                {execState === 'running' ? 'Stop' : 'Run'}
              </button>
              {selectedNodeId && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                >
                  <i className="fas fa-trash-can mr-1.5" aria-hidden />
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => setPanOffset({ x: 0, y: 0 })}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
                title="Reset view"
              >
                <i className="fas fa-crosshairs mr-1.5" aria-hidden />
                Fit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
              >
                <i className="fas fa-rotate-left mr-1.5" aria-hidden />
                Reset
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="workflow-canvas-area relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60 cursor-grab active:cursor-grabbing"
            style={{ height: 'clamp(320px, 50vh, 520px)', touchAction: 'none' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onPointerDown={handleCanvasPointerDown}
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={handleCanvasPointerUp}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
            >
              <svg
                ref={svgRef}
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="0.5" fill="rgba(255,255,255,0.04)" />
                  </pattern>
                  <filter id="flowGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {connections.map((conn, i) => (
                  <WorkflowConnection
                    key={i}
                    connection={conn}
                    nodes={nodes}
                    isActive={activeConnection === conn}
                  />
                ))}

                {connecting && <TempConnection from={connecting.from} to={connecting.to} />}

                {activeConnection && execState === 'running' && (
                  <FlowAnimation
                    connection={activeConnection}
                    nodes={nodes}
                    isRunning
                  />
                )}
              </svg>

              <div className="absolute inset-0">
                {nodes.map((node) => (
                  <WorkflowNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNodeId === node.id}
                    execStatus={nodeExecStatus[node.id]}
                    execResult={nodeResults[node.id]}
                    onDragMove={handleNodeDragMove}
                    onPortMouseDown={handlePortMouseDown}
                    onPortMouseUp={handlePortMouseUp}
                    onSelect={setSelectedNodeId}
                  />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1.5 font-mono text-xs text-slate-400 backdrop-blur-sm">
              {nodes.length} nodes · {connections.length} connections
              {execState === 'running' && ' · ⚡ running...'}
            </div>

            {(panOffset.x !== 0 || panOffset.y !== 0) && (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-black/40 px-2 py-1 font-mono text-[10px] text-slate-500 backdrop-blur-sm">
                {Math.round(panOffset.x)}, {Math.round(panOffset.y)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {selectedNode && (
          <div className="rounded-2xl glass-card p-5 lg:w-80">
            <NodeConfigPanel
              node={selectedNode}
              onConfigChange={handleConfigChange}
            />
          </div>
        )}

        {(output !== null || execState === 'error') && (
          <div className="min-w-0 flex-1 rounded-2xl glass-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`fas ${execState === 'error' ? 'fa-circle-exclamation text-red-400' : 'fa-circle-check text-emerald-400'}`} aria-hidden />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {execState === 'error' ? 'Error' : 'Output'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOutput(null)}
                className="text-slate-500 transition-colors hover:text-slate-300"
              >
                <i className="fas fa-xmark" aria-hidden />
              </button>
            </div>
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-slate-200">
              {typeof output === 'string' ? output : JSON.stringify(output, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
