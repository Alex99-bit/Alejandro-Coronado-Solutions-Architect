import { CONTACT_LINKS } from '../data/links.js'

export function ConsultoriaSection() {
  return (
    <section className="py-32" id="consulting">
      <div className="container mx-auto px-6 text-center">
        <div
          className="relative overflow-hidden rounded-[4rem] p-12 md:p-24 glass-card"
          data-aos="zoom-in"
        >
          <div className="absolute top-[-6rem] left-[-6rem] h-64 w-64 bg-blue-600/20 blur-[100px]" />
          <div className="absolute right-[-6rem] bottom-[-6rem] h-64 w-64 bg-purple-600/20 blur-[100px]" />

          <h2 className="mb-8 text-5xl font-extrabold md:text-7xl">
            Ready to <span className="gradient-text">scale</span>?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
            I help founders and engineering teams navigate the complexity of building world-class digital products.
          </p>

          <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 text-center">
            <p className="mb-6 text-lg text-slate-300">
              You can reach me directly on WhatsApp or by email; choose your preferred option.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Contact via WhatsApp"
                className="group inline-flex items-center gap-4 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-500"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white">
                  <i className="fab fa-whatsapp text-xl" aria-hidden />
                </span>
                <span className="text-left leading-5">
                  <span className="block font-bold">WhatsApp</span>
                  <span className="text-xs text-white/80">Direct message</span>
                </span>
              </a>

              <a
                href={CONTACT_LINKS.email}
                aria-label="Enviar email"
                className="group inline-flex items-center gap-4 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg bg-gradient-to-r from-blue-600 to-blue-500"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white">
                  <i className="fas fa-envelope text-lg" aria-hidden />
                </span>
                <span className="text-left leading-5">
                  <span className="block font-bold">Email</span>
                    <span className="text-xs text-white/80">Send email</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
