import { CONTACT_LINKS } from '../data/links.js'

export function ConsultoriaSection() {
  return (
    <section className="py-32" id="consultoria">
      <div className="container mx-auto px-6 text-center">
        <div
          className="relative overflow-hidden rounded-[4rem] p-12 md:p-24 glass-card"
          data-aos="zoom-in"
        >
          <div className="absolute top-[-6rem] left-[-6rem] h-64 w-64 bg-blue-600/20 blur-[100px]" />
          <div className="absolute right-[-6rem] bottom-[-6rem] h-64 w-64 bg-purple-600/20 blur-[100px]" />

          <h2 className="mb-8 text-5xl font-extrabold md:text-7xl">
            ¿Listo para <span className="gradient-text">escalar</span>?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
            Ayudo a fundadores y equipos técnicos a navegar la complejidad de construir productos digitales de clase mundial.
          </p>

          <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 text-left">
            <p className="mb-6 text-lg text-slate-300">
              También puedes escribirme directamente por WhatsApp o email si prefieres una comunicación más rápida.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-emerald-400"
              >
                <i className="fab fa-whatsapp text-xl" aria-hidden />
                Whatsapp
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-500 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-blue-400"
              >
                <i className="fas fa-envelope text-xl" aria-hidden />
                Email
              </a>
            </div>
            <p className="mb-6 text-lg text-slate-300">
              Puedes escribirme directamente por WhatsApp o email para iniciar la conversación.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-emerald-400"
              >
                <i className="fab fa-whatsapp text-xl" aria-hidden />
                Whatsapp
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-500 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-blue-400"
              >
                <i className="fas fa-envelope text-xl" aria-hidden />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
