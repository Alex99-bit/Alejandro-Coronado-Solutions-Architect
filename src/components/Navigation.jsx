import { useEffect, useRef } from 'react'
import { SOCIAL_LINKS, CONTACT_LINKS } from '../data/links.js'

const desktopLink =
  'text-xs font-semibold uppercase tracking-wider transition-colors hover:text-blue-400'

export function Navigation({ elevated, menuOpen, onToggleMenu }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleKeyDown(e) {
      if (e.key !== 'Tab' || !overlayRef.current) return

      const focusable = overlayRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])
  return (
    <>
      <nav
        id="mainNav"
        className={`fixed z-[100] w-full px-6 transition-all duration-300 ${
          elevated
            ? 'border-b border-white/5 bg-slate-950/80 py-3 md:py-4 backdrop-blur-lg'
            : 'border-transparent bg-slate-950/40 backdrop-blur-sm py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="z-[110] text-xl md:text-2xl font-extrabold tracking-tighter flex-shrink-0">
            ALEX<span className="gradient-text">CORONADO</span>
          </a>

          <div className="hidden items-center gap-4 lg:gap-4 xl:gap-8 md:flex overflow-hidden">
            <a href="#about" className={desktopLink}>
              About
            </a>
            <a href="#highlights" className={`${desktopLink} hidden lg:inline-flex`}>
              Highlights
            </a>
            <a href="#experience" className={desktopLink}>
              Experience
            </a>
            <a href="#projects" className={desktopLink}>
              Projects
            </a>
            <a href="#playground" className={`${desktopLink} hidden lg:inline-flex`}>
              Playground
            </a>
            <a href="#content" className={`${desktopLink} hidden xl:inline-flex`}>
              Content
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={`${desktopLink} hidden xl:inline-flex`}>
              LinkedIn
            </a>
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className={`${desktopLink} hidden lg:inline-flex`}>
              WhatsApp
            </a>
            <a
              href="#contact"
              className="btn-fancy rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-black transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
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

      <div className="h-[52px] md:h-[72px]" aria-hidden="true" />

      <div
        ref={overlayRef}
        className={`mobile-overlay fixed inset-0 z-[105] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl ${
          menuOpen ? 'pointer-events-auto is-open' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
        aria-modal={menuOpen ? 'true' : undefined}
        role={menuOpen ? 'dialog' : undefined}
      >
        <button
          type="button"
          onClick={onToggleMenu}
          className="absolute top-6 right-6 z-[110] text-white hover:text-blue-400 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
          <MobileNavLink delay="0.27s" href="#playground" onNavigate={onToggleMenu}>
            Playground
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
              <i className="fas fa-envelope" aria-hidden />
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
