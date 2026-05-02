export function Toast({ visible }) {
  return (
    <div
      className={`fixed right-10 bottom-10 z-[200] transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 pointer-events-none opacity-0'
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-green-500/50 bg-green-500/10 px-8 py-4 glass-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
          <i className="fas fa-check" aria-hidden />
        </div>
        <div>
          <p className="font-bold">¡Mensaje Recibido!</p>
          <p className="text-xs text-slate-400">Me pondré en contacto muy pronto.</p>
        </div>
      </div>
    </div>
  )
}
