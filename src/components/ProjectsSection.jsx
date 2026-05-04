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
          <article className="group rounded-[2.5rem] glass-card lg:col-span-8 p-10" data-aos="fade-up">
            <div className="mb-10 rounded-[2.5rem] overflow-hidden bg-slate-900/60 p-10">
              <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-widest uppercase">
                Trayectoria
              </span>
              <h3 className="mb-6 text-4xl font-bold text-white">
                Proyectos clave y productos en desarrollo
              </h3>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
                He participado en el desarrollo de plataformas SaaS de alto impacto, liderando arquitecturas escalables y experiencias digitales.
                Actualmente trabajo en ThrivePlanet, mientras que FreshCar refleja mi experiencia en movilidad inteligente y producto conectado.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-blue-400">FreshCar</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Plataforma de movilidad</h4>
                <p className="text-slate-400">
                  Desarrollo de un sistema SaaS para gestión de flotas, reservas y análisis de datos con enfoque UX y escalabilidad.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-400">ThrivePlanet</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Plataforma Innovadora</h4>
                <p className="text-slate-400">
                  Construcción de funcionalidades orientadas a consumo sostenible y experiencia de usuario renovada para la WEB 4.0.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-sky-400">SaaS</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Soluciones empresariales</h4>
                <p className="text-slate-400">
                  Experiencia en diseño de arquitecturas SaaS privadas y B2B, con integración de APIs, orquestación en la nube y enfoque en seguridad.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-violet-400">Itch.io</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Videojuegos</h4>
                <p className="text-slate-400">
                  Desarrollo de videojuegos indie publicados en itch.io, combinando narrativa, mecánicas y programación cross-platform.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-3 flex-wrap">
                <Tag>SaaS</Tag>
                <Tag>Movilidad</Tag>
                <Tag>Plataforma</Tag>
                <Tag>Videojuegos</Tag>
                <Tag>UX</Tag>
              </div>
              <a
                href="https://alexco99.itch.io/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-bold text-blue-400 group/btn hover:text-blue-300"
              >
                Ver Itch.io{' '}
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
