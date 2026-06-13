import { SOCIAL_LINKS, CONTACT_LINKS } from '../data/links.js'

const desktopLink =
  'text-sm font-semibold uppercase tracking-widest transition-colors hover:text-blue-400'

export function Navigation({ elevated, menuOpen, onToggleMenu }) {
  return (
    <>
      <nav
        id="mainNav"
        className={`fixed z-[100] w-full px-6 transition-all duration-300 ${
          elevated
            ? 'border-b border-white/5 bg-slate-950/80 py-4 backdrop-blur-lg'
            : 'border-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="z-[110] text-2xl font-extrabold tracking-tighter">
            ALEX<span className="gradient-text">CORONADO</span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            <a href="#about" className={desktopLink}>
              About
            </a>
            <a href="#highlights" className={desktopLink}>
              Highlights
            </a>
            <a href="#experience" className={desktopLink}>
              Experience
            </a>
            <a href="#projects" className={desktopLink}>
              Projects
            </a>
            <a href="#content" className={desktopLink}>
              Content
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={desktopLink}>
              LinkedIn
            </a>
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={desktopLink}>
              WhatsApp
            </a>
            <a
              href="#contact"
              className="btn-fancy rounded-full bg-white px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95"
            >
              Recruiter Contact
            </a>
          </div>

          <button
            type="button"
            className={`z-[110] flex h-5 w-8 flex-col justify-between md:hidden ${menuOpen ? 'burger-active' : ''}`}
            id="burgerBtn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={onToggleMenu}
          >
            <span className="burger-line line1 h-0.5 w-full bg-white" />
            <span className="burger-line line2 h-0.5 w-full bg-white" />
            <span className="burger-line line3 h-0.5 w-full bg-white" />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-overlay fixed inset-0 z-[105] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl ${
          menuOpen ? 'pointer-events-auto is-open' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          <MobileNavLink delay="0.1s" href="#about" onNavigate={onToggleMenu}>
            About
          </MobileNavLink>
          <MobileNavLink delay="0.2s" href="#highlights" onNavigate={onToggleMenu}>
            Highlights
          </MobileNavLink>
          <MobileNavLink delay="0.23s" href="#experience" onNavigate={onToggleMenu}>
            Experience
          </MobileNavLink>
          <MobileNavLink delay="0.25s" href="#projects" onNavigate={onToggleMenu}>
            Projects
          </MobileNavLink>
          <MobileNavLink delay="0.3s" href="#content" onNavigate={onToggleMenu}>
            Content
          </MobileNavLink>
          <MobileNavLink delay="0.4s" href="#contact" onNavigate={onToggleMenu}>
            Contact
          </MobileNavLink>

          <div
            className="nav-link-mobile flex space-x-6 pt-8 text-2xl"
            style={{ transitionDelay: '0.5s' }}
          >
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube" aria-hidden />
              <span className="sr-only">YouTube</span>
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" aria-hidden />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp" aria-hidden />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" aria-hidden />
              <span className="sr-only">Instagram</span>
            </a>
            <a href={CONTACT_LINKS.email} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-envelope" aria-hidden />
              <span className="sr-only">Email</span>
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" aria-hidden />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileNavLink({ href, delay, children, onNavigate }) {
  return (
    <a
      href={href}
      className="nav-link-mobile text-4xl font-bold hover:text-blue-400"
      style={{ transitionDelay: delay }}
      onClick={() => onNavigate?.()}
    >
      {children}
    </a>
  )
}
