const TABS = [
  { id: 'workflow', label: 'AI Workflow Designer', icon: 'fa-diagram-project' },
  { id: 'mesh', label: '3D Mesh Renderer', icon: 'fa-cube' },
  { id: 'particles', label: 'Particle System', icon: 'fa-wand-magic-sparkles' },
]

export function PlaygroundTabs({ active, onChange }) {
  return (
    <div className="playground-tabs mb-8 flex flex-wrap gap-1 rounded-2xl bg-white/5 p-1.5" role="tablist" aria-label="Playground mode">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-2.5 rounded-xl px-4 sm:px-5 py-3 text-sm font-semibold transition-all ${
            active === tab.id
              ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white shadow-lg shadow-blue-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <i className={`fas ${tab.icon}`} aria-hidden />
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.id === 'workflow' ? 'Workflow' : tab.id === 'mesh' ? '3D' : 'Particles'}</span>
        </button>
      ))}
    </div>
  )
}
