const sectionLead =
  'max-w-none text-lg leading-relaxed text-slate-400 md:text-xl lg:mx-0'
const subsectionTitle =
  'mb-4 text-xl font-semibold tracking-tight text-white md:text-2xl'

export function ProfessionalProfile() {
  return (
    <section
      id="perfil"
      className="scroll-mt-28 border-y border-white/5 py-24"
      aria-labelledby="perfil-heading"
    >
      <div className="container mx-auto px-6">
        <header className="mb-14 max-w-3xl lg:mx-0" data-aos="fade-right">
          <p className="mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">
            Perfil profesional
          </p>
          <h2 id="perfil-heading" className="mb-6 text-4xl font-bold md:text-5xl">
            Ingeniero, fundador y <span className="gradient-text">arquitecto de soluciones</span>
          </h2>
          <p className={sectionLead}>
            Este portafolio concentra la trayectoria de Alex Coronado como ingeniero y
            desarrollador con una base académica sólida, evolución hacia rol fundacional y foco en
            visión de negocio, marca personal y comunidad.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-7">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up">
              <h3 className={subsectionTitle}>Formación y especialización técnica</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Combina estudios centrados en <strong className="text-slate-200">Ingeniería en Tecnologías de la Información</strong> con{' '}
                <strong className="text-slate-200">Diseño y Desarrollo de Videojuegos</strong>.
                Ejecuta con dominio de stacks modernos (React, Node.js, Laravel), pero también
                asume{' '}
                <strong className="text-slate-200">
                  dirección técnica, arquitectura de soluciones y fundación de productos
                </strong>
                .
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="50">
              <h3 className={subsectionTitle}>Logros destacados</h3>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400">
                <li>
                  <strong className="text-slate-200">NASA Space Apps Challenge</strong>: primero lugar.
                </li>
                <li>
                  Trayectoria en <strong className="text-slate-200">negociaciones comerciales de alto nivel</strong>.
                </li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="100">
              <h3 className={subsectionTitle}>Visión comercial</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Apoya la venta de software y consultoría con métodos{' '}
                <strong className="text-slate-200">estructurados</strong>: utiliza frameworks como{' '}
                <strong className="text-slate-200">SPIN</strong> para alinear necesidades del cliente,
                alcance técnico y monetización sustentable.
              </p>
            </article>
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left">
              <h3 className={subsectionTitle}>Marca personal y contenido</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Construye marca y comunidad al{' '}
                <strong className="text-slate-200">convertir expertise técnica en activo público</strong>,
                enfocado en guiar profesionales desde el rol individual hacia líderes tech y founders.
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left" data-aos-delay="80">
              <h3 className={subsectionTitle}>Intereses tecnológicos y estilo</h3>
              <ul className="space-y-4 text-lg text-slate-400">
                <li className="border-l-2 border-blue-500/40 py-1 pl-4">
                  Alta exigencia en <strong className="text-slate-200">rendimiento mobile y desktop</strong> (hardware y software).
                </li>
                <li className="border-l-2 border-purple-500/40 py-1 pl-4">
                  <strong className="text-slate-200">Experimentación cotidiana</strong> tipo retos físicos/coordinación como la mano no
                  dominante: reflejo de práctica repetida orientada al crecimiento.
                </li>
                <li className="border-l-2 border-blue-400/40 py-1 pl-4">
                  <strong className="text-slate-200">Interactive entertainment</strong> con Unity como motor y disfrute de acción/aventura como
                  cultura cercana al producto.
                </li>
              </ul>
            </article>

            <p
              className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-lg leading-relaxed text-slate-300 md:p-10"
              data-aos="fade-left"
              data-aos-delay="140"
            >
              En síntesis, es un profesional que combina{' '}
              <strong className="font-semibold text-white">
                la precisión de un ingeniero de software con la visión estratégica de un director de proyectos
              </strong>
              , moviéndose entre arquitectura de sistemas complejos y la gestión de relaciones con clientes, con{' '}
              <strong className="font-semibold text-white">
                aprendizaje constante y desarrollo de nuevas capacidades
              </strong>
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
