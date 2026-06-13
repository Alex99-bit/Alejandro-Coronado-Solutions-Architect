import { SOCIAL_LINKS, CONTACT_LINKS } from '../data/links.js'

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
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" aria-hidden />
          </a>
          <a
            href={CONTACT_LINKS.whatsapp}
            className="text-slate-500 transition-all hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            className="text-slate-500 transition-all hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" aria-hidden />
          </a>
          <a
            href={CONTACT_LINKS.email}
            className="text-slate-500 transition-all hover:text-white"
            aria-label="Email"
          >
            <i className="fa fa-envelope" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            className="text-slate-500 transition-all hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github" aria-hidden />
          </a>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Senior Software Engineer & Solutions Architect focused on AI agents, enterprise backends, and immersive systems.
        </p>
        <div className="mb-4 flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-400">
          <a className="hover:text-white" href="/software-engineer-solutions-architect/">
            Software Engineer &amp; Solutions Architect
          </a>
          <a className="hover:text-white" href="/ai-specialist-solutions-engineer/">
            AI Specialist
          </a>
          <a className="hover:text-white" href="/technical-impact-case-studies/">
            Technical Impact
          </a>
          <a className="hover:text-white" href="/cto-technical-leadership/">
            CTO Leadership
          </a>
          <a className="hover:text-white" href="/hire-senior-software-engineer-ai-solutions-architect/">
            Hire Alejandro
          </a>
          <a className="hover:text-white" href="/es/">
            Ingeniero de Software
          </a>
          <a className="hover:text-white" href="/arquitecto-de-soluciones-ingeniero-software/">
            Arquitecto de Soluciones
          </a>
          <a className="hover:text-white" href="/recruiter-seo-sitemap/">
            Recruiter Sitemap
          </a>
        </div>
        <p className="text-sm text-slate-500">
          Copyright {year} Carlos Alejandro Coronado Obregon. Built for engineering teams.
        </p>
      </div>
    </footer>
  )
}
