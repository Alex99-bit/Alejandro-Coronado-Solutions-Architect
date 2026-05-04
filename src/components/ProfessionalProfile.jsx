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
            Ingeniero, fundador, arquitecto de soluciones y <span className="gradient-text">technical sales</span>
          </h2>
          <p className={sectionLead}>
            Este portafolio presenta a Alex Coronado como software dev, solutions architect y technical sales con mentalidad de fundador: el código es la herramienta y la arquitectura el medio para construir soluciones de impacto.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-7">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up">
              <h3 className={subsectionTitle}>Desarrollo Full-Stack y Arquitectura</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Me especializo en desarrollo full-stack moderno con un flujo de trabajo optimizado para eficiencia y escalabilidad. Mi arquitectura predilecta combina la robustez de Laravel y PHP en el backend con la agilidad de React e Inertia.js en el frontend, apoyado por interfaces limpias construidas con Tailwind CSS.
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="50">
              <h3 className={subsectionTitle}>Desarrollo 3D y Game Design</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Mi proceso creativo se extiende a la creación de mundos virtuales y experiencias en XR. Domino motores líderes como Unity y Unreal Engine, complementando el desarrollo técnico con un flujo de trabajo sólido en modelado 3D mediante Blender, Maya y Meshroom.
              </p>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400 mt-6">
                <li>Retopología y optimización de mallas.</li>
                <li>Animación de personajes y texturizado PBR.</li>
                <li>Fotogrametría para entornos realistas.</li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="100">
              <h3 className={subsectionTitle}>Logros destacados</h3>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400">
                <li>
                  Cierra tratos de más de <strong className="text-slate-200">$100,000 MXN</strong> (~<strong className="text-slate-200">$5,500 USD</strong>) en proyectos tecnológicos y soluciones a medida.
                </li>
                <li>
                  <strong className="text-slate-200">NASA Space Apps Challenge</strong>: primer lugar.
                </li>
                <li>
                  Experiencia en <strong className="text-slate-200">technical sales</strong> y negociaciones comerciales basadas en <strong className="text-slate-200">SPIN Selling</strong>.
                </li>
              </ul>
            </article>
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left">
              <h3 className={subsectionTitle}>Ecosistema de Hardware y Creación de Contenido</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Opero bajo un ecosistema de alta potencia que respalda tanto el desarrollo como la marca personal De Programador a Fundador.
              </p>
              <ul className="space-y-4 text-lg text-slate-400 mt-6">
                <li className="border-l-2 border-blue-500/40 py-1 pl-4">
                  Workstation con Ryzen 7 5800X y RTX 3070 para renderizado y compilación sin fricciones.
                </li>
                <li className="border-l-2 border-purple-500/40 py-1 pl-4">
                  Productividad móvil con Galaxy S24 y Tab S10 Plus para gestionar proyectos en movimiento.
                </li>
                <li className="border-l-2 border-blue-400/40 py-1 pl-4">
                  Producción visual con Osmo Mobile 7p y módulo de autoenfoque para contenido de alta calidad en YouTube y TikTok.
                </li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left" data-aos-delay="80">
              <h3 className={subsectionTitle}>Estilo profesional y estrategia</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Mi estilo profesional combina técnica y estrategia. Aplico SPIN Selling para liderar proyectos de software y realidad extendida, enfocándome en la rentabilidad y la innovación desde el rol de fundador.
              </p>
            </article>

            <p
              className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-lg leading-relaxed text-slate-300 md:p-10"
              data-aos="fade-left"
              data-aos-delay="140"
            >
              En síntesis, soy un profesional que lleva la precisión de un ingeniero de software al siguiente nivel mediante una visión estratégica de fundador, moviéndose entre arquitectura de sistemas complejos y la gestión de relaciones comerciales.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
