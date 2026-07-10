export function StatsSection() {
  return (
    <section className="border-y border-white/5 py-24" id="highlights">
      <div className="container mx-auto px-6">
        <h2 className="sr-only">Technical SEO highlights for Alejandro Coronado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
          <StatCard
            label="Engineering"
            headline="AI Agents"
            subtitle="Enterprise automation"
            aosDelay={100}
          />
          <StatCard
            label="Backend"
            headline="Java/.NET"
            subtitle="Corporate stack"
            aosDelay={200}
          />
          <StatCard
            label="XR"
            headline="Unity/C#"
            subtitle="Simulation systems"
            aosDelay={300}
          />
          <StatCard
            label="Awards"
            headline="3x"
            subtitle="Competitive recognition"
            aosDelay={400}
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, headline, subtitle, aosDelay }) {
  return (
    <div className="text-center min-w-0" data-aos="fade-up" data-aos-delay={aosDelay}>
      <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
        {label}
      </p>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight whitespace-normal break-words">
        {headline}
      </h3>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  )
}
