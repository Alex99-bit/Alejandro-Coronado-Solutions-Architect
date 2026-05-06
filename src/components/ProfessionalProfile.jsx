import { SOCIAL_LINKS, CONTACT_LINKS } from '../data/links.js'

const sectionLead =
  'max-w-none text-lg leading-relaxed text-slate-400 md:text-xl lg:mx-0'
const subsectionTitle =
  'mb-4 text-xl font-semibold tracking-tight text-white md:text-2xl'

export function ProfessionalProfile() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-y border-white/5 py-24"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <header className="mb-14 max-w-3xl lg:mx-0" data-aos="fade-right">
          <p className="mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">
            Professional Profile
          </p>
          <h2 id="about-heading" className="mb-6 text-4xl font-bold md:text-5xl">
            Engineer, Founder, Solutions Architect &amp; <span className="gradient-text">Technical Sales</span>
          </h2>
          <p className={sectionLead}>
            This portfolio presents Alex Coronado as a software developer, solutions architect, and technical sales professional with a founder mindset: code is the tool and architecture the medium to build impact-driven solutions.
          </p>
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
              <a
                href={CONTACT_LINKS.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white bg-slate-800 border border-white/5 hover:bg-slate-900"
              >
                <i className="fas fa-file-download" aria-hidden />
                Download CV
              </a>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white border border-white/5 hover:bg-slate-900"
              >
                <i className="fab fa-github" aria-hidden />
                View GitHub
              </a>

              <p className="mt-3 text-sm text-slate-400">
                If you're a recruiter: available for development roles. Download my CV or review my public repositories.
              </p>
            </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-7">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up">
              <h3 className={subsectionTitle}>Full-Stack Development &amp; Architecture</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                I specialize in modern full-stack development with a workflow optimized for efficiency and scalability. My preferred architecture combines the robustness of Laravel and PHP in the backend with the agility of React and Inertia.js on the frontend, supported by clean interfaces built with Tailwind CSS.
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="50">
              <h3 className={subsectionTitle}>3D Development &amp; Game Design</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                My creative process extends to building virtual worlds and XR experiences. I master leading engines such as Unity and Unreal Engine, complementing technical development with a solid 3D modeling workflow using Blender, Maya and Meshroom.
              </p>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400 mt-6">
                <li>Retopology and mesh optimization.</li>
                <li>Character animation and PBR texturing.</li>
                <li>Photogrammetry for realistic environments.</li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="100">
              <h3 className={subsectionTitle}>Selected Achievements</h3>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400">
                <li>
                  Closed deals exceeding <strong className="text-slate-200">$100,000 MXN</strong> (~<strong className="text-slate-200">$5,500 USD</strong>) on bespoke technology projects and solutions.
                </li>
                <li>
                  <strong className="text-slate-200">NASA Space Apps Challenge</strong>: first place.
                </li>
                <li>
                  Experience in <strong className="text-slate-200">technical sales</strong> and commercial negotiations based on <strong className="text-slate-200">SPIN Selling</strong>.
                </li>
              </ul>
            </article>
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left">
              <h3 className={subsectionTitle}>Hardware Ecosystem &amp; Content Creation</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                I operate a high-performance ecosystem that supports both development and personal branding from Developer to Founder.
              </p>
              <ul className="space-y-4 text-lg text-slate-400 mt-6">
                <li className="border-l-2 border-blue-500/40 py-1 pl-4">
                  Workstation with Ryzen 7 5800X and RTX 3070 for smooth rendering and builds.
                </li>
                <li className="border-l-2 border-purple-500/40 py-1 pl-4">
                  Mobile productivity with Galaxy S24 and Tab S10 Plus to manage projects on the move.
                </li>
                <li className="border-l-2 border-blue-400/40 py-1 pl-4">
                  Visual production with Osmo Mobile 7p and an autofocus module for high-quality YouTube and TikTok content.
                </li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left" data-aos-delay="80">
              <h3 className={subsectionTitle}>Professional Style &amp; Strategy</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                My professional style combines technical depth and strategic thinking. I apply SPIN Selling to lead software and extended reality projects, focusing on profitability and innovation from a founder's perspective.
              </p>
            </article>

            <p
              className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-lg leading-relaxed text-slate-300 md:p-10"
              data-aos="fade-left"
              data-aos-delay="140"
            >
              In summary, I bridge the precision of a software engineer with a founder's strategic vision, moving between complex systems architecture and commercial relationship management.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
