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
            Senior Software Engineer &amp; <span className="gradient-text">Solutions Architect</span>
          </h2>
          <p className={sectionLead}>
            I build proprietary tools, optimized systems, and high-performance software platforms that translate complex business requirements into precise technical specifications. My background spans enterprise ecosystems such as Java, .NET, Node.js, SQL and NoSQL, while extending into emerging AI workflows, distributed systems, and immersive simulation.
          </p>
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
              <a
                href={CONTACT_LINKS.resume}
                download="Carlos-Alejandro-Coronado-Obregon-CV.pdf"
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white bg-slate-800 border border-white/5 hover:bg-slate-900"
              >
                <i className="fas fa-file-download" aria-hidden />
                Download CV
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white border border-white/5 hover:bg-slate-900"
              >
                <i className="fab fa-linkedin" aria-hidden />
                View LinkedIn
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

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white border border-white/5 hover:bg-slate-900"
              >
                <i className="fab fa-instagram" aria-hidden />
                Instagram
              </a>

              <p className="mt-3 text-sm text-slate-400">
                Open to senior engineering roles focused on backend architecture, AI systems, platform engineering, XR simulation, and technical leadership.
              </p>
            </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-7">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up">
              <h3 className={subsectionTitle}>Software &amp; Systems Architecture</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                API design, enterprise integrations, SQL and NoSQL databases, decoupled architectures, workflow automation, interoperability, and technical specifications for reliable delivery.
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="50">
              <h3 className={subsectionTitle}>AI Engineering</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                LLM orchestration with Gemini, Claude, GPT and DeepSeek, multi-agent systems integration, AI workflow automation, custom agent behavior, and enterprise data connectivity.
              </p>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-up" data-aos-delay="100">
              <h3 className={subsectionTitle}>Backend &amp; Full-Stack Development</h3>
              <ul className="list-inside list-disc space-y-3 text-lg text-slate-400 marker:text-blue-400">
                <li>C# .NET, Java, Node.js, Python, PHP Laravel and C++.</li>
                <li>React and Vue for operational interfaces and web applications.</li>
                <li>Java positioned for corporate backend environments with approximately 80% proficiency.</li>
              </ul>
            </article>
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left">
              <h3 className={subsectionTitle}>Immersive Technologies &amp; Graphics</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                Unity, Unreal Engine, C++, XR simulation, VR training systems, real-time interaction design, performance optimization, and 3D asset interoperability.
              </p>
              <ul className="space-y-4 text-lg text-slate-400 mt-6">
                <li className="border-l-2 border-blue-500/40 py-1 pl-4">
                  VR training simulators with direct impact on medical and operational safety.
                </li>
                <li className="border-l-2 border-purple-500/40 py-1 pl-4">
                  Large-scale interactive experiences optimized for Unity and C# runtime constraints.
                </li>
                <li className="border-l-2 border-blue-400/40 py-1 pl-4">
                  Reverse-engineered 3D format conversion foundations to improve asset interoperability.
                </li>
              </ul>
            </article>

            <article className="rounded-[2rem] glass-card p-8 md:p-10" data-aos="fade-left" data-aos-delay="80">
              <h3 className={subsectionTitle}>Technical Leadership</h3>
              <p className={`${sectionLead} text-base md:text-lg`}>
                I act as a technical bridge between product, business stakeholders, and engineering teams, converting ambiguous requirements into executable architecture, implementation priorities, and measurable delivery outcomes.
              </p>
            </article>

            <p
              className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-lg leading-relaxed text-slate-300 md:p-10"
              data-aos="fade-left"
              data-aos-delay="140"
            >
              Profile focus: Senior Software Engineer, Solutions Architect, and AI Solutions Engineer with strengths in robust backend systems, AI agent infrastructure, immersive systems, and cross-functional technical leadership.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
