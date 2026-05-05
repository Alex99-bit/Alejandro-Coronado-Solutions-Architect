import { SOCIAL_LINKS } from '../data/links.js'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12 text-center">
      <div className="container mx-auto px-6">
        <a href="#" className="mb-8 inline-block text-xl font-bold">
          ALEX<span className="gradient-text">CORONADO</span>
        </a>
        <div className="mb-8 flex justify-center space-x-8 text-2xl">
          <a
            href={SOCIAL_LINKS.youtube}
            className="text-slate-500 transition-all hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            className="text-slate-500 transition-all hover:text-white"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            className="text-slate-500 transition-all hover:text-white"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            className="text-slate-500 transition-all hover:text-white"
            aria-label="GitHub"
          >
            <i className="fab fa-github" aria-hidden />
          </a>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Colaboro con gamespiration y Fyware en proyectos de desarrollo y XR.
        </p>
        <p className="text-sm text-slate-500">
          © {year} Alex Coronado Brand. Construido para el mañana.
        </p>
      </div>
    </footer>
  )
}
