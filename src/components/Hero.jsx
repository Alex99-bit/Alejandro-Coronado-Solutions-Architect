import { CONTACT_LINKS } from "../data/links";

const heroImg = new URL("../assets/Alex Coronado.jpeg", import.meta.url).href;

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div
            className="text-center lg:w-3/5 lg:text-left"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Disponible para Proyectos
            </div>
            <h1 className="mb-8 text-6xl leading-[1.1] font-extrabold tracking-tight md:text-8xl">
              Plataformas, <br />
              <span className="gradient-text">XR</span> y soluciones a medida
              <br />
              para tu empresa
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl lg:mx-0">
              Plataformas web, apps y experiencias XR para capacitación y marketing. Soluciones prácticas para tomadores de decisión. Colaboro con gamespiration y Fyware en la ejecución técnica cuando procede.
            </p>
            <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              <a
                href="#proyectos"
                className="btn-fancy rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 text-lg font-bold shadow-lg shadow-blue-500/20"
              >
                Ver soluciones
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="flex items-center gap-3 rounded-2xl border border-slate-700 px-10 py-5 text-lg font-bold transition-all hover:bg-slate-800"
              >
                Hablar con un experto
              </a>
            </div>
          </div>

          <div className="lg:w-2/5" data-aos="zoom-in" data-aos-duration="1200">
            <div className="relative">
              <div className="absolute -inset-4 animate-pulse rounded-[3rem] bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 glass-card">
                <img
                  src={heroImg}
                  alt="Alex Coronado"
                  className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
