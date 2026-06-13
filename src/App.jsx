import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { Analytics } from '@vercel/analytics/react'

const AuroraBackground = lazy(() => import('./components/AuroraBackground.jsx').then(m => ({ default: m.AuroraBackground })))
import { ContactSection } from './components/ContactSection.jsx'
import { ExperienceSection } from './components/ExperienceSection.jsx'
import { Hero } from './components/Hero.jsx'
import { Navigation } from './components/Navigation.jsx'
import { ProfessionalProfile } from './components/ProfessionalProfile.jsx'
import { ProjectsSection } from './components/ProjectsSection.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { StatsSection } from './components/StatsSection.jsx'
import { Toast } from './components/Toast.jsx'
const YoutubeSection = lazy(() => import('./components/YoutubeSection.jsx').then(m => ({ default: m.YoutubeSection })))
import { useNavScrollShadow } from './hooks/useNavScrollShadow.js'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const toastHideTimerRef = useRef(null)
  const elevated = useNavScrollShadow(50)

  useEffect(() => {
    let active = true

    ;(async () => {
      try {
        const AOS = (await import('aos')).default
        await import('aos/dist/aos.css')
        if (!active) return
        AOS.init({
          duration: 800,
          once: false,
          mirror: true,
          offset: 100,
        })
      } catch (e) {
        // fail gracefully if AOS can't be loaded
        console.warn('AOS failed to load:', e)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    return () => clearTimeout(toastHideTimerRef.current)
  }, [])

  function toggleMenu() {
    setMenuOpen((o) => !o)
  }

  function showSubmissionToast() {
    setToastVisible(true)
    clearTimeout(toastHideTimerRef.current)
    toastHideTimerRef.current = setTimeout(() => {
      setToastVisible(false)
      toastHideTimerRef.current = null
    }, 5000)
  }

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-6 top-6 z-[300] rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 opacity-0 shadow-xl ring-2 ring-blue-500/30 transition-opacity focus:pointer-events-auto focus:opacity-100 focus:outline-none"
      >
        Saltar al contenido
      </a>

      <Suspense fallback={null}>
        <AuroraBackground />
      </Suspense>

      <Navigation elevated={elevated} menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProfessionalProfile />
        <StatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <Suspense fallback={null}>
          <YoutubeSection />
        </Suspense>
        <ContactSection onSubmitSuccess={showSubmissionToast} />
      </main>

      <SiteFooter />
      <Toast visible={toastVisible} />
      <Analytics />
    </>
  )
}
