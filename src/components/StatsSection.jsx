export function StatsSection() {
  return (
    <section className="border-y border-white/5 py-24" id="historia">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <StatCard
            label="Experiencia"
            headline={<>10<span className="text-blue-500">+</span></>}
            subtitle="Años Programando"
            aosDelay={100}
          />
          <StatCard
            label="Negocios"
            headline="SaaS"
            subtitle="Fundador Serial"
            aosDelay={200}
          />
          <StatCard
            label="Comunidad"
            headline="50K"
            subtitle="En Youtube"
            aosDelay={300}
          />
          <StatCard
            label="Alcance"
            headline="Glob"
            subtitle="Impacto Digital"
            aosDelay={400}
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, headline, subtitle, aosDelay }) {
  return (
    <div className="text-center" data-aos="fade-up" data-aos-delay={aosDelay}>
      <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
        {label}
      </p>
      <h2 className="text-5xl font-black text-white">{headline}</h2>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  )
}
