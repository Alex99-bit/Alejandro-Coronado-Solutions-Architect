export function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden>
      <div className="blob" style={{ top: '-10%', left: '-10%' }} />
      <div
        className="blob"
        style={{ bottom: '10%', right: '-5%', animationDelay: '-5s' }}
      />
    </div>
  )
}
