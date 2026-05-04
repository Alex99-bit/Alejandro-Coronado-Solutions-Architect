import { CONTACT_LINKS } from '../data/links.js'

export function ConsultoriaSection({ onSubmitSuccess }) {
  function handleSubmit(e) {
    e.preventDefault()
    e.target.reset()
    onSubmitSuccess?.()
  }

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

          <form
            id="contactForm"
            className="mx-auto max-w-lg space-y-6 text-left"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                autoComplete="name"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all outline-none focus:border-blue-500"
              />
            </div>
            <textarea
              rows={4}
              name="message"
              placeholder="Háblame de tu proyecto o desafío..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="btn-fancy w-full rounded-2xl bg-white py-5 text-lg font-bold text-black hover:scale-[1.02]"
            >
              Enviar Mensaje Directo
            </button>
          </form>

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
          </div>
        </div>
      </div>
    </section>
  )
}
