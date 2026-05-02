import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { AuroraBackground } from './components/AuroraBackground.jsx'
import { ConsultoriaSection } from './components/ConsultoriaSection.jsx'
import { Hero } from './components/Hero.jsx'
import { Navigation } from './components/Navigation.jsx'
import { ProfessionalProfile } from './components/ProfessionalProfile.jsx'
import { ProjectsSection } from './components/ProjectsSection.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { StatsSection } from './components/StatsSection.jsx'
import { Toast } from './components/Toast.jsx'
import { YoutubeSection } from './components/YoutubeSection.jsx'
import { useNavScrollShadow } from './hooks/useNavScrollShadow.js'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const toastHideTimerRef = useRef(null)
  const elevated = useNavScrollShadow(50)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    })
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

      <AuroraBackground />

      <Navigation elevated={elevated} menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProfessionalProfile />
        <StatsSection />
        <ProjectsSection />
        <YoutubeSection />
        <ConsultoriaSection onSubmitSuccess={showSubmissionToast} />
      </main>

      <SiteFooter />
      <Toast visible={toastVisible} />
    </>
  )
}
