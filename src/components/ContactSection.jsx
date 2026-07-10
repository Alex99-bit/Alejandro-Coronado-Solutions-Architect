import { useState } from 'react'
import { CONTACT_LINKS } from '../data/links.js'

export function ContactSection({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.open(`mailto:alejandro.co.dev@gmail.com?subject=${subject}&body=${body}`, '_blank')

    setFormData({ name: '', email: '', message: '' })
    onSubmitSuccess?.()
  }

  return (
    <section className="py-32" id="contact">
      <div className="container mx-auto px-6 text-center">
        <div
          className="relative overflow-hidden rounded-[4rem] p-12 md:p-24 glass-card"
          data-aos="zoom-in"
        >
          <div className="absolute top-[-6rem] left-[-6rem] h-64 w-64 bg-blue-600/20 blur-[100px]" />
          <div className="absolute right-[-6rem] bottom-[-6rem] h-64 w-64 bg-purple-600/20 blur-[100px]" />

          <h2 className="mb-8 text-4xl font-bold md:text-5xl">
            Let&apos;s build <span className="gradient-text">reliable systems</span>.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
            Available for senior engineering, solutions architecture, AI engineering, and XR systems roles with global teams.
          </p>

          <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 text-center max-w-xl mx-auto">
            <p className="mb-6 text-lg text-slate-300">
              Talent teams and engineering leaders can reach me directly through WhatsApp, email, or the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left mb-8">
              <div>
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Your email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-200 font-semibold text-sm"
              >
                Send Message
              </button>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  <span className="text-xs text-white/80">Recruiter contact</span>
                </span>
              </a>

              <a
                href={CONTACT_LINKS.email}
                aria-label="Send email"
                className="group inline-flex items-center gap-4 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg bg-gradient-to-r from-blue-600 to-blue-500"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white">
                  <i className="fas fa-envelope text-lg" aria-hidden />
                </span>
                <span className="text-left leading-5">
                  <span className="block font-bold">Email</span>
                  <span className="text-xs text-white/80">Send opportunity</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
