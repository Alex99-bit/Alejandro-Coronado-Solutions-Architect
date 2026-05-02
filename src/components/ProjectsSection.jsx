export function ProjectsSection() {
  return (
    <section className="py-32" id="proyectos">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl" data-aos="fade-right">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-xl leading-relaxed text-slate-400">
            Donde la tecnología se encuentra con la viabilidad comercial.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <article className="group rounded-[2.5rem] glass-card lg:col-span-8" data-aos="fade-up">
            <div className="relative h-96 overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[2.5rem]">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200"
                alt="TravelAgency Connect"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute right-8 bottom-8 left-8">
                <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-widest uppercase">
                  Caso de Éxito
                </span>
                <h3 className="mb-2 text-4xl font-bold text-white">
                  TravelAgency Connect
                </h3>
                <p className="max-w-xl text-slate-300">
                  La infraestructura B2B que está digitalizando las agencias de viaje en Latinoamérica.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-b-[2.5rem] p-8">
              <div className="flex gap-4">
                <Tag>Next.js</Tag>
                <Tag>Go</Tag>
                <Tag>Kubernetes</Tag>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 font-bold text-blue-400 group/btn hover:text-blue-300"
              >
                Ver Estudio de Caso{' '}
                <i className="fas fa-arrow-right transition-transform group-hover/btn:translate-x-2" aria-hidden />
              </a>
            </div>
          </article>

          <div className="flex flex-col gap-8 lg:col-span-4">
            <SideCard
              icon="fa-layer-group"
              iconWrap="bg-blue-500/20 text-blue-500"
              title="Arquitectura"
              body="Diseño de sistemas preparados para soportar millones de peticiones diarias."
              aosDelay={100}
            />
            <SideCard
              icon="fa-rocket"
              iconWrap="bg-purple-500/20 text-purple-500"
              title="Lanzamientos"
              body="Estrategias de despliegue y validación de mercado para nuevos productos."
              aosDelay={200}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs">{children}</span>
  )
}

function SideCard({ icon, iconWrap, title, body, aosDelay }) {
  return (
    <article
      className="flex-1 rounded-[2.5rem] p-10 glass-card"
      data-aos="fade-left"
      data-aos-delay={aosDelay}
    >
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${iconWrap}`}
      >
        <i className={`fas ${icon}`} aria-hidden />
      </div>
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className="leading-relaxed text-slate-400">{body}</p>
    </article>
  )
}
