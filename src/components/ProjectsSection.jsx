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
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
                alt="FreshCar Platform"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute right-8 bottom-8 left-8">
                <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-widest uppercase">
                  Plataforma SaaS
                </span>
                <h3 className="mb-2 text-4xl font-bold text-white">
                  FreshCar
                </h3>
                <p className="max-w-xl text-slate-300">
                  Desarrollo de una plataforma integral para movilidad, con experiencia en producto, integración y escalabilidad SaaS.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-b-[2.5rem] p-8">
              <div className="flex gap-4">
                <Tag>SaaS</Tag>
                <Tag>React</Tag>
                <Tag>Arquitectura</Tag>
              </div>
              <a
                href="https://www.linkedin.com/in/alejandro-obregon/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-bold text-blue-400 group/btn hover:text-blue-300"
              >
                Ver LinkedIn{' '}
                <i className="fas fa-arrow-right transition-transform group-hover/btn:translate-x-2" aria-hidden />
              </a>
            </div>
          </article>

          <div className="flex flex-col gap-8 lg:col-span-4">
            <SideCard
              icon="fa-leaf"
              iconWrap="bg-emerald-500/20 text-emerald-500"
              title="ThrivePlanet"
              body="Actualmente colaboro en ThrivePlanet, desarrollando la plataforma con enfoque en sostenibilidad y experiencia de usuario."
              aosDelay={100}
            />
            <SideCard
              icon="fa-cloud"
              iconWrap="bg-sky-500/20 text-sky-500"
              title="Desarrollo SaaS"
              body="Diseño y construcción de soluciones SaaS privadas y B2B que conectan producto, datos y servicios en la nube."
              aosDelay={200}
            />
            <SideCard
              icon="fa-gamepad"
              iconWrap="bg-violet-500/20 text-violet-500"
              title="Videojuegos"
              body="He creado varios videojuegos publicados en itch.io, combinando diseño, programación y experiencia orientada al jugador."
              aosDelay={300}
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
