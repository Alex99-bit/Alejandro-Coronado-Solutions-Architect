import { useState, Suspense, lazy, useCallback } from 'react'
import { PlaygroundTabs } from './PlaygroundTabs.jsx'

const WorkflowCanvas = lazy(() =>
  import('./workflow/WorkflowCanvas.jsx').then((m) => ({ default: m.WorkflowCanvas })),
)

const MeshView = lazy(() => import('./mesh/MeshView.jsx').then((m) => ({ default: m.MeshView })))

const ParticleView = lazy(() =>
  import('./particles/ParticleView.jsx').then((m) => ({ default: m.ParticleView })),
)

const TAB_FALLBACK = (
  <div className="flex h-80 items-center justify-center">
    <div className="flex items-center gap-3 text-slate-500">
      <i className="fas fa-spinner fa-spin" aria-hidden />
      <span className="text-sm font-medium">Loading playground...</span>
    </div>
  </div>
)

export function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState('workflow')

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  return (
    <section className="py-32" id="playground">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-3xl" data-aos="fade-right">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Interactive <span className="gradient-text">Playground</span>
          </h2>
          <p className="text-xl leading-relaxed text-slate-400">
            Hands-on demonstrations of visual logic, vector math, and real-time rendering — 
            built from scratch with zero heavy dependencies. Drag nodes to design AI workflows 
            or manipulate 3D geometry with live parameter controls.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <PlaygroundTabs active={activeTab} onChange={handleTabChange} />

          <div className="rounded-[2rem] glass-card p-6 sm:p-8">
            <Suspense fallback={TAB_FALLBACK}>
              {activeTab === 'workflow' && <WorkflowCanvas />}
              {activeTab === 'mesh' && <MeshView />}
              {activeTab === 'particles' && <ParticleView />}
            </Suspense>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
          <PlaygroundTag>SVG Rendering</PlaygroundTag>
          <PlaygroundTag>Canvas 2D</PlaygroundTag>
          <PlaygroundTag>Pointer Events</PlaygroundTag>
          <PlaygroundTag>requestAnimationFrame</PlaygroundTag>
          <PlaygroundTag>3D Projection</PlaygroundTag>
          <PlaygroundTag>Wireframe Shading</PlaygroundTag>
          <PlaygroundTag>Drag & Drop</PlaygroundTag>
          <PlaygroundTag>Particle Physics</PlaygroundTag>
          <PlaygroundTag>Additive Blending</PlaygroundTag>
          <PlaygroundTag>Object Pooling</PlaygroundTag>
          <PlaygroundTag>Zero Dependencies</PlaygroundTag>
        </div>
      </div>
    </section>
  )
}

function PlaygroundTag({ children }) {
  return (
    <span className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">
      {children}
    </span>
  )
}
